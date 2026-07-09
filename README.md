# AWS Developer Associate Prep

A fun, fast way to study for the **AWS Certified Developer – Associate (DVA-C02)** exam — built with [Astro](https://astro.build) + React islands and Tailwind CSS.

## Features

- **Quiz Mode** — scored, multiple-choice questions across all four exam domains, with instant explanations after every answer.
- **Flashcards** — flip cards for fast recall of services, comparisons, and common gotchas.
- **Cheat Sheets** — bite-sized reference pages for the AWS services that show up most on the exam.
- **Progress tracking** — quiz accuracy, flashcard mastery, and a day streak, all tracked locally in your browser via `localStorage`. Nothing is sent to a server.

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check with `astro check` and build the static site to dist/
npm run preview   # preview the production build locally
```

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time repo setup: in **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served from `https://<owner>.github.io/aws-developer-associate-prep/` (see `site`/`base` in
[`astro.config.mjs`](astro.config.mjs)).
