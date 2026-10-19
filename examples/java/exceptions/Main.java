import java.io.FileReader;
import java.io.IOException;

public class Main {
    // throw stops the method and reports an error to the caller.
    static int parseScore(String text) {
        int score = Integer.parseInt(text);   // "abc" throws NumberFormatException
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("score must be 0 to 100, got " + score);
        }
        return score;
    }

    public static void main(String[] args) {
        for (String entry : new String[] {"88", "abc", "105"}) {
            try {
                System.out.println("Saved score: " + parseScore(entry));
            } catch (NumberFormatException e) {
                System.out.println("Bad entry '" + entry + "': not a whole number");
            } catch (IllegalArgumentException e) {
                System.out.println("Bad entry '" + entry + "': " + e.getMessage());
            } finally {
                System.out.println("Done checking '" + entry + "'");   // runs every time
            }
        }

        // IOException is a checked exception. Without this try/catch the code
        // will not compile: unreported exception FileNotFoundException.
        try {
            new FileReader("missing.txt");
        } catch (IOException e) {
            System.out.println("Could not open file: " + e.getMessage());
        }
    }
}
