
import { test as base, Page} from '@playwright/test';
import { BasePage } from './pages/basePage';

// type MyFixture = {
//   basePage: BasePage;
// };

// export const newFixture = base.extend<MyFixture>({
//   basePage: async ({ page }, use) => {
//     const basePage = new BasePage(page);
//     await use(basePage);
//   },
// }); 

export class NotiPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async gotoNoti() {
    await this.page.goto('https://app.nopcommerce.com/notifications');
  }
}
