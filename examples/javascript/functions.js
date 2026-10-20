// function defines a function. score and total are parameters. No types are written.
function percent(score, total) {
  return score / total * 100;
}

// A function without return gives back undefined.
function printReport(name, grade) {
  console.log(name, "has", grade, "percent");
}

// Call a function by its name with arguments in parentheses.
const result = percent(45, 50);
printReport("Jordan", result);

// Each call runs the body again with new arguments.
printReport("Ava", percent(38, 40));

// printReport has no return, so its result is undefined.
const returned = printReport("Leo", percent(20, 25));
console.log("printReport returned:", returned);
