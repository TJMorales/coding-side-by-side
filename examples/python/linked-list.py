# Each node holds one value and a reference to the next node.
# The last node's next is None, which marks the end of the list.
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, value):
        # Walk to the last node, then attach the new one: O(n).
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def insert_at(self, index, value):
        new_node = Node(value)
        if index == 0:
            # The new node becomes the head: O(1).
            new_node.next = self.head
            self.head = new_node
            return
        # Stop at the node just before the spot, then relink two references.
        current = self.head
        for _ in range(index - 1):
            current = current.next
        new_node.next = current.next
        current.next = new_node

    def __str__(self):
        # Traversal: follow next until it is None.
        parts = []
        current = self.head
        while current is not None:
            parts.append(str(current.value))
            current = current.next
        parts.append("None")
        return " -> ".join(parts)


playlist = LinkedList()
for song in ["Blue in Green", "So What", "Freddie Freeloader"]:
    playlist.add(song)
print("Playlist:", playlist)

playlist.insert_at(1, "Take Five")
print("After insert_at(1):", playlist)

playlist.insert_at(0, "All Blues")
print("After insert_at(0):", playlist)

# Edge case: an empty list prints only the end marker.
print("Empty:", LinkedList())
