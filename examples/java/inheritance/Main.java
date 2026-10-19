import java.util.Arrays;

class Student {
    // protected lets subclasses read these fields directly.
    protected String name;
    protected int[] scores;

    Student(String name, int[] scores) {
        this.name = name;
        this.scores = scores;
    }

    double average() {
        // Arrays.stream(...).sum() adds every score in the array.
        return (double) Arrays.stream(scores).sum() / scores.length;
    }

    String describe() {
        return String.format("%s: average %.1f", name, average());
    }
}

// HonorsStudent inherits every field and method from Student.
class HonorsStudent extends Student {
    private final String course;

    HonorsStudent(String name, int[] scores, String course) {
        // super(...) runs the parent constructor. It must be the first line.
        super(name, scores);
        this.course = course;
    }

    // Override describe(), but reuse the parent's version through super.
    @Override
    String describe() {
        return String.format("%s, weighted %.1f in %s", super.describe(), average() + 5, course);
    }
}

public class Main {
    public static void main(String[] args) {
        Student leo = new Student("Leo", new int[] {78, 84});
        HonorsStudent maya = new HonorsStudent("Maya", new int[] {92, 85}, "AP CSA");

        System.out.println(leo.describe());
        System.out.println(maya.describe());

        // maya can call average() even though HonorsStudent never defines it.
        System.out.printf("Maya's plain average: %.1f%n", maya.average());

        // Edge case: an HonorsStudent is a Student, but a Student is not an HonorsStudent.
        System.out.println("Maya is a Student: " + (maya instanceof Student));
        System.out.println("Leo is an HonorsStudent: " + (leo instanceof HonorsStudent));
    }
}
