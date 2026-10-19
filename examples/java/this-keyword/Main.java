// this in Java and self in Python both mean "the object this method is running on".
class BrokenStudent {
    String name;
    int gradeLevel;
    double gpa;

    // Bug: the parameters have the same names as the fields, so the parameters win.
    // name = name; assigns the parameter to itself. The field keeps its default.
    BrokenStudent(String name, int gradeLevel, double gpa) {
        name = name;
        gradeLevel = gradeLevel;
        gpa = gpa;
    }
}

class Student {
    String name;
    int gradeLevel;
    double gpa;

    // Fix: this.name is the field. name is the parameter.
    Student(String name, int gradeLevel, double gpa) {
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.gpa = gpa;
    }

    void setGpa(double gpa) {
        this.gpa = gpa;
    }
}

public class Main {
    public static void main(String[] args) {
        BrokenStudent broken = new BrokenStudent("Maya", 10, 3.8);
        System.out.println("Broken: " + broken.name + ", grade " + broken.gradeLevel + ", GPA " + broken.gpa);

        Student maya = new Student("Maya", 10, 3.8);
        maya.setGpa(3.9);
        System.out.println("Fixed: " + maya.name + ", grade " + maya.gradeLevel + ", GPA " + maya.gpa);
    }
}
