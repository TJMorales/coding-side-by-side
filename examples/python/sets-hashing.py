# A set finds items by hash first, then confirms with ==.
# Without __eq__ and __hash__, two objects are equal only if they are the same object.
class StudentNoHash:
    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name


class Student:
    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name

    def __eq__(self, other):
        # Two students are the same if their IDs match.
        return isinstance(other, Student) and self.student_id == other.student_id

    def __hash__(self):
        # Equal objects must have equal hashes, so hash the same field __eq__ uses.
        return hash(self.student_id)

    def __repr__(self):
        return f"Student({self.student_id}, {self.name!r})"


# Broken: the same student signs in twice and is counted twice.
broken = {StudentNoHash(1042, "Maya"), StudentNoHash(1042, "Maya"), StudentNoHash(2077, "Leo")}
print("Without __eq__/__hash__:", len(broken), "students")
print("Lookup finds Maya:", StudentNoHash(1042, "Maya") in broken)

# Fixed: duplicates collapse and lookups work.
attendance = {Student(1042, "Maya"), Student(1042, "Maya"), Student(2077, "Leo")}
print("With __eq__/__hash__:", len(attendance), "students")
print("Lookup finds Maya:", Student(1042, "Maya") in attendance)

# Set operations compare by the same rules.
club = {Student(2077, "Leo"), Student(3150, "Ava")}
print("In class and club:", attendance & club)

# Edge case: defining only __eq__ sets __hash__ to None, so the class
# cannot go in a set at all. You get TypeError: unhashable type.
class OnlyEq:
    def __eq__(self, other):
        return True

try:
    {OnlyEq()}
except TypeError as e:
    print("Error:", e)
