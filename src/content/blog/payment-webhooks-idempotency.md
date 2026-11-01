---
title: Payment webhooks that never double-ship an order
date: 2026-09-14
tag: Software
minutes: 7
summary: Gateways retry. Networks duplicate. Lessons from high-volume e-commerce on verifying signatures and making every handler idempotent.
---

In high-volume e-commerce you learn one thing quickly: **everything happens twice**. Customers double-tap "Pay". Gateways retry webhooks when your server is slow. A queue worker crashes halfway and the job runs again. If your code assumes each event arrives exactly once, you will eventually ship two parcels for one payment, or mark a paid order as failed.

The fix is a property called **idempotency**: running the same operation twice has the same effect as running it once. Here is how I apply it to payment webhooks, using Razorpay and Laravel as the example. The ideas carry over to any gateway or stack.

## 1. Never trust the browser redirect alone

After checkout the customer is redirected back with a payment ID. That redirect can be lost (closed tab, bad network) or forged. Treat it as a hint to show a "processing" page. The source of truth is the **server-to-server webhook** or a direct API call to the gateway.

## 2. Verify the signature on the raw body

Anyone can POST to your webhook URL. Razorpay signs each webhook with HMAC-SHA256 using your webhook secret and sends the result in the `X-Razorpay-Signature` header. Verify it against the **raw** request body, before any JSON parsing changes the bytes:

```php
$payload   = $request->getContent();               // raw body
$signature = $request->header('X-Razorpay-Signature');
$expected  = hash_hmac('sha256', $payload, config('services.razorpay.webhook_secret'));

if (!hash_equals($expected, (string) $signature)) {
    abort(400, 'Invalid signature');
}
```

Use `hash_equals`, not `==`, so the comparison runs in constant time.

## 3. Record every event ID, uniquely

Gateways send a unique ID per event (Razorpay uses the `x-razorpay-event-id` header). Store it in a table with a **unique constraint** and let the database reject duplicates. That holds even when two retries arrive at the same millisecond on two servers:

```php
Schema::create('webhook_events', function (Blueprint $t) {
    $t->id();
    $t->string('provider');
    $t->string('event_id');
    $t->timestamp('processed_at')->nullable();
    $t->unique(['provider', 'event_id']);
});
```

```php
try {
    WebhookEvent::create(['provider' => 'razorpay', 'event_id' => $eventId]);
} catch (UniqueConstraintViolationException $e) {
    return response()->noContent();   // already seen: acknowledge, do nothing
}
```

> A check-then-insert ("if not exists, insert") is **not** safe under concurrency. Two requests can both pass the check. The unique index is what makes it safe.

## 4. Make the state change itself idempotent

Even with event de-duplication, two *different* events (say the redirect handler and the webhook) can try to mark the same order as paid. Guard the transition with a row lock and a state check inside a transaction:

```php
DB::transaction(function () use ($orderId, $paymentId) {
    $order = Order::whereKey($orderId)->lockForUpdate()->first();

    if ($order->status !== 'pending') {
        return;                        // already paid, cancelled or refunded
    }

    $order->update(['status' => 'paid', 'payment_id' => $paymentId]);
    CreateShipment::dispatch($order->id)->afterCommit();
});
```

Two details matter here. `lockForUpdate()` makes concurrent handlers wait their turn. `afterCommit()` means the shipment job is only queued if the transaction actually commits, so a rollback can't leave behind a parcel for an unpaid order.

## 5. Respond fast, work later

Gateways retry when you take too long to respond. Verify, record the event, update the order, return `200`, and push slow work (emails, invoices, shipping APIs) to a queue. Each of those jobs needs to be idempotent too: check "shipment already created?" before calling the courier API.

## 6. Reconcile daily

Webhooks can still be missed entirely, for example during a deploy or an outage. A small scheduled job that fetches the last 24–48 hours of payments from the gateway API and compares them with your orders will catch the gaps before customers notice.

## Takeaways

1. The webhook is the source of truth, not the redirect.
2. Verify signatures on the raw body with `hash_equals`.
3. De-duplicate event IDs with a unique index, not an if-check.
4. Guard order state with a row lock, and dispatch side effects after commit.
5. Reconcile against the gateway on a schedule.
