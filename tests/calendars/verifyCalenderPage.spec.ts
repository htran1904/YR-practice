//import {test} from '@playwright/test';
import { test } from '../../fixtures';


test('Verify Calender Page', async ({calendarsPage}) => {
  //const calendarPage = new CalendarsPage(page);
  await calendarsPage.gotoCalendars();
  await calendarsPage.verifyCalendarsPage();
});