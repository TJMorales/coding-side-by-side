/**
 * Gradebook helper.
 * A Javadoc comment starts with slash and two stars. It describes a class,
 * and the javadoc tool turns it into web documentation.
 */
public class Main {
    public static void main(String[] args) {
        // A comment starts with // and runs to the end of the line.
        // Java skips comments, so they are notes for people reading the code.
        int quizScore = 18;
        int totalPoints = 20;

        System.out.println("Quiz percent: " + quizScore * 100.0 / totalPoints); // A comment can follow code.

        // Putting // in front of a line turns it off. This line does not run:
        // System.out.println("This will not print.");

        /* A block comment can cover
           several lines. Java skips everything
           between the slash-star and the star-slash. */
        System.out.println("Done.");
    }
}
