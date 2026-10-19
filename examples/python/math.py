# + - * work the way you expect.
print("7 + 2 =", 7 + 2)
print("7 - 2 =", 7 - 2)
print("7 * 2 =", 7 * 2)

# / always gives a float, even when both values are ints.
print("7 / 2 =", 7 / 2)

# // divides and drops the decimal part. % gives the remainder.
print("7 // 2 =", 7 // 2)
print("7 % 2 =", 7 % 2)

# ** raises a number to a power.
print("2 ** 3 =", 2 ** 3)

# Pick / or // on purpose. They give different averages for the same total.
total = 90 + 85 + 82
print("Average with //:", total // 3)
print("Average with /:", total / 3)
