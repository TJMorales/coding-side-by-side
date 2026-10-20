import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

// A HashSet finds items by hashCode() first, then confirms with equals().
// This class has equals() but no hashCode(), so the set looks in the wrong place.
class StudentNoHash {
    final int studentId;
    final String name;
    StudentNoHash(int studentId, String name) {
        this.studentId = studentId;
        this.name = name;
    }
    @Override
    public boolean equals(Object other) {
        return other instanceof StudentNoHash s && studentId == s.studentId;
    }
}

class Student {
    final int studentId;
    final String name;

    Student(int studentId, String name) {
        this.studentId = studentId;
        this.name = name;
    }

    @Override
    public boolean equals(Object other) {
        // Two students are the same if their IDs match.
        return other instanceof Student s && studentId == s.studentId;
    }

    @Override
    public int hashCode() {
        // Equal objects must have equal hash codes, so hash the field equals() uses.
        return Objects.hash(studentId);
    }

    @Override
    public String toString() {
        return "Student(" + studentId + ", " + name + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        // Broken: equals() says the two Mayas match, but the set counts both. No error.
        Set<StudentNoHash> broken = new HashSet<>();
        broken.add(new StudentNoHash(1042, "Maya"));
        broken.add(new StudentNoHash(1042, "Maya"));
        broken.add(new StudentNoHash(2077, "Leo"));
        System.out.println("Only equals(): " + broken.size() + " students");
        System.out.println("Lookup finds Maya: " + broken.contains(new StudentNoHash(1042, "Maya")));

        // Fixed: duplicates collapse and lookups work.
        Set<Student> attendance = new HashSet<>();
        attendance.add(new Student(1042, "Maya"));
        attendance.add(new Student(1042, "Maya"));
        attendance.add(new Student(2077, "Leo"));
        System.out.println("With equals/hashCode: " + attendance.size() + " students");
        System.out.println("Lookup finds Maya: " + attendance.contains(new Student(1042, "Maya")));

        // Set operations compare by the same rules. retainAll keeps only shared items.
        Set<Student> both = new HashSet<>(attendance);
        both.retainAll(Set.of(new Student(2077, "Leo"), new Student(3150, "Ava")));
        System.out.println("In class and club: " + both);
    }
}
