/* LOI GIAI - Ngay 6 */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('nut Login dang bat (enabled)', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
});

// TODO 2 la cau hoi tu suy luan:
// - O nhap Username/Password -> dung getByPlaceholder (vi co placeholder).
// - Nut Login -> dung getByRole('button', { name: 'Login' }).
