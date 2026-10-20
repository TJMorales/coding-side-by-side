const show = (items) => `[${items.join(", ")}]`;

function selectionSort(items) {
  for (let i = 0; i < items.length - 1; i++) {
    // Find the smallest value in the unsorted part.
    let smallest = i;
    for (let j = i + 1; j < items.length; j++) {
      if (items[j] < items[smallest]) {
        smallest = j;
      }
    }
    // Swap it into position i. Destructuring swaps in one line, like Python.
    [items[i], items[smallest]] = [items[smallest], items[i]];
    console.log(`Pass ${i + 1}: ${show(items)}`);
  }
}

function insertionSort(items) {
  let shifts = 0;
  for (let i = 1; i < items.length; i++) {
    const current = items[i];
    let j = i - 1;
    // Shift larger values right to open a gap for current.
    while (j >= 0 && items[j] > current) {
      items[j + 1] = items[j];
      j--;
      shifts++;
    }
    items[j + 1] = current;
  }
  return shifts;
}

let scores = [88, 72, 95, 61, 79];
console.log(`Start:  ${show(scores)}`);
selectionSort(scores);

scores = [88, 72, 95, 61, 79];
let shifts = insertionSort(scores);
console.log(`Insertion sort: ${show(scores)}, ${shifts} shifts`);

// Edge case: insertion sort does no shifts on an array that is already sorted.
shifts = insertionSort(scores);
console.log(`Sorted again:   ${show(scores)}, ${shifts} shifts`);
