# String methods return a new string. The original never changes.
name = "  maya lopez  "
clean = name.strip().upper()
print(f"Original: '{name}'")
print(f"Cleaned: '{clean}'")

# Slicing s[start:end] includes start and stops before end.
course = "CSA-2115"
print(f"Course: {course[0:3]}")
print(f"Room: {course[4:]}")
print(f"course[1:4] (index 1 up to 4): {course[1:4]}")

# find() gives the index of the first match, or -1 if there is none.
print(f"Index of '-': {course.find('-')}")
print(f"Has 'CSA': {'CSA' in course}")
print(f"Replaced: {course.replace('CSA', 'CS1')}")

# split() breaks a string into a list. join() puts the pieces back together.
roster = "Ana,Ben,Chloe"
names = roster.split(",")
print(f"Split: {names}")
print(f"Joined: {' | '.join(names)}")

# Edge case: calling a method without saving the result changes nothing.
course.lower()
print(f"After course.lower(): {course}")
course = course.lower()
print(f"After course = course.lower(): {course}")
