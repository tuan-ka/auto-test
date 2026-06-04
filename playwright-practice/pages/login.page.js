/*
 * ============================================================
 *  PAGE OBJECT MODEL (POM) - trang Login cua SauceDemo
 * ============================================================
 *  Y tuong POM: gom moi thao tac & locator cua MOT trang vao 1 class.
 *  -> Test doc nhu tieng nguoi, va khi giao dien doi chi sua 1 cho.
 *  Tai lieu: https://playwright.dev/docs/pom
 * ============================================================
 */
export class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    // Khai bao locator 1 lan, dung lai nhieu noi
    this.oUsername = page.getByPlaceholder('Username');
    this.oPassword = page.getByPlaceholder('Password');
    this.nutLogin = page.getByRole('button', { name: 'Login' });
    this.thongBaoLoi = page.locator('[data-test="error"]');
  }

  // Mo trang dang nhap
  async moTrang() {
    await this.page.goto('https://www.saucedemo.com');
  }

  // Mot ham gom ca 3 buoc dang nhap
  async dangNhap(username, password) {
    await this.oUsername.fill(username);
    await this.oPassword.fill(password);
    await this.nutLogin.click();
  }
}
