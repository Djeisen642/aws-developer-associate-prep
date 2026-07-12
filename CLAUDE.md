Guidance for Claude Code when working in this repo.

## Project structure

Astro 7 + React islands + Tailwind v4. Fully static — no backend, no API routes, no database, no environment variables/secrets. Every page in `src/pages/*.astro` is prerendered at build time; only the interactive pieces (`Quiz`, `Flashcards`, `ProgressDashboard`) are React components hydrated client-side (`client:load`) from within `.astro` pages.

- **Deploys to GitHub Pages** on every push to `main` via `.github/workflows/deploy.yml`. There is **no CI on pull requests** — only this push-triggered deploy workflow, so a green PR doesn't mean anything ran; run `npm run build` yourself before calling work done. The site is served from a subpath (`base: '/aws-developer-associate-prep/'` in `astro.config.mjs`), so internal links must go through `import.meta.env.BASE_URL`, never a hardcoded leading `/`.
- **All content is static TypeScript data**, imported at build time:
  - `src/data/types.ts` — shared types, plus `DOMAINS`: the single source of truth for the four exam domains (id, label, exam weight %, color, icon). Anything needing domain metadata (dashboard bars, quiz filters, cheat-sheet badges) reads from here — don't hardcode domain labels/colors elsewhere.
  - `src/data/questions/{development,security,deployment,troubleshooting}.ts` + `index.ts` — the quiz bank (see "Quiz question quality bar" below). Split per domain to keep files small and diffs/merges manageable; `index.ts` concatenates them into `QUESTIONS` and derives `QUESTIONS_BY_DOMAIN`. `id` prefixes (`dev-`, `sec-`, `dep-`, `tr-`) are numbered sequentially per file — check the last existing number before adding new ones.
  - `src/data/flashcards.ts`, `src/data/cheatsheets.ts` — same "plain array of typed objects" pattern. Cheat sheets are statically routed by slug via `getStaticPaths()` in `src/pages/cheatsheets/[slug].astro`.
- **Progress tracking is entirely client-side** (`src/utils/progress.ts`): everything lives under one `localStorage` key (`aws-dva-progress-v1`); nothing is ever sent to a server, and the app has no way to know a real user's actual state — don't assume otherwise. Smart Review uses a Leitner-box spaced-repetition scheme (`box` 1–5, `dueAt` timestamps). If you touch this file, keep `computeDueCount` (cheap, no array building — used for the dashboard badge) and `getDueQuestions` (full due list, shuffled — used for the actual session) in sync, since a mismatch between the two is a visible bug (badge says N due, session serves a different N).
- `Quiz` supports single-answer and multi-answer ("Select N") questions via `correctIndexes.length`, and a `?mode=smart` deep link (`SMART_REVIEW_QUERY` / `isSmartReviewUrl` in `progress.ts`) that auto-launches Smart Review — but it does **not** read domain or question-count from the URL, only that one mode flag. Don't assume other query params do anything.

### Commands

```bash
npm run dev      # dev server
npm run build    # astro check (typecheck) + static build to dist/
npm run preview  # preview the production build
```

No test suite exists. Validation for question-bank changes is `npx astro check`, a full `npm run build`, and an ad hoc throwaway script that imports `QUESTIONS` and checks structural invariants (choice-count bounds, no duplicate IDs/choices, `correctIndexes` in range, "Select TWO" wording matches answer count, no accidental length bias — see below). Write one each time rather than trusting the diff by eye.

## Quiz question quality bar

Question data lives in `src/data/questions/{development,security,deployment,troubleshooting}.ts`, combined via `index.ts`. Each `QuizQuestion` has a `choices` array and `correctIndexes`.

**Never let answer length or level of detail signal correctness.** A past session wrote most of the bank with short noun-phrase distractors ("Long polling", "A dead-letter queue") next to a full-sentence correct answer. The result: the correct answer was the longest choice 65% of the time, against a ~25% baseline for 4-option questions — guessable without any AWS knowledge, and it teaches a habit that fails on the real exam. When writing or editing questions:

- Distractors must be full, plausible-sounding, *definitively wrong* statements at roughly the same length and detail level as the correct answer — not padding, but real wrong claims (a plausible misconception, a similar-but-wrong AWS feature, or an answer that violates a constraint stated in the question).
- If the correct answer needs a lot of nuance, keep the choice text itself concise and put the extra detail in `explanation` instead — that's shown only after answering, so it can't leak the answer through length.
- Before shipping a batch of new or edited questions, spot-check: is the correct answer noticeably longer than the other three across many questions? If distractors are consistently the shortest option, that's this bug resurfacing.
- After editing choices in bulk, it's worth writing a quick throwaway script (`correct choice length` vs `avg wrong choice length` per question) to confirm the bias hasn't crept back in before considering the work done.

## Fact-checking

This is exam-prep content people rely on to actually pass a certification — verify claims (API names, service limits, feature availability, current behavior) against real AWS documentation/behavior rather than asserting from memory, especially for newer or fast-changing services. When a new distractor is written, double check it isn't accidentally true (which would create a second correct answer).

## Exam scope

This targets the **AWS Certified Developer – Associate (DVA-C02)** exam specifically. Before adding content on a service or feature that isn't obviously Developer-Associate-level, check it against the current official exam guide's in-scope/out-of-scope lists — some real, useful AWS knowledge (e.g., AWS Organizations / Service Control Policies) is explicitly out of scope for this exam and belongs on a different certification instead.
