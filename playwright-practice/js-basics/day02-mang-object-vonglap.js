/*
 * ============================================================
 *  NGAY 2 - JS CAN BAN: if/else, vong lap, mang (array), object
 * ============================================================
 *  Chay:  node js-basics/day02-mang-object-vonglap.js
 * ============================================================
 */

// 1) IF / ELSE -------------------------------------------------
const ketQua = 'pass';
if (ketQua === 'pass') {          // chu y: dung === (3 dau bang) de so sanh
  console.log('Test PASS [OK]');
} else {
  console.log('Test FAIL [X]');
}

// 2) MANG (ARRAY) - danh sach nhieu phan tu --------------------
const nguoiDung = ['standard_user', 'locked_out_user', 'problem_user'];
console.log('So user:', nguoiDung.length);  // .length = so phan tu
console.log('User dau tien:', nguoiDung[0]); // dem tu 0

// 3) VONG LAP for...of - duyet qua tung phan tu ----------------
for (const user of nguoiDung) {
  console.log('Se test voi user:', user);
}

// 4) OBJECT - du lieu dang khoa: gia tri -----------------------
const taiKhoan = {
  username: 'standard_user',
  password: 'secret_sauce',
  hopLe: true,
};
console.log('Mat khau:', taiKhoan.password);   // truy cap bang dau cham
console.log('Username:', taiKhoan['username']); // hoac bang ngoac vuong

// 5) MANG CAC OBJECT (cuc ky hay dung cho data-driven test) ----
const boTestDangNhap = [
  { username: 'standard_user', password: 'secret_sauce', mongDoi: 'thanh cong' },
  { username: 'locked_out_user', password: 'secret_sauce', mongDoi: 'bi khoa' },
];
for (const tc of boTestDangNhap) {
  console.log(`Test: ${tc.username} -> mong doi: ${tc.mongDoi}`);
}

// 6) BAI TAP ----------------------------------------------------
// TODO 1: Tao mang `sanPham` gom 3 ten san pham bat ky.
// TODO 2: Dung for...of in ra tung san pham theo dang "San pham: <ten>".
// TODO 3: Tao object `gioHang` co: tenSanPham (string), soLuong (number),
//         conHang (boolean). In ra so luong trong gio hang.

// ----- Viet code cua ban ben duoi -----

// (Loi giai: js-basics/solutions/day02-mang-object-vonglap.js)
