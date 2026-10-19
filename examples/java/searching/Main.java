import java.util.Arrays;

public class Main {
    // Each search returns {index, comparisons}. An index of -1 means not found.
    static int[] linearSearch(int[] items, int target) {
        int comparisons = 0;
        // Check each item from the front until you find the target.
        for (int i = 0; i < items.length; i++) {
            comparisons++;
            if (items[i] == target) {
                return new int[] {i, comparisons};
            }
        }
        return new int[] {-1, comparisons};
    }

    static int[] binarySearch(int[] items, int target) {
        // Binary search only works when the array is already sorted.
        int comparisons = 0;
        int low = 0;
        int high = items.length - 1;
        while (low <= high) {
            // int / int drops the decimal, so mid is always a whole-number index.
            int mid = (low + high) / 2;
            comparisons++;
            if (items[mid] == target) {
                return new int[] {mid, comparisons};
            } else if (items[mid] < target) {
                low = mid + 1;   // target is in the right half
            } else {
                high = mid - 1;  // target is in the left half
            }
        }
        return new int[] {-1, comparisons};
    }

    static void report(int[] scores, int target) {
        int[] linear = linearSearch(scores, target);
        int[] binary = binarySearch(scores, target);
        System.out.println("Linear search for " + target + ": index " + linear[0] + ", " + linear[1] + " comparisons");
        System.out.println("Binary search for " + target + ": index " + binary[0] + ", " + binary[1] + " comparisons");
    }

    public static void main(String[] args) {
        int[] scores = {55, 61, 68, 72, 77, 81, 85, 88, 90, 94, 97, 100};
        System.out.println("Scores: " + Arrays.toString(scores));

        report(scores, 88);
        report(scores, 100);

        // Edge case: a missing value returns -1 after checking as much as needed.
        report(scores, 70);
    }
}
