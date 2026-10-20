class Student {
  // A class has only one constructor. Default values let you call it with
  // no arguments, so they do the job of Java's default constructor.
  constructor(name = "", gradeLevel = 0, gpa = 0.0) {
    this.name = name;
    this.gradeLevel = gradeLevel;
    this.gpa = gpa;
  }
}

// No arguments: every field gets its default value.
const blank = new Student();
console.log("Blank: name '" + blank.name + "', grade " + blank.gradeLevel + ", GPA " + blank.gpa);

// With arguments: the values are copied into the new object's fields.
const maya = new Student("Maya", 10, 3.8);
console.log("Maya: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);

// Edge case: leave out the last arguments and only those use defaults.
const leo = new Student("Leo", 9);
console.log("Leo: name '" + leo.name + "', grade " + leo.gradeLevel + ", GPA " + leo.gpa);
