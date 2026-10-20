class Student {
  constructor(name, scores) {
    this.name = name;
    this.scores = scores;
  }

  average() {
    // reduce() adds every score in the array.
    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }

  describe() {
    return `${this.name}: average ${this.average().toFixed(1)}`;
  }
}

// HonorsStudent inherits every field and method from Student.
class HonorsStudent extends Student {
  constructor(name, scores, course) {
    // super(...) runs the parent constructor. It must run before you use this.
    super(name, scores);
    this.course = course;
  }

  // Override describe(), but reuse the parent's version through super.
  describe() {
    const weighted = (this.average() + 5).toFixed(1);
    return `${super.describe()}, weighted ${weighted} in ${this.course}`;
  }
}

const leo = new Student("Leo", [78, 84]);
const maya = new HonorsStudent("Maya", [92, 85], "AP CSA");

console.log(leo.describe());
console.log(maya.describe());

// maya can call average() even though HonorsStudent never defines it.
console.log(`Maya's plain average: ${maya.average().toFixed(1)}`);

// Edge case: an HonorsStudent is a Student, but a Student is not an HonorsStudent.
console.log(`Maya is a Student: ${maya instanceof Student}`);
console.log(`Leo is an HonorsStudent: ${leo instanceof HonorsStudent}`);
