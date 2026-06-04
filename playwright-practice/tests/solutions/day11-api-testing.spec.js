/* LOI GIAI - Ngay 11 */
import { test, expect } from '@playwright/test';

test('GET 1 user cu the', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users/2');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.data.id).toBe(2);
});

test('GET user khong ton tai tra ve 404', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users/999');
  expect(res.status()).toBe(404);
});
