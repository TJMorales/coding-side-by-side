/**
 * Gradebook helper.
 * A Javadoc comment starts with slash and two stars. It describes a class or method,
 * and the javadoc tool turns it into web documentation.
 */
public class Main {
    /** Returns score out of total as a percent. */
    static double percent(int score, int total) {
        return (double) score / total * 100;
    }

    public static void main(String[] args) {
        // A comment starts with // and runs to the end of the line.
        // Java skips comments, so they are notes for people reading the code.
        int quizScore = 18;
        int totalPoints = 20;

        System.out.println("Quiz percent: " + percent(quizScore, totalPoints)); // A comment can follow code.

        /* A block comment can cover
           several lines. This line does not run:
           System.out.println("This will not print."); */
        System.out.println("Done.");
    }
}
