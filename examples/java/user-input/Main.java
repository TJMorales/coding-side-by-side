import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // A Scanner reads what the user types. System.in is the keyboard.
        Scanner input = new Scanner(System.in);

        // nextLine() reads a whole line as a String.
        System.out.print("What is your name? ");
        String name = input.nextLine();

        // nextInt() reads the next value as an int, so no conversion is needed.
        System.out.print("How old are you? ");
        int age = input.nextInt();
        System.out.println();

        System.out.println("Hello, " + name + "!");
        System.out.println("Next year you will be " + (age + 1));
        input.close();
    }
}
