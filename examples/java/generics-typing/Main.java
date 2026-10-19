import java.util.List;

// <T> makes T a type parameter. The compiler fills it in for each Box you create.
class Box<T> {
    private final T item;

    Box(T item) {
        this.item = item;
    }

    T get() {
        return item;
    }

    @Override
    public String toString() {
        return "Box(" + item + ")";
    }
}

class Pair<A, B> {
    final A first;
    final B second;

    Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public String toString() {
        return "Pair(" + first + ", " + second + ")";
    }
}

public class Main {
    // A generic method: <T> before the return type. It returns the list's item type.
    static <T> T firstItem(List<T> items) {
        return items.get(0);
    }

    static double average(List<Double> scores) {
        double sum = 0;
        for (double s : scores) {
            sum += s;
        }
        return sum / scores.size();
    }

    public static void main(String[] args) {
        Box<String> locker = new Box<>("Calculator");
        // No cast needed: the compiler knows get() returns a String.
        String tool = locker.get();
        System.out.println("Box holds: " + tool);

        Pair<String, Integer> student = new Pair<>("Maya", 92);
        System.out.println("Pair: " + student + " -> " + student.first + " scored " + student.second);

        System.out.println("First score: " + firstItem(List.of(88, 95, 72)));
        System.out.println("First name: " + firstItem(List.of("Leo", "Ava")));
        System.out.println("Average: " + average(List.of(88.0, 95.0, 72.0)));

        // Edge case: the compiler checks generics before the program runs.
        // This line would not compile: incompatible types: int cannot be converted to String
        // Box<String> wrong = new Box<String>(404);
        // Generics need object types, so use Integer, not int: Box<Integer> ok = new Box<>(404);
        System.out.println("Box<Integer>: " + new Box<Integer>(404));
    }
}
