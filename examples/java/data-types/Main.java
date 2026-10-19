public class Main {
    public static void main(String[] args) {
        // Primitive types hold a simple value. Their names are lowercase.
        int players = 11;              // whole number
        double averagePoints = 14.5;   // number with a decimal point
        boolean isHomeGame = true;     // true or false
        char grade = 'A';              // one character, in single quotes

        // String is an object type, so it starts with a capital S. It uses double quotes.
        String teamName = "Rangers";

        System.out.println("int: " + players);
        System.out.println("double: " + averagePoints);
        System.out.println("boolean: " + isHomeGame);
        System.out.println("char: " + grade);
        System.out.println("String: " + teamName);

        // An int has a maximum value. Going past it wraps around to a negative number.
        int bigNumber = Integer.MAX_VALUE + 1;
        System.out.println("Big number: " + bigNumber);
    }
}
