// + - * work the way you expect.
console.log("7 + 2 =", 7 + 2);
console.log("7 - 2 =", 7 - 2);
console.log("7 * 2 =", 7 * 2);

// JavaScript has one number type, so / keeps the decimal.
console.log("7 / 2 =", 7 / 2);

// There is no // operator. Math.floor() rounds down. Math.trunc() drops the decimal.
console.log("Math.floor(7 / 2) =", Math.floor(7 / 2));
console.log("Math.trunc(7 / 2) =", Math.trunc(7 / 2));
console.log("7 % 2 =", 7 % 2);

// ** raises a number to a power.
console.log("2 ** 3 =", 2 ** 3);

// With negatives, floor and trunc differ, and % keeps the sign of the left number.
console.log("Math.floor(-7 / 2) =", Math.floor(-7 / 2));
console.log("Math.trunc(-7 / 2) =", Math.trunc(-7 / 2));
console.log("-7 % 2 =", -7 % 2);

// Round on purpose. You get different averages for the same total.
const total = 90 + 85 + 82;
console.log("Average with Math.floor:", Math.floor(total / 3));
console.log("Average with /:", total / 3);
