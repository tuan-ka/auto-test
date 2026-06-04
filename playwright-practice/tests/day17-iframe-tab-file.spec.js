/*
 * ============================================================
 *  NGAY 17 - IFRAME, TAB MOI, UPLOAD/DOWNLOAD, DIALOG
 * ============================================================
 *  Chay: npx playwright test tests/day17-iframe-tab-file.spec.js --ui
 *
 *  Dung trang demo on dinh: the-internet.herokuapp.com
 *  (neu mang chan, doi sang practice.expandtesting.com tuong duong)
 * ============================================================
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1) DIALOG / ALERT (hop thoai cua trinh duyet) ----------------
test('xu ly alert', async ({ page }) => {
  // PHAI dang ky truoc khi hanh dong lam bat alert
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('I am a JS Alert');
    await dialog.accept(); // hoac dialog.dismiss()
  });
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await expect(page.locator('#result')).toHaveText(/You successfully clicked/);
});

// 2) IFRAME (khung nhung trang khac ben trong) -----------------
test('thao tac ben trong iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  // Dung frameLocator de "chui" vao iframe roi moi tim element ben trong
  const khung = page.frameLocator('#mce_0_ifr');
  const oSoan = khung.locator('#tinymce');
  await oSoan.fill('Xin chao tu Playwright');
  await expect(oSoan).toHaveText('Xin chao tu Playwright');
});

// 3) TAB / CUA SO MOI ------------------------------------------
test('bat tab moi mo ra', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  // Doi su kien "trang moi" CUNG LUC voi hanh dong mo no
  const [tabMoi] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Click Here' }).click(),
  ]);
  await tabMoi.waitForLoadState();
  await expect(tabMoi.getByText('New Window')).toBeVisible();
});

// 4) UPLOAD FILE -----------------------------------------------
test('tai file len', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  // Tro toi 1 file co that - o day dung chinh file README cua project
  const filePath = path.join(__dirname, '..', 'README.md');
  await page.locator('#file-upload').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.locator('#uploaded-files')).toHaveText(/README/);
});

/*
 * BAI TAP NGAY 17:
 * TODO 1: O trang /javascript_alerts, xu ly nut "Click for JS Confirm" va
 *         goi dialog.dismiss(), kiem tra ket qua chua "You clicked: Cancel".
 * TODO 2 (download): doc tai lieu page.waitForEvent('download') o
 *         https://playwright.dev/docs/downloads va thu tren 1 trang co nut tai.
 *
 * Loi giai: tests/solutions/day17-iframe-tab-file.spec.js
 */
