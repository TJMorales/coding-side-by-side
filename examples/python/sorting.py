def selection_sort(items):
    for i in range(len(items) - 1):
        # Find the smallest value in the unsorted part.
        smallest = i
        for j in range(i + 1, len(items)):
            if items[j] < items[smallest]:
                smallest = j
        # Swap it into position i. Python swaps in one line.
        items[i], items[smallest] = items[smallest], items[i]
        print(f"Pass {i + 1}: {items}")


def insertion_sort(items):
    shifts = 0
    for i in range(1, len(items)):
        current = items[i]
        j = i - 1
        # Shift larger values right to open a gap for current.
        while j >= 0 and items[j] > current:
            items[j + 1] = items[j]
            j -= 1
            shifts += 1
        items[j + 1] = current
    return shifts


scores = [88, 72, 95, 61, 79]
print(f"Start:  {scores}")
selection_sort(scores)

scores = [88, 72, 95, 61, 79]
shifts = insertion_sort(scores)
print(f"Insertion sort: {scores}, {shifts} shifts")

# Edge case: insertion sort does no shifts on a list that is already sorted.
shifts = insertion_sort(scores)
print(f"Sorted again:   {scores}, {shifts} shifts")
