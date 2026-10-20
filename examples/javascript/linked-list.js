// Each node holds one value and a reference to the next node.
// The last node's next is null, which marks the end of the list.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    // Walk to the last node, then attach the new one: O(n).
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  insertAt(index, value) {
    const newNode = new Node(value);
    if (index === 0) {
      // The new node becomes the head: O(1).
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    // Stop at the node just before the spot, then relink two references.
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }

  toString() {
    // Traversal: follow next until it is null.
    const parts = [];
    for (let current = this.head; current !== null; current = current.next) {
      parts.push(current.value);
    }
    parts.push("null");
    return parts.join(" -> ");
  }
}

const playlist = new LinkedList();
for (const song of ["Blue in Green", "So What", "Freddie Freeloader"]) {
  playlist.add(song);
}
console.log(`Playlist: ${playlist}`);

playlist.insertAt(1, "Take Five");
console.log(`After insertAt(1): ${playlist}`);

playlist.insertAt(0, "All Blues");
console.log(`After insertAt(0): ${playlist}`);

// Edge case: an empty list prints only the end marker.
console.log(`Empty: ${new LinkedList()}`);
