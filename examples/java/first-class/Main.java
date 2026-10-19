// A class defines a new type. Fields are declared at the top of the class.
class Student {
    String name;
    int gradeLevel;
    double gpa;
    // Default constructor: no parameters. new Student() runs it to set starting values.
    public Student() {
        name = "";
        gradeLevel = 0;
        gpa = 0.0;
    }
}
public class Main {
    public static void main(String[] args) {
        // new creates an object and runs the constructor.
        Student maya = new Student();
        System.out.println("Start: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);
        // Dot notation reads or changes one object's field.
        maya.name = "Maya";
        maya.gradeLevel = 10;
        maya.gpa = 3.8;
        System.out.println("Now: name '" + maya.name + "', grade " + maya.gradeLevel + ", GPA " + maya.gpa);
        // Edge case: a second object gets its own fields, so it starts empty.
        Student jordan = new Student();
        System.out.println("Jordan: name '" + jordan.name + "', GPA " + jordan.gpa);
    }
}
