public class Main {
    public static void main(String[] args) {
        // This program has a bug on purpose. Read the error at the bottom of the output.
        int[] scores = {88, 92, 75};
        System.out.println("Number of scores: " + scores.length);
        System.out.println("First score: " + scores[0]);

        // The valid indexes are 0, 1, and 2. Index 3 does not exist.
        // The compiler cannot catch this, so the program crashes while running.
        System.out.println("Fourth score: " + scores[3]);
        System.out.println("This line never runs.");

        // How to read the stack trace:
        // 1. The first line names the error type and the reason:
        //    ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
        // 2. The "at" line gives the method, file, and line number: Main.java:10
        // 3. Go to that line and check which index you used.
    }
}
