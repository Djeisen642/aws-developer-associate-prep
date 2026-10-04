import type { QuizQuestion } from '../data/types';

/** Fisher-Yates on a copy. `rng` returns [0, 1) and exists so tests can be deterministic. */
function shuffleCopy<T>(items: readonly T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j] as T, copy[i] as T];
  }
  return copy;
}

/**
 * Returns the question with its choices in random order and `correctIndexes` remapped to match.
 *
 * Choices are authored in whatever order was convenient, and that order leaks: the bank has the correct
 * answer in slot B for two thirds of single-answer questions and never in slot D. Shuffling when a
 * quiz launches removes position as a signal for every current and future question. No explanation or
 * choice may refer to another choice by position ("option B", "both of the above").
 */
export function shuffleChoices(question: QuizQuestion, rng: () => number = Math.random): QuizQuestion {
  const order = shuffleCopy(
    question.choices.map((_, originalIndex) => originalIndex),
    rng,
  );
  const correct = new Set(question.correctIndexes);
  return {
    ...question,
    choices: order.map((originalIndex) => question.choices[originalIndex] as string),
    correctIndexes: order.flatMap((originalIndex, newIndex) => (correct.has(originalIndex) ? [newIndex] : [])),
  };
}
