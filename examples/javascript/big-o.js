// Big-O describes how the number of steps grows as the input size n grows.
// Counting steps gives the same answer on every computer. Timing does not.

function linearSearch(items, target) {
  let steps = 0;
  for (const item of items) {
    steps++;
    if (item === target) {
      break;
    }
  }
  return steps;
}

// Only works on a sorted array. Each step cuts the search range in half.
function binarySearch(items, target) {
  let steps = 0;
  let lo = 0;
  let hi = items.length - 1;
  while (lo <= hi) {
    steps++;
    const mid = Math.floor((lo + hi) / 2);
    if (items[mid] === target) {
      break;
    } else if (items[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return steps;
}

// Two nested loops over n items run n * n times: O(n^2).
function countPairs(n) {
  let steps = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      steps++;
    }
  }
  return steps;
}

// padStart(width) lines up each column on the right.
const row = (a, b, c, d) =>
  `${String(a).padStart(6)} ${String(b).padStart(12)} ${String(c).padStart(16)} ${String(d).padStart(13)}`;

console.log(row("n", "O(n) linear", "O(log n) binary", "O(n^2) pairs"));
for (const n of [10, 100, 1000]) {
  const studentIds = Array.from({ length: n }, (_, i) => i); // sorted IDs 0 to n - 1
  const missingId = n; // not in the array: the worst case
  console.log(row(n, linearSearch(studentIds, missingId), binarySearch(studentIds, missingId), countPairs(n)));
}

// Edge case: the best case is very different from the worst case.
const ids = Array.from({ length: 1000 }, (_, i) => i);
console.log("Linear search for the first ID:", linearSearch(ids, 0), "step");

// To time code anyway, use performance.now(). The result changes on every run:
// const start = performance.now(); linearSearch(ids, 1000); console.log(performance.now() - start);
