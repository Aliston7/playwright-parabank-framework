const { expect } = require('@playwright/test');

class LoginPage {

  constructor(page) {

    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');

    this.passwordInput = page.locator('input[name="password"]');

    this.loginButton = page.getByRole('button', {name: 'Log In'});

    this.logoutLink = page.getByText('Log Out');
  }

  async goto() {await this.page.goto('/');
  }

  async login(username, password) {

    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async logout() {

    await this.logoutLink.click();
  }


  async isLoginSuccessful() {

    await expect(this.page).toHaveURL(/overview/);

  }

  async verifyLogoutSuccess() {
   await expect(this.page).toHaveURL(/index\.htm/);
}

}
module.exports = { LoginPage };