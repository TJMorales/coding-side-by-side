// The basic types: number, string, boolean.
const players = 11;            // number: whole number
const averagePoints = 14.5;    // number: decimals use the same type
const teamName = "Rangers";    // string: text in quotes
const isHomeGame = true;       // boolean: true or false

console.log(players, typeof players);
console.log(averagePoints, typeof averagePoints);
console.log(teamName, typeof teamName);
console.log(isHomeGame, typeof isHomeGame);

// JavaScript has no separate character type. One letter is a string of length 1.
const grade = "A";
console.log(grade, typeof grade);

// A variable with no value yet holds undefined.
let nickname;
console.log(nickname, typeof nickname);

// Whole numbers are exact only up to Number.MAX_SAFE_INTEGER. Past it, they lose accuracy.
console.log("Big number:", 2147483647 + 1);
console.log("Max safe integer:", Number.MAX_SAFE_INTEGER);
console.log("Max safe + 2:", Number.MAX_SAFE_INTEGER + 2);
