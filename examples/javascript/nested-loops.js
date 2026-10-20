// The inner loop runs all the way through for each pass of the outer loop.
console.log("Times table (1 to 4):");
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let col = 1; col <= 4; col++) {
    line += String(row * col).padStart(4);
  }
  console.log(line);  // prints the row after the inner loop finishes
}

// The inner body runs rows x columns times.
let count = 0;
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 5; col++) {
    count++;
  }
}
console.log(`3 rows x 5 columns = ${count} inner steps`);

// Edge case: the inner loop can use the outer variable to change its length.
console.log("Staircase:");
for (let row = 1; row <= 4; row++) {
  for (let col = 0; col < row; col++) {
    process.stdout.write("*");
  }
  console.log();
}
