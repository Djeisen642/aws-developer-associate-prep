/**
 * Study days are local calendar dates that roll over at STUDY_DAY_CUTOFF_HOUR, not at midnight and
 * never in UTC. `toISOString().slice(0, 10)` is a UTC date, which files an evening session in the
 * Americas under tomorrow and breaks the streak for anyone studying after dinner.
 */
export const STUDY_DAY_CUTOFF_HOUR = 4;

/** A local calendar date as `YYYY-MM-DD`. */
export type DayKey = string & { readonly __brand: 'DayKey' };

const DAY_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (value: number): string => value.toString().padStart(2, '0');

function keyFromDate(date: Date): DayKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` as DayKey;
}

export function isDayKey(value: unknown): value is DayKey {
  if (typeof value !== 'string') return false;
  const match = DAY_KEY_PATTERN.exec(value);
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day, 12);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

/** The study day an instant belongs to: its local date, or the previous one before the cutoff hour. */
export function getStudyDay(now: Date = new Date()): DayKey {
  const date = new Date(now.getTime());
  if (date.getHours() < STUDY_DAY_CUTOFF_HOUR) date.setDate(date.getDate() - 1);
  return keyFromDate(date);
}

/** Adds calendar days without assuming every local day is 24 hours (DST). Anchors at noon to dodge transitions. */
export function addDaysToKey(key: DayKey, amount: number): DayKey {
  const [year = 0, month = 0, day = 0] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12);
  date.setDate(date.getDate() + amount);
  return keyFromDate(date);
}
