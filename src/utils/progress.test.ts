import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installWindow, restoreTimezoneAfterEach, seededRandom, TIMEZONES } from '../test/helpers';
import {
  computeDueCount,
  computeStreak,
  getDueQuestions,
  loadProgress,
  parseProgress,
  PROGRESS_STORAGE_KEY,
  recordFlashcardReview,
  recordQuizAnswer,
  resetProgress,
  type ProgressState,
  type QuestionRecord,
} from './progress';

const BACKUP_KEY = `${PROGRESS_STORAGE_KEY}-unreadable-backup`;
const DAY_MS = 24 * 60 * 60 * 1000;

restoreTimezoneAfterEach();

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function questionRecord(overrides: Partial<QuestionRecord> = {}): QuestionRecord {
  return { attempts: 1, correct: 1, lastCorrect: true, lastAt: '2026-10-01T12:00:00.000Z', ...overrides };
}

function stateWith(quiz: Record<string, QuestionRecord>): ProgressState {
  return { quiz, flashcards: {}, sessionDates: [] };
}

describe.each(TIMEZONES)('study streak in %s', (tz) => {
  beforeEach(() => {
    process.env.TZ = tz;
    installWindow();
  });

  it('files an evening session under that evening', () => {
    vi.setSystemTime(new Date(2026, 9, 4, 21, 0));
    const state = recordQuizAnswer('q1', true);
    expect(state.sessionDates).toEqual(['2026-10-04']);
    expect(computeStreak(state.sessionDates)).toBe(1);
  });

  it('files a session before the 4 AM cutoff under the previous study day', () => {
    vi.setSystemTime(new Date(2026, 9, 5, 1, 0));
    expect(recordFlashcardReview('c1', true).sessionDates).toEqual(['2026-10-04']);
  });

  it('counts an evening session and the next morning as two days', () => {
    vi.setSystemTime(new Date(2026, 9, 4, 21, 0));
    recordQuizAnswer('q1', true);
    vi.setSystemTime(new Date(2026, 9, 5, 8, 0));
    const state = recordQuizAnswer('q2', false);
    expect(state.sessionDates).toEqual(['2026-10-04', '2026-10-05']);
    expect(computeStreak(state.sessionDates)).toBe(2);
  });

  it('records one entry per study day however many sessions happen', () => {
    vi.setSystemTime(new Date(2026, 9, 4, 9, 0));
    recordQuizAnswer('q1', true);
    vi.setSystemTime(new Date(2026, 9, 4, 22, 30));
    expect(recordQuizAnswer('q2', true).sessionDates).toEqual(['2026-10-04']);
  });

  it('keeps the streak alive through yesterday, then drops it after a missed day', () => {
    const dates = ['2026-10-01', '2026-10-02', '2026-10-03'];
    vi.setSystemTime(new Date(2026, 9, 3, 12, 0));
    expect(computeStreak(dates)).toBe(3);
    vi.setSystemTime(new Date(2026, 9, 4, 12, 0)); // nothing yet today
    expect(computeStreak(dates)).toBe(3);
    vi.setSystemTime(new Date(2026, 9, 5, 12, 0)); // a whole day missed
    expect(computeStreak(dates)).toBe(0);
  });

  it('only counts the unbroken run ending now', () => {
    vi.setSystemTime(new Date(2026, 9, 10, 12, 0));
    expect(computeStreak(['2026-10-01', '2026-10-02', '2026-10-08', '2026-10-09', '2026-10-10'])).toBe(3);
  });

  it('is not broken by a DST change', () => {
    vi.setSystemTime(new Date(2026, 10, 2, 12, 0));
    expect(computeStreak(['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02'])).toBe(4); // US fall back
    vi.setSystemTime(new Date(2026, 2, 9, 12, 0));
    expect(computeStreak(['2026-03-07', '2026-03-08', '2026-03-09'])).toBe(3); // US spring forward
  });

  it('is zero with no sessions', () => {
    expect(computeStreak([])).toBe(0);
  });
});

