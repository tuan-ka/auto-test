/* LOI GIAI - Ngay 16 */
import { test, expect } from '../../fixtures/auth.fixture.js';

test('mo gio hang (dung loggedInPage)', async ({ loggedInPage }) => {
  // TODO 1
  await loggedInPage.locator('.shopping_cart_link').click();
  await expect(loggedInPage.getByText('Your Cart')).toBeVisible();
});

// TODO 2 (doc hieu): trong fixtures/auth.fixture.js, moi thu TRUOC `await use(page)`
// la phan setup (chay truoc test); moi thu SAU `await use(page)` la teardown
// (chay sau test, de don dep neu can).
