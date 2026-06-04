/*
 * ============================================================
 *  NGAY 19 - TO CHUC TEST & CAU HINH MOI TRUONG (chuyen nghiep)
 * ============================================================
 *  Chay:        npx playwright test tests/day19-to-chuc-cau-hinh.spec.js
 *  Chay theo tag: npx playwright test --grep @smoke
 *
 *  Cac cong cu giup suite LON van de doc, de loc, de bao cao.
 * ============================================================
 */
import { test, expect } from '@playwright/test';

// 1) describe - GOM nhom cac test lien quan --------------------
test.describe('Luong dang nhap SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  // 2) TAG @smoke - de loc chay rieng nhom test quan trong
  test('dang nhap thanh cong @smoke', async ({ page }) => {
    // 3) test.step - chia test thanh cac BUOC ro rang trong bao cao
    await test.step('Nhap thong tin dang nhap', async () => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
    });
    await test.step('Bam Login va kiem tra', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test('dang nhap sai mat khau', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('sai');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  // 4) skip/fixme - tam BO QUA test (vd dang loi, chua lam xong)
  test.skip('tinh nang chua lam xong', async () => {
    // se khong chay; bao cao danh dau "skipped"
  });
});

/*
 * CAU HINH MOI TRUONG (xem playwright.config.js):
 *   use: { baseURL: process.env.BASE_URL || 'https://www.saucedemo.com' }
 *   -> trong test viet gon: await page.goto('/');  (noi voi baseURL)
 *   -> doi moi truong: BASE_URL=https://staging... npx playwright test
 *      (Windows PowerShell: $env:BASE_URL='...'; npx playwright test)
 *
 * BAI TAP NGAY 19:
 * TODO 1: Them tag @regression cho test 'dang nhap sai mat khau', roi chay
 *         loc rieng: npx playwright test --grep @regression
 * TODO 2: Tach test dang nhap dung thanh 3 test.step ro rang va xem chung
 *         hien ra sao trong: npx playwright show-report
 *
 * Loi giai: tests/solutions/day19-to-chuc-cau-hinh.spec.js
 */
