class Student {
  constructor(name, average) {
    this.name = name;
    this.average = average;
  }

  report() {
    return `${this.name}: ${this.average.toFixed(1)}`;
  }
}

class HonorsStudent extends Student {
  weightedAverage() {
    return this.average + 5;
  }

  // Override report() to show the weighted score.
  report() {
    return `${this.name}: ${this.weightedAverage().toFixed(1)} (weighted)`;
  }
}

const roster = [new Student("Leo", 81.0), new HonorsStudent("Maya", 88.5)];

// The same call runs a different report() for each object's actual class.
for (const student of roster) {
  console.log(student.report());
}

// JavaScript checks for a method only when the line runs (duck typing).
// roster[1] is an HonorsStudent, so this works with no cast.
console.log(`Maya weighted: ${roster[1].weightedAverage().toFixed(1)}`);

// Edge case: roster[0] has no weightedAverage(). The error appears only now, at run time.
try {
  console.log(roster[0].weightedAverage());
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
