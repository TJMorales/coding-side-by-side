# A while loop repeats as long as its condition is True.
savings = 0
weeks = 0
while savings < 100:
    savings = savings + 30
    weeks = weeks + 1
    print("Week", weeks, "Savings:", savings)
print("Reached the goal in", weeks, "weeks")

# Something in the body must change the condition, or the loop never stops.
# If the condition is False at the start, the body runs zero times.
lives = 0
while lives > 0:
    print("Playing with", lives, "lives")
print("Loop skipped because lives is", lives)
