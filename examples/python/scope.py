# A variable made inside an if block still exists after the block ends.
score = 93
if score >= 90:
    message = "Honor roll"
print(f"After the if: {message}")
# If score were below 90, message would never be created and this print
# would raise NameError: name 'message' is not defined.

# Loops work the same way: the loop variable keeps its last value.
for quiz in range(1, 4):
    pass
print(f"After the loop, quiz is {quiz}")

# A variable made inside a function is local. It is gone when the function ends.
def calculate_bonus():
    bonus = 5
    return bonus
print(f"Bonus: {calculate_bonus()}")

# To change a global variable inside a function, declare it global.
total_points = 0
def add_points(points):
    global total_points
    total_points += points
add_points(10)
add_points(15)
print(f"Total points: {total_points}")

# Edge case: without global, assigning inside a function makes a new local variable.
def reset():
    total_points = 0   # local only; the global keeps its value
reset()
print(f"After reset(): {total_points}")
