// Math.random() cannot be seeded, so it gives new numbers every run. To get the
// same numbers every run for testing, this file uses a small seeded generator
// (mulberry32). You do not need to follow its bit math. In a game, use Math.random().
function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let random = mulberry32(42);   // 0 up to, but not including, 1, like Math.random()

// Inclusive range formula: Math.floor(random() * (max - min + 1)) + min.
function randInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}
const rolls = [];
for (let i = 0; i < 8; i++) {
  rolls.push(randInt(1, 6));
}
console.log(`Dice rolls: ${rolls.join(", ")}`);

const chance = random();
console.log(`Chance: ${chance.toFixed(3)}`);
console.log(`Critical hit: ${chance < 0.25}`);

// Pick one item with a random index from 0 to length - 1.
const team = ["Ana", "Ben", "Chloe", "Dev"];
console.log(`Captain: ${team[Math.floor(random() * team.length)]}`);

// Edge case: the same seed repeats the same sequence.
random = mulberry32(42);
console.log(`First roll again: ${randInt(1, 6)}`);
