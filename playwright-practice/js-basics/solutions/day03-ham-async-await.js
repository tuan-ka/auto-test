/* LOI GIAI - Ngay 3.  Chay: node js-basics/solutions/day03-ham-async-await.js */

function doiMotChut(giay) {
  return new Promise((resolve) => setTimeout(resolve, giay * 1000));
}

// TODO 1
const chao = (ten) => `Xin chao ${ten}`;
console.log(chao('Tester'));

// TODO 2
async function chayTest() {
  console.log('Mo trang');
  await doiMotChut(1);
  console.log('Kiem tra tieu de');
  await doiMotChut(1);
  console.log('Hoan tat');
}

// TODO 3
chayTest();
