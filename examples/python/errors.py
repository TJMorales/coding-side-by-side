# This program has a bug on purpose. Read the error at the bottom of the output.
scores = [88, 92, 75]
print("Number of scores:", len(scores))
print("First score:", scores[0])

# A type mistake is also found only when its line runs:
# total = "90" + 5  would run until this line, then raise TypeError

# The valid indexes are 0, 1, and 2. Index 3 does not exist.
print("Fourth score:", scores[3])
print("This line never runs.")

# How to read the traceback:
# 1. Start at the last line. It names the error type and the reason:
#    IndexError: list index out of range
# 2. The line above the code names the file and the line number (line 10).
# 3. The ^^^ marks show the exact part of the line that failed.
# Python only finds this mistake when line 10 runs, so lines 3 and 4 still printed.
