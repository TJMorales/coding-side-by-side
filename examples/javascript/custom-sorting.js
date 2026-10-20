class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  toString() {
    return `${this.name} ${this.grade}`;
  }

  // A compare function returns negative (a first), positive (b first), or 0 (tie).
  // This one gives the class a natural order by name.
  static byName(a, b) {
    return a.name.localeCompare(b.name);
  }
}

const roster = [
  new Student("Maya", 92),
  new Student("Leo", 85),
  new Student("Ava", 92),
  new Student("Zoe", 78),
  new Student("Ben", 85),
];

// toSorted() returns a new sorted array and leaves roster alone.
console.log(`By name: ${roster.toSorted(Student.byName).join(", ")}`);

// b.grade - a.grade sorts grades high to low. When grades tie, it is 0,
// so || moves on to compare names A to Z.
const ranked = roster.toSorted((a, b) => b.grade - a.grade || a.name.localeCompare(b.name));
console.log("By grade (high first), then name:");
for (const s of ranked) {
  console.log(`  ${s.grade}  ${s.name}`);
}

// sort() changes the array in place.
roster.sort((a, b) => a.grade - b.grade);
console.log(`Grade only, low first: ${roster.join(", ")}`);

// Edge case: sort() is stable, so ties keep their earlier order.
// Leo and Ben both have 85, and Leo came first in the original array.
console.log(`Stable tie: ${roster.filter((s) => s.grade === 85).map((s) => s.name).join(", ")}`);

// Flipping the whole compare function flips the tie-breaker too.
const flipped = roster.toSorted((a, b) => -(a.grade - b.grade || a.name.localeCompare(b.name)));
console.log(`Whole compare reversed: ${flipped.join(", ")}`);

// Edge case: with no compare function, sort() turns values into strings first.
console.log(`[10, 9, 1].sort(): [${[10, 9, 1].sort().join(", ")}]`);
console.log(`With (a, b) => a - b: [${[10, 9, 1].sort((a, b) => a - b).join(", ")}]`);
