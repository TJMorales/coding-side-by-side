// showTotal prints the total. You see it, but the program cannot use it later.
function showTotal(quiz, test) {
  console.log("Total:", quiz + test);
}

// getTotal returns the total, so you can store it and do math with it.
function getTotal(quiz, test) {
  return quiz + test;
}

// return ends the function right away. Only the first return that runs counts.
function letterGrade(score) {
  if (score >= 90) {
    return "A";
  }
  if (score >= 80) {
    return "B";
  }
  return "C or below";
}

showTotal(40, 45);
const total = getTotal(40, 45);
console.log("Average:", total / 2);
console.log("85 earns:", letterGrade(85));

// Edge case: showTotal has no return, so it gives back undefined.
const result = showTotal(30, 35);
console.log("showTotal returned:", result);
