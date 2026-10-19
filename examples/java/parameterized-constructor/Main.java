class Student {
    String name;
    int gradeLevel;
    double gpa;

    // Default constructor: no parameters, so every field starts empty or zero.
    public Student() {
        name = "";
        gradeLevel = 0;
        gpa = 0.0;
    }

    // Parameterized constructor: it copies each parameter into a field.
    // The parameter names differ from the field names, so plain assignment works.
    public Student(String studentName, int level, double startGpa) {
        name = studentName;
        gradeLevel = level;
        gpa = startGpa;
    }
}

public class Main {
    public static void main(String[] args) {
        // No arguments: Java runs the default constructor.
        Student blank = new Student();
        System.out.println("Blank: name '" + blank.name + "', grade " + blank.gradeLevel + ", GPA " + blank.gpa);

        // Three arguments: Java runs the constructor whose parameters match.
        Student maya = new Student("Maya", 10, 3.8);
        System.out.println("Maya: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);

        // Edge case: no constructor takes two arguments. This would not compile:
        // Student leo = new Student("Leo", 9);
    }
}
