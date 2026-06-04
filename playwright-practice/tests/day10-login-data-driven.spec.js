/*
 * ============================================================
 *  NGAY 10 - DATA-DRIVEN: chay 1 kich ban voi NHIEU bo du lieu
 * ============================================================
 *  Chay: npx playwright test tests/day10-login-data-driven.spec.js
 *
 *  Thay vi viet 4 test gan giong nhau, ta tao 1 mang du lieu roi
 *  dung vong lap de sinh ra nhieu test tu dong.
 * ============================================================
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

// Mot mang cac object - moi object la 1 kich ban kiem thu (test case)
const boDuLieu = [
  { user: 'standard_user', pass: 'secret_sauce', ketQua: 'thanhcong' },
  { user: 'locked_out_user', pass: 'secret_sauce', ketQua: 'loi', loi: /locked out/ },
  { user: 'standard_user', pass: 'sai', ketQua: 'loi', loi: /do not match/ },
  { user: '', pass: 'secret_sauce', ketQua: 'loi', loi: /Username is required/ },
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

/*
 * BAI TAP NGAY 10:
 * TODO 1: Them 1 dong vao boDuLieu: user co nhung pass de rong, mong doi
 *         loi /Password is required/.
 * TODO 2: Chay lai va xem bao cao: npx playwright show-report
 *
 * Loi giai: tests/solutions/day10-login-data-driven.spec.js
 */
