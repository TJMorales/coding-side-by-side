// A while loop repeats as long as its condition is true.
// The condition goes in parentheses and the body goes in braces.
let savings = 0;
let weeks = 0;
while (savings < 100) {
  savings = savings + 30;
  weeks = weeks + 1;
  console.log("Week", weeks, "Savings:", savings);
}
console.log("Reached the goal in", weeks, "weeks");

// Something in the body must change the condition, or the loop never stops.
// If the condition is false at the start, the body runs zero times.
const lives = 0;
while (lives > 0) {
  console.log("Playing with", lives, "lives");
}
console.log("Loop skipped because lives is", lives);
