// Each node holds one value and a reference to the next node. The last node's next is null.
class Node {
    final String value;
    Node next;

    Node(String value) {
        this.value = value;
    }
}

class SongList {
    private Node head;

    void add(String value) {
        // Walk to the last node, then attach the new one: O(n).
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            return;
        }
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }

    void insertAt(int index, String value) {
        Node newNode = new Node(value);
        if (index == 0) {
            // The new node becomes the head: O(1).
            newNode.next = head;
            head = newNode;
            return;
        }
        // Stop at the node just before the spot, then relink two references.
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }

    @Override
    public String toString() {
        // Traversal: follow next until it is null.
        StringBuilder sb = new StringBuilder();
        for (Node current = head; current != null; current = current.next) {
            sb.append(current.value).append(" -> ");
        }
        return sb.append("null").toString();
    }
}

public class Main {
    public static void main(String[] args) {
        SongList playlist = new SongList();
        for (String song : new String[] {"Blue in Green", "So What", "Freddie Freeloader"}) {
            playlist.add(song);
        }
        System.out.println("Playlist: " + playlist);
        playlist.insertAt(1, "Take Five");
        System.out.println("After insertAt(1): " + playlist);
        playlist.insertAt(0, "All Blues");
        System.out.println("After insertAt(0): " + playlist);
        // Edge case: an empty list prints only the end marker.
        System.out.println("Empty: " + new SongList());
    }
}
