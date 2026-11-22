"""Portfolio API: page-view tracking, contact form and a private stats endpoint.

Two tables in their own MySQL database (`portfolio`) on the server:
  portfolio_visits    one row per page view (no raw IP is ever stored)
  portfolio_messages  one row per contact-form submission

Run locally:  uvicorn app:app --reload --port 8200   (from this folder)
"""
from __future__ import annotations

import hashlib
import hmac
import os
import re
from datetime import datetime, timedelta, timezone
from urllib.parse import urlparse

from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from sqlalchemy import DateTime, Index, Integer, String, Text, create_engine, func, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./portfolio-local.db")
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")
HASH_SALT = os.environ.get("HASH_SALT", "dev-salt")
ALLOWED_ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()]

TOPICS = {"mentorship", "project", "aiml", "job", "feedback", "other"}
BOT_RE = re.compile(r"bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|curl|wget|python-requests|httpx", re.I)
MAX_MESSAGES_PER_HOUR = 5      # per visitor
MAX_VISITS_PER_MINUTE = 60     # per visitor

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=1800, connect_args=connect_args)
SessionLocal = sessionmaker(engine, expire_on_commit=False)


def now() -> datetime:
    """UTC, stored without tzinfo so MySQL and SQLite behave the same."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Base(DeclarativeBase):
    pass


class Visit(Base):
    __tablename__ = "portfolio_visits"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now, nullable=False)
    path: Mapped[str] = mapped_column(String(255), nullable=False)
    referrer: Mapped[str | None] = mapped_column(String(255))       # host only, e.g. linkedin.com
    visitor: Mapped[str] = mapped_column(String(32), nullable=False)  # salted daily hash, not reversible
    session: Mapped[str | None] = mapped_column(String(40))          # random id from the browser tab
    device: Mapped[str] = mapped_column(String(12), nullable=False)   # desktop | mobile | tablet
    browser: Mapped[str | None] = mapped_column(String(20))
    country: Mapped[str | None] = mapped_column(String(2))
    __table_args__ = (
        Index("ix_portfolio_visits_created", "created_at"),
        Index("ix_portfolio_visits_path", "path"),
        Index("ix_portfolio_visits_visitor", "visitor", "created_at"),
    )


class Message(Base):
    __tablename__ = "portfolio_messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(190), nullable=False)
    topic: Mapped[str] = mapped_column(String(20), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    page: Mapped[str | None] = mapped_column(String(255))
    visitor: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(12), default="new", nullable=False)  # new | read | replied
    __table_args__ = (Index("ix_portfolio_messages_created", "created_at"),)


def init_db() -> None:
    """Creates only the two portfolio_ tables if they are missing. Never touches other tables."""
    Base.metadata.create_all(engine)


app = FastAPI(title="Portfolio API", docs_url=None, redoc_url=None, openapi_url=None)
if ALLOWED_ORIGINS:
    app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_methods=["GET", "POST", "PATCH"], allow_headers=["*"])


init_db()


def db():
    with SessionLocal() as s:
        yield s


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "0.0.0.0"


def visitor_id(request: Request) -> str:
    """Same person on the same day gets the same id; it changes daily and cannot be turned back into an IP."""
    day = now().strftime("%Y-%m-%d")
    raw = f"{day}|{client_ip(request)}|{request.headers.get('user-agent', '')}"
    return hmac.new(HASH_SALT.encode(), raw.encode(), hashlib.sha256).hexdigest()[:32]


def device_of(ua: str) -> str:
    if re.search(r"ipad|tablet", ua, re.I):
        return "tablet"
    if re.search(r"mobi|android|iphone", ua, re.I):
        return "mobile"
    return "desktop"


def browser_of(ua: str) -> str:
    for name, pat in (("Edge", r"edg/"), ("Opera", r"opr/"), ("Samsung", r"samsungbrowser"), ("Chrome", r"chrome/"), ("Firefox", r"firefox/"), ("Safari", r"safari/")):
        if re.search(pat, ua, re.I):
            return name
    return "Other"


def clean_path(p: str) -> str:
    p = urlparse(p).path or "/"   # drop query strings and fragments: they can hold personal data
    return p[:255] if p.startswith("/") else "/"


def ref_host(r: str | None, own_host: str | None) -> str | None:
    if not r:
        return None
    host = (urlparse(r).hostname or "").removeprefix("www.")
    if not host or (own_host and host == own_host.removeprefix("www.")):
        return None
    return host[:255]


# ---------- public: page views ----------

class VisitIn(BaseModel):
    path: str = Field(max_length=500)
    referrer: str | None = Field(default=None, max_length=1000)
    session: str | None = Field(default=None, max_length=40, pattern=r"^[A-Za-z0-9_-]*$")


@app.post("/api/visit", status_code=204, response_class=Response)
def track(body: VisitIn, request: Request, s: Session = Depends(db)) -> Response:
    _record(body, request, s)
    return Response(status_code=204)


def _record(body: VisitIn, request: Request, s: Session) -> None:
    ua = request.headers.get("user-agent", "")
    if not ua or BOT_RE.search(ua):
        return  # bots are not people
    vid = visitor_id(request)
    recent = s.scalar(select(func.count()).select_from(Visit).where(Visit.visitor == vid, Visit.created_at > now() - timedelta(minutes=1)))
    if recent and recent >= MAX_VISITS_PER_MINUTE:
        return
    s.add(Visit(
        path=clean_path(body.path), referrer=ref_host(body.referrer, request.headers.get("host")),
        visitor=vid, session=body.session or None, device=device_of(ua), browser=browser_of(ua),
        country=(request.headers.get("cf-ipcountry") or "")[:2].upper() or None,
    ))
    s.commit()


# ---------- public: contact form ----------

class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    topic: str
    message: str = Field(min_length=10, max_length=4000)
    page: str | None = Field(default=None, max_length=500)
    website: str | None = Field(default=None, max_length=200)   # honeypot: real people leave it empty

    @field_validator("name", "message")
    @classmethod
    def strip(cls, v: str) -> str:
        return v.strip()

    @field_validator("topic")
    @classmethod
    def known_topic(cls, v: str) -> str:
        if v not in TOPICS:
            raise ValueError("unknown topic")
        return v


@app.post("/api/contact")
def contact(body: ContactIn, request: Request, s: Session = Depends(db)) -> dict:
    if body.website:
        return {"ok": True}  # pretend success so bots don't retry
    vid = visitor_id(request)
    recent = s.scalar(select(func.count()).select_from(Message).where(Message.visitor == vid, Message.created_at > now() - timedelta(hours=1)))
    if recent and recent >= MAX_MESSAGES_PER_HOUR:
        raise HTTPException(429, "Too many messages. Please try again in an hour, or email me directly.")
    s.add(Message(name=body.name, email=str(body.email), topic=body.topic, message=body.message,
                  page=clean_path(body.page) if body.page else None, visitor=vid))
    s.commit()
    return {"ok": True}


# ---------- private: stats ----------

def admin(x_admin_key: str = Header(default="")) -> None:
    if not ADMIN_KEY or not hmac.compare_digest(x_admin_key.encode(), ADMIN_KEY.encode()):
        raise HTTPException(401, "Wrong or missing admin key")


@app.get("/api/admin/summary", dependencies=[Depends(admin)])
def summary(days: int = 30, s: Session = Depends(db)) -> dict:
    days = max(1, min(days, 365))
    since = now() - timedelta(days=days)
    today = now().replace(hour=0, minute=0, second=0, microsecond=0)
    in_range = Visit.created_at >= since

    def count(*where) -> int:
        return s.scalar(select(func.count()).select_from(Visit).where(*where)) or 0

    def uniques(*where) -> int:
        return s.scalar(select(func.count(func.distinct(Visit.visitor))).where(*where)) or 0

    def top(col, n=12):
        rows = s.execute(select(col, func.count().label("views"), func.count(func.distinct(Visit.visitor)).label("visitors"))
                         .where(in_range, col.is_not(None)).group_by(col).order_by(func.count().desc()).limit(n)).all()
        return [{"key": k, "views": v, "visitors": u} for k, v, u in rows]

    day = func.date(Visit.created_at)
    per_day = s.execute(select(day, func.count(), func.count(func.distinct(Visit.visitor))).where(in_range).group_by(day).order_by(day)).all()
    msgs = s.scalars(select(Message).order_by(Message.created_at.desc()).limit(100)).all()
    return {
        "days": days,
        "totals": {
            "views": count(in_range), "visitors": uniques(in_range),
            "views_today": count(Visit.created_at >= today), "visitors_today": uniques(Visit.created_at >= today),
            "views_all_time": count(), "messages": s.scalar(select(func.count()).select_from(Message)) or 0,
            "messages_new": s.scalar(select(func.count()).select_from(Message).where(Message.status == "new")) or 0,
        },
        "per_day": [{"day": str(d), "views": v, "visitors": u} for d, v, u in per_day],
        "pages": top(Visit.path), "referrers": top(Visit.referrer), "devices": top(Visit.device), "browsers": top(Visit.browser),
        "messages": [{"id": m.id, "at": m.created_at.isoformat() + "Z", "name": m.name, "email": m.email, "topic": m.topic,
                      "message": m.message, "page": m.page, "status": m.status} for m in msgs],
    }


class StatusIn(BaseModel):
    status: str = Field(pattern=r"^(new|read|replied)$")


@app.patch("/api/admin/messages/{mid}", dependencies=[Depends(admin)])
def set_status(mid: int, body: StatusIn, s: Session = Depends(db)) -> dict:
    m = s.get(Message, mid)
    if not m:
        raise HTTPException(404, "No such message")
    m.status = body.status
    s.commit()
    return {"ok": True}


@app.get("/api/health")
def health(s: Session = Depends(db)) -> dict:
    s.execute(select(1))
    return {"ok": True}
