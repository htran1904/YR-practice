import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Notification Panel — TC_NOTIF_02', () => {
  test.beforeEach(async ({ notificationsPage }) => {
    await notificationsPage.gotoDashboard();
    await notificationsPage.clickHeaderBadge();
  });

  test('TC_NOTIF_02_001 — Clicking the badge opens a notification panel', async ({ page }) => {
    const panel = page.locator('[role="dialog"], [role="listbox"], [role="menu"], [data-test-id="notification-panel"]').first();
    await expect(panel).toBeVisible({ timeout: 8000 });
  });

  test('TC_NOTIF_02_002 — Notification panel contains at least one item', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationItem.first()).toBeVisible({ timeout: 8000 });
  });

  test('TC_NOTIF_02_003 — Each notification item shows a title', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationTitle.first()).toBeVisible({ timeout: 8000 });
    const title = await notificationsPage.notificationTitle.first().textContent();
    expect(title?.trim().length).toBeGreaterThan(0);
  });

  test('TC_NOTIF_02_004 — Each notification item shows a timestamp', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationItem.first()).toBeVisible({ timeout: 8000 });
    await expect(notificationsPage.notificationTimestamp.first()).toBeVisible();
  });

  test('TC_NOTIF_02_005 — Unread notifications have a visual indicator', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationItem.first()).toBeVisible({ timeout: 8000 });
    const unreadCount = await notificationsPage.getUnreadCount();
    expect(unreadCount).toBeGreaterThan(0);
  });

  test('TC_NOTIF_02_006 — Clicking a notification navigates to the related page', async ({ page, notificationsPage }) => {
    await expect(notificationsPage.notificationItem.first()).toBeVisible({ timeout: 8000 });
    const urlBefore = page.url();
    await notificationsPage.clickFirstNotification();
    await expect(page).toHaveURL(/.+/);
    expect(page.url()).not.toBe(urlBefore);
  });

  test('TC_NOTIF_02_007 — Mark all as read button is visible in the panel', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationItem.first()).toBeVisible({ timeout: 8000 });
    await expect(notificationsPage.btnMarkAllRead).toBeVisible();
  });
});
