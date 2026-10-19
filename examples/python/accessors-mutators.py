class Student:
    # A leading underscore marks a field as private by convention.
    # Python does not block access, but other code should use the methods.
    def __init__(self, name="", grade_level=0, gpa=0.0):
        self._name = name
        self._grade_level = grade_level
        self._gpa = gpa

    # Accessor (getter) methods return a field's value.
    def get_name(self):
        return self._name

    def get_grade_level(self):
        return self._grade_level

    def get_gpa(self):
        return self._gpa

    # Mutator (setter) methods change a field. This one rejects a bad value.
    def set_gpa(self, new_gpa):
        if 0.0 <= new_gpa <= 4.0:
            self._gpa = new_gpa
        else:
            print(f"Rejected GPA {new_gpa}. It must be 0.0 to 4.0.")

    def promote(self):
        self._grade_level += 1


maya = Student("Maya", 10, 3.8)
maya.set_gpa(3.9)
maya.promote()
print(f"{maya.get_name()}: grade {maya.get_grade_level()}, GPA {maya.get_gpa()}")

# Edge case: a bad value leaves the field unchanged.
maya.set_gpa(5.2)
print(f"GPA is still {maya.get_gpa()}")
