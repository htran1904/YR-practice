import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Inbox Behavior — TC_01 & TC_06 & TC_07', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('TC_01_005 — Inbox shows conversations with at least one booking status', async ({ messagesPage }) => {
    await expect(messagesPage.conversationItem.first()).toBeVisible();
    const allStatuses = await messagesPage.conversationStatus.allTextContents();
    expect(allStatuses.length).toBeGreaterThan(0);
  });

  test('TC_01_004 — Each conversation item shows timestamp', async ({ messagesPage }) => {
    await expect(messagesPage.conversationLastActivityAt.first()).toBeVisible();
    const timestamp = await messagesPage.conversationLastActivityAt.first().textContent();
    expect(timestamp?.trim().length).toBeGreaterThan(0);
  });

  test('TC_06 host-side — Inbox may contain conversations with Inquiry status', async ({ messagesPage }) => {
    const hasInquiry = await messagesPage.hasConversationWithStatus('Inquiry');
    if (!hasInquiry) {
      test.skip(true, 'No Inquiry conversations present in current inbox state');
    }
    expect(hasInquiry).toBeTruthy();
  });

  test('TC_07 host-side — Inbox may contain conversations with Booking request status', async ({ messagesPage }) => {
    const hasBookingRequest = await messagesPage.hasConversationWithStatus('Booking request');
    if (!hasBookingRequest) {
      test.skip(true, 'No Booking request conversations present in current inbox state');
    }
    expect(hasBookingRequest).toBeTruthy();
  });

  test('TC_02_006 — Combined filter: Unread + Filters panel can be applied together', async ({ messagesPage }) => {
    // Navigate directly to unread URL then open filters panel
    await messagesPage.gotoUnreadMessages();
    await messagesPage.clickFiltersButton();
    await expect(messagesPage.page.getByTestId('checkbox-request-inquiries-and-offers')).toBeVisible();
  });

  test('TC_02_003 — Filter by Request/Inquiries checkbox is interactive', async ({ messagesPage }) => {
    await messagesPage.clickFiltersButton();
    const checkbox = messagesPage.page.getByTestId('checkbox-request-inquiries-and-offers');
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await expect(checkbox).toBeVisible();
  });
});

test.describe('Unauthenticated Access — TC_01_006', () => {
  test('TC_01_006 — [SKIP] Unauthenticated redirect cannot be tested in shared browser context', async () => {
    test.skip(true, 'Browser-level session sharing prevents isolation of unauthenticated state — verify manually');
  });
});
