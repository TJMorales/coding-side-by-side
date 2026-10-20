# self in Python and this in Java both mean "the object this method is running on".
class BrokenStudent:
    def __init__(self, name, grade_level, gpa):
        # Mistake: without self., this creates a local variable inside __init__.
        # The local variable disappears when __init__ ends. self.name is never set.
        name = name
        grade_level = grade_level
        gpa = gpa


class Student:
    def __init__(self, name, grade_level, gpa):
        # self.name is the object's field. name is the parameter.
        self.name = name
        self.grade_level = grade_level
        self.gpa = gpa

    def set_gpa(self, gpa):
        self.gpa = gpa


broken = BrokenStudent("Maya", 10, 3.8)
print("Broken has a name field:", hasattr(broken, "name"))

maya = Student("Maya", 10, 3.8)
maya.set_gpa(3.9)
print(f"Fixed: {maya.name}, grade {maya.grade_level}, GPA {maya.gpa}")
