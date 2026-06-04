/*
 * ============================================================
 *  NGAY 18 - MOCK/CHAN NETWORK + CHO DU LIEU DONG
 * ============================================================
 *  Chay: npx playwright test tests/day18-network-mock.spec.js
 *
 *  Vi sao can:
 *   - Test giao dien khi API tra ve LOI / RONG / nhieu du lieu, ma KHONG
 *     phu thuoc backend that (page.route -> tu quyet dinh response).
 *   - Cho dung "moc" du lieu da ve thay vi sleep mu (waitForResponse).
 * ============================================================
 */
import { test, expect } from '@playwright/test';

// 1) CHAN bot request cho test chay nhanh (abort) --------------
test('chan tai anh cho nhanh', async ({ page }) => {
  // Huy moi request anh -> trang nhe hon, test nhanh hon
  await page.route('**/*.{png,jpg,jpeg,gif,svg}', (route) => route.abort());

  await page.goto('https://www.saucedemo.com');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

// 2) FULFILL - TU TRA response gia (mock) ----------------------
test('mock API tra du lieu gia', async ({ page }) => {
  // Bat moi goi toi /api/users/* va tra ve JSON do MINH tu dat
  await page.route('**/api/users/2', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { id: 2, name: 'MOCK_USER' } }),
    });
  });

  // Goi thu qua page.request -> nhan dung du lieu gia (chung minh mock chay)
  const res = await page.request.get('https://reqres.in/api/users/2');
  const body = await res.json();
  expect(body.data.name).toBe('MOCK_USER'); // du lieu gia, khong phai that
});

// 3) CHO DU LIEU DONG (thay vi sleep cung) ---------------------
test('cho dung response cua API roi moi kiem tra', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Doi trang on dinh (mang ranh) sau khi dieu huong
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Products')).toBeVisible();
  // Goi y nang cao: page.waitForResponse(url => url.url().includes('/api/...'))
});

/*
 * BAI TAP NGAY 18:
 * TODO 1: Mock '**\/api\/users\/2' tra ve status 500 (loi server) va body rong.
 *         (Day la cach test xem giao dien xu ly loi the nao.)
 * TODO 2: Doc them ve page.route va route.fulfill tai
 *         https://playwright.dev/docs/mock
 *
 * Loi giai: tests/solutions/day18-network-mock.spec.js
 */
