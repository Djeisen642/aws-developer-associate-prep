import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installWindow, restoreTimezoneAfterEach } from '../test/helpers';
import { maybeNotifyDue } from './notifications';

restoreTimezoneAfterEach();

const shown: { title: string; body?: string }[] = [];

function installNotification(permission: NotificationPermission) {
  class FakeNotification {
    static permission = permission;
    constructor(title: string, options?: NotificationOptions) {
      shown.push({ title, body: options?.body });
    }
  }
  vi.stubGlobal('Notification', FakeNotification);
  return installWindow({ Notification: FakeNotification });
}

beforeEach(() => {
  shown.length = 0;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('maybeNotifyDue', () => {
  it('fires once per study day, even when the session spans UTC midnight', () => {
    process.env.TZ = 'America/New_York';
    installNotification('granted');

    vi.setSystemTime(new Date(2026, 9, 4, 19, 30)); // 23:30 UTC
    maybeNotifyDue(5);
    vi.setSystemTime(new Date(2026, 9, 4, 20, 30)); // 00:30 UTC the next day
    maybeNotifyDue(5);
    vi.setSystemTime(new Date(2026, 9, 5, 1, 0)); // still the same study day
    maybeNotifyDue(5);
    expect(shown).toHaveLength(1);
    expect(shown[0]?.body).toContain('5 questions due');

    vi.setSystemTime(new Date(2026, 9, 5, 4, 0)); // new study day
    maybeNotifyDue(1);
    expect(shown).toHaveLength(2);
    expect(shown[1]?.body).toContain('1 question due');
  });

  it('stays quiet with nothing due, without permission, or when denied', () => {
    process.env.TZ = 'UTC';
    vi.setSystemTime(new Date(2026, 9, 4, 12, 0));

    installNotification('granted');
    maybeNotifyDue(0);
    installNotification('default');
    maybeNotifyDue(3);
    installNotification('denied');
    maybeNotifyDue(3);
    expect(shown).toHaveLength(0);
  });

  it('does nothing when the browser has no Notification API', () => {
    installWindow();
    expect(() => maybeNotifyDue(3)).not.toThrow();
    expect(shown).toHaveLength(0);
  });
});
