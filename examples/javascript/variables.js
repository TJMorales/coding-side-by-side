// let makes a variable. = assigns the value on the right.
let studentName = "Maya";
let testScore = 88;

console.log("Student:", studentName);
console.log("Score:", testScore);

// Assigning again replaces the old value. Do not repeat let.
testScore = testScore + 5;
console.log("Score after curve:", testScore);

// You never write a type. typeof shows the type JavaScript read from the value.
console.log("Type of testScore:", typeof testScore);

// The same name can later hold a different type of value.
testScore = "absent";
console.log("Score now:", testScore);
console.log("Type of testScore now:", typeof testScore);

// const makes a variable that cannot be reassigned.
const maxScore = 100;
console.log("Max score:", maxScore);
