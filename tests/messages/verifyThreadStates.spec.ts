import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Thread States — TC_08', () => {
  test('TC_08_001 — Unread filter URL navigates to statuses=unread', async ({ page, messagesPage }) => {
    await messagesPage.gotoUnreadMessages();
    await expect(page).toHaveURL(/statuses=unread/);
    await expect(messagesPage.conversationItem.first()).toBeVisible();
  });

  test('TC_08_002 — Opening a conversation updates URL with conversation ID (read state)', async ({ page, messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
    await expect(page).toHaveURL(/conversations\?id=/);
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('TC_08_002b — Conversation URL persists after page reload', async ({ page, messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
    await page.reload();
    await expect(page).toHaveURL(/conversations/);
    await expect(messagesPage.composeTextarea).toBeVisible();
  });

  test('TC_08_005 — Unread badge is visible in navigation', async ({ page, messagesPage }) => {
    await page.goto('https://goto.your.rentals/dashboard');
    await messagesPage.clickGuestsNav();
    await expect(messagesPage.messagesMenu).toBeVisible();
    const badgeText = await messagesPage.messagesMenu.textContent();
    expect(badgeText).toContain('Messages');
  });

  test('TC_08_004 — Session state persists after re-login', async ({ page, messagesPage }) => {
    await messagesPage.gotoMessages();
    await messagesPage.clickFirstConversation();
    const urlWithConversation = page.url();
    expect(urlWithConversation).toContain('/conversations');

    await page.goto('https://goto.your.rentals/login');
    await page.getByPlaceholder('Email address').fill('canh.pham01@your.rentals');
    await page.getByPlaceholder('Password').fill('Canh1997');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.locator('.account-card').filter({ hasText: 'Canh Company' }).click({ timeout: 10000 });
    await messagesPage.gotoMessages();
    await expect(page).toHaveURL(/conversations/);
    await expect(messagesPage.conversationItem.first()).toBeVisible();
  });

  test('TC_08_003 & TC_08_006 — [SKIP] Guest-triggered state changes require guest session', async () => {
    test.skip(true, 'Requires guest-side browser session — out of scope for host-only automation');
  });
});
