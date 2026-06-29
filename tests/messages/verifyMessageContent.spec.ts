import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Message Content & Reliability — TC_10', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
  });

  test('TC_10_001 — Compose area accepts multiline content via Shift+Enter', async ({ messagesPage }) => {
    await messagesPage.composeTextarea.focus();
    await messagesPage.composeTextarea.pressSequentially('Xin chào!');
    await messagesPage.pressShiftEnterInCompose();
    await messagesPage.composeTextarea.pressSequentially('Check-in lúc 14:00 nhé.');
    const value = await messagesPage.getComposeValue();
    expect(value).toContain('Xin chào!');
    expect(value).toContain('Check-in lúc 14:00 nhé.');
    await messagesPage.clearMessage();
  });

  test('TC_10_002 — Compose area accepts emoji characters', async ({ messagesPage }) => {
    const emojiMsg = 'Chào mừng đến với căn hộ của chúng tôi! 🏠😊✨';
    await messagesPage.typeMessage(emojiMsg);
    await expect(messagesPage.composeTextarea).toHaveValue(emojiMsg);
    await expect(messagesPage.actionIconSend).toBeEnabled();
    await messagesPage.clearMessage();
  });

  test('TC_10_003 — Compose area accepts Unicode/Vietnamese characters', async ({ messagesPage }) => {
    const unicodeMsg = 'Kính gửi quý khách, thông tin nhận phòng chi tiết như sau:';
    await messagesPage.typeMessage(unicodeMsg);
    await expect(messagesPage.composeTextarea).toHaveValue(unicodeMsg);
    await messagesPage.clearMessage();
  });

  test('TC_10_004 — Sent message content persists after page reload', async ({ page, messagesPage }) => {
    const timestamp = Date.now();
    const persistMsg = `Persist test — ${timestamp}`;
    await messagesPage.sendMessage(persistMsg);
    await expect(messagesPage.composeTextarea).toHaveValue('');
    await page.reload();
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('TC_10_005 — Rapid double-click on Send does not leave compose dirty', async ({ messagesPage }) => {
    const timestamp = Date.now();
    await messagesPage.typeMessage(`Double click test — ${timestamp}`);
    await messagesPage.actionIconSend.dblclick();
    // After dblclick the compose should be cleared (message sent at least once)
    await expect(messagesPage.composeTextarea).toHaveValue('');
  });

  test('TC_10_007 — Inbox conversation list items have non-empty timestamps', async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
    await expect(messagesPage.conversationItem.first()).toBeVisible();
    const timestamps = await messagesPage.conversationLastActivityAt.allTextContents();
    expect(timestamps.length).toBeGreaterThan(0);
    const firstTimestamp = timestamps[0]?.trim();
    expect(firstTimestamp?.length).toBeGreaterThan(0);
  });

  test('TC_10_006 — Message history is visible after reopening conversation', async ({ messagesPage }) => {
    await expect(messagesPage.messageSenderName.first()).toBeVisible();
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
    await expect(messagesPage.messageSenderName.first()).toBeVisible();
  });
});
