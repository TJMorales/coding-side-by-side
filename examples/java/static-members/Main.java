class Student {
    // static fields belong to the class. All students share one copy.
    static String school = "Vista Ridge High School";
    static int count = 0;

    // Fields without static belong to each object.
    String name;
    int studentId;

    Student(String name) {
        this.name = name;
        // Change the shared counter through the class name.
        Student.count++;
        studentId = 1000 + Student.count;
    }

    // A static method has no this, so it cannot see one student's data.
    static boolean isValidId(int studentId) {
        return studentId >= 1001 && studentId <= 9999;
    }
}

public class Main {
    public static void main(String[] args) {
        Student maya = new Student("Maya");
        Student leo = new Student("Leo");

        System.out.println(maya.name + ": id " + maya.studentId);
        System.out.println(leo.name + ": id " + leo.studentId);
        System.out.println("Students created: " + Student.count);
        System.out.println("Is 1500 a valid id? " + Student.isValidId(1500));

        // Read static fields through the class name.
        System.out.println("From the class: " + Student.school);

        // Changing it once changes it for every student.
        Student.school = "Vista Ridge HS";
        System.out.println("Maya and Leo both see: " + Student.school);

        // Edge case: leo.school compiles, but it is still the one shared field.
        // Unlike Python, this does not give leo his own copy.
        leo.school = "Online campus";
        System.out.println("Through maya: " + maya.school + ", class: " + Student.school);
    }
}
