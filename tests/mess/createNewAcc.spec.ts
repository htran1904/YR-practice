import { test } from '../../fixtures';
import { propertyManagerData } from '../../utils/data';

test('Verify Create New Account Modal', async ({managerPage}) => {
  await managerPage.gotoManager();
  await managerPage.verifyManagerPage();
  await managerPage.clickCreateNewAcc();
  await managerPage.verifyCreateNewAccModelisVisible();
  await managerPage.fillCreateNewAccForm(propertyManagerData);
  await managerPage.fillCountryOfForm('Vietnam');
  await managerPage.fillPreferredCurrencyForm('EUR (Euro)');
  await managerPage.clickCreateNewAccSubmit();
});