describe('persistence', () => {
  it('round-trips progress and tags the payload with a schema version', () => {
    const storage = installWindow();
    vi.setSystemTime(new Date('2026-10-04T12:00:00Z'));
    recordQuizAnswer('q1', true);
    recordFlashcardReview('c1', false);

    const loaded = loadProgress();
    expect(loaded.quiz.q1?.attempts).toBe(1);
    expect(loaded.flashcards.c1?.knew).toBe(0);
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) as string).version).toBe(1);
  });

  it('loads saves written before versioning, including records without box or dueAt', () => {
    const storage = installWindow();
    storage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        quiz: { q1: questionRecord() },
        flashcards: { c1: { seen: 2, knew: 1, lastKnew: true, lastAt: '2026-10-01T12:00:00.000Z' } },
        sessionDates: ['2026-10-01'],
      }),
    );
    const loaded = loadProgress();
    expect(Object.keys(loaded.quiz)).toEqual(['q1']);
    expect(loaded.sessionDates).toEqual(['2026-10-01']);
  });

  it('tolerates a payload with missing sections', () => {
    expect(parseProgress('{}')).toEqual({ quiz: {}, flashcards: {}, sessionDates: [] });
  });

  it.each([
    ['invalid JSON', '{nope'],
    ['JSON null', 'null'],
    ['a JSON array', '[]'],
    ['a newer schema version', JSON.stringify({ version: 2, quiz: {} })],
    ['quiz as an array', JSON.stringify({ quiz: [] })],
    ['a record missing fields', JSON.stringify({ quiz: { q1: { attempts: 1 } } })],
    ['a negative attempt count', JSON.stringify({ quiz: { q1: questionRecord({ attempts: -1 }) } })],
    ['a box outside 1-5', JSON.stringify({ quiz: { q1: questionRecord({ box: 9 }) } })],
    ['a dueAt that is not a date', JSON.stringify({ quiz: { q1: questionRecord({ dueAt: 'soon' }) } })],
    ['a malformed session date', JSON.stringify({ sessionDates: ['2026-10-04T00:00:00Z'] })],
    ['an impossible session date', JSON.stringify({ sessionDates: ['2026-02-30'] })],
    ['flashcards as a string', JSON.stringify({ flashcards: 'x' })],
  ])('rejects %s', (_label, raw) => {
    expect(parseProgress(raw)).toBeNull();
  });

  it('treats unreadable saved data as empty rather than throwing', () => {
    installWindow().setItem(PROGRESS_STORAGE_KEY, '{nope');
    expect(loadProgress()).toEqual({ quiz: {}, flashcards: {}, sessionDates: [] });
  });

  it('copies unreadable data aside before the next save overwrites it, and keeps the first copy', () => {
    const storage = installWindow();
    const newerVersion = JSON.stringify({ version: 2, quiz: { q1: { somethingNew: true } } });
    storage.setItem(PROGRESS_STORAGE_KEY, newerVersion);

    recordQuizAnswer('q1', true);
    expect(storage.getItem(BACKUP_KEY)).toBe(newerVersion);
    expect(parseProgress(storage.getItem(PROGRESS_STORAGE_KEY) as string)).not.toBeNull();

    storage.setItem(PROGRESS_STORAGE_KEY, '{another unreadable blob');
    recordQuizAnswer('q2', true);
    expect(storage.getItem(BACKUP_KEY)).toBe(newerVersion);
  });

  it('does not create a backup when the saved data is fine', () => {
    const storage = installWindow();
    recordQuizAnswer('q1', true);
    recordQuizAnswer('q2', true);
    expect(storage.getItem(BACKUP_KEY)).toBeNull();
  });

  it('keeps working when saving fails', () => {
    const storage = installWindow();
    vi.spyOn(storage, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError');
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const state = recordQuizAnswer('q1', true);
    expect(state.quiz.q1?.attempts).toBe(1);
    expect(warn).toHaveBeenCalledOnce();
    expect(() => resetProgress()).not.toThrow();
  });

  it('keeps working when localStorage is blocked entirely', () => {
    vi.stubGlobal('window', {
      get localStorage(): Storage {
        throw new DOMException('denied', 'SecurityError');
      },
    });
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    expect(loadProgress()).toEqual({ quiz: {}, flashcards: {}, sessionDates: [] });
    expect(recordQuizAnswer('q1', true).quiz.q1?.attempts).toBe(1);
  });
});

