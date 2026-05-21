const { expect } = require('@playwright/test');

class TransferFundsPage {


    constructor(page) {

        this.page = page;

        this.transferFundsLink = page.getByText('Transfer Funds');

        this.amountInput = page.locator('#amount');

        this.transferButton = page.getByRole('button', {name: 'Transfer'});

        this.successMessage = page.locator('.title');

        this.selectAccount  = page.locator('#toAccountId');

        this.transferCompleteMessage = page.getByRole('heading', { name: 'Transfer Complete!' });

        this.errorMessage = page.getByText('An internal error has occurred and has been logged.');
    }

    async navigateToTransferFunds() {

        await this.transferFundsLink.click();
    }

    async transferFunds(amount) {

        await this.selectAccount.selectOption('14787');

        await this.amountInput.fill(amount);

        await this.transferButton.click();


    }
    async verifyTransferSuccess() {

   await expect(this.transferCompleteMessage).toBeVisible();
    }

    async transferFundsWithEmptyAmount() {

    await this.selectAccount.selectOption('14787');

    await this.transferButton.click();
}

    async verifyTransferError() {

    await expect(this.errorMessage).toBeVisible();
}

}


module.exports = { TransferFundsPage };