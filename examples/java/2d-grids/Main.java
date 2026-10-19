import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // int[][] is an array of rows. Each row is a student, each column a quiz.
        int[][] grades = {
            {90, 85, 77, 92},
            {68, 74, 81, 70},
            {100, 95, 98, 99}
        };

        // grades[row][col]: the row comes first, then the column.
        System.out.println("Student 2, quiz 3: " + grades[1][2]);
        System.out.println("Rows: " + grades.length + ", columns: " + grades[0].length);

        // Nested loops visit every cell, one row at a time.
        for (int row = 0; row < grades.length; row++) {
            int total = 0;
            for (int col = 0; col < grades[row].length; col++) {
                total += grades[row][col];
            }
            System.out.println("Student " + (row + 1) + " average: " + (double) total / grades[row].length);
        }

        // Change one cell. Arrays.toString() prints one row.
        grades[1][0] = 72;
        System.out.println("Updated student 2: " + Arrays.toString(grades[1]));

        // new int[3][4] makes 3 rows and 4 columns, all set to 0. The size is fixed.
        int[][] blank = new int[3][4];
        blank[0][0] = 5;
        System.out.println("Blank grid: " + Arrays.deepToString(blank));
    }
}
