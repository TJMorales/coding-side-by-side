// Merge sort splits the array in half, sorts each half, then merges them.
// It always takes O(n log n) steps, even on the worst input.

function mergeSort(scores) {
  // Base case: an array with 0 or 1 items is already sorted.
  if (scores.length <= 1) {
    return [...scores];
  }
  const mid = Math.floor(scores.length / 2);
  // slice() makes new arrays, so the original array is never changed.
  const left = mergeSort(scores.slice(0, mid));
  const right = mergeSort(scores.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  // Take the smaller front item each time. <= keeps equal items in order (stable).
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  // One side is empty now. Copy whatever is left from the other side.
  result.push(...left.slice(i), ...right.slice(j));
  return result;
}

const show = (items) => `[${items.join(", ")}]`;

const quizScores = [88, 72, 95, 60, 72, 100, 81];
console.log("Before:", show(quizScores));
console.log("After: ", show(mergeSort(quizScores)));
console.log("Original unchanged:", show(quizScores));

// Edge cases: empty and single-item arrays return right away.
console.log("Empty:", show(mergeSort([])));
console.log("One item:", show(mergeSort([42])));
