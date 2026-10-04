import { describe, expect, it } from 'vitest';
import { restoreTimezoneAfterEach, TIMEZONES } from '../test/helpers';
import { addDaysToKey, getStudyDay, isDayKey, STUDY_DAY_CUTOFF_HOUR, type DayKey } from './date';

restoreTimezoneAfterEach();

const key = (value: string) => value as DayKey;

describe.each(TIMEZONES)('getStudyDay in %s', (tz) => {
  it('uses the local date, not the UTC date', () => {
    process.env.TZ = tz;
    expect(new Date(2026, 9, 4, 21, 0).getHours()).toBe(21); // guards against TZ not applying to this runtime
    expect(getStudyDay(new Date(2026, 9, 4, 21, 0))).toBe('2026-10-04');
    expect(getStudyDay(new Date(2026, 9, 4, 8, 0))).toBe('2026-10-04');
  });

  it('rolls over at the cutoff hour, not midnight', () => {
    process.env.TZ = tz;
    expect(STUDY_DAY_CUTOFF_HOUR).toBe(4);
    expect(getStudyDay(new Date(2026, 9, 5, 0, 0))).toBe('2026-10-04');
    expect(getStudyDay(new Date(2026, 9, 5, 3, 59))).toBe('2026-10-04');
    expect(getStudyDay(new Date(2026, 9, 5, 4, 0))).toBe('2026-10-05');
  });

  it('crosses month and year boundaries before the cutoff', () => {
    process.env.TZ = tz;
    expect(getStudyDay(new Date(2026, 10, 1, 2, 0))).toBe('2026-10-31');
    expect(getStudyDay(new Date(2027, 0, 1, 3, 0))).toBe('2026-12-31');
    expect(getStudyDay(new Date(2028, 2, 1, 1, 0))).toBe('2028-02-29');
  });
});

describe('getStudyDay regression: UTC date keys', () => {
  it('files a 9 PM Eastern session under that evening, not the next UTC day', () => {
    process.env.TZ = 'America/New_York';
    const ninePm = new Date('2026-10-05T01:00:00Z'); // 9:00 PM EDT on Oct 4
    expect(ninePm.toISOString().slice(0, 10)).toBe('2026-10-05'); // what the old code recorded
    expect(getStudyDay(ninePm)).toBe('2026-10-04');
  });
});

describe.each(TIMEZONES)('addDaysToKey in %s', (tz) => {
  it('matches a UTC-based oracle for every day of two years, including DST changes', () => {
    process.env.TZ = tz;
    for (let n = 0; n < 800; n++) {
      const expected = new Date(Date.UTC(2025, 0, 1 + n)).toISOString().slice(0, 10);
      expect(addDaysToKey(key('2025-01-01'), n)).toBe(expected);
    }
  });
});

describe('addDaysToKey', () => {
  it('steps over the US DST transitions one calendar day at a time', () => {
    process.env.TZ = 'America/New_York';
    expect(addDaysToKey(key('2026-03-07'), 1)).toBe('2026-03-08'); // spring forward (23 hour day)
    expect(addDaysToKey(key('2026-03-08'), 1)).toBe('2026-03-09');
    expect(addDaysToKey(key('2026-10-31'), 1)).toBe('2026-11-01'); // fall back (25 hour day)
    expect(addDaysToKey(key('2026-11-01'), 1)).toBe('2026-11-02');
  });

  it('handles leap days, year ends, and negative amounts', () => {
    expect(addDaysToKey(key('2028-02-28'), 1)).toBe('2028-02-29');
    expect(addDaysToKey(key('2027-02-28'), 1)).toBe('2027-03-01');
    expect(addDaysToKey(key('2026-12-31'), 1)).toBe('2027-01-01');
    expect(addDaysToKey(key('2027-01-01'), -1)).toBe('2026-12-31');
    expect(addDaysToKey(key('2026-10-04'), 0)).toBe('2026-10-04');
  });
});

describe('isDayKey', () => {
  it('accepts real calendar dates', () => {
    expect(isDayKey('2026-10-04')).toBe(true);
    expect(isDayKey('2028-02-29')).toBe(true);
  });

  it('rejects malformed and impossible dates', () => {
    expect(isDayKey('2027-02-29')).toBe(false);
    expect(isDayKey('2026-02-30')).toBe(false);
    expect(isDayKey('2026-13-01')).toBe(false);
    expect(isDayKey('2026-1-1')).toBe(false);
    expect(isDayKey('2026-10-04T00:00:00Z')).toBe(false);
    expect(isDayKey('')).toBe(false);
    expect(isDayKey(20261004)).toBe(false);
    expect(isDayKey(null)).toBe(false);
  });
});
