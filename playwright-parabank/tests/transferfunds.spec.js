const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

const { TransferFundsPage } = require('../pages/TransferFundsPage');

test('user can transfer funds', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.PARABANK_USERNAME,process.env.PARABANK_PASSWORD);

    await transferFundsPage.navigateToTransferFunds();

    await transferFundsPage.transferFunds('100');

    
    await transferFundsPage.verifyTransferSuccess();
});

test('user cannot transfer funds with empty amount', async ({ page }) => {


    const loginPage = new LoginPage(page);

    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.PARABANK_USERNAME,process.env.PARABANK_PASSWORD);

    await transferFundsPage.navigateToTransferFunds();

    await transferFundsPage.transferFundsWithEmptyAmount();

    await transferFundsPage.verifyTransferError();

});