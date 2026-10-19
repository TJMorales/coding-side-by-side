public class Main {
    public static void main(String[] args) {
        int score = 84;
        String letter;
        // The condition goes in parentheses. Braces mark the lines that belong to it.
        // Only the first true branch runs, checking from top to bottom.
        if (score >= 90) {
            letter = "A";
        } else if (score >= 80) {
            letter = "B";
        } else if (score >= 70) {
            letter = "C";
        } else {
            letter = "F";
        }
        System.out.println("Score: " + score + " Letter: " + letter);
        // Order matters. 95 is also >= 80, but only the first true branch runs.
        score = 95;
        if (score >= 80) {
            System.out.println("Score: " + score + " Branch: B or better");
        } else if (score >= 90) {
            System.out.println("Score: " + score + " Branch: A (this never runs)");
        }
    }
}
