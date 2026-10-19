# "w" creates the file, or erases it if it already exists.
# The with block closes the file for you when the block ends.
with open("scores.txt", "w") as file:
    file.write("Ana,91\n")
    file.write("Ben,78\n")
    file.write("Chloe,85\n")   # write() does not add \n for you

# "a" adds to the end of the file instead of erasing it.
with open("scores.txt", "a") as file:
    file.write("Dev,94\n")

# "r" reads. Looping over the file gives one line at a time.
total = 0
count = 0
with open("scores.txt", "r") as file:
    for line in file:
        name, score = line.strip().split(",")
        total += int(score)
        count += 1
        print(f"{name}: {score}")
print(f"Class average: {total / count}")

# Edge case: opening a missing file with "r" raises FileNotFoundError.
try:
    with open("missing.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    print("missing.txt does not exist")
