# A class defines a new type. Each object made from it has its own fields.
class Student:
    # __init__ runs when you create an object and sets each field to a starting value.
    # Python always writes self. in front of a field. That is the language's rule.
    # Java writes this. in front of a field only in some cases. You will see that later.
    def __init__(self):
        self.name = ""
        self.grade_level = 0
        self.gpa = 0.0

# Student() creates a new object and runs __init__.
maya = Student()
print("Start: name", repr(maya.name), "grade", maya.grade_level, "GPA", maya.gpa)

# Dot notation reads or changes one object's field.
maya.name = "Maya"
maya.grade_level = 10
maya.gpa = 3.8
print("Now: name", repr(maya.name), "grade", maya.grade_level, "GPA", maya.gpa)

# Edge case: a second object gets its own fields, so it starts empty.
jordan = Student()
print("Jordan: name", repr(jordan.name), "GPA", jordan.gpa)
