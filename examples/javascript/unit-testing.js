// The assert module is built into Node. It throws an AssertionError when a check fails.
const assert = require("assert");

// The function under test.
function letterGrade(score) {
  if (score < 0 || score > 100) {
    throw new RangeError(`score out of range: ${score}`);
  }
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}

let passed = 0;
let failed = 0;

// A tiny test runner: run one test function and print PASS or FAIL.
function check(name, testFn) {
  try {
    testFn();
    passed++;
    console.log(`PASS  ${name}`);
  } catch (error) {
    failed++;
    // An AssertionError keeps the two values it compared.
    const detail = error instanceof assert.AssertionError
      ? `expected ${error.expected} but got ${error.actual}`
      : error.message;
    console.log(`FAIL  ${name}: ${detail}`);
  }
}

check("typical scores", () => {
  // strictEqual(actual, expected) uses ===.
  assert.strictEqual(letterGrade(95), "A");
  assert.strictEqual(letterGrade(85), "B");
  assert.strictEqual(letterGrade(42), "F");
});

check("boundaries", () => {
  // Off-by-one mistakes happen at the cutoffs, so test the exact cutoff values.
  assert.strictEqual(letterGrade(90), "A");
  assert.strictEqual(letterGrade(89), "B");
  assert.strictEqual(letterGrade(70), "C");
  assert.strictEqual(letterGrade(69), "F");
});

check("out of range throws", () => {
  // assert.throws passes only if the function inside throws that error type.
  assert.throws(() => letterGrade(101), RangeError);
  assert.throws(() => letterGrade(-1), RangeError);
});

// Edge case: a wrong expected value shows what a failure looks like.
check("wrong expectation", () => assert.strictEqual(letterGrade(80), "A"));

console.log(`Passed: ${passed}, Failed: ${failed}`);
console.log(`All passed: ${failed === 0}`);

// The same tests with node:test, run with: node --test
// Its report includes timings, so this example uses check() instead.
// const test = require("node:test");
// test("boundaries", () => {
//   assert.strictEqual(letterGrade(90), "A");
//   assert.strictEqual(letterGrade(89), "B");
// });
