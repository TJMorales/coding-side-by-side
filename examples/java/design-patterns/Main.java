import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

// Strategy pattern: the gradebook does not know HOW a final grade is computed.
// The interface names the one method every strategy must have.
interface GradingStrategy {
    double compute(int[] scores);
}

class Gradebook {
    GradingStrategy strategy;

    Gradebook(GradingStrategy strategy) {
        this.strategy = strategy;
    }

    double finalGrade(int[] scores) {
        return Math.round(strategy.compute(scores) * 10) / 10.0;
    }
}

public class Main {
    static double averageAll(int[] scores) {
        return Arrays.stream(scores).average().orElse(0);
    }

    static double dropLowest(int[] scores) {
        // Edge case: with one score, there is nothing to drop.
        if (scores.length < 2) {
            return averageAll(scores);
        }
        int sum = Arrays.stream(scores).sum();
        int min = Arrays.stream(scores).min().getAsInt();
        return (double) (sum - min) / (scores.length - 1);
    }

    static double bestThree(int[] scores) {
        int[] sorted = scores.clone();
        Arrays.sort(sorted);
        // The top three are at the end after sorting low to high.
        return Arrays.stream(sorted, Math.max(0, sorted.length - 3), sorted.length).average().orElse(0);
    }

    public static void main(String[] args) {
        int[] mayaScores = {92, 58, 88, 95, 81};
        System.out.println("Scores: " + Arrays.toString(mayaScores));

        // A method reference such as Main::dropLowest fills in the interface.
        Map<String, GradingStrategy> strategies = new LinkedHashMap<>();
        strategies.put("averageAll", Main::averageAll);
        strategies.put("dropLowest", Main::dropLowest);
        strategies.put("bestThree", Main::bestThree);
        // A lambda works too, for a one-off rule.
        strategies.put("curve +5", scores -> Math.min(100, averageAll(scores) + 5));

        for (Map.Entry<String, GradingStrategy> entry : strategies.entrySet()) {
            Gradebook book = new Gradebook(entry.getValue());
            System.out.printf("%-12s -> %s%n", entry.getKey(), book.finalGrade(mayaScores));
        }

        // Swap the strategy at run time on the same object.
        Gradebook book = new Gradebook(Main::averageAll);
        book.strategy = Main::dropLowest;
        System.out.println("Switched to dropLowest: " + book.finalGrade(mayaScores));

        // Edge case: one score.
        System.out.println("One score, dropLowest: " + new Gradebook(Main::dropLowest).finalGrade(new int[] {77}));
    }
}
