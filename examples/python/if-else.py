score = 84

# Python checks each condition from top to bottom and runs the first one that is True.
# The colon starts the block. Indentation shows which lines belong to it.
if score >= 90:
    letter = "A"
elif score >= 80:
    letter = "B"
elif score >= 70:
    letter = "C"
else:
    letter = "F"
print("Score:", score, "Letter:", letter)

# Order matters. 95 is also >= 80, but only the first True branch runs.
score = 95
if score >= 80:
    print("Score:", score, "Branch: B or better")
elif score >= 90:
    print("Score:", score, "Branch: A (this never runs)")
