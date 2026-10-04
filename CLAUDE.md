Guidance for Claude Code when working in this repo.

## Project structure

Astro 7 + React islands + Tailwind v4. Fully static — no backend, no API routes, no database, no environment variables/secrets. Every page in `src/pages/*.astro` is prerendered at build time; only the interactive pieces (`Quiz`, `Flashcards`, `ProgressDashboard`) are React components hydrated client-side (`client:load`) from within `.astro` pages.

- **Deploys to GitHub Pages** on every push to `main` via `.github/workflows/deploy.yml`. Pull requests run `.github/workflows/ci.yml` (`npm test`, then `npm run build`); the deploy workflow itself does not run tests, so don't merge a red PR. Run both locally before calling work done. The site is served from a subpath (`base: '/aws-developer-associate-prep/'` in `astro.config.mjs`), so internal links must go through `import.meta.env.BASE_URL`, never a hardcoded leading `/`.
- **All content is static TypeScript data**, imported at build time:
  - `src/data/types.ts` — shared types, plus `DOMAINS`: the single source of truth for the four exam domains (id, label, exam weight %, color, icon). Anything needing domain metadata (dashboard bars, quiz filters, cheat-sheet badges) reads from here — don't hardcode domain labels/colors elsewhere.
  - `src/data/questions/{development,security,deployment,troubleshooting}.ts` + `index.ts` — the quiz bank (see "Quiz question quality bar" below). Split per domain to keep files small and diffs/merges manageable; `index.ts` concatenates them into `QUESTIONS` and derives `QUESTIONS_BY_DOMAIN`. `id` prefixes (`dev-`, `sec-`, `dep-`, `tr-`) are numbered sequentially per file — check the last existing number before adding new ones.
  - `src/data/flashcards.ts`, `src/data/cheatsheets.ts` — same "plain array of typed objects" pattern. Cheat sheets are statically routed by slug via `getStaticPaths()` in `src/pages/cheatsheets/[slug].astro`.
- **Progress tracking is entirely client-side** (`src/utils/progress.ts`): everything lives under one `localStorage` key (`aws-dva-progress-v1`); nothing is ever sent to a server, and the app has no way to know a real user's actual state — don't assume otherwise. Smart Review uses a Leitner-box spaced-repetition scheme (`box` 1–5, `dueAt` timestamps). `computeDueCount` (cheap, no array building — dashboard badge) and `getDueQuestions` (full shuffled list — the actual session) both decide "due" through the one private `isDue`, because a mismatch is a visible bug (badge says N due, session serves a different N); keep it that way and don't re-inline the check.
  - **Day keys are local study days, never UTC.** `src/utils/date.ts` (`getStudyDay`, `addDaysToKey`) assigns an instant to its local calendar date, rolling over at 4 AM, and the streak and the once-a-day notification gate both use it. Never build a day key with `toISOString().slice(0, 10)`: that is a UTC date and files an evening session under tomorrow. Saves from before this change hold UTC-based keys; they were not migrated (the user's zone at write time is unknown), so a streak can be off by one day once.
  - **Persistence is validated and fails soft.** Saves carry `version: 1` (absent on older saves, treated as 1). `parseProgress` rejects an unknown version or shape, and `saveProgress` first copies such a blob to `aws-dva-progress-v1-unreadable-backup` (first copy kept) instead of silently overwriting it. Storage errors (quota, blocked) are caught so answering a question never throws. If you change the stored shape, bump the version and migrate, don't just widen the validator.
- `Quiz` supports single-answer and multi-answer ("Select N") questions via `correctIndexes.length`, and a `?mode=smart` deep link (`SMART_REVIEW_QUERY` / `isSmartReviewUrl` in `progress.ts`) that auto-launches Smart Review — but it does **not** read domain or question-count from the URL, only that one mode flag. Don't assume other query params do anything.

### Commands

```bash
npm run dev      # dev server
npm run build    # astro check (typecheck) + static build to dist/
npm run preview  # preview the production build
npm test         # vitest: question-bank invariants plus date/progress/shuffle/notification logic
```

Tests live next to the code as `src/**/*.test.ts` (vitest, no globals, no DOM; `window.localStorage` is stubbed by `src/test/helpers.ts`). `src/data/questions/questions.test.ts` encodes the question-bank invariants: unique, per-file ascending ids, 4–6 distinct choices, `correctIndexes` valid, "Select N" wording matches the answer count, no choice or explanation refers to another choice by position, plus ceilings on the length bias below. Validation for any content change is `npm test`, `npx astro check`, and a full `npm run build`. Date and streak logic is tested in six timezones (each test sets `process.env.TZ`; `restoreTimezoneAfterEach` in the helpers puts it back).

## Quiz question quality bar

Question data lives in `src/data/questions/{development,security,deployment,troubleshooting}.ts`, combined via `index.ts`. Each `QuizQuestion` has a `choices` array and `correctIndexes`.

**Never let answer length or level of detail signal correctness.** A past session wrote most of the bank with short noun-phrase distractors ("Long polling", "A dead-letter queue") next to a full-sentence correct answer. The result: the correct answer was the longest choice 65% of the time, against a ~25% baseline for 4-option questions — guessable without any AWS knowledge, and it teaches a habit that fails on the real exam. When writing or editing questions:

- Distractors must be full, plausible-sounding, *definitively wrong* statements at roughly the same length and detail level as the correct answer — not padding, but real wrong claims (a plausible misconception, a similar-but-wrong AWS feature, or an answer that violates a constraint stated in the question).
- If the correct answer needs a lot of nuance, keep the choice text itself concise and put the extra detail in `explanation` instead — that's shown only after answering, so it can't leak the answer through length.
- `questions.test.ts` enforces ceilings on this (correct answer longest in at most 48% of single-answer four-choice questions, mean correct/distractor length ratio at most 1.35). They are ratchets, not targets: the bank is still at about 47% and 1.33 against an unbiased ~25% and 1.0. Lower the ceilings as questions are rewritten; never raise them to get a batch through. A new batch of questions should land near 25%, not at the ceiling.
- **Position is not a signal, because `Quiz` shuffles choices when a deck launches** (`shuffleChoices` in `src/utils/quiz.ts`, which remaps `correctIndexes`). The authored order used to leak badly (answer B in two thirds of single-answer questions, never D). Because of the shuffle, a choice or explanation must never say "option B" or "all of the above"; the test rejects it.

## Fact-checking

This is exam-prep content people rely on to actually pass a certification — verify claims (API names, service limits, feature availability, current behavior) against real AWS documentation/behavior rather than asserting from memory, especially for newer or fast-changing services. When a new distractor is written, double check it isn't accidentally true (which would create a second correct answer).

## Exam scope

This targets the **AWS Certified Developer – Associate (DVA-C02)** exam specifically. Before adding content on a service or feature that isn't obviously Developer-Associate-level, check it against the current official exam guide's in-scope/out-of-scope lists — some real, useful AWS knowledge (e.g., AWS Organizations / Service Control Policies) is explicitly out of scope for this exam and belongs on a different certification instead.
