/* LOI GIAI - Ngay 10 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';

const boDuLieu = [
  { user: 'standard_user', pass: 'secret_sauce', ketQua: 'thanhcong' },
  { user: 'locked_out_user', pass: 'secret_sauce', ketQua: 'loi', loi: /locked out/ },
  { user: 'standard_user', pass: 'sai', ketQua: 'loi', loi: /do not match/ },
  { user: '', pass: 'secret_sauce', ketQua: 'loi', loi: /Username is required/ },
  // TODO 1 -> them dong nay:
  { user: 'standard_user', pass: '', ketQua: 'loi', loi: /Password is required/ },
];

for (const tc of boDuLieu) {
  test(`Dang nhap [${tc.user || 'rong'}] -> mong doi ${tc.ketQua}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.moTrang();
    await loginPage.dangNhap(tc.user, tc.pass);

    if (tc.ketQua === 'thanhcong') {
      await expect(page).toHaveURL(/inventory/);
    } else {
      await expect(loginPage.thongBaoLoi).toBeVisible();
      await expect(loginPage.thongBaoLoi).toHaveText(tc.loi);
    }
  });
}
