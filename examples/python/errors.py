# This program has a bug on purpose. Read the error at the bottom of the output.
scores = [88, 92, 75]
print("Number of scores:", len(scores))
print("First score:", scores[0])

# The valid indexes are 0, 1, and 2. Index 3 does not exist.
print("Fourth score:", scores[3])
print("This line never runs.")

# How to read the traceback:
# 1. Start at the last line. It names the error type and the reason:
#    IndexError: list index out of range
# 2. The line above the code names the file and the line number (line 7).
# 3. The ^^^ marks show the exact part of the line that failed.
# Python only finds this mistake when line 7 runs, so lines 3 and 4 still printed.
