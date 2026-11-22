import os
import sys
import tempfile
from pathlib import Path

_tmp = Path(tempfile.mkdtemp()) / "test.db"
os.environ["DATABASE_URL"] = f"sqlite:///{_tmp.as_posix()}"
os.environ["ADMIN_KEY"] = "test-key"
os.environ["HASH_SALT"] = "test-salt"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

import app as api  # noqa: E402

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36"
PHONE = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36"
KEY = {"X-Admin-Key": "test-key"}


@pytest.fixture()
def c():
    api.Base.metadata.drop_all(api.engine)
    api.init_db()
    with TestClient(api.app) as client:
        yield client


def visit(c, path="/", ua=UA, ip="1.1.1.1", **extra):
    return c.post("/api/visit", json={"path": path, **extra}, headers={"User-Agent": ua, "X-Forwarded-For": ip})


def summary(c, **params):
    return c.get("/api/admin/summary", headers=KEY, params=params).json()


def test_health(c):
    assert c.get("/api/health").json() == {"ok": True}


def test_visits_counted_with_unique_visitors(c):
    assert visit(c, "/").status_code == 204
    visit(c, "/projects")
    visit(c, "/projects", ua=PHONE, ip="2.2.2.2")
    s = summary(c)
    assert s["totals"]["views"] == 3
    assert s["totals"]["visitors"] == 2
    assert s["totals"]["views_today"] == 3
    assert s["pages"][0] == {"key": "/projects", "views": 2, "visitors": 2}
    assert {d["key"] for d in s["devices"]} == {"desktop", "mobile"}
    assert len(s["per_day"]) == 1 and s["per_day"][0]["views"] == 3


def test_query_string_and_own_referrer_are_dropped(c):
    visit(c, "/blog/x?email=a@b.com#frag", referrer="https://www.linkedin.com/feed/?x=1")
    visit(c, "/epoch", referrer="http://testserver/projects")
    s = summary(c)
    assert {p["key"] for p in s["pages"]} == {"/blog/x", "/epoch"}
    assert s["referrers"] == [{"key": "linkedin.com", "views": 1, "visitors": 1}]


def test_no_raw_ip_is_stored(c):
    visit(c, "/", ip="203.0.113.77")
    with api.SessionLocal() as s:
        row = s.query(api.Visit).one()
        assert "203.0.113.77" not in " ".join(str(v) for v in vars(row).values())
        assert len(row.visitor) == 32


def test_bots_are_ignored(c):
    visit(c, "/", ua="Googlebot/2.1 (+http://www.google.com/bot.html)")
    c.post("/api/visit", json={"path": "/"}, headers={"User-Agent": ""})
    assert summary(c)["totals"]["views"] == 0


def test_visit_rate_limit(c):
    for _ in range(api.MAX_VISITS_PER_MINUTE + 10):
        visit(c, "/")
    assert summary(c)["totals"]["views"] == api.MAX_VISITS_PER_MINUTE


def test_bad_visit_payload_rejected(c):
    assert c.post("/api/visit", json={"path": "x" * 600}, headers={"User-Agent": UA}).status_code == 422
    assert c.post("/api/visit", json={"path": "/", "session": "bad session!"}, headers={"User-Agent": UA}).status_code == 422


GOOD = {"name": "Asha Rao", "email": "asha@example.com", "topic": "mentorship", "message": "I would like guidance on moving into ML."}


def send(c, ip="9.9.9.9", **over):
    return c.post("/api/contact", json={**GOOD, **over}, headers={"User-Agent": UA, "X-Forwarded-For": ip})


def test_contact_saved_and_listed(c):
    assert send(c, page="/projects?x=1").json() == {"ok": True}
    s = summary(c)
    assert s["totals"]["messages"] == 1 and s["totals"]["messages_new"] == 1
    m = s["messages"][0]
    assert (m["name"], m["email"], m["topic"], m["page"], m["status"]) == ("Asha Rao", "asha@example.com", "mentorship", "/projects", "new")


@pytest.mark.parametrize("over", [
    {"email": "not-an-email"}, {"topic": "spam"}, {"message": "short"}, {"name": "A"}, {"message": "x" * 4001},
])
def test_contact_validation(c, over):
    assert send(c, **over).status_code == 422
    assert summary(c)["totals"]["messages"] == 0


def test_honeypot_is_silently_dropped(c):
    assert send(c, website="http://spam.example").json() == {"ok": True}
    assert summary(c)["totals"]["messages"] == 0


def test_contact_rate_limit_is_per_visitor(c):
    for _ in range(api.MAX_MESSAGES_PER_HOUR):
        assert send(c).status_code == 200
    assert send(c).status_code == 429
    assert send(c, ip="8.8.4.4").status_code == 200


def test_html_is_stored_as_plain_text(c):
    send(c, message="<script>alert(1)</script> hello there")
    assert summary(c)["messages"][0]["message"] == "<script>alert(1)</script> hello there"


def test_admin_requires_key(c):
    assert c.get("/api/admin/summary").status_code == 401
    assert c.get("/api/admin/summary", headers={"X-Admin-Key": "wrong"}).status_code == 401
    assert c.patch("/api/admin/messages/1", json={"status": "read"}).status_code == 401


def test_mark_message_read(c):
    send(c)
    mid = summary(c)["messages"][0]["id"]
    assert c.patch(f"/api/admin/messages/{mid}", json={"status": "read"}, headers=KEY).json() == {"ok": True}
    s = summary(c)
    assert s["messages"][0]["status"] == "read" and s["totals"]["messages_new"] == 0
    assert c.patch(f"/api/admin/messages/{mid}", json={"status": "bogus"}, headers=KEY).status_code == 422
    assert c.patch("/api/admin/messages/9999", json={"status": "read"}, headers=KEY).status_code == 404


def test_only_portfolio_tables_exist(c):
    assert set(api.Base.metadata.tables) == {"portfolio_visits", "portfolio_messages"}
