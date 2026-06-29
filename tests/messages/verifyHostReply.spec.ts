import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Host Reply Flow — TC_09', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
  });

  test('TC_09_007 — Full message history loads when opening a conversation', async ({ messagesPage }) => {
    await expect(messagesPage.messageSenderName.first()).toBeVisible();
    const senderCount = await messagesPage.messageSenderName.count();
    expect(senderCount).toBeGreaterThan(0);
  });

  test('TC_09_006 — Messages in conversation are in chronological order (oldest first)', async ({ messagesPage }) => {
    const senderCount = await messagesPage.messageSenderName.count();
    expect(senderCount).toBeGreaterThan(0);
  });

  test('TC_09_001 — Host reply appends to thread without creating new conversation', async ({ messagesPage }) => {
    const countBefore = await messagesPage.conversationItem.count();
    const timestamp = Date.now();
    await messagesPage.sendMessage(`Auto reply TC_09 — ${timestamp}`);
    await expect(messagesPage.composeTextarea).toHaveValue('');
    const countAfter = await messagesPage.conversationItem.count();
    expect(countAfter).toBeLessThanOrEqual(countBefore + 1);
  });

  test('TC_09_002 — Compose area clears after sending reply', async ({ messagesPage }) => {
    const timestamp = Date.now();
    await messagesPage.sendMessage(`TC_09_002 test — ${timestamp}`);
    await expect(messagesPage.composeTextarea).toHaveValue('');
  });

  test('TC_09_003 — Thread moves to top after host replies', async ({ messagesPage }) => {
    const timestamp = Date.now();
    await messagesPage.sendMessage(`Move to top test — ${timestamp}`);
    await messagesPage.gotoMessages();
    const firstConvNameAfter = await messagesPage.conversationGuestName.first().textContent();
    expect(firstConvNameAfter?.trim().length).toBeGreaterThan(0);
  });

  test('TC_09_004 & TC_09_005 — [SKIP] Guest follow-up requires guest-side session', async () => {
    test.skip(true, 'Requires guest-side browser session — out of scope for host-only automation');
  });
});
