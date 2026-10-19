# show_total prints the total. You see it, but the program cannot use it later.
def show_total(quiz, test):
    print("Total:", quiz + test)

# get_total returns the total, so you can store it and do math with it.
def get_total(quiz, test):
    return quiz + test

# return ends the function right away. Only the first return that runs counts.
def letter_grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    return "C or below"

show_total(40, 45)
total = get_total(40, 45)
print("Average:", total / 2)
print("85 earns:", letter_grade(85))

# Edge case: show_total has no return, so it gives back None.
result = show_total(30, 35)
print("show_total returned:", result)
