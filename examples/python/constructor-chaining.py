class Student:
    # Python has one __init__. Parameters with = have default values,
    # so callers can leave them out.
    def __init__(self, name="New student", grade_level=9, scores=None):
        self.name = name
        self.grade_level = grade_level
        # Use None as the default, not []. A [] default is made once.
        # Storing it directly would share one list between every Student.
        if scores is None:
            scores = []
        # list(...) copies the list, so each Student owns its own scores.
        self.scores = list(scores)

    def describe(self):
        return f"{self.name}, grade {self.grade_level}, scores {self.scores}"


# Leave out arguments from the right to use their defaults.
print(Student().describe())
print(Student("Maya").describe())
print(Student("Leo", 11).describe())
print(Student("Ana", 12, [95, 88]).describe())

# A keyword argument skips grade_level and sets scores directly.
print(Student("Sam", scores=[70]).describe())

# Edge case: two students made with the default scores get separate lists.
ava = Student("Ava")
ben = Student("Ben")
ava.scores.append(100)
print(f"Ava: {ava.scores}, Ben: {ben.scores}")
