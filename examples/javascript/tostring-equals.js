class Student {
  constructor(name, studentId) {
    this.name = name;
    this.studentId = studentId;
  }

  // toString() controls what template literals and String() show.
  toString() {
    return `${this.name} (#${this.studentId})`;
  }

  // JavaScript has no way to change ===, so you write your own method.
  // Here two students are equal if their ids match.
  equals(other) {
    if (!(other instanceof Student)) {
      return false;
    }
    return this.studentId === other.studentId;
  }
}

const a = new Student("Maya", 1001);
const b = new Student("Maya", 1001); // a separate object with the same data
const c = a;                         // a second name for the same object

console.log(String(a));
console.log(`Roster entry: ${b}`);

// equals() compares the data.
console.log(`a.equals(b): ${a.equals(b)}`);
// === on objects checks whether both names point to the very same object.
console.log(`a === b: ${a === b}`);
console.log(`a === c: ${a === c}`);

// includes() uses identity, so it does not find b. some() can call equals().
const roster = [a];
console.log(`roster.includes(b): ${roster.includes(b)}`);
console.log(`roster.some(s => s.equals(b)): ${roster.some((s) => s.equals(b))}`);

// Edge case: a Student is never equal to a plain number.
console.log(`a.equals(1001): ${a.equals(1001)}`);

// Edge case: console.log(a) shows the fields, not toString().
console.log(a);
