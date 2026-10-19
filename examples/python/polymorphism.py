class Student:
    def __init__(self, name, average):
        self.name = name
        self.average = average

    def report(self):
        return f"{self.name}: {self.average:.1f}"


class HonorsStudent(Student):
    def weighted_average(self):
        return self.average + 5

    # Override report() to show the weighted score.
    def report(self):
        return f"{self.name}: {self.weighted_average():.1f} (weighted)"


roster = [Student("Leo", 81.0), HonorsStudent("Maya", 88.5)]

# The same call runs a different report() for each object's actual class.
for student in roster:
    print(student.report())

# Python checks for a method only when the line runs (duck typing).
# roster[1] is an HonorsStudent, so this works with no cast.
print(f"Maya weighted: {roster[1].weighted_average():.1f}")

# Edge case: roster[0] has no weighted_average(). The error appears only now, at run time.
try:
    print(roster[0].weighted_average())
except AttributeError as error:
    print(f"AttributeError: {error}")
