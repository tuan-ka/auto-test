# Lộ trình học Playwright + JavaScript cho Tester (2 tuần cấp tốc)

> Tài liệu tra cứu nhanh đi kèm slide `playwright-lo-trinh.html` và project `playwright-practice/`.
> Dành cho manual tester chuyển sang automation, chưa biết lập trình.
> Cập nhật theo Playwright **1.59 (2026)** — không dùng tài liệu cũ.

---

## Cách dùng bộ tài liệu này

1. **Mở slide** `playwright-lo-trinh.html` bằng trình duyệt → học lý thuyết từng ngày, làm quiz cuối tuần, ôn flashcard.
2. **Mở project** `playwright-practice/` → làm bài tập thực hành (có lời giải).
3. **File này** = bản đồ tổng + cheat-sheet để tra nhanh khi quên cú pháp.

Nguyên tắc: **làm trước, hiểu sau**. Mỗi ngày phải có code chạy được, đừng cố hiểu 100% lý thuyết rồi mới làm.

---

## TUẦN 1 — Nền tảng JS + Test đầu tiên

| Ngày | Mục tiêu | Thực hành |
|------|----------|-----------|
| 1 | Cài Node.js + VS Code + Playwright. JS: biến, kiểu dữ liệu, `console.log` | `js-basics/day01` |
| 2 | JS: `if/else`, vòng lặp, mảng, object | `js-basics/day02` |
| 3 | JS: hàm, arrow function, **async/await**, import/export | `js-basics/day03` |
| 4 | HTML/CSS/DOM vừa đủ + DevTools (F12) để soi element | (đọc slide ngày 4) |
| 5 | Viết test đầu tiên, `npx playwright test --ui`, Codegen | `tests/day05` |

## TUẦN 2 — Playwright chuyên sâu + Dự án thật

| Ngày | Mục tiêu | Thực hành |
|------|----------|-----------|
| 6 | Locators chuẩn 2026: `getByRole`, `getByTestId`... | `tests/day06` |
| 7 | Actions + web-first assertions + auto-waiting | `tests/day07` |
| 8 | Page Object Model + hooks (`beforeEach`) | `tests/day08` |
| 9 | Debug: Trace Viewer, UI Mode, ảnh/video khi fail | (đọc slide ngày 9) |
| 10 | Data-driven: chạy nhiều bộ dữ liệu | `tests/day10` |
| 11 | API testing + CI/CD (GitHub Actions) + report | `tests/day11` |
| 12 | Mới 2026: Playwright Agents (Planner/Generator/Healer), MCP | (đọc slide ngày 12) |
| 13–14 | Capstone: E2E mua hàng hoàn chỉnh | `tests/day13` |

## TUẦN 3 — Thực chiến (lấp lỗ hổng để vào dự án thật)

| Ngày | Mục tiêu | Thực hành |
|------|----------|-----------|
| 15 | **Strict mode** & lọc locator (`.filter`, `.nth`, `.first`, chaining), làm việc với danh sách/bảng | `tests/day15` |
| 16 | **Tái dùng đăng nhập**: custom fixture + `storageState` | `fixtures/auth.fixture.js`, `tests/day16` |
| 17 | **iframe, tab/popup mới, upload/download, dialog/alert** | `tests/day17` |
| 18 | **Mock/chặn network** (`page.route`, `fulfill`, `abort`) + chờ dữ liệu động | `tests/day18` |
| 19 | **Tổ chức test** (`describe`, `step`, tag, skip) + cấu hình môi trường (`baseURL`, `.env`) | `tests/day19` |
| 20 | **Git căn bản** cho tester (branch, commit, push, Pull Request) | (đọc slide ngày 20) |

> Tuần 3 là phần khác biệt giữa "viết được test mẫu" và "thực chiến dự án thật". Đây là các tình huống
> bạn **chắc chắn gặp** ngay tuần đầu đi làm: strict mode violation, login chậm, iframe thanh toán,
> popup, API lỗi, và Git để làm việc nhóm.

---

## CHEAT-SHEET — các lệnh hay dùng

