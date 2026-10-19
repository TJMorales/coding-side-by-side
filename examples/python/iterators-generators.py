# A generator function uses yield. Each next() runs the code until the next
# yield, hands back that value, and pauses there.
def countdown(start):
    while start > 0:
        yield start
        start -= 1


# A generator that splits a roster into groups of size.
def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


# The same countdown written as a class with the iterator protocol.
# __iter__ returns the iterator. __next__ returns the next value or raises StopIteration.
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


print("Generator:", list(countdown(5)))
print("Class:    ", list(Countdown(5)))

roster = ["Maya", "Leo", "Ava", "Zoe", "Ben", "Ivy", "Sam"]
for number, group in enumerate(chunks(roster, 3), start=1):
    print(f"Lab group {number}: {group}")

# A for loop calls next() for you. Here it is by hand.
launch = countdown(3)
print("next():", next(launch), next(launch), next(launch))
# Edge case: the generator is used up. next() with a default avoids StopIteration.
print("After the end:", next(launch, "done"))

# Generators are lazy: values are made only when asked for, so this
# endless one is safe as long as you stop early.
def student_ids():
    n = 1000
    while True:
        yield n
        n += 1

ids = student_ids()
print("First 4 IDs:", [next(ids) for _ in range(4)])
