class Student:
    # Python allows only one __init__. Default values let you call it with
    # no arguments, so they play the role of Java's default constructor.
    def __init__(self, name="", grade_level=0, gpa=0.0):
        self.name = name
        self.grade_level = grade_level
        self.gpa = gpa


# No arguments: every field gets its default value.
blank = Student()
print(f"Blank: name '{blank.name}', grade {blank.grade_level}, GPA {blank.gpa}")

# With arguments: the values are copied into the new object's fields.
maya = Student("Maya", 10, 3.8)
print(f"Maya: name '{maya.name}', grade {maya.grade_level}, GPA {maya.gpa}")

# Edge case: leave out the last arguments and only those use defaults.
leo = Student("Leo", 9)
print(f"Leo: name '{leo.name}', grade {leo.grade_level}, GPA {leo.gpa}")
