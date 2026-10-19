import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        // A seed makes the same "random" numbers every run, which helps when testing.
        Random rand = new Random(42);

        // nextInt(6) gives 0 to 5. It never returns 6, so add 1 for a die.
        int[] rolls = new int[8];
        for (int i = 0; i < rolls.length; i++) {
            rolls[i] = rand.nextInt(6) + 1;
        }
        System.out.println("Dice rolls: " + Arrays.toString(rolls));

        // nextInt(1, 7) takes a start and an end. The end is still left out.
        System.out.println("nextInt(1, 7): " + rand.nextInt(1, 7));

        // nextDouble() gives a double from 0.0 up to, but not including, 1.0.
        double chance = rand.nextDouble();
        System.out.printf("Chance: %.3f%n", chance);
        System.out.println("Critical hit: " + (chance < 0.25));

        // Pick one item with a random index. Collections.shuffle() reorders a list.
        ArrayList<String> team = new ArrayList<>(Arrays.asList("Ana", "Ben", "Chloe", "Dev"));
        System.out.println("Captain: " + team.get(rand.nextInt(team.size())));
        Collections.shuffle(team, rand);
        System.out.println("Shuffled: " + team);

        // Edge case: a new Random with the same seed repeats the same sequence.
        System.out.println("First roll again: " + (new Random(42).nextInt(6) + 1));
    }
}
