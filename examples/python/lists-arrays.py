# A list holds several values in order, inside square brackets.
scores = [88, 92, 75]

# Index numbers start at 0. The last index is len(scores) - 1.
print("First score:", scores[0])
print("Last score:", scores[len(scores) - 1])
print("Number of scores:", len(scores))

# You can change a value at an index.
scores[2] = 79
print("After fixing a score:", scores)

# A list can grow. append() adds a value to the end.
scores.append(95)
print("After append:", scores)
print("Number of scores now:", len(scores))

