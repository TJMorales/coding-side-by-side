// A grid is an array of arrays. Each inner array is one row.
// Each row is a student. Each column is one of 4 quiz scores.
const grades = [
  [90, 85, 77, 92],
  [68, 74, 81, 70],
  [100, 95, 98, 99],
];

// grid[row][col]: the row comes first, then the column.
console.log(`Student 2, quiz 3: ${grades[1][2]}`);
console.log(`Rows: ${grades.length}, columns: ${grades[0].length}`);

// Nested loops visit every cell, one row at a time.
for (let row = 0; row < grades.length; row++) {
  let total = 0;
  for (let col = 0; col < grades[row].length; col++) {
    total += grades[row][col];
  }
  console.log(`Student ${row + 1} average: ${total / grades[row].length}`);
}

// Change one cell.
grades[1][0] = 72;
console.log("Updated student 2:", grades[1]);

// Build an empty grid with Array.from(). The arrow function makes a new row each time.
const blank = Array.from({ length: 3 }, () => Array(4).fill(0));
blank[0][0] = 5;
console.log("Right way:", blank);

// Edge case: fill() puts the SAME row in every slot, so one change shows up in every row.
const wrong = Array(3).fill(Array(4).fill(0));
wrong[0][0] = 5;
console.log("Wrong way:", wrong);
