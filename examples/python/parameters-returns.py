# Parameters receive values. return sends a result back to the caller.
def letter_grade(score):
    if score >= 90:
        return "A"   # return ends the function right away
    if score >= 80:
        return "B"
    return "C or below"

# A parameter can have a default value that is used when you leave it out.
def curve(score, points=5):
    return min(score + points, 100)

# Python can return several values at once. They come back as a tuple.
def summarize(scores):
    return min(scores), max(scores), sum(scores) / len(scores)

quiz = [72, 95, 88]
print(f"95 earns: {letter_grade(95)}")
print(f"72 curved: {curve(72)}")
print(f"98 curved by 10: {curve(98, 10)}")
low, high, average = summarize(quiz)
print(f"Low: {low}, high: {high}, average: {average:.1f}")

# Edge case: a function with no return statement gives back None.
def show(scores):
    print(f"Scores: {scores}")

result = show(quiz)
print(f"show() returned: {result}")
