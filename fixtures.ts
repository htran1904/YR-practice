import { test as base } from '@playwright/test';
import { CalendarsPage } from './pages/callendars';
import { ManagerPage } from './pages/managerPage';
import { MessagesPage } from './pages/messagesPage';
import { NotificationsPage } from './pages/notificationsPage';

type Fixtures = {
  calendarsPage: CalendarsPage;
  managerPage: ManagerPage;
  messagesPage: MessagesPage;
  notificationsPage: NotificationsPage;
};

export const test = base.extend<Fixtures>({
  calendarsPage: async ({ page }, use) => {
    await use(new CalendarsPage(page));
  },
  managerPage: async ({ page }, use) => {
    await use(new ManagerPage(page));
  },
  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
  notificationsPage: async ({ page }, use) => {
    await use(new NotificationsPage(page));
  },
});
