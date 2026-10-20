const scores = [88, 72, 95, 60, 100, 81, 54];

// An arrow function like (s) => s + 5 is a small unnamed function.
// Array methods chain in order: filter keeps items, map transforms them.
const curved = scores.filter((s) => s >= 70).map((s) => s + 5);
console.log(`Curved passing scores: [${curved.join(", ")}]`);

// Each array method runs right away and returns a new array.
const passing = scores.filter((s) => s >= 70);
const letters = passing.map((s) => (s >= 90 ? "A" : s >= 80 ? "B" : "C"));
console.log(`Passing: [${passing.join(", ")}]`);
console.log(`Letters: [${letters.join(", ")}]`);

// reduce() combines items two at a time into one value, starting from 0.
const total = scores.reduce((acc, s) => acc + s, 0);
console.log(`Total with reduce: ${total}`);
// Math.max(...scores) spreads the array into separate arguments.
console.log(`Highest: ${Math.max(...scores)}`);

// Object.fromEntries() builds an object from [key, value] pairs.
const names = ["Maya", "Leo", "Ava"];
const nameLengths = Object.fromEntries(names.map((name) => [name, name.length]));
console.log(`Name lengths: ${JSON.stringify(nameLengths)}`);

// Edge case: an array can be used again, but an iterator from values() only once.
const evens = scores.values().filter((s) => s % 2 === 0);
console.log(`First pass: [${evens.toArray().join(", ")}]`);
console.log(`Second pass: [${evens.toArray().join(", ")}]`);

// Edge case: reduce() on an empty array needs a starting value, or it fails.
console.log(`Empty total: ${[].reduce((acc, s) => acc + s, 0)}`);
try {
  [].reduce((acc, s) => acc + s);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
