/*
 * ============================================================
 *  NGAY 7 - ACTIONS (thao tac) + WEB-FIRST ASSERTIONS (kiem tra)
 * ============================================================
 *  Chay: npx playwright test tests/day07-actions-assertions.spec.js --ui
 *
 *  ACTIONS hay dung:
 *    .click()          bam
 *    .fill('text')     dien o nhap (xoa cu, go moi) - nen dung
 *    .check()          tick checkbox
 *    .selectOption()   chon trong dropdown
 *    .press('Enter')   nhan phim
 *
 *  WEB-FIRST ASSERTIONS (luon co `await expect(...)`):
 *    .toBeVisible()    dang hien thi
 *    .toHaveText('x')  co dung text
 *    .toHaveValue('x') o nhap co dung gia tri
 *    .toHaveCount(n)   co dung so luong
 *    .toHaveURL(/.../) URL dung
 *  -> Diem manh: Playwright TU DONG DOI (auto-wait) den khi dieu kien dung,
 *     nen ban KHONG can dung waitForTimeout (sleep cung).
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test('dang nhap thanh cong vao SauceDemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // ACTIONS: dien user/pass roi bam Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // ASSERTIONS: vao duoc trang san pham
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('dang nhap that bai hien thong bao loi', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('sai_mat_khau');
  await page.getByRole('button', { name: 'Login' }).click();

  // Mong doi: hien thong bao loi (Playwright tu doi thong bao xuat hien)
  await expect(page.getByText(/Username and password do not match/)).toBeVisible();
});

/*
 * BAI TAP NGAY 7:
 * TODO 1: Viet test cho user 'locked_out_user' / 'secret_sauce' -> mong doi
 *         thong bao chua chu "locked out".
 * TODO 2: Sau khi dang nhap thanh cong, them 1 san pham vao gio:
 *         await page.getByRole('button', { name: 'Add to cart' }).first().click();
 *         roi kiem tra so tren icon gio hang = '1':
 *         await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
 *
 * Loi giai: tests/solutions/day07-actions-assertions.spec.js
 */
