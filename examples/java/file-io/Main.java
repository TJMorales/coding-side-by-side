import java.io.*;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws IOException {
        // new FileWriter(name) creates the file, or erases it if it exists.
        // try-with-resources closes the file for you when the block ends.
        try (PrintWriter out = new PrintWriter(new FileWriter("scores.txt"))) {
            out.println("Ana,91");
            out.println("Ben,78");
            out.println("Chloe,85");
        }

        // new FileWriter(name, true) adds to the end instead of erasing.
        try (PrintWriter out = new PrintWriter(new FileWriter("scores.txt", true))) {
            out.println("Dev,94");
        }

        // Scanner reads the file one line at a time.
        int total = 0;
        int count = 0;
        try (Scanner in = new Scanner(new File("scores.txt"))) {
            while (in.hasNextLine()) {
                String[] parts = in.nextLine().split(",");
                total += Integer.parseInt(parts[1]);
                count++;
                System.out.println(parts[0] + ": " + parts[1]);
            }
        }
        System.out.println("Class average: " + (double) total / count);

        // Edge case: opening a missing file throws FileNotFoundException.
        try (Scanner in = new Scanner(new File("missing.txt"))) {
            System.out.println(in.nextLine());
        } catch (FileNotFoundException e) {
            System.out.println("missing.txt does not exist");
        }
    }
}
