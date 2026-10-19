class Student:
    def __init__(self, name, scores):
        self.name = name
        self.scores = scores

    def average(self):
        return sum(self.scores) / len(self.scores)

    def describe(self):
        return f"{self.name}: average {self.average():.1f}"


# HonorsStudent inherits every field and method from Student.
class HonorsStudent(Student):
    def __init__(self, name, scores, course):
        # super().__init__ runs the parent's setup for name and scores.
        super().__init__(name, scores)
        self.course = course

    # Override describe(), but reuse the parent's version through super().
    def describe(self):
        return f"{super().describe()}, weighted {self.average() + 5:.1f} in {self.course}"


leo = Student("Leo", [78, 84])
maya = HonorsStudent("Maya", [92, 85], "AP CSA")

print(leo.describe())
print(maya.describe())

# maya can call average() even though HonorsStudent never defines it.
print(f"Maya's plain average: {maya.average():.1f}")

# Edge case: an HonorsStudent is a Student, but a Student is not an HonorsStudent.
print(f"Maya is a Student: {isinstance(maya, Student)}")
print(f"Leo is an HonorsStudent: {isinstance(leo, HonorsStudent)}")
