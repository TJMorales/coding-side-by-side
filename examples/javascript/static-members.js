class Student {
  // static fields belong to the class. All students share one copy.
  static school = "Vista Ridge High School";
  static count = 0;

  constructor(name) {
    // Fields set on this belong to each object.
    this.name = name;
    // Change the shared counter through the class name.
    Student.count++;
    this.studentId = 1000 + Student.count;
  }

  // A static method is called on the class, so it cannot see one student's data.
  static isValidId(studentId) {
    return studentId >= 1001 && studentId <= 9999;
  }
}

const maya = new Student("Maya");
const leo = new Student("Leo");

console.log(`${maya.name}: id ${maya.studentId}`);
console.log(`${leo.name}: id ${leo.studentId}`);
console.log(`Students created: ${Student.count}`);
console.log(`Is 1500 a valid id? ${Student.isValidId(1500)}`);

// Read static fields through the class name. An object does not see them.
console.log(`From the class: ${Student.school}`);
console.log(`From maya: ${maya.school}`);

// Changing it once changes it for every student.
Student.school = "Vista Ridge HS";
console.log(`Through the class: ${Student.school}`);

// Edge case: assigning through an object makes a new field on that one
// object. The static field does not change.
leo.school = "Online campus";
console.log(`Maya: ${maya.school}, Leo: ${leo.school}, class: ${Student.school}`);
