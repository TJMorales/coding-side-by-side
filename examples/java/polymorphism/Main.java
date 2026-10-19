class Student {
    protected String name;
    protected double average;

    Student(String name, double average) {
        this.name = name;
        this.average = average;
    }

    String report() {
        return name + ": " + average;
    }
}

class HonorsStudent extends Student {
    HonorsStudent(String name, double average) {
        super(name, average);
    }

    double weightedAverage() {
        return average + 5;
    }

    // Override report() to show the weighted score.
    @Override
    String report() {
        return name + ": " + weightedAverage() + " (weighted)";
    }
}

public class Main {
    public static void main(String[] args) {
        // The declared type is Student, but each object keeps its actual class.
        Student[] roster = {new Student("Leo", 81.0), new HonorsStudent("Maya", 88.5)};

        // The same call runs a different report() for each object's actual class.
        for (Student student : roster) {
            System.out.println(student.report());
        }

        // The compiler checks the declared type, and Student has no weightedAverage().
        // roster[1].weightedAverage();   error: cannot find symbol
        // A cast tells the compiler the actual type. A wrong cast throws ClassCastException.
        HonorsStudent maya = (HonorsStudent) roster[1];
        System.out.println("Maya weighted: " + maya.weightedAverage());

        // Edge case: instanceof checks the actual type before you cast.
        System.out.println("Leo is an HonorsStudent: " + (roster[0] instanceof HonorsStudent));
    }
}
