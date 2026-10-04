import { describe, expect, it } from 'vitest';
import { CHEATSHEETS } from './cheatsheets';
import { FLASHCARDS } from './flashcards';
import { DOMAINS } from './types';

const DOMAIN_IDS: string[] = DOMAINS.map((d) => d.id);

describe('domains', () => {
  it('weights sum to 100, matching the exam blueprint', () => {
    expect(DOMAINS.reduce((sum, d) => sum + d.weight, 0)).toBe(100);
  });
});

describe('flashcards', () => {
  it('have unique ids, a known domain, and text on both sides', () => {
    const ids = FLASHCARDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const card of FLASHCARDS) {
      expect(DOMAIN_IDS, card.id).toContain(card.domain);
      expect(card.front.trim(), card.id).not.toBe('');
      expect(card.back.trim(), card.id).not.toBe('');
    }
  });
});

describe('cheat sheets', () => {
  it('have unique URL-safe slugs, because each becomes a static route', () => {
    const slugs = CHEATSHEETS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('have a known domain and non-empty sections', () => {
    for (const sheet of CHEATSHEETS) {
      expect(DOMAIN_IDS, sheet.slug).toContain(sheet.domain);
      expect(sheet.title.trim(), sheet.slug).not.toBe('');
      expect(sheet.sections.length, sheet.slug).toBeGreaterThan(0);
      for (const section of sheet.sections) {
        expect(section.heading.trim(), sheet.slug).not.toBe('');
        expect(section.points.length, `${sheet.slug}/${section.heading}`).toBeGreaterThan(0);
      }
    }
  });
});
