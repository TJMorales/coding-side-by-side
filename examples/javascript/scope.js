// let and const are block scoped: they exist only inside their braces.
const score = 93;
if (score >= 90) {
  const message = "Honor roll";
  console.log(`Inside the if: ${message}`);
}
// Using message here would crash: ReferenceError: message is not defined

// To use a value after the block, declare it BEFORE the block.
let status = "Regular";
if (score >= 90) {
  status = "Honor roll";
}
console.log(`After the if: ${status}`);

// Older code uses var. var ignores if and loop braces, so it is still there after them.
for (var quiz = 1; quiz <= 3; quiz++) {
  var lastQuiz = quiz;
}
console.log(`After the loop, var quiz is ${quiz} and lastQuiz is ${lastQuiz}`);

// A function can change a variable declared outside it. No global keyword is needed.
let totalPoints = 0;
function addPoints(points) {
  totalPoints += points;
}
addPoints(10);
addPoints(15);
console.log(`Total points: ${totalPoints}`);
// Edge case: let inside a function makes a new local variable with the same name.
function reset() {
  let totalPoints = 0;   // local only; the outer variable keeps its value
}
reset();
console.log(`After reset(): ${totalPoints}`);
