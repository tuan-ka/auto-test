/*
 * ============================================================
 *  NGAY 13-14 - CAPSTONE: Test END-TO-END mot luong mua hang
 * ============================================================
 *  Chay: npx playwright test tests/day13-capstone-e2e.spec.js --ui
 *
 *  Kich ban thuc te (giong khi vao du an that):
 *    Dang nhap -> them san pham vao gio -> vao gio -> checkout ->
 *    dien thong tin -> hoan tat don hang -> kiem tra thong bao thanh cong.
 *
 *  Day la bai tong hop: dung POM (LoginPage), locators chuan,
 *  web-first assertions. Hay coi day la "san pham bo tui" cua ban.
 * ============================================================
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

test('Luong mua hang hoan chinh tren SauceDemo', async ({ page }) => {
  // 1) Dang nhap
  const loginPage = new LoginPage(page);
  await loginPage.moTrang();
  await loginPage.dangNhap('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

  // 2) Them 1 san pham vao gio
  await page
    .getByRole('button', { name: 'Add to cart' })
    .first()
    .click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3) Vao gio hang
  await page.locator('.shopping_cart_link').click();
  await expect(page.getByText('Your Cart')).toBeVisible();

  // 4) Bam Checkout va dien thong tin
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Khai');
  await page.getByPlaceholder('Last Name').fill('Tester');
  await page.getByPlaceholder('Zip/Postal Code').fill('70000');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5) Hoan tat don hang
  await page.getByRole('button', { name: 'Finish' }).click();

  // 6) Kiem tra thong bao thanh cong
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

/*
 * BAI TAP CAPSTONE (tu lam, khong co loi giai san - day la "de thi" cua ban):
 *  A. Them 2 san pham thay vi 1, kiem tra badge = '2'.
 *  B. Tach buoc checkout (dien thong tin) thanh 1 Page Object rieng
 *     trong thu muc pages/ (vd CheckoutPage), giong LoginPage.
 *  C. Viet them 1 test: dang nhap roi BAM Logout (menu hamburger),
 *     kiem tra quay ve trang dang nhap.
 *
 *  Lam xong A-B-C la ban da san sang vao du an that. Chuc mung!
 */
