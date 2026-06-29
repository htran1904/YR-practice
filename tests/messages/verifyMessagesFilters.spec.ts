import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Messages Filters', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('Verify clicking Unread filter opens a conversation or updates URL', async ({ page, messagesPage }) => {
    await messagesPage.clickUnreadFilter();
    // btn-unread opens the first unread conversation (url: ?id=...&details=true)
    // or navigates to ?statuses=unread depending on app state
    await expect(page).toHaveURL(/conversations/);
  });

  test('Verify Filters panel opens when clicking Filters button', async ({ messagesPage }) => {
    await messagesPage.clickFiltersButton();
    await expect(messagesPage.page.getByTestId('checkbox-request-inquiries-and-offers')).toBeVisible();
    await expect(messagesPage.page.getByTestId('checkbox-currently-staying')).toBeVisible();
    await expect(messagesPage.page.getByTestId('checkbox-upcoming-check-ins')).toBeVisible();
  });

  test('Verify Filters panel shows Listings search input', async ({ messagesPage }) => {
    await messagesPage.clickFiltersButton();
    await expect(messagesPage.page.getByTestId('input-search-Listings')).toBeVisible();
  });

  test('Verify Filters panel shows Channels search input', async ({ messagesPage }) => {
    await messagesPage.clickFiltersButton();
    await expect(messagesPage.page.getByTestId('input-search-Channels')).toBeVisible();
  });

  test('Verify Unread filter URL navigates to statuses=unread', async ({ page, messagesPage }) => {
    await messagesPage.gotoUnreadMessages();
    await expect(page).toHaveURL(/statuses=unread/);
    await expect(messagesPage.conversationItem.first()).toBeVisible();
  });
});
