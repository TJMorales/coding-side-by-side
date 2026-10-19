"""Gradebook helper.

A docstring is a string in triple quotes at the top of a file or function.
It describes what the code does, and help() can display it.
"""

# A comment starts with # and runs to the end of the line.
# Python skips comments, so they are notes for people reading the code.
quiz_score = 18
total_points = 20


def percent(score, total):
    """Return score out of total as a percent."""
    return score / total * 100


print("Quiz percent:", percent(quiz_score, total_points))  # A comment can follow code.

# Putting # in front of a line turns it off. This line does not run:
# print("This will not print.")
print("Docstring:", percent.__doc__)
