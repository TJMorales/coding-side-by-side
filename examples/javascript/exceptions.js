// throw stops the function and reports an error to the caller.
function parseScore(text) {
  const score = Number(text);
  // Number("abc") gives NaN instead of an error, so check for it yourself.
  if (Number.isNaN(score)) {
    throw new Error(`'${text}' is not a number`);
  }
  if (score < 0 || score > 100) {
    throw new RangeError(`score must be 0 to 100, got ${score}`);
  }
  return score;
}

for (const entry of ["88", "abc", "105"]) {
  try {
    const score = parseScore(entry);
    console.log(`Saved score: ${score}`);
  } catch (error) {
    // The program keeps running instead of crashing.
    console.log(`Bad entry '${entry}': ${error.name}: ${error.message}`);
  } finally {
    // finally runs every time, error or not.
    console.log(`Done checking '${entry}'`);
  }
}

// Edge case: dividing by zero is not an error. It gives Infinity, so catch never runs.
try {
  console.log(`Average: ${(90 + 80) / 0}`);
} catch (error) {
  console.log("This does not run");
}
