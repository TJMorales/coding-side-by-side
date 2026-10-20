// Parameters receive values. return sends a result back to the caller.
function letterGrade(score) {
  if (score >= 90) {
    return "A";   // return ends the function right away
  }
  if (score >= 80) {
    return "B";
  }
  return "C or below";
}
// A parameter can have a default value that is used when you leave it out.
function curve(score, points = 5) {
  return Math.min(score + points, 100);
}
// A function returns one value. To send back several, return an array.
function summarize(scores) {
  let sum = 0;
  for (const s of scores) {
    sum += s;
  }
  return [Math.min(...scores), Math.max(...scores), sum / scores.length];
}

const quiz = [72, 95, 88];
console.log(`95 earns: ${letterGrade(95)}`);
console.log(`72 curved: ${curve(72)}`);
console.log(`98 curved by 10: ${curve(98, 10)}`);
const [low, high, average] = summarize(quiz);   // unpacks the array into 3 variables
console.log(`Low: ${low}, high: ${high}, average: ${average.toFixed(1)}`);

// Edge case: a function with no return statement gives back undefined.
function show(scores) {
  console.log("Scores:", scores);
}
console.log(`show() returned: ${show(quiz)}`);
