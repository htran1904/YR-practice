import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Notification Preferences — TC_NOTIF_03', () => {
  test.beforeEach(async ({ notificationsPage }) => {
    await notificationsPage.gotoNotificationPreferences();
  });

  test('TC_NOTIF_03_001 — Notification preferences page loads at correct URL', async ({ page }) => {
    await expect(page).toHaveURL(/notifications/);
  });

  test('TC_NOTIF_03_002 — Page shows "Notification preferences" heading', async ({ page }) => {
    await expect(page.getByText('Notification preferences', { exact: true })).toBeVisible();
  });

  test('TC_NOTIF_03_003 — Contact info section shows host email address', async ({ page }) => {
    await expect(page.getByText('Email', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('canh.pham01@your.rentals')).toBeVisible();
  });

  test('TC_NOTIF_03_004 — Contact info section shows SMS channel', async ({ page }) => {
    await expect(page.getByText('SMS', { exact: true }).first()).toBeVisible();
  });

  test('TC_NOTIF_03_005 — Booking notifications section is visible with radio options', async ({ notificationsPage }) => {
    await expect(notificationsPage.sectionBookingNotifications).toBeVisible();
    await expect(notificationsPage.page.getByRole('radio').first()).toBeVisible();
  });

  test('TC_NOTIF_03_006 — Payout notifications section is visible', async ({ notificationsPage }) => {
    await expect(notificationsPage.sectionPayoutNotifications).toBeVisible();
  });

  test('TC_NOTIF_03_007 — SMS and Email columns are labeled in the preference table', async ({ page }) => {
    await expect(page.getByText('Email', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('SMS', { exact: true }).first()).toBeVisible();
  });

  test('TC_NOTIF_03_008 — Booking notification radio buttons are enabled', async ({ page }) => {
    const radios = page.getByRole('radio');
    await expect(radios.first()).toBeVisible();
    await expect(radios.first()).toBeEnabled();
  });

  test('TC_NOTIF_03_009 — Link to Profile settings is present in contact info section', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Profile settings' })).toBeVisible();
  });
});
