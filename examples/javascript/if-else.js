let score = 84;
let letter;

// The condition goes in parentheses. Braces mark the lines that belong to it.
// Only the first true branch runs, checking from top to bottom.
if (score >= 90) {
  letter = "A";
} else if (score >= 80) {
  letter = "B";
} else if (score >= 70) {
  letter = "C";
} else {
  letter = "F";
}
console.log("Score:", score, "Letter:", letter);

// Order matters. 95 is also >= 80, but only the first true branch runs.
score = 95;
if (score >= 80) {
  console.log("Score:", score, "Branch: B or better");
} else if (score >= 90) {
  console.log("Score:", score, "Branch: A (this never runs)");
}
