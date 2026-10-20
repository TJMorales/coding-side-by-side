const scores = [88, -1, 92, 47, 75];

// continue skips the rest of this pass and moves to the next item.
// break ends the whole loop right away.
for (const score of scores) {
  if (score === -1) {
    console.log("Absent, skipping");
    continue;
  }
  if (score < 60) {
    console.log(`Failing score found: ${score}. Stopping.`);
    break;
  }
  console.log(`Passing: ${score}`);
}
// 75 is never checked because break ended the loop at 47.

// JavaScript has no for...else. A boolean flag records whether break ran.
console.log("Checking 2nd period:");
let foundFailing = false;
for (const score of [90, 85, 77]) {
  if (score < 60) {
    console.log(`Failing score found: ${score}`);
    foundFailing = true;
    break;
  }
}
if (!foundFailing) {
  console.log("No failing scores");
}
