import { test } from '../../fixtures';
import { expect } from '@playwright/test';
import path from 'path';

// image.jpg lives at the project root; resolve relative to this spec so the
// path is correct no matter which directory Playwright is launched from.
const IMAGE_PATH = path.join(__dirname, '../../image.jpg');

// Attachments are channel-dependent: Airbnb inquiries (the thread that
// auto-opens) have no attach control. We target a direct Your.Rentals booking,
// which exposes the file-attachment control. Matched by its last-message text.
const TARGET_CONVERSATION = 'Your.Rentals: Booking confirmed';

test.describe('Send Attachment in Conversation — TC_11', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();

    // Best-effort dismiss of newer onboarding overlays that can intercept clicks
    // (AI "Set your style" card, Quick Replies coach mark, etc.)
    const notNow = messagesPage.page.getByRole('button', { name: 'Not now' });
    if (await notNow.isVisible({ timeout: 1500 }).catch(() => false)) {
      await notNow.click().catch(() => {});
    }

    // Open the direct-booking conversation that supports attachments
    // (not the Airbnb inquiry that auto-opens by default).
    await messagesPage.openConversationByText(TARGET_CONVERSATION);
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('TC_11_001 — Attach file button is visible in the compose area', async ({ messagesPage }) => {
    await expect(messagesPage.attachFileButton).toBeVisible();
  });

  test('TC_11_002 — Uploading image.jpg enables the Send button', async ({ messagesPage }) => {
    // Send is disabled while the compose area is empty
    await expect(messagesPage.actionIconSend).toBeDisabled();
    await messagesPage.uploadImage(IMAGE_PATH);
    // Attaching a file alone should make the message sendable
    await expect(messagesPage.actionIconSend).toBeEnabled();
  });

  test('TC_11_003 — Send an image attachment, compose area resets afterwards', async ({ messagesPage }) => {
    await messagesPage.uploadImage(IMAGE_PATH);
    await expect(messagesPage.actionIconSend).toBeEnabled();
    await messagesPage.actionIconSend.click();
    // After a successful send the compose area is cleared and ready again
    await expect(messagesPage.composeTextarea).toHaveValue('');
  });

  test('TC_11_004 — Send an image together with a text caption', async ({ messagesPage }) => {
    const caption = `Ảnh hướng dẫn check-in — ${Date.now()}`;
    await messagesPage.typeMessage(caption);
    await messagesPage.uploadImage(IMAGE_PATH);
    await expect(messagesPage.actionIconSend).toBeEnabled();
    await messagesPage.actionIconSend.click();
    await expect(messagesPage.composeTextarea).toHaveValue('');
  });
});
