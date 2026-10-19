from collections import deque

# A stack is last in, first out (LIFO). A Python list works as a stack:
# append() pushes on the end and pop() removes from the end, both O(1).
def is_balanced(code):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in code:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            # A closer must match the most recent opener still waiting.
            if not stack or stack.pop() != pairs[ch]:
                return False
    # Any opener left over was never closed.
    return len(stack) == 0


for code in ["print(scores[0])", "if (x > 0) { y = [1, 2]; }", "grades[(0]", "total = (a + b"]:
    print(f"{code:28} balanced: {is_balanced(code)}")

# Edge case: a closer with nothing on the stack.
print(f"{')(':28} balanced: {is_balanced(')(')}")

# A queue is first in, first out (FIFO). Use deque, not list:
# list.pop(0) shifts every item (O(n)), but deque.popleft() is O(1).
print_queue = deque()
for job in ["essay.docx", "lab-report.pdf", "poster.png"]:
    print_queue.append(job)
    print("Queued:", job)

print("Next up:", print_queue[0])
while print_queue:
    print("Printing:", print_queue.popleft())
print("Jobs left:", len(print_queue))
