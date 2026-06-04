/* LOI GIAI - Ngay 8
 * Goi y: them vao pages/login.page.js trong constructor:
 *     this.logo = page.getByText('Swag Labs');
 * va them ham:
 *     async kiemTraLoi(text) {
 *       await expect(this.thongBaoLoi).toContainText(text);
 *     }
 * (nho: import { expect } from '@playwright/test' o dau file page neu dung expect trong page)
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.moTrang();
});

test('logo Swag Labs hien thi', async ({ page }) => {
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('dang nhap sai hien dung thong bao', async () => {
  await loginPage.dangNhap('standard_user', 'sai');
  await expect(loginPage.thongBaoLoi).toContainText('do not match');
});
