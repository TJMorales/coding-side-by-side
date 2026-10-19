class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id

    # __str__ controls what print() and f-strings show for the object.
    def __str__(self):
        return f"{self.name} (#{self.student_id})"

    # __eq__ controls ==. Here two students are equal if their ids match.
    def __eq__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.student_id == other.student_id


a = Student("Maya", 1001)
b = Student("Maya", 1001)  # a separate object with the same data
c = a                       # a second name for the same object

print(a)
print(f"Roster entry: {b}")

# == calls __eq__ and compares the data.
print(f"a == b: {a == b}")

# is checks whether two names point to the very same object.
print(f"a is b: {a is b}")
print(f"a is c: {a is c}")

# in uses == too, so b is found even though the list holds a.
roster = [a]
print(f"b in roster: {b in roster}")

# Edge case: a Student is never equal to a plain number.
print(f"a == 1001: {a == 1001}")
