# An f-string puts values inside {} directly in the text.
student = "Jordan"
average = 87.4567
print(f"{student}'s average: {average}")

# :.2f rounds to 2 decimal places when printing. The variable keeps its full value.
print(f"Rounded: {average:.2f}")

# A number after the colon sets the width. < aligns left, > aligns right.
courses = ["Algebra", "Biology", "CS"]
grades = [91.5, 84.62, 99.0]
print(f"{'Class':<12}{'Grade':>6}")
for i in range(len(courses)):
    print(f"{courses[i]:<12}{grades[i]:>6.1f}")

# , adds thousands separators. % multiplies by 100 and adds a percent sign.
print(f"Fundraiser: ${12500.5:,.2f}")
print(f"Completion: {7 / 8:.1%}")

# You can save a formatted string in a variable instead of printing it.
label = f"{student}: {average:.1f}"
print(f"Label: {label}")

# Edge case: the width is a minimum. Longer text is not cut off.
print(f"[{'Computer Science':<5}]")
