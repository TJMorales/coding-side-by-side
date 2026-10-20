function linearSearch(items, target) {
  let comparisons = 0;
  // Check each item from the front until you find the target.
  for (let i = 0; i < items.length; i++) {
    comparisons++;
    if (items[i] === target) {
      return { index: i, comparisons };
    }
  }
  return { index: -1, comparisons };
}

function binarySearch(items, target) {
  // Binary search only works when the array is already sorted.
  let comparisons = 0;
  let low = 0;
  let high = items.length - 1;
  while (low <= high) {
    // / can give a decimal, so Math.floor makes mid a whole-number index.
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    if (items[mid] === target) {
      return { index: mid, comparisons };
    } else if (items[mid] < target) {
      low = mid + 1; // target is in the right half
    } else {
      high = mid - 1; // target is in the left half
    }
  }
  return { index: -1, comparisons };
}

function report(items, target) {
  // Destructuring pulls index and comparisons out of the returned object.
  const linear = linearSearch(items, target);
  console.log(`Linear search for ${target}: index ${linear.index}, ${linear.comparisons} comparisons`);
  const { index, comparisons } = binarySearch(items, target);
  console.log(`Binary search for ${target}: index ${index}, ${comparisons} comparisons`);
}

const scores = [55, 61, 68, 72, 77, 81, 85, 88, 90, 94, 97, 100];
console.log(`Scores: [${scores.join(", ")}]`);

report(scores, 88);
report(scores, 100);

// Edge case: a missing value returns -1 after checking as much as needed.
report(scores, 70);
