import sys


def factorial(n):
    # Base case: 0! and 1! are both 1. This is where the calls stop.
    if n <= 1:
        return 1
    # Recursive case: n! = n * (n - 1)!, a smaller version of the same problem.
    return n * factorial(n - 1)


def sum_of_digits(n):
    # Base case: a one-digit number is its own digit sum.
    if n < 10:
        return n
    # Recursive case: the last digit plus the digit sum of the rest.
    return n % 10 + sum_of_digits(n // 10)


def depth(n):
    # Base case: no more calls to make.
    if n == 0:
        return 0
    return 1 + depth(n - 1)


print(f"factorial(5) = {factorial(5)}")
print(f"factorial(0) = {factorial(0)}")
print(f"sum_of_digits(2026) = {sum_of_digits(2026)}")
print(f"sum_of_digits(7) = {sum_of_digits(7)}")

# Every call waits on the stack until the base case returns.
print(f"depth(500) = {depth(500)}")

# Edge case: Python stops programs that go too deep.
print(f"Recursion limit: {sys.getrecursionlimit()}")
try:
    depth(5000)
except RecursionError as error:
    print(f"RecursionError: {error}")
