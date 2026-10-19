# A grid is a list of lists. Each inner list is one row.
# Each row is a student. Each column is one of 4 quiz scores.
grades = [
    [90, 85, 77, 92],
    [68, 74, 81, 70],
    [100, 95, 98, 99],
]

# grid[row][col]: the row comes first, then the column.
print(f"Student 2, quiz 3: {grades[1][2]}")
print(f"Rows: {len(grades)}, columns: {len(grades[0])}")

# Nested loops visit every cell, one row at a time.
for row in range(len(grades)):
    total = 0
    for col in range(len(grades[row])):
        total += grades[row][col]
    print(f"Student {row + 1} average: {total / len(grades[row])}")

# Change one cell.
grades[1][0] = 72
print(f"Updated student 2: {grades[1]}")

# Build an empty grid with a list comprehension. Each row is a new list.
blank = [[0] * 4 for _ in range(3)]
blank[0][0] = 5
print(f"Right way: {blank}")

# Edge case: [[0] * 4] * 3 repeats the SAME row 3 times, so one change shows up in every row.
wrong = [[0] * 4] * 3
wrong[0][0] = 5
print(f"Wrong way: {wrong}")
