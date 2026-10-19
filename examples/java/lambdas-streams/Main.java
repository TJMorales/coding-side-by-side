import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = List.of(88, 72, 95, 60, 100, 81, 54);

        // A stream runs steps in order: filter keeps items, map transforms them,
        // and collect gathers the results into a new List.
        List<Integer> curved = scores.stream()
                .filter(s -> s >= 70)
                .map(s -> s + 5)
                .collect(Collectors.toList());
        System.out.println("Curved passing scores: " + curved);

        List<Integer> passing = scores.stream().filter(s -> s >= 70).toList();
        List<String> letters = passing.stream()
                .map(s -> s >= 90 ? "A" : s >= 80 ? "B" : "C")
                .toList();
        System.out.println("Passing: " + passing);
        System.out.println("Letters: " + letters);

        // reduce() combines items two at a time into one value, starting from 0.
        int total = scores.stream().reduce(0, (acc, s) -> acc + s);
        System.out.println("Total with reduce: " + total);
        // IntStream methods like sum() and max() are clearer for common cases.
        int highest = scores.stream().mapToInt(Integer::intValue).max().getAsInt();
        System.out.println("Total with sum: " + scores.stream().mapToInt(Integer::intValue).sum()
                + " | Highest: " + highest);

        // Collectors.toMap builds a mapping. Function.identity() means "the item itself".
        List<String> names = List.of("Maya", "Leo", "Ava");
        Map<String, Integer> nameLengths = names.stream()
                .collect(Collectors.toMap(Function.identity(), String::length));
        System.out.println("Name lengths: " + nameLengths.get("Maya") + ", "
                + nameLengths.get("Leo") + ", " + nameLengths.get("Ava"));

        // Edge case: a stream can only be used once. A second terminal call throws
        // IllegalStateException: stream has already been operated upon or closed.
        Stream<Integer> evens = scores.stream().filter(s -> s % 2 == 0);
        System.out.println("First pass: " + evens.toList());
        try {
            System.out.println("Second pass: " + evens.toList());
        } catch (IllegalStateException e) {
            System.out.println("Second pass: " + e.getMessage());
        }

        // Edge case: reduce() on an empty stream returns the starting value.
        System.out.println("Empty total: " + List.<Integer>of().stream().reduce(0, Integer::sum));
    }
}
