class Student {
  // A # in front of a field name makes it private: only code inside Student can use it.
  // Private fields must be declared in the class body, outside any method.
  #name;
  #gradeLevel;
  #gpa;

  constructor(name = "", gradeLevel = 0, gpa = 0.0) {
    this.#name = name;
    this.#gradeLevel = gradeLevel;
    this.#gpa = gpa;
  }

  // Accessor (getter) methods return a field's value.
  getName() { return this.#name; }
  getGradeLevel() { return this.#gradeLevel; }
  getGpa() { return this.#gpa; }

  // Mutator (setter) methods change a field. This one rejects a bad value.
  setGpa(newGpa) {
    if (newGpa >= 0.0 && newGpa <= 4.0) {
      this.#gpa = newGpa;
    } else {
      console.log("Rejected GPA " + newGpa + ". It must be 0.0 to 4.0.");
    }
  }

  promote() { this.#gradeLevel = this.#gradeLevel + 1; }
}

const maya = new Student("Maya", 10, 3.8);
maya.setGpa(3.9);
maya.promote();
console.log(maya.getName() + ": grade " + maya.getGradeLevel() + ", GPA " + maya.getGpa());

// Edge case: a bad value leaves the field unchanged.
maya.setGpa(5.2);
console.log("GPA is still " + maya.getGpa());