### Dòng lệnh (terminal)
```bash
npm init playwright@latest      # tao project moi
npx playwright test             # chay tat ca test
npx playwright test --ui        # che do UI (nen dung khi hoc)
npx playwright test --headed    # mo trinh duyet that de nhin
npx playwright test --debug     # chay tung buoc, debug
npx playwright show-report      # xem bao cao HTML
npx playwright codegen <url>    # tu ghi thao tac -> code
npx playwright show-trace       # mo Trace Viewer xem lai khi fail
```

### Khung 1 test
```js
import { test, expect } from '@playwright/test';

test('mo ta test bang tieng nguoi', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Locators (THỨ TỰ ƯU TIÊN từ trên xuống)
```js
page.getByRole('button', { name: 'Login' })   // 1. tot nhat
page.getByLabel('Password')                    // 2. o nhap co nhan
page.getByPlaceholder('Username')              // 3. theo placeholder
page.getByText('Welcome')                      // 4. theo text
page.getByTestId('submit-btn')                 // 5. khi co data-testid
// TRANH: page.locator('div.btn > span.x')     // CSS/XPath cung -> de gay
```

### Actions (thao tác)
```js
await locator.click();
await locator.fill('text');         // dien o nhap (nen dung)
await locator.check();              // tick checkbox
await locator.selectOption('VN');   // chon dropdown
await locator.press('Enter');
await locator.hover();
```

### Assertions (kiểm tra — luôn có `await expect`)
```js
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Products');
await expect(locator).toHaveValue('admin');
await expect(locator).toHaveCount(3);
await expect(page).toHaveURL(/inventory/);
await expect(page).toHaveTitle(/todos/);
```

### Hooks (chạy quanh test)
```js
test.beforeEach(async ({ page }) => { /* chay truoc moi test */ });
test.afterEach(async ({ page }) => { /* chay sau moi test */ });
```

### API testing
```js
test('api', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users/2');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.data.id).toBe(2);
});
```

---

## QUY TẮC VÀNG (best practices 2026)

- ✅ Test theo góc nhìn người dùng: ưu tiên `getByRole` / `getByLabel` / `getByTestId`.
- ✅ Luôn `await expect(...)` → Playwright **auto-wait**, không cần sleep.
- ❌ KHÔNG dùng `page.waitForTimeout(3000)` (sleep cứng) → test chậm + chập chờn (flaky).
- ❌ KHÔNG dùng CSS/XPath dài, phụ thuộc cấu trúc DOM.
- ✅ Mỗi test độc lập, không phụ thuộc test khác (nhờ `beforeEach` reset trạng thái).
- ✅ Test fail → mở **Trace Viewer** / `--ui` để xem lại từng bước, đừng đoán mò.
- ✅ Đặt tên test rõ ràng bằng "tiếng người": mô tả *hành vi*, không mô tả *kỹ thuật*.

---

## Điểm MỚI của Playwright 2026 (để không học lỗi thời)

- **Playwright Agents** (từ 1.56): bộ 3 agent AI —
  *Planner* (khám phá app → tạo kế hoạch test dạng Markdown),
  *Generator* (biến kế hoạch thành file test),
  *Healer* (chạy test, tự sửa test fail).
- **Codegen tự sinh assertion** `toBeVisible()` cho các thao tác phổ biến (bật trong settings của Codegen).
- **Speedboard / Timeline** trong HTML report (1.58): xem chỗ nào tốn thời gian, tìm bottleneck.
- **Đã GỠ BỎ**: selector engine `_react` / `_vue` và hậu tố `:light` — chuyển sang `getByRole`/`getByTestId` hoặc CSS chuẩn.
- **Playwright MCP**: cho phép agent AI điều khiển trình duyệt — nền cho việc viết test bằng AI.

---

## Nguồn tài liệu mới nhất (2026)

- Trang chủ & docs: <https://playwright.dev>
- Best Practices: <https://playwright.dev/docs/best-practices>
- Locators: <https://playwright.dev/docs/locators>
- Test generator (Codegen): <https://playwright.dev/docs/codegen>
- Release notes: <https://playwright.dev/docs/release-notes>
- What's new in 2026: <https://getdecipher.com/blog/whats-new-with-playwright-in-2026>
- Roadmap học 2026: <https://testdino.com/blog/learn-playwright>
- Cheat sheet 2026: <https://www.webfuse.com/playwright-cheat-sheet>
