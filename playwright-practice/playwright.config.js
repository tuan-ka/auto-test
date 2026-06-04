// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Cau hinh chuan Playwright (2026).
 * Tai lieu: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Thu muc chua cac file test (*.spec.js)
  testDir: './tests',

  // Chay cac test trong 1 file song song
  fullyParallel: true,

  // Cam dung test.only khi chay tren CI (tranh quen xoa)
  forbidOnly: !!process.env.CI,

  // Tren CI thi thu lai 2 lan neu fail (do mang chap chon), o may minh thi khong
  retries: process.env.CI ? 2 : 0,

  // Bao cao dang HTML, mo bang: npx playwright show-report
  reporter: 'html',

  use: {
    // Dia chi goc, de trong test viet page.goto('/') cho gon (vi du capstone tu bat)
    // baseURL: 'https://www.saucedemo.com',

    // Thu trace khi test fail lan dau -> mo bang Trace Viewer de debug
    trace: 'on-first-retry',

    // Chup anh man hinh khi test that bai
    screenshot: 'only-on-failure',
  },

  // Chay test tren 3 trinh duyet. Khi moi hoc co the chi de lai 'chromium' cho nhanh.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
