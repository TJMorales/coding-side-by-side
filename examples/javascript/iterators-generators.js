// A generator function has * and uses yield. Each next() runs the code until
// the next yield, hands back that value, and pauses there.
function* countdown(start) {
  while (start > 0) {
    yield start;
    start--;
  }
}

// A generator that splits a roster into groups of size.
function* chunks(items, size) {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}

// The same countdown written as a class with the iterator protocol.
// [Symbol.iterator]() returns the iterator. next() returns { value, done }.
class Countdown {
  constructor(start) {
    this.current = start;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.current <= 0) {
      return { value: undefined, done: true };
    }
    return { value: this.current--, done: false };
  }
}

// The spread [...x] runs the iterator to the end and collects every value.
console.log(`Generator: [${[...countdown(5)].join(", ")}]`);
console.log(`Class:     [${[...new Countdown(5)].join(", ")}]`);

const roster = ["Maya", "Leo", "Ava", "Zoe", "Ben", "Ivy", "Sam"];
let number = 1;
for (const group of chunks(roster, 3)) {
  console.log(`Lab group ${number++}: [${group.join(", ")}]`);
}

// A for...of loop calls next() for you. Here it is by hand.
const launch = countdown(3);
console.log("next():", launch.next().value, launch.next().value, launch.next().value);
// Edge case: the generator is used up. next() returns done: true instead of throwing.
console.log("After the end:", launch.next());

// Generators are lazy: values are made only when asked for, so this
// endless one is safe as long as you stop early.
function* studentIds() {
  let n = 1000;
  while (true) {
    yield n++;
  }
}

console.log(`First 4 IDs: [${studentIds().take(4).toArray().join(", ")}]`);
