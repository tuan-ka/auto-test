/* LOI GIAI - Ngay 17 (TODO 1: JS Confirm -> dismiss) */
import { test, expect } from '@playwright/test';

test('xu ly JS Confirm bang dismiss', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss(); // bam Cancel
  });
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

// TODO 2 (download) - mau tham khao:
//   const [download] = await Promise.all([
//     page.waitForEvent('download'),
//     page.getByText('Tai file').click(),
//   ]);
//   await download.saveAs('C:/tmp/' + download.suggestedFilename());
