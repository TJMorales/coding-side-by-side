class Student {
  // A JavaScript class has exactly one constructor.
  // Parameters with = have default values, used when an argument is missing.
  constructor(name = "New student", gradeLevel = 9, scores = []) {
    this.name = name;
    this.gradeLevel = gradeLevel;
    // [...scores] copies the array, so each Student owns its own scores.
    this.scores = [...scores];
  }

  // A static factory method is a named way to build an object.
  // It calls the one constructor and fills in the values you skip.
  static withScores(name, scores) {
    return new Student(name, 9, scores);
  }

  describe() {
    return `${this.name}, grade ${this.gradeLevel}, scores [${this.scores.join(", ")}]`;
  }
}

// Leave out arguments from the right to use their defaults.
console.log(new Student().describe());
console.log(new Student("Maya").describe());
console.log(new Student("Leo", 11).describe());
console.log(new Student("Ana", 12, [95, 88]).describe());

// JavaScript has no keyword arguments. Passing undefined uses the default,
// or a factory method can skip gradeLevel for you.
console.log(new Student("Sam", undefined, [70]).describe());
console.log(Student.withScores("Sam", [70]).describe());

// Edge case: two students made with the default scores get separate arrays.
const ava = new Student("Ava");
const ben = new Student("Ben");
ava.scores.push(100);
console.log(`Ava: [${ava.scores}], Ben: [${ben.scores}]`);
