/* LOI GIAI - Ngay 15 */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('them dung san pham Bike Light vao gio', async ({ page }) => {
  // TODO 1
  const dong = page.locator('.inventory_item').filter({ hasText: 'Bike Light' });
  await dong.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('kiem tra gia san pham dau tien', async ({ page }) => {
  // TODO 2
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$29.99');
});
