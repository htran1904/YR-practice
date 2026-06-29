import { expect, Page} from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { formattedDateisClicked, formattedDateToClick, formattedDateToday } from '../utils/date';

export class CalendarsPage extends BasePage {
  page: Page;

  private createEventButton;
  private eventNameInput;
  private saveButton;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.createEventButton = page.getByRole('button', { name: 'Create event' });
    this.eventNameInput = page.getByLabel('Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async gotoCalendars() {
    await this.goto('calendar');
  }
  async verifyCalendarsPage () {
    await expect(this.page).toHaveURL('https://goto.your.rentals/calendar');
  }
  async verifyFilterListingisVisible () {
    await expect(this.page.getByRole('textbox', { name: 'Search listing' })).toBeVisible();
  }
  async clickSyncAllCal () {
    await this.page.getByRole('button', { name: 'Sync all calendars' }).click();
  }
  async verifySyncAllCal () {
    await expect(this.page.locator('text=a few seconds ago')).toBeVisible();
  }
  async clickDataTable() {
    await this.page.getByRole('button', { name: `${formattedDateToday}` }).click();
  }
  async verifyDataTableisVisible () {
    await expect(this.page.getByRole('dialog', { name: `${formattedDateToday}` })).toBeVisible();
  }

  async clickDataPicker (dateToClick: string) {
    await this.page.getByRole('button', { name: `${dateToClick} ${formattedDateToClick}` }).click();
  }
  async verifyDataPickerisVisible (dateToClick: string) {
    await expect(this.page.getByRole('button', { name: `${dateToClick} ${formattedDateisClicked}` })).toBeVisible();
  }

  async clickCreateEventInDialog () {
    await this.createEventButton.click();
  }

  async fillEventTitle (title: string) {
    await this.eventNameInput.fill(title);
  }

  async submitCreateEventForm () {
    await this.saveButton.click();
  }

  async verifyEventOnCalendar (eventTitle: string) {
    await expect(this.page.getByText(eventTitle)).toBeVisible();
  }

}
