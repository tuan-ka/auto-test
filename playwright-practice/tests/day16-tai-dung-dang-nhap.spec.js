/*
 * ============================================================
 *  NGAY 16 - TAI DUNG DANG NHAP (custom fixture + storageState)
 * ============================================================
 *  Chay: npx playwright test tests/day16-tai-dung-dang-nhap.spec.js
 *
 *  Tren app that, dang nhap LAI o moi test khien suite RAT CHAM. Co 2 cach
 *  tai dung trang thai dang nhap:
 *    A) CUSTOM FIXTURE  - don gian, hoc truoc (file nay).
 *    B) storageState    - luu cookie/localStorage ra file, nhanh nhat cho
 *                         suite lon (xem phan giai thich cuoi file).
 * ============================================================
 */

// Chu y: import `test` tu fixture cua minh, KHONG phai tu @playwright/test
import { test, expect } from '../fixtures/auth.fixture.js';

// Moi test duoi day nhan san `loggedInPage` -> da o trong trang san pham
test('xem danh sach san pham (khong can tu login)', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Products')).toBeVisible();
  await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
});

test('them san pham vao gio (khong can tu login)', async ({ loggedInPage }) => {
  await loggedInPage.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveText('1');
});

/*
 * BAI TAP NGAY 16:
 * TODO 1: Viet them 1 test dung loggedInPage: mo gio hang
 *         (bam .shopping_cart_link) va kiem tra thay chu 'Your Cart'.
 * TODO 2 (doc hieu): mo fixtures/auth.fixture.js, hieu vi tri `await use(page)`
 *         chia "truoc test" va "sau test".
 *
 * Loi giai: tests/solutions/day16-tai-dung-dang-nhap.spec.js
 *
 * --- CACH B: storageState (nang cao, cho suite lon) ---------------------
 * 1) Tao 1 file setup (vd auth.setup.js) dang nhap 1 LAN roi luu trang thai:
 *      await page.context().storageState({ path: 'playwright/.auth/user.json' });
 * 2) Trong playwright.config.js, cho cac test dung lai file do:
 *      use: { storageState: 'playwright/.auth/user.json' }
 *    => Test khoi dong la DA dang nhap san, khong ton thoi gian login lai.
 *    Tai lieu: https://playwright.dev/docs/auth
 */
