import { test } from '../../fixtures';

test('Verify Calender Page', async ({calendarsPage}) => {
  await calendarsPage.gotoCalendars();
  await calendarsPage.clickSyncAllCal();
  await calendarsPage.verifySyncAllCal();
});
