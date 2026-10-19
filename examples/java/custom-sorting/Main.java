import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// Comparable gives the class a natural order (by name).
class Student implements Comparable<Student> {
    final String name;
    final int grade;

    Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    String getName() {
        return name;
    }

    int getGrade() {
        return grade;
    }

    // Negative means this comes first, positive means other comes first, 0 means tie.
    @Override
    public int compareTo(Student other) {
        return name.compareTo(other.name);
    }

    @Override
    public String toString() {
        return name + " " + grade;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> roster = new ArrayList<>(List.of(
                new Student("Maya", 92), new Student("Leo", 85), new Student("Ava", 92),
                new Student("Zoe", 78), new Student("Ben", 85)));

        // Natural order: sort(null) uses compareTo.
        List<Student> byName = new ArrayList<>(roster);
        byName.sort(null);
        System.out.println("By name: " + byName);

        // A Comparator chain: grade high to low, then name A to Z for ties.
        // reversed() applies only to the comparator built so far, not to thenComparing.
        Comparator<Student> ranking = Comparator.comparingInt(Student::getGrade).reversed()
                .thenComparing(Student::getName);
        List<Student> ranked = new ArrayList<>(roster);
        ranked.sort(ranking);
        System.out.println("By grade (high first), then name:");
        for (Student s : ranked) {
            System.out.println("  " + s.grade + "  " + s.name);
        }

        // Grade only, low first. List.sort is stable, so ties keep their order.
        roster.sort(Comparator.comparingInt(Student::getGrade));
        System.out.println("Grade only, low first: " + roster);
        // Edge case: Leo and Ben both have 85, and Leo came first in the original list.
        System.out.println("Stable tie: " + roster.subList(1, 3));

        // reversed() at the end flips everything, including the tie-breaker.
        roster.sort(Comparator.comparingInt(Student::getGrade).thenComparing(Student::getName).reversed());
        System.out.println("Whole chain reversed: " + roster);
    }
}
