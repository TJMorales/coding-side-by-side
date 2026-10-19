# A comparison gives a bool: True or False.
score = 85
print("score >= 70:", score >= 70)
print("score == 100:", score == 100)
print("score != 100:", score != 100)

# and is True only when both sides are True.
homework_done = True
print("Passed and homework done:", score >= 70 and homework_done)

# or is True when at least one side is True.
has_late_pass = False
print("Homework done or late pass:", homework_done or has_late_pass)

# not flips True to False and False to True.
print("Not homework done:", not homework_done)

# = assigns a value. == compares two values.
print("score == 85:", score == 85)
