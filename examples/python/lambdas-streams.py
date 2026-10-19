from functools import reduce

scores = [88, 72, 95, 60, 100, 81, 54]

# A list comprehension filters and transforms in one line.
# Read it as: for each s in scores, if s >= 70, keep s + 5.
curved = [s + 5 for s in scores if s >= 70]
print("Curved passing scores:", curved)

# map() and filter() take a function and return a lazy iterator.
# list() runs it and collects the results.
passing = list(filter(lambda s: s >= 70, scores))
letters = list(map(lambda s: "A" if s >= 90 else "B" if s >= 80 else "C", passing))
print("Passing:", passing)
print("Letters:", letters)

# reduce() combines items two at a time into one value.
total = reduce(lambda acc, s: acc + s, scores, 0)
print("Total with reduce:", total)
# Built-ins like sum() and max() are clearer for common cases.
print("Total with sum:", sum(scores), "| Highest:", max(scores))

# A dict comprehension builds a mapping.
names = ["Maya", "Leo", "Ava"]
name_lengths = {name: len(name) for name in names}
print("Name lengths:", name_lengths)

# Edge case: a map or filter iterator can only be used once.
evens = filter(lambda s: s % 2 == 0, scores)
print("First pass:", list(evens))
print("Second pass:", list(evens))

# Edge case: reduce() on an empty list needs a starting value, or it fails.
print("Empty total:", reduce(lambda acc, s: acc + s, [], 0))
