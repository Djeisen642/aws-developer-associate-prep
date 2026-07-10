const LAST_REMINDED_KEY = 'aws-dva-last-reminded-v1';

export type NotificationState = 'unsupported' | NotificationPermission;

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationState(): NotificationState {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

/** Must be called from a user gesture (click) — browsers ignore/ignore-with-warning otherwise. */
export async function requestNotificationPermission(): Promise<NotificationState> {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.requestPermission();
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Shows a local "N due for review" notification, at most once per day, and only if
 * permission was already granted. There's no server here — this only fires while the
 * app is actually open, as a more attention-grabbing nudge than the in-page badge.
 */
export function maybeNotifyDue(dueCount: number): void {
  if (!notificationsSupported() || Notification.permission !== 'granted' || dueCount === 0) return;
  const today = todayKey();
  if (window.localStorage.getItem(LAST_REMINDED_KEY) === today) return;
  window.localStorage.setItem(LAST_REMINDED_KEY, today);
  new Notification('AWS Dev Associate Prep', {
    body: `🧠 ${dueCount} question${dueCount === 1 ? '' : 's'} due for review today.`,
  });
}
