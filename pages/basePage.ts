import {Page, expect} from '@playwright/test';

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(`https://goto.your.rentals/${url}`);
  }
}