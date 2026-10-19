# A dict stores key: value pairs. You look up a value by its key.
scores = {"Ana": 91, "Ben": 78}
scores["Chloe"] = 85   # a new key adds a pair
scores["Ben"] = 82     # an existing key replaces the old value
print(f"Ben's score: {scores['Ben']}")
print(f"Size: {len(scores)}")

# in checks the keys, not the values.
print(f"Has Ana: {'Ana' in scores}")
print(f"Has 91: {91 in scores}")

# items() gives each key and value together. A dict keeps insertion order.
for name, score in scores.items():
    print(f"  {name}: {score}")

del scores["Ana"]
print(f"After removing Ana: {scores}")

# Count things: get(key, 0) starts a missing key at 0.
votes = ["pizza", "tacos", "pizza", "salad", "tacos", "pizza"]
counts = {}
for food in votes:
    counts[food] = counts.get(food, 0) + 1
print(f"Lunch votes: {counts}")

# Edge case: scores["Zoe"] would raise KeyError. get() returns a default instead.
print(f"Zoe's score: {scores.get('Zoe', 'not found')}")
