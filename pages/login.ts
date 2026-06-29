import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('https://goto.your.rentals/');
  }
  get username (): Locator{
    return this.page.getByPlaceholder('Email address');
  }

  get password (): Locator{
    return this.page.getByPlaceholder('Password');
  }
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  
}
