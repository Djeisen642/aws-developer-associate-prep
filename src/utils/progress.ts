import type { Domain } from '../data/types';

const STORAGE_KEY = 'aws-dva-progress-v1';

export interface QuestionRecord {
  attempts: number;
  correct: number;
  lastCorrect: boolean;
  lastAt: string;
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

export function recordQuizAnswer(questionId: string, correct: boolean): ProgressState {
  const state = loadProgress();
  const existing = state.quiz[questionId] ?? { attempts: 0, correct: 0, lastCorrect: false, lastAt: '' };
  state.quiz[questionId] = {
    attempts: existing.attempts + 1,
    correct: existing.correct + (correct ? 1 : 0),
    lastCorrect: correct,
    lastAt: new Date().toISOString(),
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
