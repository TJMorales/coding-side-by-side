"use strict"; // Strict mode makes writing to a frozen object throw an error.

// JavaScript has no dataclass or record. A plain class with a constructor does the job.
class Assignment {
  constructor(title, points, tags = []) {
    this.title = title;
    this.points = points;
    this.tags = tags; // a [] default is made fresh for each object
  }
}

// An immutable class: validate, then Object.freeze(this) blocks changes.
class Grade {
  constructor(student, score) {
    if (score < 0 || score > 100) {
      throw new RangeError(`score must be 0-100, got ${score}`);
    }
    this.student = student;
    this.score = score;
    Object.freeze(this);
  }

  // There is no generated equality, so write it yourself.
  equals(other) {
    return other instanceof Grade && this.student === other.student && this.score === other.score;
  }

  // A string key lets a Set treat equal grades as one.
  key() {
    return `${this.student}:${this.score}`;
  }
}

const lab = new Assignment("Lab 3", 50);
lab.points = 60; // a regular object can change
lab.tags.push("late ok");
// console.log() prints an object's class name and fields for you.
console.log("Assignment:", lab);

const g1 = new Grade("Maya", 92);
const g2 = new Grade("Maya", 92);
console.log("Grade:", g1);
// === compares identity, so you call equals() to compare fields.
console.log(`g1.equals(g2): ${g1.equals(g2)} | same object: ${g1 === g2}`);

// A Set of objects would keep both Mayas. A Set of keys does not.
const unique = new Set([g1, g2, new Grade("Leo", 85)].map((g) => g.key()));
console.log(`Unique grades: ${unique.size}`);

// Edge case: changing a frozen field throws TypeError in strict mode.
try {
  g1.score = 100;
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// Edge case: validation rejects bad data at creation time.
try {
  new Grade("Leo", 105);
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
