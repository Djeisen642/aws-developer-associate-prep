Guidance for Claude Code when working in this repo.

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
