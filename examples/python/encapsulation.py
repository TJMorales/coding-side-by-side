class Student:
    def __init__(self, name, gpa):
        self.name = name
        # The leading underscore means "private, do not use outside the class".
        self._gpa = 0.0
        # This line goes through the setter below, so it is validated too.
        self.gpa = gpa

    # @property makes maya.gpa call this method. No parentheses needed.
    @property
    def gpa(self):
        return self._gpa

    # The setter runs on maya.gpa = value and rejects bad values.
    @gpa.setter
    def gpa(self, value):
        if value < 0.0 or value > 4.0:
            raise ValueError(f"GPA must be from 0.0 to 4.0, got {value}")
        self._gpa = value


maya = Student("Maya", 3.6)
print(f"{maya.name} GPA: {maya.gpa}")

maya.gpa = 3.8
print(f"Updated GPA: {maya.gpa}")

# A bad value raises an error, and the old GPA is kept.
try:
    maya.gpa = 5.2
except ValueError as error:
    print(f"Rejected: {error}")
print(f"GPA is still: {maya.gpa}")

# Edge case: Python does not enforce the underscore.
# Writing to _gpa directly skips the setter and its check.
maya._gpa = 9.9
print(f"After skipping the setter: {maya.gpa}")
