import type { Domain, DomainInfo } from '../data/types';
import { addDaysToKey, getStudyDay, isDayKey } from './date';

export const PROGRESS_STORAGE_KEY = 'aws-dva-progress-v1';
const STORAGE_KEY = PROGRESS_STORAGE_KEY;
/** Where a blob we can't read is copied before it would be overwritten. */
const UNREADABLE_BACKUP_KEY = `${STORAGE_KEY}-unreadable-backup`;
/** Payload schema version. Saves written before versioning have no `version` field and count as 1. */
const SCHEMA_VERSION = 1;

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isCount = (value: unknown): value is number => Number.isInteger(value) && (value as number) >= 0;

const isTimestamp = (value: unknown): value is string => typeof value === 'string' && !Number.isNaN(Date.parse(value));

function isQuestionRecord(value: unknown): value is QuestionRecord {
  return (
    isRecord(value) &&
    isCount(value.attempts) &&
    isCount(value.correct) &&
    typeof value.lastCorrect === 'boolean' &&
    isTimestamp(value.lastAt) &&
    (value.box === undefined ||
      (Number.isInteger(value.box) && (value.box as number) >= 1 && (value.box as number) <= MAX_BOX)) &&
    // An unparseable dueAt would compare as NaN and the question would never come due again.
    (value.dueAt === undefined || isTimestamp(value.dueAt))
  );
}

function isFlashcardRecord(value: unknown): value is FlashcardRecord {
  return (
    isRecord(value) &&
    isCount(value.seen) &&
    isCount(value.knew) &&
    typeof value.lastKnew === 'boolean' &&
    isTimestamp(value.lastAt)
  );
}

/** Returns the saved progress, or null when the payload has an unsupported version or shape. */
export function parseProgress(raw: string): ProgressState | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;
  if (parsed.version !== undefined && parsed.version !== SCHEMA_VERSION) return null;

  const { quiz = {}, flashcards = {}, sessionDates = [] } = parsed;
  if (!isRecord(quiz) || !Object.values(quiz).every(isQuestionRecord)) return null;
  if (!isRecord(flashcards) || !Object.values(flashcards).every(isFlashcardRecord)) return null;
  if (!Array.isArray(sessionDates) || !sessionDates.every(isDayKey)) return null;

  return {
    quiz: quiz as Record<string, QuestionRecord>,
    flashcards: flashcards as Record<string, FlashcardRecord>,
    sessionDates: [...sessionDates],
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return (raw === null ? null : parseProgress(raw)) ?? emptyState();
  } catch {
    return emptyState();
  }
}

/**
 * A blob we can't read (newer app version, hand edit) would otherwise be replaced by the next save.
 * Copy it aside first. The first backup is kept; later ones don't clobber it.
 */
function preserveUnreadable(storage: Storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null || parseProgress(raw) !== null) return;
  if (storage.getItem(UNREADABLE_BACKUP_KEY) === null) storage.setItem(UNREADABLE_BACKUP_KEY, raw);
}

/** Never throws: storage can be full, blocked, or disabled, and a failed save shouldn't break answering a question. */
function saveProgress(state: ProgressState) {
  if (typeof window === 'undefined') return;
  try {
    preserveUnreadable(window.localStorage);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: SCHEMA_VERSION, ...state }));
  } catch (error) {
    console.warn('Could not save progress to localStorage; this answer will not be remembered.', error);
  }
}

function touchSession(state: ProgressState, now: Date) {
  const today = getStudyDay(now);
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
  touchSession(state, now);
  saveProgress(state);
  return state;
}

export function recordFlashcardReview(cardId: string, knew: boolean): ProgressState {
  const state = loadProgress();
  const existing = state.flashcards[cardId] ?? { seen: 0, knew: 0, lastKnew: false, lastAt: '' };
  const now = new Date();
  state.flashcards[cardId] = {
    seen: existing.seen + 1,
    knew: existing.knew + (knew ? 1 : 0),
    lastKnew: knew,
    lastAt: now.toISOString(),
  };
  touchSession(state, now);
  saveProgress(state);
  return state;
}

export function resetProgress(): ProgressState {
  const state = emptyState();
  saveProgress(state);
  return state;
}

/** Current run of consecutive study days, counting through yesterday if the user hasn't practiced yet today. */
export function computeStreak(sessionDates: string[], now: Date = new Date()): number {
  const days = new Set(sessionDates);
  let cursor = getStudyDay(now);
  if (!days.has(cursor)) cursor = addDaysToKey(cursor, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDaysToKey(cursor, -1);
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

/** The single definition of "due", shared by the session list and the badge count so they cannot disagree. */
function isDue(record: QuestionRecord | undefined, now: number): boolean {
  if (!record) return true; // never seen: treat like a box-1 item, eager to include
  return (record.dueAt ? Date.parse(record.dueAt) : 0) <= now;
}

function dueRecords<T extends { id: string }>(state: ProgressState, questions: T[]): { q: T; box: number }[] {
  const now = Date.now();
  const due: { q: T; box: number }[] = [];
  for (const q of questions) {
    const record = state.quiz[q.id];
    if (isDue(record, now)) due.push({ q, box: record?.box ?? 1 });
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
    if (isDue(state.quiz[q.id], now)) count += 1;
  }
  return count;
}
