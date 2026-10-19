public class Main {
    public static void main(String[] args) {
        // The inner loop runs all the way through for each pass of the outer loop.
        System.out.println("Times table (1 to 4):");
        for (int row = 1; row <= 4; row++) {
            for (int col = 1; col <= 4; col++) {
                System.out.printf("%4d", row * col);
            }
            System.out.println();  // ends the row after the inner loop finishes
        }

        // The inner body runs rows x columns times.
        int count = 0;
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 5; col++) {
                count++;
            }
        }
        System.out.println("3 rows x 5 columns = " + count + " inner steps");

        // Edge case: the inner loop can use the outer variable to change its length.
        System.out.println("Staircase:");
        for (int row = 1; row <= 4; row++) {
            for (int col = 0; col < row; col++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
