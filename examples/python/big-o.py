# Big-O describes how the number of steps grows as the input size n grows.
# Counting steps gives the same answer on every computer. Timing does not.

def linear_search(items, target):
    steps = 0
    for item in items:
        steps += 1
        if item == target:
            break
    return steps


def binary_search(items, target):
    # Only works on a sorted list. Each step cuts the search range in half.
    steps = 0
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        steps += 1
        mid = (lo + hi) // 2
        if items[mid] == target:
            break
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return steps


def count_pairs(n):
    # Two nested loops over n items run n * n times: O(n^2).
    steps = 0
    for i in range(n):
        for j in range(n):
            steps += 1
    return steps


print(f"{'n':>6} {'O(n) linear':>12} {'O(log n) binary':>16} {'O(n^2) pairs':>13}")
for n in [10, 100, 1000]:
    student_ids = list(range(n))  # sorted IDs 0 to n - 1
    missing_id = n                # not in the list: the worst case
    print(f"{n:>6} {linear_search(student_ids, missing_id):>12} "
          f"{binary_search(student_ids, missing_id):>16} {count_pairs(n):>13}")

# Edge case: the best case is very different from the worst case.
print("Linear search for the first ID:", linear_search(list(range(1000)), 0), "step")

# To time code anyway, use time.perf_counter(). The result changes on every run:
# start = time.perf_counter(); linear_search(ids, n); print(time.perf_counter() - start)
