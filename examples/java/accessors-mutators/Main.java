class Student {
    // private means only code inside Student can use these fields.
    private String name;
    private int gradeLevel;
    private double gpa;

    public Student() {
        name = "";
        gradeLevel = 0;
        gpa = 0.0;
    }
    public Student(String studentName, int level, double startGpa) {
        name = studentName;
        gradeLevel = level;
        gpa = startGpa;
    }
    // Accessor (getter) methods return a field's value.
    public String getName() { return name; }
    public int getGradeLevel() { return gradeLevel; }
    public double getGpa() { return gpa; }

    // Mutator (setter) methods change a field and return nothing (void).
    public void setGpa(double newGpa) {
        if (newGpa >= 0.0 && newGpa <= 4.0) {
            gpa = newGpa;
        } else {
            System.out.println("Rejected GPA " + newGpa + ". It must be 0.0 to 4.0.");
        }
    }

    public void promote() { gradeLevel = gradeLevel + 1; }
}

public class Main {
    public static void main(String[] args) {
        Student maya = new Student("Maya", 10, 3.8);
        maya.setGpa(3.9);
        maya.promote();
        System.out.println(maya.getName() + ": grade " + maya.getGradeLevel() + ", GPA " + maya.getGpa());

        // Edge case: a bad value leaves the field unchanged.
        maya.setGpa(5.2);
        System.out.println("GPA is still " + maya.getGpa());
    }
}
