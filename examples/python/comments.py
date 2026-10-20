"""Gradebook helper.

A docstring is a string in triple quotes at the top of a file.
It describes what the file does, and help() can display it.
"""

# A comment starts with # and runs to the end of the line.
# Python skips comments, so they are notes for people reading the code.
quiz_score = 18
total_points = 20

print("Quiz percent:", quiz_score / total_points * 100)  # A comment can follow code.

# Putting # in front of a line turns it off. This line does not run:
# print("This will not print.")
print("Docstring:", __doc__)
