import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// A regular class you can change. Java has no shortcut for mutable data classes,
// so you write the constructor and toString yourself.
class Assignment {
    String title;
    int points;
    final List<String> tags = new ArrayList<>();

    Assignment(String title, int points) {
        this.title = title;
        this.points = points;
    }

    @Override
    public String toString() {
        return "Assignment[title=" + title + ", points=" + points + ", tags=" + tags + "]";
    }
}

// A record writes the constructor, getters, toString(), equals(), and hashCode().
// Every field is final, so a record cannot change after creation.
record Grade(String student, int score) {
    // Compact constructor: no parameter list. It runs before the fields are set.
    Grade {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("score must be 0-100, got " + score);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Assignment lab = new Assignment("Lab 3", 50);
        lab.points = 60; // a regular class can change
        lab.tags.add("late ok");
        System.out.println("Assignment: " + lab);

        Grade g1 = new Grade("Maya", 92);
        Grade g2 = new Grade("Maya", 92);
        System.out.println("Grade: " + g1);
        // equals() compares fields. == compares identity.
        System.out.println("g1.equals(g2): " + g1.equals(g2) + " | same object: " + (g1 == g2));
        // Getters use the field name with no "get": g1.score(), not g1.getScore().
        System.out.println("Score: " + g1.score());

        // Records also define hashCode(), so they work in sets and as map keys.
        Set<Grade> unique = new HashSet<>(List.of(g1, g2, new Grade("Leo", 85)));
        System.out.println("Unique grades: " + unique.size());

        // Edge case: there is no setter. g1.score = 100; does not compile:
        // score has private access in Grade

        // Edge case: validation rejects bad data at creation time.
        try {
            new Grade("Leo", 105);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
