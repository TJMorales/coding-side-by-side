import math   # the math module must be imported before you use it

# Square roots and powers. math.sqrt() always returns a float.
print(f"Square root of 144: {math.sqrt(144)}")
print(f"2 to the 10th: {2 ** 10}")
print(f"math.pow(2, 10): {math.pow(2, 10)}")

# Distance between two points on a game map.
x1, y1, x2, y2 = 1, 2, 4, 6
distance = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
print(f"Distance: {distance}")

# ceil() rounds up and floor() rounds down.
students = 47
print(f"Buses needed (40 per bus): {math.ceil(students / 40)}")
print(f"Full rows of 10: {math.floor(students / 10)}")

# abs(), max(), min(), and round() are built in. They do not need math.
print(f"abs(-7): {abs(-7)}")
print(f"Area of a circle with radius 3: {round(math.pi * 3 ** 2, 2)}")

# Edge case: round() uses banker's rounding. Halves go to the even number.
print(f"round(2.5): {round(2.5)}")
print(f"round(3.5): {round(3.5)}")
