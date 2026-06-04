# Playwright Practice — Bộ bài tập học từ A → Z

Đây là project bài tập đi kèm slide `playwright-lo-trinh.html`. Mỗi file bài tập ứng với
một ngày trong lộ trình 2 tuần. Có **đề bài** (phần `// TODO`) và **lời giải** để đối chiếu.

## 1. Cài đặt (làm 1 lần)

Cần cài [Node.js](https://nodejs.org) phiên bản LTS trước (kiểm tra: `node -v`).

```bash
# Mo terminal ngay trong thu muc playwright-practice, roi chay:
npm install
npx playwright install        # tai cac trinh duyet (Chromium/Firefox/WebKit)
```

> Mẹo: bạn cũng có thể tạo project mới từ đầu bằng `npm init playwright@latest`. Project này
> đã cấu hình sẵn theo chuẩn 2026 để bạn tập trung vào việc viết test.

## 2. Phần JavaScript căn bản (Ngày 1–3)

Các file trong `js-basics/` chạy bằng Node, **không cần trình duyệt**:

```bash
node js-basics/day01-bien-kieu-du-lieu.js
node js-basics/day02-mang-object-vonglap.js
node js-basics/day03-ham-async-await.js
```

Làm phần `// TODO` trong file, chạy lại để xem kết quả, rồi mở `js-basics/solutions/` để đối chiếu.

## 3. Phần Playwright (Ngày 5–14)

```bash
# Chay tat ca test
npx playwright test

# Chay 1 file
npx playwright test tests/day05-test-dau-tien.spec.js

# Che do UI (de nhin, co nut tua di tua lai) - RAT NEN DUNG khi moi hoc
npx playwright test --ui

# Xem bao cao sau khi chay
npx playwright show-report

# Tu ghi thao tac thanh code (Codegen)
npx playwright codegen https://www.saucedemo.com
```

## 4. Thứ tự file theo lộ trình

| Ngày | File | Chủ đề |
|------|------|--------|
| 1 | `js-basics/day01-bien-kieu-du-lieu.js` | Biến, kiểu dữ liệu |
| 2 | `js-basics/day02-mang-object-vonglap.js` | Mảng, object, vòng lặp |
| 3 | `js-basics/day03-ham-async-await.js` | Hàm, async/await |
| 5 | `tests/day05-test-dau-tien.spec.js` | Test đầu tiên |
| 6 | `tests/day06-locators.spec.js` | Locators chuẩn 2026 |
| 7 | `tests/day07-actions-assertions.spec.js` | Actions + assertions |
| 8 | `tests/day08-page-object-model.spec.js` | Page Object Model |
| 10 | `tests/day10-login-data-driven.spec.js` | Data-driven |
| 11 | `tests/day11-api-testing.spec.js` | API testing |
| 13–14 | `tests/day13-capstone-e2e.spec.js` | Capstone E2E |
| 15 | `tests/day15-strict-mode-filter.spec.js` | Strict mode & lọc locator |
| 16 | `fixtures/auth.fixture.js` + `tests/day16-tai-dung-dang-nhap.spec.js` | Tái dùng đăng nhập |
| 17 | `tests/day17-iframe-tab-file.spec.js` | iframe, tab, upload, dialog |
| 18 | `tests/day18-network-mock.spec.js` | Mock/chặn network |
| 19 | `tests/day19-to-chuc-cau-hinh.spec.js` | Tổ chức test & config |

Lời giải nằm trong `js-basics/solutions/` và `tests/solutions/`.

> **Tuần 3 (ngày 15–20)** là phần "thực chiến": các tình huống bạn chắc chắn gặp ở dự án thật.
> Ngày 20 (Git căn bản) học trên slide, không có file bài tập riêng.

## 5. Web demo dùng để luyện tập

- TodoMVC: https://demo.playwright.dev/todomvc
- SauceDemo (login/giỏ hàng): https://www.saucedemo.com — user: `standard_user`, pass: `secret_sauce`
- Practice site: https://practice.expandtesting.com
- API demo: https://reqres.in

## 6. Quy tắc vàng (2026)

- ✅ Ưu tiên `getByRole`, `getByLabel`, `getByTestId` — đừng dùng CSS/XPath cứng.
- ✅ Luôn `await expect(...)` cho assertion → Playwright tự đợi (auto-wait).
- ❌ Tránh `page.waitForTimeout(...)` (sleep cứng) — gây test chậm và chập chờn.
- ✅ Khi test fail: chạy lại với `--ui` hoặc mở **Trace Viewer** để xem lại từng bước.
