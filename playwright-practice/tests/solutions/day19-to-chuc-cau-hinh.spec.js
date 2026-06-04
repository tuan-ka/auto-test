/* LOI GIAI - Ngay 19 */
import { test, expect } from '@playwright/test';

test.describe('Luong dang nhap SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  // TODO 2: tach thanh cac test.step ro rang
  test('dang nhap thanh cong @smoke', async ({ page }) => {
    await test.step('Nhap username', async () => {
      await page.getByPlaceholder('Username').fill('standard_user');
    });
    await test.step('Nhap password', async () => {
      await page.getByPlaceholder('Password').fill('secret_sauce');
    });
    await test.step('Bam Login & kiem tra', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page).toHaveURL(/inventory/);
    });
  });

  // TODO 1: them tag @regression
  test('dang nhap sai mat khau @regression', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('sai');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
