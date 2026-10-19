from dataclasses import dataclass


@dataclass
class Student:
    name: str
    grade: int

    # __lt__ gives the class a natural order (by name), like Comparable in Java.
    def __lt__(self, other):
        return self.name < other.name


roster = [
    Student("Maya", 92),
    Student("Leo", 85),
    Student("Ava", 92),
    Student("Zoe", 78),
    Student("Ben", 85),
]

# Natural order: sorted() uses __lt__.
print("By name:", [s.name for s in sorted(roster)])

# key= returns a tuple. Tuples compare item by item, left to right.
# -s.grade sorts grades high to low. s.name breaks ties A to Z.
ranked = sorted(roster, key=lambda s: (-s.grade, s.name))
print("By grade (high first), then name:")
for s in ranked:
    print(f"  {s.grade}  {s.name}")

# sort() changes the list in place. sorted() returns a new list.
roster.sort(key=lambda s: s.grade)
print("Grade only, low first:", [f"{s.name} {s.grade}" for s in roster])

# Edge case: Python's sort is stable, so ties keep their earlier order.
# Leo and Ben both have 85, and Leo came first in the list above.
print("Stable tie:", [s.name for s in roster if s.grade == 85])

# reverse=True flips everything, including the tie-breaker. That is why
# the tuple key uses -s.grade instead.
flipped = sorted(roster, key=lambda s: (s.grade, s.name), reverse=True)
print("Whole key reversed:", [f"{s.name} {s.grade}" for s in flipped])
