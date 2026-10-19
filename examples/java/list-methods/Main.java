import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // An ArrayList can grow and shrink. An array cannot change size.
        // The type in <> must be a class, so use Integer, not int, for numbers.
        ArrayList<String> playlist = new ArrayList<>();
        playlist.add("Levitating");
        playlist.add("Blinding Lights");
        playlist.add("As It Was");       // adds to the end
        playlist.add(0, "Flowers");      // adds at index 0 and shifts the rest right
        System.out.println("Playlist: " + playlist);
        System.out.println("Size: " + playlist.size());

        // get() reads one item. set() replaces one item.
        playlist.set(1, "Espresso");
        System.out.println("First song: " + playlist.get(0));
        System.out.println("After replacing index 1: " + playlist);

        // remove(Object) deletes by value. remove(int) deletes by index and returns the item.
        playlist.remove("Blinding Lights");
        String last = playlist.remove(playlist.size() - 1);
        System.out.println("Removed: " + last);
        System.out.println("After removing: " + playlist);

        // contains() checks for a value. indexOf() finds where it is.
        System.out.println("Has 'Espresso': " + playlist.contains("Espresso"));
        System.out.println("Index of 'Espresso': " + playlist.indexOf("Espresso"));

        // Edge case: remove() on a missing value returns false. It does not crash.
        boolean removed = playlist.remove("Hello");
        System.out.println("Removed 'Hello': " + removed);
    }
}
