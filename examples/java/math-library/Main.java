public class Main {
    public static void main(String[] args) {
        // Math is part of java.lang, so it works with no import.
        // Math.sqrt() and Math.pow() always return a double.
        System.out.println("Square root of 144: " + Math.sqrt(144));
        System.out.println("Math.pow(2, 10): " + Math.pow(2, 10));

        // Distance between two points on a game map.
        int x1 = 1, y1 = 2, x2 = 4, y2 = 6;
        double distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        System.out.println("Distance: " + distance);

        // ceil() rounds up and floor() rounds down. Divide as doubles first.
        int students = 47;
        System.out.println("Buses needed (40 per bus): " + (int) Math.ceil(students / 40.0));
        System.out.println("Full rows of 10: " + (int) Math.floor(students / 10.0));

        // abs(), max(), and min() live in Math too.
        System.out.println("Math.abs(-7): " + Math.abs(-7));
        double area = Math.PI * 3 * 3;
        System.out.println("Area of a circle with radius 3: " + Math.round(area * 100) / 100.0);

        // Edge case: Math.round() sends halves up. Integer division drops decimals first.
        System.out.println("Math.round(2.5): " + Math.round(2.5));
        System.out.println("Math.round(3.5): " + Math.round(3.5));
        System.out.println("Math.ceil(47 / 40): " + Math.ceil(47 / 40));
    }
}
