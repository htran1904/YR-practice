import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Conversation View', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
  });

  test('Verify compose area is visible when a conversation is open', async ({ messagesPage }) => {
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('Verify Generate Reply button is visible in compose area', async ({ messagesPage }) => {
    await expect(messagesPage.btnGenerateReply).toBeVisible();
  });

  test('Verify Quick Replies button is visible in compose area', async ({ messagesPage }) => {
    await expect(messagesPage.btnQuickReplies).toBeVisible();
  });

  test('Verify Send button is visible in compose area', async ({ messagesPage }) => {
    await expect(messagesPage.actionIconSend).toBeVisible();
  });

  test('Verify user can type a message in compose area', async ({ messagesPage }) => {
    const testMessage = 'Hello, this is an automated test message.';
    await messagesPage.typeMessage(testMessage);
    await expect(messagesPage.composeTextarea).toHaveValue(testMessage);
    await messagesPage.clearMessage();
  });

  test('Verify Generate Reply dialog opens when clicking Generate Reply', async ({ messagesPage }) => {
    await messagesPage.clickGenerateReply();
    await expect(messagesPage.page.getByRole('dialog').first()).toBeVisible();
  });

  test('Verify conversation details panel is visible when conversation is open', async ({ messagesPage }) => {
    await expect(messagesPage.guestsDetails).toBeVisible();
  });
});

test.describe('Conversation List Items', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('Verify clicking a conversation item opens that conversation', async ({ page, messagesPage }) => {
    await messagesPage.clickFirstConversation();
    await expect(page).toHaveURL(/conversations\?id=/);
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('Verify conversation items display guest name', async ({ messagesPage }) => {
    const firstName = messagesPage.conversationGuestName.first();
    await expect(firstName).toBeVisible();
    const name = await firstName.textContent();
    expect(name?.trim().length).toBeGreaterThan(0);
  });

  test('Verify conversation items display booking status', async ({ messagesPage }) => {
    await expect(messagesPage.conversationStatus.first()).toBeVisible();
  });
});
