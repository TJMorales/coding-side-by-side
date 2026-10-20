// A Map stores key-value pairs. set() adds or replaces, get() looks up.
const scores = new Map([["Ana", 91], ["Ben", 78]]);
scores.set("Chloe", 85);   // a new key adds a pair
scores.set("Ben", 82);     // an existing key replaces the old value
console.log(`Ben's score: ${scores.get("Ben")}`);
console.log(`Size: ${scores.size}`);

// has() checks the keys, not the values.
console.log(`Has Ana: ${scores.has("Ana")}`);
console.log(`Has 91: ${scores.has(91)}`);

// for...of gives each key and value together. A Map keeps insertion order.
for (const [name, score] of scores) {
  console.log(`  ${name}: ${score}`);
}

scores.delete("Ana");
console.log("After removing Ana:", scores);

// Count things: ?? 0 starts a missing key at 0.
const votes = ["pizza", "tacos", "pizza", "salad", "tacos", "pizza"];
const counts = new Map();
for (const food of votes) {
  counts.set(food, (counts.get(food) ?? 0) + 1);
}
console.log("Lunch votes:", counts);

// A plain object also holds key-value pairs. Its keys are strings.
const room = { teacher: "Ms. Rivera", number: 2115 };
console.log(`Room ${room.number}: ${room["teacher"]}`);

// Edge case: get() on a missing key returns undefined instead of crashing.
console.log(`Zoe's score: ${scores.get("Zoe")}`);