describe('Leitner scheduling', () => {
  beforeEach(() => {
    process.env.TZ = 'UTC';
    installWindow();
    vi.setSystemTime(new Date('2026-10-04T12:00:00Z'));
  });

  it('promotes on each correct answer with growing intervals and caps at box 5', () => {
    const expected = [
      { box: 2, days: 1 },
      { box: 3, days: 3 },
      { box: 4, days: 7 },
      { box: 5, days: 16 },
      { box: 5, days: 16 },
    ];
    for (const { box, days } of expected) {
      const record = recordQuizAnswer('q1', true).quiz.q1 as QuestionRecord;
      expect(record.box).toBe(box);
      expect(Date.parse(record.dueAt as string) - Date.now()).toBe(days * DAY_MS);
    }
  });

  it('sends a wrong answer back to box 1, due immediately', () => {
    recordQuizAnswer('q1', true);
    recordQuizAnswer('q1', true);
    const record = recordQuizAnswer('q1', false).quiz.q1 as QuestionRecord;
    expect(record.box).toBe(1);
    expect(record.attempts).toBe(3);
    expect(record.correct).toBe(2);
    expect(computeDueCount(loadProgress(), [{ id: 'q1' }])).toBe(1);
  });
});

describe('due questions', () => {
  const NOW = new Date('2026-10-04T12:00:00Z');
  const ids = Array.from({ length: 40 }, (_, i) => ({ id: `q${i}` }));

  function randomRecord(rand: () => number): QuestionRecord | undefined {
    const roll = rand();
    if (roll < 0.25) return undefined; // never seen
    const box = 1 + Math.floor(rand() * 5);
    if (roll < 0.4) return questionRecord({ box }); // legacy record, no dueAt
    const offsetDays = Math.floor(rand() * 21) - 10;
    if (roll < 0.5) return questionRecord({ box, dueAt: NOW.toISOString() }); // due exactly now
    return questionRecord({ box, dueAt: new Date(NOW.getTime() + offsetDays * DAY_MS).toISOString() });
  }

  it('reports the same number the review session serves, across many random states', () => {
    vi.setSystemTime(NOW);
    const rand = seededRandom(20261004);
    for (let run = 0; run < 300; run++) {
      const quiz: Record<string, QuestionRecord> = {};
      for (const { id } of ids) {
        const record = randomRecord(rand);
        if (record) quiz[id] = record;
      }
      const state = stateWith(quiz);
      const due = getDueQuestions(state, ids);
      expect(computeDueCount(state, ids)).toBe(due.length);
      expect(new Set(due.map((q) => q.id)).size).toBe(due.length);
    }
  });

  it('serves never-seen, legacy, and elapsed questions, and skips future ones', () => {
    vi.setSystemTime(NOW);
    const state = stateWith({
      legacy: questionRecord({ box: 3 }),
      elapsed: questionRecord({ box: 2, dueAt: new Date(NOW.getTime() - DAY_MS).toISOString() }),
      future: questionRecord({ box: 4, dueAt: new Date(NOW.getTime() + DAY_MS).toISOString() }),
    });
    const pool = [{ id: 'fresh' }, { id: 'legacy' }, { id: 'elapsed' }, { id: 'future' }];
    expect(
      getDueQuestions(state, pool)
        .map((q) => q.id)
        .sort(),
    ).toEqual(['elapsed', 'fresh', 'legacy']);
    expect(computeDueCount(state, pool)).toBe(3);
  });

  it('puts weaker boxes first', () => {
    vi.setSystemTime(NOW);
    const past = new Date(NOW.getTime() - DAY_MS).toISOString();
    const state = stateWith({
      b5: questionRecord({ box: 5, dueAt: past }),
      b3: questionRecord({ box: 3, dueAt: past }),
      b1: questionRecord({ box: 1, dueAt: past }),
      b4: questionRecord({ box: 4, dueAt: past }),
    });
    const order = getDueQuestions(state, [{ id: 'b5' }, { id: 'b3' }, { id: 'b1' }, { id: 'b4' }]).map((q) => q.id);
    expect(order).toEqual(['b1', 'b3', 'b4', 'b5']);
  });
});
