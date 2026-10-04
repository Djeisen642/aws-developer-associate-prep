import { describe, expect, it } from 'vitest';
import { DOMAINS, type Domain, type QuizQuestion } from '../types';
import { QUESTIONS, QUESTIONS_BY_DOMAIN } from './index';
import { DEPLOYMENT_QUESTIONS } from './deployment';
import { DEVELOPMENT_QUESTIONS } from './development';
import { SECURITY_QUESTIONS } from './security';
import { TROUBLESHOOTING_QUESTIONS } from './troubleshooting';

const BANKS: { domain: Domain; prefix: string; questions: QuizQuestion[] }[] = [
  { domain: 'development', prefix: 'dev', questions: DEVELOPMENT_QUESTIONS },
  { domain: 'security', prefix: 'sec', questions: SECURITY_QUESTIONS },
  { domain: 'deployment', prefix: 'dep', questions: DEPLOYMENT_QUESTIONS },
  { domain: 'troubleshooting', prefix: 'tr', questions: TROUBLESHOOTING_QUESTIONS },
];

const MIN_CHOICES = 4;
const MAX_CHOICES = 6;
const COUNT_WORDS: Record<number, string> = { 2: 'TWO', 3: 'THREE', 4: 'FOUR' };

describe.each(BANKS)('$domain question file', ({ domain, prefix, questions }) => {
  it('only contains questions for its own domain', () => {
    for (const q of questions) expect(q.domain, q.id).toBe(domain);
  });

  it(`uses ${prefix}-N ids that only ever increase, so a new question can't inherit an old one's saved progress`, () => {
    const numbers = questions.map((q) => {
      const match = new RegExp(`^${prefix}-(\\d+)$`).exec(q.id);
      expect(match, `${q.id} should look like ${prefix}-N`).not.toBeNull();
      return Number(match?.[1]);
    });
    numbers.forEach((n, i) => {
      if (i > 0) expect(n, questions[i]?.id).toBeGreaterThan(numbers[i - 1] as number);
    });
  });
});

describe('question bank', () => {
  it('has globally unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('combines every file and covers every exam domain', () => {
    expect(QUESTIONS).toHaveLength(BANKS.reduce((sum, b) => sum + b.questions.length, 0));
    for (const { id } of DOMAINS) expect(QUESTIONS_BY_DOMAIN[id]?.length, id).toBeGreaterThan(0);
  });

  it(`gives each question ${MIN_CHOICES}-${MAX_CHOICES} distinct, non-empty choices`, () => {
    for (const q of QUESTIONS) {
      expect(q.choices.length, q.id).toBeGreaterThanOrEqual(MIN_CHOICES);
      expect(q.choices.length, q.id).toBeLessThanOrEqual(MAX_CHOICES);
      const normalized = q.choices.map((c) => c.trim().toLowerCase());
      expect(normalized.every((c) => c !== ''), `${q.id} has an empty choice`).toBe(true);
      expect(new Set(normalized).size, `${q.id} has duplicate choices`).toBe(q.choices.length);
    }
  });

  it('has valid correctIndexes: non-empty, unique, in range, and not every choice', () => {
    for (const q of QUESTIONS) {
      const { correctIndexes: correct, choices } = q;
      expect(correct.length, q.id).toBeGreaterThan(0);
      expect(correct.length, q.id).toBeLessThan(choices.length);
      expect(new Set(correct).size, `${q.id} repeats an index`).toBe(correct.length);
      for (const index of correct) {
        expect(Number.isInteger(index) && index >= 0 && index < choices.length, `${q.id} index ${index}`).toBe(true);
      }
    }
  });

  it('words "Select N" to match the number of correct answers', () => {
    for (const q of QUESTIONS) {
      const wording = /\bselect (two|three|four)\b/i.exec(q.question)?.[1]?.toUpperCase();
      if (q.correctIndexes.length > 1) {
        expect(wording, `${q.id} has ${q.correctIndexes.length} answers but no "Select N" wording`).toBe(
          COUNT_WORDS[q.correctIndexes.length],
        );
      } else {
        expect(wording, `${q.id} says "Select ${wording}" but has a single answer`).toBeUndefined();
      }
    }
  });

  it('never refers to a choice by position, because choices are shuffled when a quiz starts', () => {
    const positional = /\b(option|choice|answer)s? [A-E]\b|\b(all|none|both|neither) of the (above|options|choices)\b/i;
    for (const q of QUESTIONS) {
      for (const text of [...q.choices, q.explanation]) {
        expect(text, q.id).not.toMatch(positional);
      }
    }
  });

  it('has an explanation and question text for every question', () => {
    for (const q of QUESTIONS) {
      expect(q.question.trim(), q.id).not.toBe('');
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(20);
    }
  });
});

describe('answer length as a signal (see "Quiz question quality bar" in CLAUDE.md)', () => {
  // Single-answer, four-choice questions: guessing "the longest one" should win about 25% of the time.
  const fourChoice = QUESTIONS.filter((q) => q.correctIndexes.length === 1 && q.choices.length === 4);

  function lengthStats(questions: QuizQuestion[]) {
    let longest = 0;
    let ratioSum = 0;
    for (const q of questions) {
      const correctIndex = q.correctIndexes[0] as number;
      const correctLength = (q.choices[correctIndex] as string).length;
      const wrongLengths = q.choices.filter((_, i) => i !== correctIndex).map((c) => c.length);
      if (correctLength > Math.max(...wrongLengths)) longest++;
      ratioSum += correctLength / (wrongLengths.reduce((a, b) => a + b, 0) / wrongLengths.length);
    }
    return { longestShare: longest / questions.length, meanRatio: ratioSum / questions.length };
  }

  // Ceilings that stop the bias getting worse, not targets. Measured today: correct answer longest in
  // 46.9% of 162 questions (76; 5 more tie), mean correct/distractor length ratio 1.33. Both are well above the
  // 25% / 1.0 you'd expect from unbiased questions, so ratchet these down as questions are rewritten and
  // never raise them to land a batch.
  const MAX_LONGEST_SHARE = 0.48;
  const MAX_MEAN_RATIO = 1.35;

  it('does not let the correct answer be the longest choice more often than the current ceiling', () => {
    const { longestShare } = lengthStats(fourChoice);
    expect(longestShare).toBeLessThanOrEqual(MAX_LONGEST_SHARE);
  });

  it('does not let the correct answer be much longer than the distractors on average', () => {
    const { meanRatio } = lengthStats(fourChoice);
    expect(meanRatio).toBeLessThanOrEqual(MAX_MEAN_RATIO);
  });

  it.todo('has the correct answer longest in at most ~35% of four-choice questions (currently ~47%)');
});
