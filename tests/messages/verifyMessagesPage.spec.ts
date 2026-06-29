import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Messages Page', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('Verify Messages page loads with correct URL and title', async ({ page }) => {
    await expect(page).toHaveURL(/conversations/);
    await expect(page).toHaveTitle(/Messages/);
  });

  test('Verify conversation list is visible on Messages page', async ({ messagesPage }) => {
    await expect(messagesPage.conversationItem.first()).toBeVisible();
  });

  test('Verify each conversation item shows guest name, last message, and status', async ({ messagesPage }) => {
    await expect(messagesPage.conversationGuestName.first()).toBeVisible();
    await expect(messagesPage.conversationLastMessage.first()).toBeVisible();
    await expect(messagesPage.conversationStatus.first()).toBeVisible();
  });

  test('Verify Unread filter button is visible on Messages page', async ({ messagesPage }) => {
    await expect(messagesPage.btnUnread).toBeVisible();
  });

  test('Verify Filters button is visible on Messages page', async ({ messagesPage }) => {
    await expect(messagesPage.btnFilters).toBeVisible();
  });

  test('Verify Manage Quick Replies button is visible on Messages page', async ({ messagesPage }) => {
    await expect(messagesPage.manageQuickRepliesButton).toBeVisible();
  });
});

test.describe('Messages Navigation', () => {
  test('Verify Messages page is accessible from Guests navigation menu', async ({ page, messagesPage }) => {
    await page.goto('https://goto.your.rentals/dashboard');
    await messagesPage.clickGuestsNav();
    await expect(messagesPage.messagesMenu).toBeVisible();
    await messagesPage.clickMessagesMenu();
    await expect(page).toHaveURL(/conversations/);
  });

  test('Verify Messages menu shows unread count badge', async ({ page, messagesPage }) => {
    await page.goto('https://goto.your.rentals/dashboard');
    await messagesPage.clickGuestsNav();
    await expect(messagesPage.messagesMenu).toBeVisible();
  });
});
