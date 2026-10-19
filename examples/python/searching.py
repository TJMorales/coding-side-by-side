def linear_search(items, target):
    comparisons = 0
    # Check each item from the front until you find the target.
    for i in range(len(items)):
        comparisons += 1
        if items[i] == target:
            return i, comparisons
    return -1, comparisons


def binary_search(items, target):
    # Binary search only works when the list is already sorted.
    comparisons = 0
    low = 0
    high = len(items) - 1
    while low <= high:
        # // rounds down, so mid is always a whole-number index.
        mid = (low + high) // 2
        comparisons += 1
        if items[mid] == target:
            return mid, comparisons
        elif items[mid] < target:
            low = mid + 1   # target is in the right half
        else:
            high = mid - 1  # target is in the left half
    return -1, comparisons


scores = [55, 61, 68, 72, 77, 81, 85, 88, 90, 94, 97, 100]
print(f"Scores: {scores}")

for target in [88, 100]:
    index, count = linear_search(scores, target)
    print(f"Linear search for {target}: index {index}, {count} comparisons")
    index, count = binary_search(scores, target)
    print(f"Binary search for {target}: index {index}, {count} comparisons")

# Edge case: a missing value returns -1 after checking as much as needed.
index, count = linear_search(scores, 70)
print(f"Linear search for 70: index {index}, {count} comparisons")
index, count = binary_search(scores, 70)
print(f"Binary search for 70: index {index}, {count} comparisons")
