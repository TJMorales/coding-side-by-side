# def defines a function. score and total are parameters. No types are written.
def percent(score, total):
    return score / total * 100


# A function without return gives back None.
def print_report(name, grade):
    print(name, "has", grade, "percent")


# Call a function by its name with arguments in parentheses.
result = percent(45, 50)
print_report("Jordan", result)

# Each call runs the body again with new arguments.
print_report("Ava", percent(38, 40))

# print_report has no return, so its result is None.
returned = print_report("Leo", percent(20, 25))
print("print_report returned:", returned)
