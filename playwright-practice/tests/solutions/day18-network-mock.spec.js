/* LOI GIAI - Ngay 18 (TODO 1: mock loi server 500) */
import { test, expect } from '@playwright/test';

test('mock API tra ve loi 500', async ({ page }) => {
  await page.route('**/api/users/2', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  const res = await page.request.get('https://reqres.in/api/users/2');
  expect(res.status()).toBe(500);
});
