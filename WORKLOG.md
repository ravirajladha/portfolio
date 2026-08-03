# Client Work Log — Portfolio Website

Project: `attentionisallyouneed.in`  
Repository: https://github.com/ravirajladha/portfolio  
Client: ____________________  
Prepared by: ____________________

This document records work completed for client billing. Add the agreed rate and actual time spent before issuing an invoice.

## 3 August 2026 — Portfolio design and development

### Requirements and content

- Reviewed and extracted relevant content from the supplied résumé.
- Identified professional summary, employment history, technical skills, education, contact details, and measurable career highlights.
- Chose a dependency-free PHP, CSS, and JavaScript structure suitable for XAMPP and future AWS hosting.
- Created a dedicated project directory named `attentionisallyouneed.in` without changing other local websites.

### Website implementation

- Designed and built a responsive one-page personal portfolio.
- Created hero, about, experience, technical skills, education, and contact sections.
- Added résumé viewing/download support.
- Added responsive desktop and mobile navigation.
- Added mobile, tablet, and desktop layout styling.
- Structured the source so additional portfolio and content sections can be added later.
- Added basic SEO metadata and accessible navigation labels.

### Contact form

- Built a PHP contact form targeting `ravirajladha@gmail.com`.
- Added required-field and email-address validation.
- Added input-length limits and email-header injection protection.
- Added a honeypot field for basic spam protection.
- Added success and failure feedback states.
- Documented the requirement to configure PHP mail, SMTP, or Amazon SES on the hosting server.

### Documentation and verification

- Added setup, extension, and AWS email-delivery guidance to `README.md`.
- Validated both PHP files using the PHP syntax checker.
- Verified the site responds successfully through the local Apache server with HTTP 200.
- Preserved the supplied résumé in the deployable project.

Billable time: ______ hours  
Rate: ______________  
Line total: _________

## 3 August 2026 — Source control and CI pipeline

- Initialized a standalone Git repository using `main` as the default branch.
- Added an appropriate `.gitignore` file.
- Created a GitHub Actions continuous-integration workflow.
- Configured CI to check every PHP file for syntax errors on pushes and pull requests to `main`.
- Created the public GitHub repository `ravirajladha/portfolio`.
- Committed and pushed the complete portfolio source and résumé.
- Verified the initial GitHub Actions run completed successfully.
- Left automatic server deployment unconfigured for the client to handle later.

Billable time: ______ hours  
Rate: ______________  
Line total: _________

## 4 August 2026 — Project administration

- Created this work log to maintain an auditable billing record for the ticket.
- Stored the record with the project source for version history and future updates.

Billable time: ______ hours  
Rate: ______________  
Line total: _________

## Billing summary

| Work category | Hours | Rate | Amount |
| --- | ---: | ---: | ---: |
| Requirements, design, and development | _____ | _____ | _____ |
| Contact form and verification | _____ | _____ | _____ |
| GitHub repository and CI pipeline | _____ | _____ | _____ |
| Project administration | _____ | _____ | _____ |
| **Total** | **_____** |  | **_____** |

## Current deliverables

- Responsive portfolio website
- PHP contact form
- Résumé download
- Project documentation
- GitHub repository
- GitHub Actions CI workflow
- Client billing work log

## Future work not yet completed

The following items are outside the completed scope and should be logged separately if requested:

- AWS server provisioning or configuration
- Domain and DNS configuration
- SSL certificate setup
- Automatic deployment pipeline
- Amazon SES or SMTP configuration and production email testing
- Additional portfolio projects or website sections
- Analytics, CMS, database, or admin panel
