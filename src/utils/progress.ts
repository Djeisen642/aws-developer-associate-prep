import type { Domain, DomainInfo } from '../data/types';

const STORAGE_KEY = 'aws-dva-progress-v1';

/** Leitner-box spaced repetition: box 1 = review again soon, box 5 = well-known. */
export const MAX_BOX = 5;
const BOX_INTERVAL_DAYS: Record<number, number> = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };

/** Single source of truth for the Smart Review deep-link, so it can't drift across files. */
export const SMART_REVIEW_QUERY = 'mode=smart';

export function isSmartReviewUrl(search: string): boolean {
  return new URLSearchParams(search).get('mode') === 'smart';
}

export interface QuestionRecord {
  attempts: number;
  correct: number;
  lastCorrect: boolean;
  lastAt: string;
  /** Leitner box (1-5). Missing on legacy records — treated as due now. */
  box?: number;
  /** ISO timestamp of when this question is next due for review. */
  dueAt?: string;
}

export interface FlashcardRecord {
  seen: number;
  knew: number;
  lastKnew: boolean;
  lastAt: string;
}

export interface ProgressState {
  quiz: Record<string, QuestionRecord>;
  flashcards: Record<string, FlashcardRecord>;
  sessionDates: string[];
}

function emptyState(): ProgressState {
  return { quiz: {}, flashcards: {}, sessionDates: [] };
}

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      quiz: parsed.quiz ?? {},
      flashcards: parsed.flashcards ?? {},
      sessionDates: parsed.sessionDates ?? [],
    };
  } catch {
    return emptyState();
  }
}

function saveProgress(state: ProgressState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function touchSession(state: ProgressState) {
  const today = todayKey();
  if (!state.sessionDates.includes(today)) {
    state.sessionDates.push(today);
  }
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function recordQuizAnswer(questionId: string, correct: boolean): ProgressState {
  const state = loadProgress();
  const existing = state.quiz[questionId];
  const prevBox = existing?.box ?? 1;
  const nextBox = correct ? Math.min(prevBox + 1, MAX_BOX) : 1;
  const now = new Date();

  state.quiz[questionId] = {
    attempts: (existing?.attempts ?? 0) + 1,
    correct: (existing?.correct ?? 0) + (correct ? 1 : 0),
    lastCorrect: correct,
    lastAt: now.toISOString(),
    box: nextBox,
    dueAt: addDays(now, BOX_INTERVAL_DAYS[nextBox]).toISOString(),
  };
  touchSession(state);
  saveProgress(state);
  return state;
}

export function recordFlashcardReview(cardId: string, knew: boolean): ProgressState {
  const state = loadProgress();
  const existing = state.flashcards[cardId] ?? { seen: 0, knew: 0, lastKnew: false, lastAt: '' };
  state.flashcards[cardId] = {
    seen: existing.seen + 1,
    knew: existing.knew + (knew ? 1 : 0),
    lastKnew: knew,
    lastAt: new Date().toISOString(),
  };
  touchSession(state);
  saveProgress(state);
  return state;
}

export function resetProgress(): ProgressState {
  const state = emptyState();
  saveProgress(state);
  return state;
}

/** Longest run of consecutive days (ending today or yesterday) the user has practiced. */
export function computeStreak(sessionDates: string[]): number {
  if (sessionDates.length === 0) return 0;
  const dates = new Set(sessionDates);
  const cursor = new Date();
  // If they haven't practiced today, streak can still count through yesterday.
  if (!dates.has(todayKey())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export interface DomainStats {
  domain: Domain;
  attempted: number;
  total: number;
  correct: number;
  accuracy: number;
}

export function computeDomainStats(
  state: ProgressState,
  questionsByDomain: Record<string, { id: string }[]>,
): DomainStats[] {
  return (Object.keys(questionsByDomain) as Domain[]).map((domain) => {
    const questions = questionsByDomain[domain] ?? [];
    let attempted = 0;
    let correct = 0;
    for (const q of questions) {
      const record = state.quiz[q.id];
      if (record) {
        attempted += 1;
        if (record.lastCorrect) correct += 1;
      }
    }
    return {
      domain,
      attempted,
      total: questions.length,
      correct,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    };
  });
}

export interface Readiness {
  /** Domain accuracy averaged and weighted by each domain's share of the real exam blueprint (0-100). */
  score: number;
  /** Fraction (0-1) of the entire question bank attempted so far — how much to trust `score`. */
  coverage: number;
}

/**
 * A simple average across domains misrepresents readiness because domains aren't
 * equally weighted on the real exam (e.g. Development is 32%, Troubleshooting is 18%).
 * This weights each attempted domain's accuracy by its exam blueprint share instead.
 * Domains with zero attempts are excluded rather than counted as 0%, since "not started"
 * and "started and struggling" should not look the same.
 */
export function computeReadiness(
  domainStats: DomainStats[],
  domains: DomainInfo[],
  totalQuestions: number,
  totalAttempted: number,
): Readiness | null {
  const attempted = domainStats.filter((d) => d.attempted > 0);
  if (attempted.length === 0) return null;

  const weightOf = new Map(domains.map((d) => [d.id, d.weight]));
  const totalWeight = attempted.reduce((sum, d) => sum + (weightOf.get(d.domain) ?? 0), 0);
  const weightedSum = attempted.reduce((sum, d) => sum + d.accuracy * (weightOf.get(d.domain) ?? 0), 0);

  return {
    score: totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0,
    coverage: totalQuestions > 0 ? totalAttempted / totalQuestions : 0,
  };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function dueRecords<T extends { id: string }>(state: ProgressState, questions: T[]): { q: T; box: number }[] {
  const now = Date.now();
  const due: { q: T; box: number }[] = [];
  for (const q of questions) {
    const record = state.quiz[q.id];
    if (!record) {
      due.push({ q, box: 1 }); // never seen — treat like a box-1 item, eager to include
      continue;
    }
    const dueAt = record.dueAt ? Date.parse(record.dueAt) : 0;
    if (dueAt <= now) {
      due.push({ q, box: record.box ?? 1 });
    }
  }
  return due;
}

/**
 * Questions that are due for spaced-repetition review right now: never-attempted
 * questions, plus previously-answered ones whose review interval has elapsed.
 * Weaker/overdue items are prioritized (lower box first), interleaved within each
 * priority tier via a shuffle so a review session isn't blocked by domain.
 */
export function getDueQuestions<T extends { id: string }>(state: ProgressState, questions: T[]): T[] {
  return shuffle(dueRecords(state, questions))
    .sort((a, b) => a.box - b.box) // Array.sort is stable (ES2019+), so the shuffle above still governs order within a box
    .map((d) => d.q);
}

/** Cheap count-only version of getDueQuestions — no shuffling or array building. */
export function computeDueCount(state: ProgressState, questions: { id: string }[]): number {
  const now = Date.now();
  let count = 0;
  for (const q of questions) {
    const record = state.quiz[q.id];
    if (!record || (record.dueAt ? Date.parse(record.dueAt) : 0) <= now) count += 1;
  }
  return count;
}
