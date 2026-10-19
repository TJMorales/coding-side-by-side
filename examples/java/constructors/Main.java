import java.util.ArrayList;
import java.util.List;

class Student {
    String name;
    int gradeLevel;
    ArrayList<Integer> scores;

    // Java can have several constructors with different parameter lists.
    // this(...) calls another constructor and must be the first line.
    Student() {
        this("New student");
    }

    Student(String name) {
        this(name, 9);
    }

    Student(String name, int gradeLevel) {
        this(name, gradeLevel, List.of());
    }

    // This constructor does the real work. The others all lead here.
    Student(String name, int gradeLevel, List<Integer> scores) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        // new ArrayList<>(scores) copies the list, so each Student owns its own scores.
        this.scores = new ArrayList<>(scores);
    }

    String describe() {
        return name + ", grade " + gradeLevel + ", scores " + scores;
    }
}

public class Main {
    public static void main(String[] args) {
        // Java picks the constructor whose parameters match the arguments.
        System.out.println(new Student().describe());
        System.out.println(new Student("Maya").describe());
        System.out.println(new Student("Leo", 11).describe());
        System.out.println(new Student("Ana", 12, List.of(95, 88)).describe());

        // Java has no keyword arguments, so you pass grade 9 yourself to reach scores.
        System.out.println(new Student("Sam", 9, List.of(70)).describe());

        // Edge case: two students made with no scores get separate lists.
        Student ava = new Student("Ava");
        Student ben = new Student("Ben");
        ava.scores.add(100);
        System.out.println("Ava: " + ava.scores + ", Ben: " + ben.scores);
    }
}
