const { test, expect } =
  require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');


test('valid user can login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(process.env.PARABANK_USERNAME, process.env.PARABANK_PASSWORD);


  await loginPage.isLoginSuccessful();
});

test('invalid user cannot login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login('wrongUser', 'wrongPassword');

  await expect(
    page.locator('.error')).toContainText('The username and password could not be verified.');
});

test('empty credentials should show error', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login('', '');

  await expect(page.locator('.error')).toContainText('Please enter a username and password');

});

test('user can logout',  async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(process.env.PARABANK_USERNAME,process.env.PARABANK_PASSWORD);

  await loginPage.logout();
  
  await loginPage.verifyLogoutSuccess();

});