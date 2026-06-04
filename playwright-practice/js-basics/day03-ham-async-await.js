/*
 * ============================================================
 *  NGAY 3 - JS CAN BAN: Ham, arrow function, async/await, Promise
 * ============================================================
 *  Chay:  node js-basics/day03-ham-async-await.js
 *
 *  Day la ngay QUAN TRONG NHAT cho Playwright, vi moi test deu la
 *  mot ham `async` va dung `await` truoc moi thao tac.
 * ============================================================
 */

// 1) HAM THUONG -------------------------------------------------
function cong(a, b) {
  return a + b;
}
console.log('cong(2,3) =', cong(2, 3));

// 2) ARROW FUNCTION (cach viet ngan, hay gap trong test) -------
// function cong(a,b){...}  <=>  const cong = (a, b) => a + b;
const nhan = (a, b) => a * b;
console.log('nhan(2,3) =', nhan(2, 3));

// Trong Playwright ban se thay rat nhieu:
//   test('ten test', async ({ page }) => { ... });
//                     ^^^^^ ^^^^^^^^^^^^^ deu la arrow function async

// 3) ASYNC / AWAIT ---------------------------------------------
// - Mot so viec can THOI GIAN (mo trang, doi mang). JS khong dung cho.
// - `await` = "doi cho xong viec nay roi moi lam tiep".
// - Chi dung duoc `await` ben trong ham co tu khoa `async`.

// Gia lap mot viec ton 1 giay (tra ve Promise)
function doiMotChut(giay) {
  return new Promise((resolve) => setTimeout(resolve, giay * 1000));
}

async function viDuAsync() {
  console.log('Bat dau mo trang...');
  await doiMotChut(1);        // doi 1 giay
  console.log('Da mo xong trang (sau 1 giay)');

  await doiMotChut(1);
  console.log('Da bam nut xong');
}

// Goi ham async
viDuAsync();

/*
 * Lien he toi Playwright that:
 *   await page.goto('https://www.saucedemo.com');   // doi trang mo xong
 *   await page.getByRole('button').click();          // doi bam xong
 *   await expect(page.getByText('Products')).toBeVisible();
 * => Tat ca deu co `await` o dau dong. Quen `await` la loi pho bien nhat
 *    cua nguoi moi.
 */

// 4) IMPORT / EXPORT (chia code ra nhieu file) -----------------
// File khac:  export const baseUrl = '...';
// File dung:  import { baseUrl } from './config.js';
// (Trong test Playwright: import { test, expect } from '@playwright/test';)

// 5) BAI TAP ----------------------------------------------------
// TODO 1: Viet arrow function `chao = (ten) => ...` tra ve chuoi
//         "Xin chao <ten>". In ket qua ra man hinh.
// TODO 2: Viet ham `async function chayTest()` in ra:
//         "Mo trang" -> (doi 1 giay) -> "Kiem tra tieu de" -> (doi 1 giay)
//         -> "Hoan tat". Dung await doiMotChut(1) giua cac buoc.
// TODO 3: Goi chayTest().

// ----- Viet code cua ban ben duoi -----

// (Loi giai: js-basics/solutions/day03-ham-async-await.js)
