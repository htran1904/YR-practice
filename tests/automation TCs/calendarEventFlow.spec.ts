import { test } from '../../fixtures';

const EVENT_TITLE = 'Automation Test Event';

test.describe('Calendar - Data Picker, Sync & Event Management', () => {

  test('TC01 - Verify data picker', async ({ calendarsPage }) => {
    await test.step('Navigate to Calendar page', async () => {
      await calendarsPage.gotoCalendars();
      await calendarsPage.verifyCalendarsPage();
    });

    await test.step('Open today date dialog', async () => {
      await calendarsPage.clickDataTable();
      await calendarsPage.verifyDataTableisVisible();
    });

    await test.step('Click on a specific date and verify date picker', async () => {
      await calendarsPage.clickDataPicker('20');
      await calendarsPage.verifyDataPickerisVisible('20');
    });
  });

  test('TC02 - Sync Calendar', async ({ calendarsPage }) => {
    await test.step('Navigate to Calendar page', async () => {
      await calendarsPage.gotoCalendars();
      await calendarsPage.verifyCalendarsPage();
    });

    await test.step('Click Sync all calendars and verify last synced text', async () => {
      await calendarsPage.clickSyncAllCal();
      await calendarsPage.verifySyncAllCal();
    });
  });

  test('TC03 - Create event and verify event appears on calendar', async ({ calendarsPage }) => {
    await test.step('Navigate to Calendar page', async () => {
      await calendarsPage.gotoCalendars();
      await calendarsPage.verifyCalendarsPage();
    });

    await test.step('Open today date dialog', async () => {
      await calendarsPage.clickDataTable();
      await calendarsPage.verifyDataTableisVisible();
    });

    await test.step('Click Create event button', async () => {
      await calendarsPage.clickCreateEventInDialog();
    });

    await test.step('Fill event title and save', async () => {
      await calendarsPage.fillEventTitle(EVENT_TITLE);
      await calendarsPage.submitCreateEventForm();
    });

    await test.step('Verify event appears on calendar', async () => {
      await calendarsPage.verifyEventOnCalendar(EVENT_TITLE);
      await calendarsPage.clickSyncAllCal();
    });
  });

});
