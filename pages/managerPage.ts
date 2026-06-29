import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class ManagerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoManager() {
    await this.goto('organisation/management');
  }
  async verifyManagerPage () {
    await expect(this.page).toHaveURL('https://goto.your.rentals/organisation/management');
  }
  async clickCreateNewAcc() {
    await this.page.getByRole('button', { name: 'Create account' }).click();
  }
  async verifyCreateNewAccModelisVisible () {
    await expect(this.page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  }
  async fillCreateNewAccForm (formData: Record<string, string>) {
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      const textbox = this.page.getByRole('textbox', { name: fieldName });
      await textbox.fill(fieldValue);
    }
  }
  async fillCountryOfForm (country: string) {
    await this.page.selectOption('select', { label: country });
  }
  async fillPreferredCurrencyForm (type: string) {
    await this.page.getByRole('button', { name: 'Select currency' }).click();
    await this.page.locator(`text=${type}`).click();
  }
  async clickCreateNewAccSubmit() {
    await this.page.locator('#btn-create-account').getByRole('button', { name: 'Create account' }).click();
  }
  async clickFirstListing() {
    await this.page.getByRole('link', { name: 'Create your first listing' }).click();
  }
  async verifyAddFirstListingModelisVisible() {
    await expect(this.page.getByRole('heading', { name: 'Add new listing' })).toBeVisible();
  }
  async emptyListingState() {
    await this.gotoManager();
    await this.clickFirstListing();
  }
}