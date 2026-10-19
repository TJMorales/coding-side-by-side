# A class defines the fields and methods its objects have. Each object made from it has its own data.
class Student:
    # __init__ runs when you create a Student. self is the new object.
    def __init__(self, name, grade_level):
        # Fields are created here, by assigning to self.
        self.name = name
        self.grade_level = grade_level
        self.scores = []

    # A method is a function inside the class. Its first parameter is self.
    def add_score(self, score):
        self.scores.append(score)

    def average(self):
        if len(self.scores) == 0:
            return 0.0
        return sum(self.scores) / len(self.scores)


# Each call to Student(...) makes a separate object.
maya = Student("Maya", 10)
leo = Student("Leo", 11)

maya.add_score(92)
maya.add_score(85)
leo.add_score(78)

print(f"{maya.name}, grade {maya.grade_level}: average {maya.average():.1f}")
print(f"{leo.name}, grade {leo.grade_level}: average {leo.average():.1f}")

# Changing one object does not change the other.
leo.name = "Leonardo"
print(f"After rename: {maya.name} and {leo.name}")

# Edge case: a new student has no scores, so average() returns 0.0.
sam = Student("Sam", 9)
print(f"{sam.name}, grade {sam.grade_level}: average {sam.average():.1f}")
