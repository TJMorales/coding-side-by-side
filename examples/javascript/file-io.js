const fs = require("fs");

// writeFileSync() creates the file, or erases it if it already exists.
// It opens, writes, and closes the file in one call.
fs.writeFileSync("scores.txt", "Ana,91\nBen,78\nChloe,85\n");   // \n is not added for you

// appendFileSync() adds to the end of the file instead of erasing it.
fs.appendFileSync("scores.txt", "Dev,94\n");

// readFileSync() with "utf8" reads the whole file as one string.
const text = fs.readFileSync("scores.txt", "utf8");
let total = 0;
let count = 0;
// trim() removes the last \n, so split() does not make an empty last line.
for (const line of text.trim().split("\n")) {
  const [name, score] = line.split(",");
  total += Number(score);
  count++;
  console.log(`${name}: ${score}`);
}
console.log(`Class average: ${total / count}`);

// Edge case: reading a missing file throws an error with the code "ENOENT".
try {
  console.log(fs.readFileSync("missing.txt", "utf8"));
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("missing.txt does not exist");
  }
}
