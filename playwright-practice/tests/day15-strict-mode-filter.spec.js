/*
 * ============================================================
 *  NGAY 15 - STRICT MODE & LOC LOCATOR (loi gap NGAY DAU o app that)
 * ============================================================
 *  Chay: npx playwright test tests/day15-strict-mode-filter.spec.js --ui
 *
 *  VAN DE: tren app that, 1 locator thuong khop NHIEU element (danh sach
 *  san pham, dong trong bang...). Playwright o "strict mode" se BAO LOI:
 *      Error: strict mode violation: locator resolved to 6 elements
 *  => Ban phai thu HEP locator lai cho con DUNG 1 element.
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('CHON DUNG 1 trong nhieu nut giong nhau', async ({ page }) => {
  // Trang co 6 nut "Add to cart" giong het -> phai thu hep:

  // Cach 1: .first() / .last() / .nth(i) - chon theo vi tri
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('button', { name: 'Add to cart' }).nth(0); // index tu 0

  // Cach 2: .filter({ hasText }) - loc theo noi dung ben trong
  const dongBackpack = page.locator('.inventory_item')
    .filter({ hasText: 'Backpack' });
  await expect(dongBackpack).toHaveCount(1);

  // Cach 3: chaining - tim element CON ben trong 1 cha cu the
  await dongBackpack.getByRole('button').click(); // nut trong dong Backpack
});

test('dem va duyet 1 danh sach', async ({ page }) => {
  const tenSanPham = page.locator('.inventory_item_name');
  await expect(tenSanPham).toHaveCount(6); // co 6 san pham

  // Lay text tat ca thanh mang de kiem tra
  const ds = await tenSanPham.allTextContents();
  expect(ds).toContain('Sauce Labs Backpack');
});

/*
 * BAI TAP NGAY 15:
 * TODO 1: Dung .filter({ hasText: 'Bike Light' }) tim dong san pham Bike Light,
 *         bam nut Add to cart CUA RIENG dong do, roi kiem tra badge gio = '1'.
 * TODO 2: Kiem tra gia cua san pham dau tien:
 *         await expect(page.locator('.inventory_item_price').first()).toHaveText('$29.99');
 *
 * Loi giai: tests/solutions/day15-strict-mode-filter.spec.js
 */
