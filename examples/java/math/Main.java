public class Main {
    public static void main(String[] args) {
        // + - * work the way you expect.
        System.out.println("7 + 2 = " + (7 + 2));
        System.out.println("7 - 2 = " + (7 - 2));
        System.out.println("7 * 2 = " + (7 * 2));

        // When both values are ints, / drops the decimal part. % gives the remainder.
        System.out.println("7 / 2 = " + (7 / 2));
        System.out.println("7 % 2 = " + (7 % 2));

        // If either value is a double, / keeps the decimal.
        System.out.println("7.0 / 2 = " + (7.0 / 2));

        // Java has no ** operator. Math.pow() returns a double.
        System.out.println("2 to the 3rd = " + Math.pow(2, 3));

        // int division can drop the decimal from an average without warning.
        int total = 90 + 85 + 82;
        System.out.println("Average with int division: " + (total / 3));
        System.out.println("Average with a double: " + (total / 3.0));
    }
}
