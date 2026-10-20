function factorial(n) {
  // Base case: 0! and 1! are both 1. This is where the calls stop.
  if (n <= 1) {
    return 1;
  }
  // Recursive case: n! = n * (n - 1)!, a smaller version of the same problem.
  return n * factorial(n - 1);
}

function sumOfDigits(n) {
  // Base case: a one-digit number is its own digit sum.
  if (n < 10) {
    return n;
  }
  // Recursive case: the last digit plus the digit sum of the rest.
  return (n % 10) + sumOfDigits(Math.floor(n / 10));
}

function depth(n) {
  // Base case: no more calls to make.
  if (n === 0) {
    return 0;
  }
  return 1 + depth(n - 1);
}

console.log(`factorial(5) = ${factorial(5)}`);
console.log(`factorial(0) = ${factorial(0)}`);
console.log(`sumOfDigits(2026) = ${sumOfDigits(2026)}`);
console.log(`sumOfDigits(7) = ${sumOfDigits(7)}`);

// Every call waits on the stack until the base case returns.
console.log(`depth(500) = ${depth(500)}`);
// Node has no fixed call count like Python's 1000. 5000 calls fit.
console.log(`depth(5000) = ${depth(5000)}`);

// Edge case: with no base case reached, the stack runs out of room.
try {
  depth(-1);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
