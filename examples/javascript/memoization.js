// Naive Fibonacci recomputes the same values again and again.
let naiveCalls = 0;

function fibNaive(n) {
  naiveCalls++;
  if (n <= 1) {
    return n;
  }
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// Memoization: save each answer the first time, then look it up after that.
// The Map lives outside the function, so it keeps its answers between calls.
const memo = new Map();
let memoCalls = 0;

function fibMemo(n) {
  memoCalls++;
  if (memo.has(n)) {
    return memo.get(n);
  }
  const result = n <= 1 ? n : fibMemo(n - 1) + fibMemo(n - 2);
  memo.set(n, result);
  return result;
}

// The same memo, but with BigInt values (written with n) that never lose digits.
const bigMemo = new Map();

function fibBig(n) {
  if (!bigMemo.has(n)) {
    bigMemo.set(n, n <= 1 ? BigInt(n) : fibBig(n - 1) + fibBig(n - 2));
  }
  return bigMemo.get(n);
}

const n = 25;
console.log(`Naive fib(${n}) = ${fibNaive(n)} using ${naiveCalls} calls`);
console.log(`Memo fib(${n}) = ${fibMemo(n)} using ${memoCalls} calls`);
// JavaScript has no built-in cache decorator. The Map is the cache.
console.log(`Saved answers: ${memo.size}`);

// Edge case: a second call reuses the saved answers, so it costs 1 call.
memoCalls = 0;
fibMemo(n);
console.log(`Second memo call for fib(${n}): ${memoCalls} call`);

// Edge case: a number is exact only up to 2 ** 53, so fib(90) loses its last digits.
console.log(`fib(90) as a number: ${fibMemo(90)}`);
console.log(`fib(90) as a BigInt: ${fibBig(90)}`);
console.log(`Largest exact number: ${Number.MAX_SAFE_INTEGER}`);
