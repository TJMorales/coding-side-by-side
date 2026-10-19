import functools

# Naive Fibonacci recomputes the same values again and again.
naive_calls = 0

def fib_naive(n):
    global naive_calls
    naive_calls += 1
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)


# Memoization: save each answer the first time, then look it up after that.
memo = {}
memo_calls = 0

def fib_memo(n):
    global memo_calls
    memo_calls += 1
    if n in memo:
        return memo[n]
    result = n if n <= 1 else fib_memo(n - 1) + fib_memo(n - 2)
    memo[n] = result
    return result


# @functools.cache builds the same dictionary for you.
@functools.cache
def fib_cached(n):
    return n if n <= 1 else fib_cached(n - 1) + fib_cached(n - 2)


n = 25
print(f"Naive fib({n}) = {fib_naive(n)} using {naive_calls} calls")
print(f"Memo fib({n}) = {fib_memo(n)} using {memo_calls} calls")
print(f"Cached fib({n}) = {fib_cached(n)}")
print("Cache info:", fib_cached.cache_info())

# Edge case: a second call reuses the saved answers, so it costs 1 call.
memo_calls = 0
fib_memo(n)
print(f"Second memo call for fib({n}): {memo_calls} call")
# Python ints never overflow, so fib(90) is exact.
print("fib(90) =", fib_cached(90))
