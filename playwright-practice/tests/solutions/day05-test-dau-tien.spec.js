/* LOI GIAI - Ngay 5 */
import { test, expect } from '@playwright/test';

test('them 2 cong viec', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const oNhap = page.getByPlaceholder('What needs to be done?');
  await oNhap.fill('Hoc JS');
  await oNhap.press('Enter');
  await oNhap.fill('Hoc Playwright');
  await oNhap.press('Enter');

  await expect(page.getByText('Hoc JS')).toBeVisible();
  await expect(page.getByText('Hoc Playwright')).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);
});
