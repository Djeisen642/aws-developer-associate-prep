import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../data/questions';
import type { QuizQuestion } from '../data/types';
import { seededRandom } from '../test/helpers';
import { shuffleChoices } from './quiz';

const single: QuizQuestion = {
  id: 'x-1',
  domain: 'development',
  question: 'Pick the right one.',
  choices: ['wrong a', 'right', 'wrong b', 'wrong c'],
  correctIndexes: [1],
  explanation: 'Because.',
};

const multi: QuizQuestion = {
  id: 'x-2',
  domain: 'security',
  question: 'Select TWO.',
  choices: ['right one', 'wrong a', 'right two', 'wrong b', 'wrong c'],
  correctIndexes: [0, 2],
  explanation: 'Because.',
};

const correctTexts = (q: QuizQuestion) => q.correctIndexes.map((i) => q.choices[i]).sort();

describe('shuffleChoices', () => {
  it('does not mutate its input', () => {
    const copy = structuredClone(single);
    shuffleChoices(single, seededRandom(1));
    expect(single).toEqual(copy);
  });

  it('keeps every choice and the same correct answers, for every question in the bank', () => {
    const rand = seededRandom(7);
    for (const question of QUESTIONS) {
      for (let round = 0; round < 5; round++) {
        const shuffled = shuffleChoices(question, rand);
        expect([...shuffled.choices].sort()).toEqual([...question.choices].sort());
        expect(correctTexts(shuffled)).toEqual(correctTexts(question));
        expect(shuffled.correctIndexes).toHaveLength(question.correctIndexes.length);
        expect(shuffled.correctIndexes).toEqual([...shuffled.correctIndexes].sort((a, b) => a - b));
        expect({ ...shuffled, choices: [], correctIndexes: [] }).toEqual({ ...question, choices: [], correctIndexes: [] });
      }
    }
  });

  it('spreads a single correct answer evenly across all positions', () => {
    const rand = seededRandom(42);
    const rounds = 4000;
    const hits = [0, 0, 0, 0];
    for (let i = 0; i < rounds; i++) hits[shuffleChoices(single, rand).correctIndexes[0] as number]!++;
    for (const count of hits) expect(count / rounds).toBeGreaterThan(0.22);
    for (const count of hits) expect(count / rounds).toBeLessThan(0.28);
  });

  it('spreads multi-answer positions without ever reusing or dropping an index', () => {
    const rand = seededRandom(99);
    const seen = new Set<number>();
    for (let i = 0; i < 500; i++) {
      const { correctIndexes } = shuffleChoices(multi, rand);
      expect(new Set(correctIndexes).size).toBe(2);
      correctIndexes.forEach((index) => seen.add(index));
    }
    expect([...seen].sort()).toEqual([0, 1, 2, 3, 4]);
  });
});
