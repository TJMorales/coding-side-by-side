public class Main {
    // A method lives inside a class. double is the return type.
    // Each parameter has a type: int score, int total.
    static double percent(int score, int total) {
        return (double) score / total * 100;
    }

    // void means the method returns nothing.
    static void printReport(String name, double grade) {
        System.out.println(name + " has " + grade + " percent");
    }

    public static void main(String[] args) {
        // Call a method by its name with arguments in parentheses.
        double result = percent(45, 50);
        printReport("Jordan", result);

        // Each call runs the body again with new arguments.
        printReport("Ava", percent(38, 40));

        // Arguments must match the parameter types. This would not compile:
        // percent("20", 25);
        printReport("Leo", percent(20, 25));
    }
}
