/*
 * ============================================================
 *  NGAY 6 - LOCATORS (cach "chi diem" element) - chuan 2026
 * ============================================================
 *  Chay: npx playwright test tests/day06-locators.spec.js --ui
 *
 *  THU TU UU TIEN (theo tai lieu chinh thuc playwright.dev):
 *    1. getByRole(...)       <- TOT NHAT, giong cach nguoi dung "nhin"
 *    2. getByLabel(...)      <- cho o nhap co nhan (form)
 *    3. getByPlaceholder(...)
 *    4. getByText(...)
 *    5. getByTestId(...)     <- khi co data-testid trong code
 *  TRANH: CSS / XPath cung (vd 'div.btn-primary > span') vi DOM doi la gay test.
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Chay truoc MOI test trong file -> mo san trang dang nhap SauceDemo
  await page.goto('https://www.saucedemo.com');
});

test('locator bang ROLE (nut bam)', async ({ page }) => {
  // Nut "Login" co role la "button" va ten hien thi la "Login"
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('locator bang PLACEHOLDER (o nhap)', async ({ page }) => {
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
});

test('locator bang TEXT', async ({ page }) => {
  // Logo "Swag Labs" la 1 doan text tren trang
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('locator bang TEST ID (data-test cua SauceDemo)', async ({ page }) => {
  // SauceDemo dat data-test="username" tren o nhap. Mac dinh Playwright doc
  // attribute "data-testid"; SauceDemo dung "data-test" nen day chi minh hoa.
  // Trong du an that, hoi dev them data-testid de locator on dinh nhat.
  await expect(page.locator('[data-test="username"]')).toBeVisible();
});

/*
 * BAI TAP NGAY 6:
 * TODO 1: Viet test kiem tra nut role 'button' ten 'Login' dang BAT (enabled):
 *         await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
 * TODO 2: Mo DevTools (F12) tren saucedemo.com, tu tim 1 element va doan xem
 *         nen dung getByRole hay getByPlaceholder cho no.
 *
 * Loi giai: tests/solutions/day06-locators.spec.js
 */
