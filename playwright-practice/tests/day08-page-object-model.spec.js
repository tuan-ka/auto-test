/*
 * ============================================================
 *  NGAY 8 - PAGE OBJECT MODEL (POM) + hooks (beforeEach)
 * ============================================================
 *  Chay: npx playwright test tests/day08-page-object-model.spec.js
 *
 *  So sanh voi ngay 7: thay vi lap lai getByPlaceholder(...).fill(...) o
 *  moi test, ta goi loginPage.dangNhap(...). Test ngan & de doc hon nhieu.
 * ============================================================
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

let loginPage;

test.beforeEach(async ({ page }) => {
  // Tao doi tuong trang va mo san trang login truoc moi test
  loginPage = new LoginPage(page);
  await loginPage.moTrang();
});

test('dang nhap thanh cong (dung POM)', async ({ page }) => {
  await loginPage.dangNhap('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('dang nhap sai (dung POM)', async () => {
  await loginPage.dangNhap('standard_user', 'sai_mat_khau');
  await expect(loginPage.thongBaoLoi).toBeVisible();
});

/*
 * BAI TAP NGAY 8:
 * TODO 1: Trong pages/login.page.js, them locator cho logo:
 *         this.logo = page.getByText('Swag Labs');
 *         roi viet test kiem tra logo hien thi.
 * TODO 2: Them ham `async kiemTraLoi(text)` vao LoginPage de kiem tra
 *         thong bao loi chua doan text mong doi.
 *
 * Loi giai: tests/solutions/day08-page-object-model.spec.js
 */
