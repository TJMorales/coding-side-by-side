# Merge sort splits the list in half, sorts each half, then merges them.
# It always takes O(n log n) steps, even on the worst input.

def merge_sort(scores):
    # Base case: a list with 0 or 1 items is already sorted.
    if len(scores) <= 1:
        return scores[:]
    mid = len(scores) // 2
    # Slices make new lists, so the original list is never changed.
    left = merge_sort(scores[:mid])
    right = merge_sort(scores[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    # Take the smaller front item each time. <= keeps equal items in order (stable).
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # One side is empty now. Copy whatever is left from the other side.
    result.extend(left[i:])
    result.extend(right[j:])
    return result


quiz_scores = [88, 72, 95, 60, 72, 100, 81]
print("Before:", quiz_scores)
print("After: ", merge_sort(quiz_scores))
print("Original unchanged:", quiz_scores)

# Edge cases: empty and single-item lists return right away.
print("Empty:", merge_sort([]))
print("One item:", merge_sort([42]))
