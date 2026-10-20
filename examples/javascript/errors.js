// This program has a bug on purpose. Read the error at the bottom of the output.
const scores = [88, 92, 75];
console.log("Number of scores:", scores.length);
console.log("First score:", scores[0]);

// A bad index does not crash in JavaScript. It gives undefined.
console.log("Fourth score:", scores[3]);

// The crash comes when you use undefined as if it were a number.
// toFixed(1) rounds a number to 1 decimal place, but undefined has no toFixed.
console.log("Fourth score rounded:", scores[3].toFixed(1));
console.log("This line never runs.");

// How to read the error:
// 1. Find the line that starts with TypeError. It names the error type and the reason:
//    TypeError: Cannot read properties of undefined (reading 'toFixed')
// 2. The first line of the error names the file and the line number (main.js:11).
// 3. The ^ mark points at toFixed, the exact part of the line that failed.
