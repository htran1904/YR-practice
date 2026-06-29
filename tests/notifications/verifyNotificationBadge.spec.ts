import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Notification Badge — TC_NOTIF_01', () => {
  test.beforeEach(async ({ notificationsPage }) => {
    await notificationsPage.gotoDashboard();
  });

  test('TC_NOTIF_01_001 — Notification badge is visible in the header', async ({ notificationsPage }) => {
    await expect(notificationsPage.headerBadge).toBeVisible();
  });

  test('TC_NOTIF_01_002 — Badge displays a numeric count (e.g. 9, 9+)', async ({ notificationsPage }) => {
    await expect(notificationsPage.headerBadge).toBeVisible();
    const text = await notificationsPage.headerBadge.textContent();
    expect(text?.trim()).toMatch(/^\d+\+?$/);
  });

  test('TC_NOTIF_01_003 — Badge is visible on the Conversations page', async ({ page, notificationsPage }) => {
    await page.goto('https://goto.your.rentals/conversations');
    await notificationsPage.dismissOverlays();
    await expect(notificationsPage.headerBadge).toBeVisible();
  });

  test('TC_NOTIF_01_004 — Clicking the badge opens the notification dropdown panel', async ({ notificationsPage }) => {
    await expect(notificationsPage.notificationPanel).toBeHidden();
    await notificationsPage.clickHeaderBadge();
    await expect(notificationsPage.notificationPanel).toBeVisible();
    // Panel renders notification rows
    await expect(notificationsPage.notificationItem.first()).toBeVisible();
  });
});