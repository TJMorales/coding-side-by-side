// A comparison gives a boolean: true or false.
const score = 85;
console.log("score >= 70:", score >= 70);
console.log("score === 100:", score === 100);
console.log("score !== 100:", score !== 100);

// && (and) is true only when both sides are true.
const homeworkDone = true;
console.log("Passed and homework done:", score >= 70 && homeworkDone);

// || (or) is true when at least one side is true.
const hasLatePass = false;
console.log("Homework done or late pass:", homeworkDone || hasLatePass);

// ! (not) flips true to false and false to true.
console.log("Not homework done:", !homeworkDone);

// === compares the value and the type. == converts types first, which can surprise you.
console.log('score === "85":', score === "85");
console.log('score == "85":', score == "85");
