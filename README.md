# attentionisallyouneed.in

A dependency-free PHP portfolio for Ravi Raj Ladha.

[![CI](https://github.com/ravirajladha/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ravirajladha/portfolio/actions/workflows/ci.yml)

## Run locally

Start Apache in XAMPP, then open `http://localhost/attentionisallyouneed.in/`.

## Contact email

The form posts to `send-contact.php`, validates the fields, and calls PHP's `mail()` function. Local XAMPP usually needs SMTP configured before it can deliver mail. On AWS, configure the server's mail transfer agent or replace `mail()` with Amazon SES/SMTP. Verify `ravirajladha@gmail.com` as an SES identity if the SES account is still in sandbox mode.

## Extend the site

Add new sections inside `<main>` in `index.php` and add the matching navigation link. Project cards can follow the existing `.skill-grid` or `.timeline` patterns.
