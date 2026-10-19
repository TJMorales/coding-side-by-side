import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // An array holds several values of one type, inside braces.
        int[] scores = {88, 92, 75};

        // Index numbers start at 0. The last index is scores.length - 1.
        System.out.println("First score: " + scores[0]);
        System.out.println("Last score: " + scores[scores.length - 1]);
        System.out.println("Number of scores: " + scores.length);

        // You can change a value at an index.
        scores[2] = 79;
        System.out.println("After fixing a score: " + Arrays.toString(scores));

        // An array cannot grow. To add a score, make a new, bigger array and copy.
        int[] moreScores = Arrays.copyOf(scores, 4);
        moreScores[3] = 95;
        System.out.println("New array: " + Arrays.toString(moreScores));

    }
}
