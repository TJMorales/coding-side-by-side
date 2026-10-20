// JavaScript has no generics or type checks. JSDoc comments describe types for your editor.

/** A box that holds one item of type T. @template T */
class Box {
  /** @param {T} item */
  constructor(item) {
    this.item = item;
  }

  /** @returns {T} */
  get() {
    return this.item;
  }

  toString() {
    return `Box(${JSON.stringify(this.item)})`;
  }
}

/** @template A, B */
class Pair {
  /**
   * @param {A} first
   * @param {B} second
   */
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  toString() {
    return `Pair(${JSON.stringify(this.first)}, ${JSON.stringify(this.second)})`;
  }
}

/**
 * @template T
 * @param {T[]} items
 * @returns {T} the same type as the array's items
 */
const firstItem = (items) => items[0];

/** @param {number[]} scores */
function average(scores) {
  // A runtime check is the only way to stop a wrong type while the program runs.
  if (!scores.every((s) => typeof s === "number")) {
    throw new TypeError("average() needs an array of numbers");
  }
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

const locker = new Box("Calculator");
console.log("Box holds:", locker.get());
const student = new Pair("Maya", 92);
console.log(`Pair: ${student} -> ${student.first} scored ${student.second}`);
console.log("First score:", firstItem([88, 95, 72]));
console.log("First name:", firstItem(["Leo", "Ava"]));
console.log("Average:", average([88.0, 95.0, 72.0]));

// Edge case: the comment says string, but JavaScript runs this with no error.
/** @type {Box<string>} */
const wrong = new Box(404);
console.log(`Box<string> holding a number: ${wrong}`, typeof wrong.get());

// Only the runtime check in average() catches a bad value.
try {
  average([88, "95", 72]);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
