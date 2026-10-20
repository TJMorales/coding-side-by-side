// JavaScript has no abstract keyword. This class refuses to be created directly.
class Assignment {
  constructor(title) {
    // new.target is the class that new was called on.
    if (new.target === Assignment) {
      throw new TypeError("Assignment is abstract. Create a Quiz or Project.");
    }
    this.title = title;
  }

  // Each subclass must replace this method with its own percent().
  percent() {
    throw new Error(`${this.constructor.name} must write percent()`);
  }

  summary() {
    return `${this.title}: ${this.percent().toFixed(1)}%`;
  }
}

class Quiz extends Assignment {
  constructor(title, correct, total) {
    super(title);
    this.correct = correct;
    this.total = total;
  }

  percent() {
    return (this.correct / this.total) * 100;
  }
}

class Project extends Assignment {
  constructor(title, rubric) {
    super(title);
    this.rubric = rubric; // each category is scored out of 4
  }

  percent() {
    return (this.rubric.reduce((sum, p) => sum + p, 0) / (4 * this.rubric.length)) * 100;
  }
}

const gradebook = [new Quiz("Loops quiz", 9, 10), new Project("Game project", [4, 3, 4, 3])];
gradebook.forEach((item) => console.log(item.summary()));
// Duck typing instead of an interface: any object with percent() works here.
const extraCredit = { title: "Extra credit", percent: () => 100 };
console.log(`All percents: ${[...gradebook, extraCredit].map((item) => item.percent().toFixed(1)).join(", ")}`);

// Edge case: the new.target check stops you from creating an Assignment.
try {
  new Assignment("Mystery");
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
