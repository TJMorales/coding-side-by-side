import java.util.Arrays;

public class Main {
    static void selectionSort(int[] items) {
        for (int i = 0; i < items.length - 1; i++) {
            // Find the smallest value in the unsorted part.
            int smallest = i;
            for (int j = i + 1; j < items.length; j++) {
                if (items[j] < items[smallest]) {
                    smallest = j;
                }
            }
            // Swap it into position i. Java needs a temporary variable.
            int temp = items[i];
            items[i] = items[smallest];
            items[smallest] = temp;
            System.out.println("Pass " + (i + 1) + ": " + Arrays.toString(items));
        }
    }

    static int insertionSort(int[] items) {
        int shifts = 0;
        for (int i = 1; i < items.length; i++) {
            int current = items[i];
            int j = i - 1;
            // Shift larger values right to open a gap for current.
            while (j >= 0 && items[j] > current) {
                items[j + 1] = items[j];
                j--;
                shifts++;
            }
            items[j + 1] = current;
        }
        return shifts;
    }

    public static void main(String[] args) {
        int[] scores = {88, 72, 95, 61, 79};
        System.out.println("Start:  " + Arrays.toString(scores));
        selectionSort(scores);

        scores = new int[] {88, 72, 95, 61, 79};
        int shifts = insertionSort(scores);
        System.out.println("Insertion sort: " + Arrays.toString(scores) + ", " + shifts + " shifts");

        // Edge case: insertion sort does no shifts on an array that is already sorted.
        shifts = insertionSort(scores);
        System.out.println("Sorted again:   " + Arrays.toString(scores) + ", " + shifts + " shifts");
    }
}
