public class Main {
    public static void main(String[] args) {
        // You must declare the type before the name. = assigns the value on the right.
        String studentName = "Maya";
        int testScore = 88;

        System.out.println("Student: " + studentName);
        System.out.println("Score: " + testScore);

        // Assigning again replaces the old value. Do not repeat the type.
        testScore = testScore + 5;
        System.out.println("Score after curve: " + testScore);

        // testScore is an int forever. This line would not compile:
        // testScore = "absent";
        // error: incompatible types: String cannot be converted to int

        // final makes a variable that cannot be reassigned.
        final int maxScore = 100;
        System.out.println("Points below max: " + (maxScore - testScore));
    }
}
