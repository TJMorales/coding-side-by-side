# Type hints describe what a variable or function expects.
# Python does NOT enforce them when the program runs. Tools like mypy check them.

# Python 3.12 generic syntax: [T] makes T a type variable for this class.
class Box[T]:
    def __init__(self, item: T) -> None:
        self.item = item

    def get(self) -> T:
        return self.item

    def __repr__(self) -> str:
        return f"Box({self.item!r})"


class Pair[A, B]:
    def __init__(self, first: A, second: B) -> None:
        self.first = first
        self.second = second

    def __repr__(self) -> str:
        return f"Pair({self.first!r}, {self.second!r})"


# A generic function: the return type matches the list's item type.
def first_item[T](items: list[T]) -> T:
    return items[0]


def average(scores: list[float]) -> float:
    return sum(scores) / len(scores)


locker = Box[str]("Calculator")
print("Box holds:", locker.get())

student = Pair[str, int]("Maya", 92)
print("Pair:", student, "->", student.first, "scored", student.second)

print("First score:", first_item([88, 95, 72]))
print("First name:", first_item(["Leo", "Ava"]))
print("Average:", average([88.0, 95.0, 72.0]))

# Edge case: the hint says str, but Python runs this anyway with no error.
wrong = Box[str](404)
print("Box[str] holding an int:", wrong, type(wrong.get()).__name__)

# Hints are stored as data you can inspect, but nothing checks them.
print("average hints:", average.__annotations__)
