import { afterEach, vi } from 'vitest';

/** Zones with and without DST, behind and ahead of UTC, plus a half-hour offset. */
export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Kolkata',
  'Pacific/Auckland',
] as const;

/** Call at the top of a test file that changes `process.env.TZ`; restores it after each test. */
export function restoreTimezoneAfterEach(): void {
  const original = process.env.TZ;
  afterEach(() => {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  });
}

export class MemoryStorage implements Storage {
  private readonly items = new Map<string, string>();

  get length(): number {
    return this.items.size;
  }
  clear(): void {
    this.items.clear();
  }
  getItem(key: string): string | null {
    return this.items.get(key) ?? null;
  }
  key(index: number): string | null {
    return [...this.items.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.items.delete(key);
  }
  setItem(key: string, value: string): void {
    this.items.set(key, value);
  }
}

/** Makes `window.localStorage` available to code that guards on `typeof window`. Undone by `vi.unstubAllGlobals()`. */
export function installWindow(extra: Record<string, unknown> = {}): MemoryStorage {
  const localStorage = new MemoryStorage();
  vi.stubGlobal('window', { localStorage, ...extra });
  return localStorage;
}

/** Small deterministic PRNG so randomized tests fail the same way every run. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
