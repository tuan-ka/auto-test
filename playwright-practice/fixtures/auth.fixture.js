/*
 * ============================================================
 *  CUSTOM FIXTURE - cung cap san 1 trang DA DANG NHAP
 * ============================================================
 *  Y tuong: thay vi moi test tu dang nhap (lap lai + cham), ta tao 1
 *  "fixture" ten `loggedInPage`. Test nao can chi viec yeu cau no, va
 *  Playwright tu dang nhap truoc roi dua trang da login cho test.
 *
 *  Cach dung trong file test:
 *      import { test, expect } from '../fixtures/auth.fixture.js';
 *      test('vi du', async ({ loggedInPage }) => {
 *        await expect(loggedInPage.getByText('Products')).toBeVisible();
 *      });
 *
 *  Tai lieu: https://playwright.dev/docs/test-fixtures
 * ============================================================
 */
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  // Dinh nghia fixture moi ten "loggedInPage"
  loggedInPage: async ({ page }, use) => {
    // --- Phan SETUP: chay truoc test ---
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    // --- Giao trang da login cho test dung ---
    await use(page);

    // --- Phan TEARDOWN (sau test) co the don dep o day neu can ---
  },
});

export { expect };
