// A stack is last in, first out (LIFO). A JavaScript array works as a stack:
// push() adds to the end and pop() removes from the end, both O(1).
function isBalanced(code) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of code) {
    if ("([{".includes(ch)) {
      stack.push(ch);
    } else if (ch in pairs) {
      // A closer must match the most recent opener still waiting.
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }
  // Any opener left over was never closed.
  return stack.length === 0;
}

const samples = ["print(scores[0])", "if (x > 0) { y = [1, 2]; }", "grades[(0]", "total = (a + b"];
for (const code of samples) {
  console.log(`${code.padEnd(28)} balanced: ${isBalanced(code)}`);
}

// Edge case: a closer with nothing on the stack.
console.log(`${")(".padEnd(28)} balanced: ${isBalanced(")(")}`);

// A queue is first in, first out (FIFO). JavaScript has no deque class:
// push() adds to the back and shift() removes from the front.
const printQueue = [];
for (const job of ["essay.docx", "lab-report.pdf", "poster.png"]) {
  printQueue.push(job);
  console.log(`Queued: ${job}`);
}

console.log(`Next up: ${printQueue[0]}`);
while (printQueue.length > 0) {
  console.log(`Printing: ${printQueue.shift()}`);
}
console.log(`Jobs left: ${printQueue.length}`);

// Edge case: pop() and shift() on an empty array return undefined. No error.
console.log(`Shift from empty queue: ${printQueue.shift()}`);
