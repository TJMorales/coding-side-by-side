from dataclasses import dataclass, field, FrozenInstanceError


# @dataclass writes __init__, __repr__, and __eq__ from the fields below.
@dataclass
class Assignment:
    title: str
    points: int
    tags: list[str] = field(default_factory=list)  # a new list for each object


# frozen=True blocks changes after creation, like a Java record.
@dataclass(frozen=True)
class Grade:
    student: str
    score: int

    # __post_init__ runs after the generated __init__. Use it to validate.
    def __post_init__(self):
        if not 0 <= self.score <= 100:
            raise ValueError(f"score must be 0-100, got {self.score}")


lab = Assignment("Lab 3", 50)
lab.points = 60  # a regular dataclass can change
lab.tags.append("late ok")
print("Assignment:", lab)

g1 = Grade("Maya", 92)
g2 = Grade("Maya", 92)
print("Grade:", g1)
# __eq__ compares fields, not identity.
print("g1 == g2:", g1 == g2, "| same object:", g1 is g2)

# Frozen dataclasses are also hashable, so they work in sets and as dict keys.
print("Unique grades:", len({g1, g2, Grade("Leo", 85)}))

# Edge case: changing a frozen field raises FrozenInstanceError.
try:
    g1.score = 100
except FrozenInstanceError as e:
    print("Error:", e)

# Edge case: validation rejects bad data at creation time.
try:
    Grade("Leo", 105)
except ValueError as e:
    print("Error:", e)
