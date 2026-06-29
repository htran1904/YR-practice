import { test as setup, expect } from "@playwright/test";
import { env } from "../utils/.env";

setup('test', async ({ page }) => {

  await page.goto('https://goto.your.rentals/');
  await page.getByPlaceholder('Email address').fill(env.username);
  await page.getByPlaceholder('Password').fill(env.password);
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await expect(page.getByRole('heading', { name: 'Welcome!'})).toBeVisible();
  await page.locator('.account-card').filter({ hasText: 'Canh Company' }).click({ timeout: 10000 });
  await expect(page.getByText('Dashboard')).toBeVisible();
  await page.locator('#guest-menu-item').click();
  await expect(page.getByText('Guests', { exact: true })).toBeVisible();
  await expect(page.getByTestId('messages-menu')).toBeVisible();
  await page.context().storageState({
    path: "storageState.json"
  });
});