/*
 * ============================================================
 *  NGAY 5 - Test Playwright DAU TIEN
 * ============================================================
 *  Chay:        npx playwright test tests/day05-test-dau-tien.spec.js
 *  Chay co UI:  npx playwright test tests/day05-test-dau-tien.spec.js --ui
 *
 *  Cau truc 1 test luon co:
 *    test('mo ta', async ({ page }) => {  ... cac buoc ...  });
 *  - `page` = 1 tab trinh duyet, Playwright tu mo san cho ban.
 *  - moi thao tac deu co `await` o dau.
 * ============================================================
 */
import { test, expect } from '@playwright/test';

test('mo trang TodoMVC va kiem tra tieu de', async ({ page }) => {
  // Buoc 1: mo trang web
  await page.goto('https://demo.playwright.dev/todomvc');

  // Buoc 2: kiem tra (assertion) - tieu de trang phai co chu "todos"
  await expect(page).toHaveTitle(/todos/);
});

test('them 1 cong viec vao danh sach', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  // O input "What needs to be done?" -> go chu roi nhan Enter
  const oNhap = page.getByPlaceholder('What needs to be done?');
  await oNhap.fill('Hoc Playwright');
  await oNhap.press('Enter');

  // Kiem tra: cong viec vua them hien ra tren danh sach
  await expect(page.getByText('Hoc Playwright')).toBeVisible();
});

/*
 * BAI TAP NGAY 5:
 * TODO 1: Viet 1 test moi ten 'them 2 cong viec' -> them "Hoc JS" va
 *         "Hoc Playwright", sau do kiem tra ca 2 deu hien thi.
 * TODO 2: (Goi y) dem so item bang:
 *         await expect(page.getByTestId('todo-item')).toHaveCount(2);
 *
 * Loi giai: tests/solutions/day05-test-dau-tien.spec.js
 */
