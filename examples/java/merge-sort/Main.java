import java.util.Arrays;

public class Main {
    // Merge sort splits the array in half, sorts each half, then merges them.
    // It always takes O(n log n) steps, even on the worst input.
    static void mergeSort(int[] scores, int[] temp, int lo, int hi) {
        // Base case: a range with 0 or 1 items (hi - lo <= 1) is already sorted.
        if (hi - lo <= 1) {
            return;
        }
        int mid = (lo + hi) / 2;
        // Pass index ranges instead of copying. [lo, mid) and [mid, hi) are the halves.
        mergeSort(scores, temp, lo, mid);
        mergeSort(scores, temp, mid, hi);
        merge(scores, temp, lo, mid, hi);
    }

    static void merge(int[] scores, int[] temp, int lo, int mid, int hi) {
        int i = lo;
        int j = mid;
        int k = lo;
        // Take the smaller front item each time. <= keeps equal items in order (stable).
        while (i < mid && j < hi) {
            if (scores[i] <= scores[j]) {
                temp[k++] = scores[i++];
            } else {
                temp[k++] = scores[j++];
            }
        }
        // One side is empty now. Copy whatever is left from the other side.
        while (i < mid) {
            temp[k++] = scores[i++];
        }
        while (j < hi) {
            temp[k++] = scores[j++];
        }
        // Copy the merged range back into the real array.
        System.arraycopy(temp, lo, scores, lo, hi - lo);
    }

    static void sort(int[] scores) {
        // One shared temp array avoids making a new array on every call.
        mergeSort(scores, new int[scores.length], 0, scores.length);
    }

    public static void main(String[] args) {
        int[] quizScores = {88, 72, 95, 60, 72, 100, 81};
        System.out.println("Before: " + Arrays.toString(quizScores));
        // This version sorts in place, so the original array changes.
        sort(quizScores);
        System.out.println("After:  " + Arrays.toString(quizScores));

        // Edge cases: empty and single-item arrays return right away.
        int[] empty = {};
        int[] one = {42};
        sort(empty);
        sort(one);
        System.out.println("Empty: " + Arrays.toString(empty));
        System.out.println("One item: " + Arrays.toString(one));
    }
}
