---
title: Making a slow MySQL-backed API fast without rewriting it
date: 2026-08-09
tag: Software
minutes: 9
summary: EXPLAIN first, indexes second, payloads third. A repeatable checklist I use on production REST APIs before reaching for caching or a new stack.
---

When an API endpoint gets slow, the usual instinct is to add a cache, add a server, or blame the framework. In my experience most slow endpoints come down to **one bad query and one oversized response**, and you can fix both in an afternoon without a rewrite. Here is the checklist I use on CodeIgniter and Laravel APIs backed by MySQL.

## 1. Measure before you touch anything

Turn on the slow query log in a staging copy (or production, briefly) with a low threshold, then hit the endpoint:

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.2;   -- seconds
SET GLOBAL log_queries_not_using_indexes = 'ON';
```

Also log total request time in the app. If the request takes 1.8 s but the queries add up to only 200 ms, the problem isn't the database. Look at N+1 loops, remote API calls or serialisation instead.

## 2. Read EXPLAIN like a detective

Take the worst query and prefix it with `EXPLAIN` (or `EXPLAIN ANALYZE` on MySQL 8.0.18+ for real timings):

```sql
EXPLAIN SELECT id, status, created_at
FROM inspections
WHERE branch_id = 42 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 20;
```

Three columns tell you most of the story:

- `type`: `ALL` means a full table scan. You want `ref`, `range` or `const`.
- `rows`: how many rows MySQL expects to examine. If it says 400,000 to return 20, that's your bug.
- `Extra`: `Using filesort` or `Using temporary` means sorting or grouping happens without an index.

## 3. Design the index for the query, not the column

A separate index on each column rarely helps. MySQL usually picks one. Build a **composite index** in this order: equality filters first, then the range or sort column.

```sql
ALTER TABLE inspections
  ADD INDEX idx_branch_status_created (branch_id, status, created_at);
```

Now the filter and the `ORDER BY` both use the index, and the filesort disappears. If the index also contains every selected column, it becomes a **covering index** and MySQL never touches the table rows (`Using index` in Extra).

> Common index killers: wrapping the column in a function (`WHERE DATE(created_at) = '2026-08-01'`), leading wildcards (`LIKE '%abc'`), and comparing a string column to a number, which forces implicit casts. Rewrite the first as a range: `created_at >= '2026-08-01' AND created_at < '2026-08-02'`.

## 4. Kill the N+1

An endpoint that lists 50 inspections and then queries photos for each one runs 51 queries. Fetch the children in one go with `WHERE inspection_id IN (...)` and group them in code. In Laravel, `with('photos')` does exactly this. In CodeIgniter you write the second query yourself. Either way, 51 round-trips become 2.

## 5. Stop paginating with big OFFSETs

`LIMIT 20 OFFSET 100000` still reads and throws away 100,000 rows. For feeds and infinite scroll, use **keyset pagination**: remember the last row you sent and continue from it.

```sql
SELECT id, status, created_at FROM inspections
WHERE branch_id = 42 AND (created_at, id) < ('2026-08-01 10:15:00', 98231)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## 6. Trim the payload

Once the query is fast, look at what you send. `SELECT *` on a table with JSON blobs or long text fields can turn a 5 KB response into 500 KB, and mobile clients feel every byte. Select only the fields the screen uses, return thumbnails rather than full image URLs in lists, and enable gzip in Nginx (`gzip on; gzip_types application/json;`).

## 7. Only now, consider caching

Caching a slow query hides the problem until the cache misses at the worst moment. After steps 1–6, cache what's genuinely expensive and rarely changes, such as reference data, dashboards and counts, with clear invalidation.

## Takeaways

1. Measure the request and the queries separately.
2. Use EXPLAIN. Watch `type`, `rows` and `Extra`.
3. Build composite indexes in this order: equality columns, then range/sort columns.
4. Batch child queries and use keyset pagination.
5. Send less data. Add caching last.
