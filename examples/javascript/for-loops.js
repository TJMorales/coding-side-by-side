// Three parts: start (let lap = 1); condition (lap < 6); update (lap++).
// The loop runs while the condition is true, so it prints 1 to 5.
for (let lap = 1; lap < 6; lap++) {
  console.log("Lap", lap);
}

// Starting at 0 with i < 5 gives 0 to 4.
let total = 0;
for (let i = 0; i < 5; i++) {
  total = total + i;
}
console.log("Sum of 0 to 4:", total);

// The update can be any change. This counts down by 2.
for (let seconds = 10; seconds > 0; seconds -= 2) {
  console.log("Countdown:", seconds);
}
