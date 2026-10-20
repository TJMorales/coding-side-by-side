class Student {
  // A # name is a private field. Only code inside the class can use it.
  #gpa = 0.0;

  constructor(name, gpa) {
    this.name = name;
    // This line goes through the setter below, so it is validated too.
    this.gpa = gpa;
  }

  // get makes maya.gpa call this method. No parentheses needed.
  get gpa() {
    return this.#gpa;
  }

  // set runs on maya.gpa = value and rejects bad values.
  set gpa(value) {
    if (value < 0.0 || value > 4.0) {
      throw new RangeError(`GPA must be from 0.0 to 4.0, got ${value}`);
    }
    this.#gpa = value;
  }
}

const maya = new Student("Maya", 3.6);
console.log(`${maya.name} GPA: ${maya.gpa}`);

maya.gpa = 3.8;
console.log(`Updated GPA: ${maya.gpa}`);

// A bad value throws an error, and the old GPA is kept.
try {
  maya.gpa = 5.2;
} catch (error) {
  console.log(`Rejected: ${error.message}`);
}
console.log(`GPA is still: ${maya.gpa}`);

// Edge case: JavaScript enforces #. This line would not even run:
// maya.#gpa = 9.9;   SyntaxError: Private field '#gpa' must be declared in an enclosing class
// Without #, a plain field is public, so outside code could skip the setter.
console.log(`Fields you can see: ${Object.keys(maya)}`);
