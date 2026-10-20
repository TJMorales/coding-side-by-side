// Strategy pattern: the gradebook does not know HOW a final grade is computed.
// You pass in the rule (the strategy), so you can swap it without editing the class.

function averageAll(scores) {
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

function dropLowest(scores) {
  // Edge case: with one score, there is nothing to drop.
  if (scores.length < 2) {
    return averageAll(scores);
  }
  const sum = scores.reduce((total, s) => total + s, 0);
  return (sum - Math.min(...scores)) / (scores.length - 1);
}

function bestThree(scores) {
  const top = scores.toSorted((a, b) => b - a).slice(0, 3);
  return averageAll(top);
}

class Gradebook {
  constructor(strategy) {
    // In JavaScript a strategy can be any function that takes an array of scores.
    this.strategy = strategy;
  }

  finalGrade(scores) {
    // Round to one decimal place, then show it with one digit after the point.
    return (Math.round(this.strategy(scores) * 10) / 10).toFixed(1);
  }
}

const mayaScores = [92, 58, 88, 95, 81];
console.log(`Scores: [${mayaScores.join(", ")}]`);

for (const strategy of [averageAll, dropLowest, bestThree]) {
  const book = new Gradebook(strategy);
  // strategy.name is the function's name as a string.
  console.log(`${strategy.name.padEnd(12)} -> ${book.finalGrade(mayaScores)}`);
}

// An arrow function works too, for a one-off rule.
const curveFive = new Gradebook((scores) => Math.min(100, averageAll(scores) + 5));
console.log(`${"curve +5".padEnd(12)} -> ${curveFive.finalGrade(mayaScores)}`);

// Swap the strategy at run time on the same object.
const book = new Gradebook(averageAll);
book.strategy = dropLowest;
console.log(`Switched to dropLowest: ${book.finalGrade(mayaScores)}`);

// Edge case: one score.
console.log(`One score, dropLowest: ${new Gradebook(dropLowest).finalGrade([77])}`);
