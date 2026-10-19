import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // A HashMap stores key-value pairs. put() adds or replaces, get() looks up.
        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Ana", 91);
        scores.put("Ben", 78);
        scores.put("Chloe", 85);   // a new key adds a pair
        scores.put("Ben", 82);     // an existing key replaces the old value
        System.out.println("Ben's score: " + scores.get("Ben"));

        // containsKey() checks the keys, not the values.
        System.out.println("Has Ana: " + scores.containsKey("Ana"));
        System.out.println("Has 91 as a value: " + scores.containsValue(91));

        // keySet() gives every key. A HashMap does not promise any order.
        for (String name : scores.keySet()) {
            System.out.println("  " + name + ": " + scores.get(name));
        }
        scores.remove("Ana");
        System.out.println("After removing Ana: " + scores);

        // Count things: getOrDefault(key, 0) starts a missing key at 0.
        String[] votes = {"pizza", "tacos", "pizza", "salad", "tacos", "pizza"};
        HashMap<String, Integer> counts = new HashMap<>();
        for (String food : votes) {
            counts.put(food, counts.getOrDefault(food, 0) + 1);
        }
        System.out.println("Lunch votes: " + counts);

        // Edge case: get() on a missing key returns null instead of crashing.
        System.out.println("Zoe's score: " + scores.get("Zoe"));
    }
}
