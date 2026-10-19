import java.util.ArrayList;

class Student {
    private final String name;
    private final int studentId;

    Student(String name, int studentId) {
        this.name = name;
        this.studentId = studentId;
    }

    // toString() controls what println and + show for the object.
    @Override
    public String toString() {
        return name + " (#" + studentId + ")";
    }

    // equals() must take Object, not Student, or it does not override.
    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Student)) {
            return false;
        }
        return studentId == ((Student) other).studentId;
    }

    // Objects that are equal must have equal hash codes, so override both.
    @Override
    public int hashCode() {
        return Integer.hashCode(studentId);
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Maya", 1001);
        Student b = new Student("Maya", 1001); // a separate object with the same data
        Student c = a;                         // a second name for the same object

        System.out.println(a);
        System.out.println("Roster entry: " + b);

        // equals() compares the data.
        System.out.println("a.equals(b): " + a.equals(b));

        // == on objects checks whether both names point to the very same object.
        System.out.println("a == b: " + (a == b));
        System.out.println("a == c: " + (a == c));

        // contains() calls equals(), so b is found even though the list holds a.
        ArrayList<Student> roster = new ArrayList<>();
        roster.add(a);
        System.out.println("roster.contains(b): " + roster.contains(b));

        // Edge case: a Student is never equal to a plain number.
        System.out.println("a.equals(1001): " + a.equals(1001));
    }
}
