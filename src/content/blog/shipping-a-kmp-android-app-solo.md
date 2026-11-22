---
title: Shipping an Android app solo, without Android Studio on my laptop
date: 2026-11-22
tag: Software
minutes: 6
summary: How I build and ship Epoch, my AI/ML revision app: Kotlin Multiplatform, a FastAPI backend, APKs built by GitHub Actions and a self-hosted download page.
---

[Epoch](/epoch) is a revision app I'm building for myself and friends who are learning AI/ML alongside a job: short daily quizzes that remember what you got wrong. The constraint that shaped everything: the laptop I use most has **no Java and no Android SDK**. Here's how that still works.

## The stack

- **App:** Kotlin Multiplatform with Compose Multiplatform. Android first. The shared code means an iOS build later doesn't need a rewrite.
- **Backend:** FastAPI + PostgreSQL, with an admin panel. It stores accounts, progress sync and consented learning events.
- **Content:** a question bank written as validated Python files, exported into versioned **packs** that ship inside the app. That's why Epoch works offline.

## CI builds the APK

Every push to a release branch runs a GitHub Actions workflow that sets up the JDK and Android SDK, runs the tests and builds a signed release APK. The signing keystore lives in repository secrets, never in the repo. The laptop only needs Git and an editor.

This has an underrated benefit: the build is **reproducible**. If it builds in CI, it builds for everyone. There is no "works on my machine".

## Offline first, sync later

Questions ship inside the app, and every answer is written to a local database first. A sync job batches events to the API when the phone is online. The server treats each batch as idempotent (every event has a client-generated ID with a unique index), so a retry after a flaky metro connection never double-counts an answer. It's the same pattern I use for [payment webhooks](/blog/payment-webhooks-idempotency).

## Spaced repetition is the product

The point of the app is that it brings back what you are about to forget. Every answer becomes a learning event (question, correct or not, time taken). Today the scheduler is rule-based. The next step is to train models on those events, such as half-life regression and knowledge tracing, so the gap before a question comes back is learned per person instead of fixed.

## Distribution before the Play Store

Store review, listings and policies come later. For now, a self-hosted page serves `Epoch-latest.apk`, which always points at the newest build, from the same server as the API. Friends open one link and install. A small publish script copies the CI artefact to the server and updates the link.

## What I'd tell someone starting

1. **Let CI own the build** from day one, especially if your machine can't.
2. **Design for offline and retries** early. Idempotent sync is much easier to add at the start than later.
3. **Ship to five real users** before polishing. Their first-day confusion is the best backlog you'll get.

If you're learning AI/ML, [try Epoch](/epoch) and tell me which questions are wrong.
