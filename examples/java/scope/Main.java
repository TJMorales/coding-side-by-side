public class Main {
    // A static field is declared in the class, so every method can use it.
    static int totalPoints = 0;

    static void addPoints(int points) {
        totalPoints += points;   // changes the field; no global keyword needed
    }

    public static void main(String[] args) {
        int score = 93;
        if (score >= 90) {
            String message = "Honor roll";
            System.out.println("Inside the if: " + message);
        }
        // message ends at the closing brace above. Using it here would fail with:
        // error: cannot find symbol (symbol: variable message)

        // To use a value after the block, declare it BEFORE the block.
        String status = "Regular";
        if (score >= 90) {
            status = "Honor roll";
        }
        System.out.println("After the if: " + status);

        // A variable declared in the for header exists only inside the loop.
        for (int quiz = 1; quiz <= 3; quiz++) {
            System.out.println("Quiz " + quiz);
        }
        // Printing quiz here would also be: error: cannot find symbol

        addPoints(10);
        addPoints(15);
        System.out.println("Total points: " + totalPoints);
    }
}
