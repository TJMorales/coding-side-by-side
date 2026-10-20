// A Set checks items with SameValueZero: primitives compare by value,
// objects compare by identity. There is no hashCode() or equals() to override.
class Student {
  constructor(studentId, name) {
    this.studentId = studentId;
    this.name = name;
  }

  // Even with this method, Set never calls it.
  equals(other) {
    return other instanceof Student && this.studentId === other.studentId;
  }

  toString() {
    return `Student(${this.studentId}, ${this.name})`;
  }
}

// Broken: the same student signs in twice and is counted twice.
const broken = new Set([new Student(1042, "Maya"), new Student(1042, "Maya"), new Student(2077, "Leo")]);
console.log(`Objects in a Set: ${broken.size} students`);
console.log(`Lookup finds Maya: ${broken.has(new Student(1042, "Maya"))}`);

// Fixed: key a Map by the id, a primitive, so duplicates collapse.
const attendance = new Map();
for (const s of [new Student(1042, "Maya"), new Student(1042, "Maya"), new Student(2077, "Leo")]) {
  attendance.set(s.studentId, s);
}
console.log(`Map keyed by id: ${attendance.size} students`);
console.log(`Lookup finds Maya: ${attendance.has(new Student(1042, "Maya").studentId)}`);

// Set operations work on the ids, because numbers compare by value.
const clubIds = new Set([2077, 3150]);
const bothIds = new Set(attendance.keys()).intersection(clubIds);
console.log(`In class and club: ${[...bothIds].map((id) => attendance.get(id)).join(", ")}`);

// Edge case: primitives compare by value, so a Set of ids removes duplicates.
const ids = new Set([1042, 1042, 2077]);
console.log(`Set of ids: ${ids.size} ids`);
// But a string id and a number id are different values.
console.log(`ids.has("1042"): ${ids.has("1042")}`);
