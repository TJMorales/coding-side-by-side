class Student {
    private String name;
    // private means only code inside Student can touch gpa.
    private double gpa;

    Student(String name, double gpa) {
        this.name = name;
        // Call the setter so a bad starting GPA is rejected too.
        setGpa(gpa);
    }

    // A getter returns the value. Outside code cannot read gpa any other way.
    public double getGpa() {
        return gpa;
    }

    public String getName() {
        return name;
    }

    // The setter checks the value before storing it.
    public void setGpa(double value) {
        if (value < 0.0 || value > 4.0) {
            throw new IllegalArgumentException("GPA must be from 0.0 to 4.0, got " + value);
        }
        gpa = value;
    }
}

public class Main {
    public static void main(String[] args) {
        Student maya = new Student("Maya", 3.6);
        System.out.println(maya.getName() + " GPA: " + maya.getGpa());

        maya.setGpa(3.8);
        System.out.println("Updated GPA: " + maya.getGpa());

        // A bad value throws an exception, and the old GPA is kept.
        try {
            maya.setGpa(5.2);
        } catch (IllegalArgumentException error) {
            System.out.println("Rejected: " + error.getMessage());
        }
        System.out.println("GPA is still: " + maya.getGpa());

        // Edge case: Java enforces private. This line would not compile:
        // maya.gpa = 9.9;   error: gpa has private access in Student
    }
}
