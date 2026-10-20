// An array holds several values in order, inside square brackets.
const scores = [88, 92, 75];

// Index numbers start at 0. The last index is scores.length - 1.
console.log("First score:", scores[0]);
console.log("Last score:", scores[scores.length - 1]);
console.log("Number of scores:", scores.length);

// You can change a value at an index. const stops reassigning scores, not changing its values.
scores[2] = 79;
console.log("After fixing a score:", scores);

// An array can grow. push() adds a value to the end.
scores.push(95);
console.log("After push:", scores);
console.log("Number of scores now:", scores.length);

// Edge case: an index past the end gives undefined. It does not crash.
console.log("scores[10]:", scores[10]);
