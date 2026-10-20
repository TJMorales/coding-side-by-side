// this in JavaScript and self in Python both mean "the object this method is running on".
class BrokenStudent {
  constructor(name, gradeLevel, gpa) {
    // Mistake: without this., name = name assigns the parameter to itself.
    // No field is created, so reading broken.name later gives undefined.
    name = name;
    gradeLevel = gradeLevel;
    gpa = gpa;
  }
}

class Student {
  constructor(name, gradeLevel, gpa) {
    // this.name is the object's field. name is the parameter.
    this.name = name;
    this.gradeLevel = gradeLevel;
    this.gpa = gpa;
  }

  setGpa(gpa) {
    this.gpa = gpa;
  }
}

const broken = new BrokenStudent("Maya", 10, 3.8);
console.log("Broken: " + broken.name + ", grade " + broken.gradeLevel + ", GPA " + broken.gpa);

const maya = new Student("Maya", 10, 3.8);
maya.setGpa(3.9);
console.log("Fixed: " + maya.name + ", grade " + maya.gradeLevel + ", GPA " + maya.gpa);
