const { test, expect } =
  require('@playwright/test');

const { LoginPage } =
  require('../pages/LoginPage');

test('valid user can login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

  await expect(page).toHaveURL(/overview/);
});

test('invalid user cannot login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login('wrongUser', 'wrongPassword');

  await expect(
    page.locator('.error')).toContainText('An internal error has occurred');
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

  await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

  await loginPage.logout();

  await expect(page).toHaveURL(/index/);
});