public class Main {
    // Big-O describes how the number of steps grows as the input size n grows.
    // Counting steps gives the same answer on every computer. Timing does not.
    static int linearSearch(int[] items, int target) {
        int steps = 0;
        for (int item : items) {
            steps++;
            if (item == target) {
                break;
            }
        }
        return steps;
    }

    // Only works on a sorted array. Each step cuts the search range in half.
    static int binarySearch(int[] items, int target) {
        int steps = 0;
        int lo = 0;
        int hi = items.length - 1;
        while (lo <= hi) {
            steps++;
            int mid = (lo + hi) / 2;
            if (items[mid] == target) {
                break;
            } else if (items[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return steps;
    }

    // Two nested loops over n items run n * n times: O(n^2).
    static int countPairs(int n) {
        int steps = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                steps++;
            }
        }
        return steps;
    }

    static int[] makeIds(int n) {
        int[] ids = new int[n];
        for (int i = 0; i < n; i++) {
            ids[i] = i; // sorted IDs 0 to n - 1
        }
        return ids;
    }

    public static void main(String[] args) {
        System.out.printf("%6s %12s %16s %13s%n", "n", "O(n) linear", "O(log n) binary", "O(n^2) pairs");
        for (int n : new int[] {10, 100, 1000}) {
            int[] studentIds = makeIds(n);
            int missingId = n; // not in the array: the worst case
            System.out.printf("%6d %12d %16d %13d%n", n, linearSearch(studentIds, missingId),
                    binarySearch(studentIds, missingId), countPairs(n));
        }

        // Edge case: the best case is very different from the worst case.
        System.out.println("Linear search for the first ID: " + linearSearch(makeIds(1000), 0) + " step");

        // To time code anyway, use System.nanoTime(). The result changes on every run:
        // long start = System.nanoTime(); linearSearch(ids, n); System.out.println(System.nanoTime() - start);
    }
}
