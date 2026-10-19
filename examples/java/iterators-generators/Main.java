import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

// Iterable means "can be used in an enhanced for loop".
// iterator() returns a new Iterator each time, so the loop can run again.
class Countdown implements Iterable<Integer> {
    private final int start;

    Countdown(int start) {
        this.start = start;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current > 0;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException("countdown finished");
                }
                return current--; // return the value, then subtract 1
            }
        };
    }
}

public class Main {
    // Java has no yield for iterators, so this builds every group up front.
    static List<List<String>> chunks(List<String> items, int size) {
        List<List<String>> groups = new ArrayList<>();
        for (int i = 0; i < items.size(); i += size) {
            groups.add(items.subList(i, Math.min(i + size, items.size())));
        }
        return groups;
    }

    public static void main(String[] args) {
        List<Integer> values = new ArrayList<>();
        // The enhanced for calls iterator(), then hasNext() and next() for you.
        for (int n : new Countdown(5)) {
            values.add(n);
        }
        System.out.println("Iterable: " + values);

        List<String> roster = List.of("Maya", "Leo", "Ava", "Zoe", "Ben", "Ivy", "Sam");
        int number = 1;
        for (List<String> group : chunks(roster, 3)) {
            System.out.println("Lab group " + number++ + ": " + group);
        }

        // Here it is by hand.
        Iterator<Integer> launch = new Countdown(3).iterator();
        System.out.println("next(): " + launch.next() + " " + launch.next() + " " + launch.next());
        // Edge case: the iterator is used up. Check hasNext() to avoid NoSuchElementException.
        System.out.println("After the end: " + (launch.hasNext() ? launch.next() : "done"));
    }
}
