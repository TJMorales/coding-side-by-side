import java.util.ArrayList;

// A class defines the fields and methods its objects have. Each object made from it has its own data.
class Student {
    // Fields are declared at the top of the class, each with a type.
    String name;
    int gradeLevel;
    ArrayList<Integer> scores = new ArrayList<>();

    // The constructor runs when you write new Student(...).
    Student(String name, int gradeLevel) {
        // this.name is the field. name alone is the parameter.
        this.name = name;
        this.gradeLevel = gradeLevel;
    }

    // A method declares its return type. void means it returns nothing.
    void addScore(int score) {
        scores.add(score);
    }

    double average() {
        if (scores.isEmpty()) {
            return 0.0;
        }
        int total = 0;
        for (int score : scores) {
            total += score;
        }
        return (double) total / scores.size();
    }
}

public class Main {
    public static void main(String[] args) {
        // Each new Student(...) makes a separate object.
        Student maya = new Student("Maya", 10);
        Student leo = new Student("Leo", 11);

        maya.addScore(92);
        maya.addScore(85);
        leo.addScore(78);

        System.out.printf("%s, grade %d: average %.1f%n", maya.name, maya.gradeLevel, maya.average());
        System.out.printf("%s, grade %d: average %.1f%n", leo.name, leo.gradeLevel, leo.average());

        // Changing one object does not change the other.
        leo.name = "Leonardo";
        System.out.println("After rename: " + maya.name + " and " + leo.name);

        // Edge case: a new student has no scores, so average() returns 0.0.
        Student sam = new Student("Sam", 9);
        System.out.printf("%s, grade %d: average %.1f%n", sam.name, sam.gradeLevel, sam.average());
    }
}
