// A template literal uses backticks and puts values inside ${} directly in the text.
const student = "Jordan";
const average = 87.4567;
console.log(`${student}'s average: ${average}`);

// toFixed(2) rounds to 2 decimal places and returns a string. average keeps its full value.
console.log(`Rounded: ${average.toFixed(2)}`);

// padEnd() adds spaces on the right (aligns left). padStart() adds them on the left (aligns right).
const courses = ["Algebra", "Biology", "CS"];
const grades = [91.5, 84.62, 99.0];
console.log("Class".padEnd(12) + "Grade".padStart(6));
for (let i = 0; i < courses.length; i++) {
  console.log(courses[i].padEnd(12) + grades[i].toFixed(1).padStart(6));
}

// toLocaleString() adds thousands separators. For a percent, multiply by 100 yourself.
const raised = 12500.5;
console.log(`Fundraiser: $${raised.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
console.log(`Completion: ${(7 / 8 * 100).toFixed(1)}%`);

// A template literal is a string, so you can save it in a variable instead of printing it.
const label = `${student}: ${average.toFixed(1)}`;
console.log(`Label: ${label}`);

// Edge case: padEnd() sets a minimum length. Longer text is not cut off.
console.log(`[${"Computer Science".padEnd(5)}]`);
