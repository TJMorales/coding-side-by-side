# The inner loop runs all the way through for each pass of the outer loop.
print("Times table (1 to 4):")
for row in range(1, 5):
    for col in range(1, 5):
        print(f"{row * col:4}", end="")
    print()  # ends the row after the inner loop finishes

# The inner body runs rows x columns times.
count = 0
for row in range(3):
    for col in range(5):
        count += 1
print(f"3 rows x 5 columns = {count} inner steps")

# Edge case: the inner loop can use the outer variable to change its length.
print("Staircase:")
for row in range(1, 5):
    for col in range(row):
        print("*", end="")
    print()
