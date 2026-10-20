// String methods return a new string. The original never changes.
const name = "  maya lopez  ";
const clean = name.trim().toUpperCase();
console.log(`Original: '${name}'`);
console.log(`Cleaned: '${clean}'`);

// slice(start, end) includes start and stops before end.
let course = "CSA-2115";
console.log(`Course: ${course.slice(0, 3)}`);
console.log(`Room: ${course.slice(4)}`);
console.log(`course.slice(1, 4) (index 1 up to 4): ${course.slice(1, 4)}`);

// indexOf() gives the index of the first match, or -1 if there is none.
console.log(`Index of '-': ${course.indexOf("-")}`);
console.log(`Has 'CSA': ${course.includes("CSA")}`);
console.log(`Replaced: ${course.replace("CSA", "CS1")}`);

// split() breaks a string into an array. join() puts the pieces back together.
const roster = "Ana,Ben,Chloe";
const names = roster.split(",");
console.log("Split:", names);
console.log(`Joined: ${names.join(" | ")}`);

// Edge case: calling a method without saving the result changes nothing.
course.toLowerCase();
console.log(`After course.toLowerCase(): ${course}`);
course = course.toLowerCase();
console.log(`After course = course.toLowerCase(): ${course}`);
