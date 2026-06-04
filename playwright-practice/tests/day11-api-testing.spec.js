/*
 * ============================================================
 *  NGAY 11 - API TESTING (test backend, khong qua giao dien)
 * ============================================================
 *  Chay: npx playwright test tests/day11-api-testing.spec.js
 *
 *  Playwright test duoc ca API nho fixture `request`. Khong can mo trinh
 *  duyet -> chay rat nhanh. Dung trang demo cong khai reqres.in.
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test('GET danh sach user tra ve status 200', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users?page=2');

  // Kiem tra ma trang thai HTTP
  expect(res.status()).toBe(200);

  // Doc body dang JSON va kiem tra du lieu
  const body = await res.json();
  expect(body.page).toBe(2);
  expect(body.data.length).toBeGreaterThan(0);
});

test('POST tao user moi tra ve 201', async ({ request }) => {
  const res = await request.post('https://reqres.in/api/users', {
    data: { name: 'tester', job: 'qa-automation' },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.name).toBe('tester');
  expect(body).toHaveProperty('id'); // server tra ve id moi
});

/*
 * BAI TAP NGAY 11:
 * TODO 1: Viet test GET 1 user cu the: https://reqres.in/api/users/2
 *         -> kiem tra body.data.id === 2.
 * TODO 2: Viet test GET user khong ton tai: .../api/users/999
 *         -> mong doi status 404.
 *
 * Loi giai: tests/solutions/day11-api-testing.spec.js
 */
