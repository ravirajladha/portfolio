# attentionisallyouneed.in

Portfolio and blog of Ravi Raj Ladha: a React + Vite + TypeScript single-page app.

[![CI](https://github.com/ravirajladha/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ravirajladha/portfolio/actions/workflows/ci.yml)

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Edit content

- **Résumé content** (experience, sectors, skills, AI/ML, "Now" feed): `src/data/resume.ts`
- **Blog posts**: add a Markdown file to `src/content/blog/` with the front-matter shown in `src/lib/posts.ts`
- **Résumé PDF**: replace `public/Resume_Ravi_Raj_Ladha.pdf`
- **Styles**: `src/styles.css` · **Animations**: `src/components/Motion.tsx`

## Deploy

```bash
npm run build
scp -r dist/* secret-hair-care-staging:/tmp/portfolio-dist/
ssh secret-hair-care-staging 'sudo rsync -a --delete /tmp/portfolio-dist/ /var/www/resume/ && sudo chown -R www-data:www-data /var/www/resume'
```

Nginx serves `/var/www/resume` with `try_files $uri $uri/ /index.html;` so client-side routes like `/blog/<slug>` work on refresh.
