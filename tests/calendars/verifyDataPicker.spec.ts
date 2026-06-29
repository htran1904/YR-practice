import { test } from '../../fixtures';

test('Verify Data Picker', async ({calendarsPage}) => {
  await calendarsPage.gotoCalendars();
  await calendarsPage.clickDataTable();
  await calendarsPage.verifyDataTableisVisible();
  await calendarsPage.clickDataPicker('27');
  await calendarsPage.verifyDataPickerisVisible('27');
});