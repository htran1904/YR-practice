import { test } from '../../fixtures';
import { propertyManagerData } from '../../utils/data';

test('Verify First Listing for new Account', async ({managerPage}) => {
  await managerPage.gotoManager();
  await managerPage.clickFirstListing();
  await managerPage.verifyAddFirstListingModelisVisible();
});