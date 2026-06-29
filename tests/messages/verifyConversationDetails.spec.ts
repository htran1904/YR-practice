import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Conversation Details — TC_03', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('TC_03_002 — Message history visible with sender names', async ({ messagesPage }) => {
    await expect(messagesPage.messageSenderName.first()).toBeVisible();
    const senderName = await messagesPage.messageSenderName.first().textContent();
    expect(senderName?.trim().length).toBeGreaterThan(0);
  });

  test('TC_03_003 — Details panel shows booking info for open conversation', async ({ messagesPage }) => {
    await expect(messagesPage.guestsDetails).toBeVisible();
  });

  test('TC_03_006 — Booking request shows expiry countdown in conversation list', async ({ messagesPage }) => {
    const hasBookingRequest = await messagesPage.hasConversationWithStatus('Booking request');
    if (!hasBookingRequest) {
      test.skip();
      return;
    }
    const expiryBadge = messagesPage.page.getByText(/Expires in/);
    await expect(expiryBadge.first()).toBeVisible();
  });

  test('TC_03_004 — Booking request conversation shows Accept button in details panel', async ({ messagesPage }) => {
    const hasBookingRequest = await messagesPage.hasConversationWithStatus('Booking request');
    if (!hasBookingRequest) {
      test.skip();
      return;
    }
    await messagesPage.clickConversationWithStatus('Booking request');
    await expect(messagesPage.btnAccept).toBeVisible();
  });

  test('TC_03_005 — Booking request conversation shows Decline button in details panel', async ({ messagesPage }) => {
    const hasBookingRequest = await messagesPage.hasConversationWithStatus('Booking request');
    if (!hasBookingRequest) {
      test.skip();
      return;
    }
    await messagesPage.clickConversationWithStatus('Booking request');
    await expect(messagesPage.btnDecline).toBeVisible();
  });

  test('TC_03_007 — Past booking conversation does not show Accept or Decline buttons', async ({ messagesPage }) => {
    const hasPastBooking = await messagesPage.hasConversationWithStatus('Past booking');
    if (!hasPastBooking) {
      test.skip();
      return;
    }
    await messagesPage.clickConversationWithStatus('Past booking');
    await expect(messagesPage.btnAccept).not.toBeVisible();
    await expect(messagesPage.btnDecline).not.toBeVisible();
  });
});
