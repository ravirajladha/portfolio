---
title: REST, GraphQL or gRPC? How I pick an API style
date: 2026-11-22
tag: Software
minutes: 7
summary: Three API styles, one question each: who calls it, how much do they need, and how fast must it be? A practical decision guide with small examples of each.
---

I have built REST APIs for years in Laravel and CodeIgniter. This semester's *API-driven cloud-native solutions* course made me build the same small services in GraphQL (with Strawberry) and gRPC too. Doing all three side by side made the trade-offs much clearer than any comparison table. Here is how I now choose.

## REST: the default for public and simple APIs

REST maps resources to URLs and uses HTTP verbs for actions:

```http
GET  /books/42
POST /orders          { "book_id": 42, "qty": 1 }
```

**Pick it when:** the API is public or used by many unknown clients, the data has an obvious resource shape, and you want caching for free (HTTP caches, CDNs and browsers all understand `GET`).

**Watch out for:** over-fetching (the mobile app gets 40 fields to show 3) and under-fetching (one screen needs five calls). Both are fixable with sparse fieldsets (`?fields=id,title`) and a few purpose-built endpoints, so they're rarely a reason to leave REST on their own.

## GraphQL: one endpoint, the client chooses the shape

The client sends a query describing exactly what it wants:

```graphql
query {
  book(id: 42) {
    title
    author { name }
    reviews(last: 3) { rating }
  }
}
```

In Python, Strawberry lets you declare the schema as typed dataclasses, which felt natural after Pydantic:

```python
@strawberry.type
class Book:
    id: int
    title: str
    author: Author
```

**Pick it when:** you have several front-ends (web, Android, admin) that need different slices of the same data, and screens that combine many related objects.

**Watch out for:** the **N+1 problem** (fetching the author separately for each of 50 books; use a DataLoader to batch them), harder HTTP caching because everything is a `POST` to `/graphql`, and query cost: a client can ask for a very deep query, so set depth and complexity limits.

## gRPC: fast, typed calls between your own services

You define the contract in a `.proto` file and generate client and server code from it:

```proto
service Inventory {
  rpc Reserve (ReserveRequest) returns (ReserveReply);
}
message ReserveRequest { int32 book_id = 1; int32 qty = 2; }
message ReserveReply   { bool ok = 1; int32 left = 2; }
```

Messages are binary Protocol Buffers over HTTP/2, so they are smaller and faster than JSON, and both sides get compile-time types. It also supports streaming in either direction.

**Pick it when:** services you own talk to each other a lot (an order service calling inventory and payments), latency matters, or you need streaming.

**Watch out for:** browsers can't call gRPC directly (you need gRPC-Web or a REST gateway), the binary payloads are harder to debug with curl, and changing field numbers in a `.proto` breaks old clients. Only ever add new fields.

## My decision guide

| Question | Leans to |
|---|---|
| Public API, third-party developers? | REST |
| Many front-ends needing different data shapes? | GraphQL |
| Internal service-to-service, latency-sensitive? | gRPC |
| Need HTTP/CDN caching? | REST |
| Need streaming? | gRPC (or WebSockets) |

Real systems mix them. A common shape: **gRPC between internal microservices, and REST or GraphQL at the edge** for browsers and apps, behind an API gateway that handles auth, rate limits and logging in one place.

## The takeaway

Don't pick the style first. Ask who calls it, how much they need and how fast it must be. For most business apps I still start with REST, add GraphQL when the front-ends start fighting over response shapes, and use gRPC for the hot internal paths.
