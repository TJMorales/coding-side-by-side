const readline = require("readline/promises");

// The input code goes inside an async function so await can wait for each answer.
// You will learn functions later. For now, copy this pattern.
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // rl.question() shows the prompt and waits for the user to press Enter.
  const name = await rl.question("What is your name? ");

  // The answer is always a string, even when the user types digits.
  const rawAge = await rl.question("How old are you? ");
  console.log();
  console.log("You typed:", rawAge, typeof rawAge);

  // Number() converts the text to a number before you do math with it.
  const age = Number(rawAge);
  console.log("Hello, " + name + "!");
  console.log("Next year you will be", age + 1);
  rl.close();
}

main();
