/*
 * ============================================================
 *  NGAY 1 - JS CAN BAN: Bien & Kieu du lieu
 * ============================================================
 *  Cach chay file nay:  node js-basics/day01-bien-kieu-du-lieu.js
 *
 *  Muc tieu: hieu let/const, cac kieu du lieu, console.log,
 *  template string. Day la nhung thu xuat hien lien tuc trong test.
 * ============================================================
 */

// 1) BIEN ------------------------------------------------------
// const  = hang so, KHONG gan lai duoc (dung mac dinh, an toan nhat)
// let    = bien, CO THE gan lai duoc
const tenDuAn = 'SauceDemo';
let soLuongTest = 5;
soLuongTest = 6; // OK vi la let

console.log('Du an:', tenDuAn);
console.log('So luong test:', soLuongTest);

// 2) CAC KIEU DU LIEU HAY GAP -----------------------------------
const chuoi = 'admin';          // string  (chuoi van ban)
const so = 42;                  // number
const dung = true;              // boolean (true / false)
const khong = null;             // null    (co y nghia: rong)
let chuaGan;                    // undefined (chua gan gia tri)

console.log(typeof chuoi, typeof so, typeof dung, typeof khong, typeof chuaGan);

// 3) TEMPLATE STRING (rat hay dung de ghep chuoi) ---------------
// Dung dau backtick `...` va ${...} de chen bien vao chuoi
const username = 'standard_user';
console.log(`Dang dang nhap voi user: ${username}`);

// 4) BAI TAP ----------------------------------------------------
// TODO 1: Tao 1 const ten `baseUrl` = 'https://www.saucedemo.com'
// TODO 2: In ra man hinh: "Trang test: https://www.saucedemo.com"
//         (dung template string)
// TODO 3: Tao 1 let `soTestPass` = 3, sau do gan lai = 10 va in ra.

// ----- Viet code cua ban ben duoi -----

// (Loi giai o file: js-basics/solutions/day01-bien-kieu-du-lieu.js)
