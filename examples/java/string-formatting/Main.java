public class Main {
    public static void main(String[] args) {
        // printf fills each % code with the next value. %s is text, %n ends the line.
        String student = "Jordan";
        double average = 87.4567;
        System.out.printf("%s's average: %s%n", student, average);

        // %.2f rounds to 2 decimal places when printing. The variable keeps its full value.
        System.out.printf("Rounded: %.2f%n", average);

        // A number in the code sets the width. - aligns left; no sign aligns right.
        String[] courses = {"Algebra", "Biology", "CS"};
        double[] grades = {91.5, 84.62, 99.0};
        System.out.printf("%-12s%6s%n", "Class", "Grade");
        for (int i = 0; i < courses.length; i++) {
            System.out.printf("%-12s%6.1f%n", courses[i], grades[i]);
        }

        // , adds thousands separators. %% prints one percent sign.
        System.out.printf("Fundraiser: $%,.2f%n", 12500.5);
        System.out.printf("Completion: %.1f%%%n", 7.0 / 8 * 100);

        // String.format() uses the same codes but returns a String instead of printing.
        String label = String.format("%s: %.1f", student, average);
        System.out.println("Label: " + label);

        // Edge case: the width is a minimum. Longer text is not cut off.
        System.out.printf("[%-5s]%n", "Computer Science");
    }
}
