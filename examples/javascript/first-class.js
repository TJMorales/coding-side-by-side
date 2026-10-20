// A class defines a new type. Each object made from it has its own fields.
class Student {
  // The constructor runs when you create an object and sets each field to a starting value.
  // JavaScript always writes this. in front of a field, the same way Python writes self.
  // this means the object being created.
  constructor() {
    this.name = "";
    this.gradeLevel = 0;
    this.gpa = 0.0;
  }
}

// new Student() creates a new object and runs the constructor.
const maya = new Student();
console.log("Start: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);

// Dot notation reads or changes one object's field.
maya.name = "Maya";
maya.gradeLevel = 10;
maya.gpa = 3.8;
console.log("Now: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);

// Edge case: a second object gets its own fields, so it starts empty.
const jordan = new Student();
console.log("Jordan: name '" + jordan.name + "', GPA " + jordan.gpa);
