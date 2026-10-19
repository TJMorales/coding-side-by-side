public class Main {
    // The return type (String) comes before the name. Every path must return a String.
    static String letterGrade(int score) {
        if (score >= 90) {
            return "A";   // return ends the method right away
        }
        return (score >= 80) ? "B" : "C or below";
    }

    // Java has no default values. Overloading adds a version with fewer parameters.
    static int curve(int score, int points) {
        return Math.min(score + points, 100);
    }
    static int curve(int score) {
        return curve(score, 5);
    }

    // A method returns ONE value. To send back several, return an array (or an object).
    static double[] summarize(int[] scores) {
        int low = scores[0], high = scores[0], sum = 0;
        for (int s : scores) {
            low = Math.min(low, s);
            high = Math.max(high, s);
            sum += s;
        }
        return new double[] {low, high, (double) sum / scores.length};
    }

    public static void main(String[] args) {
        int[] quiz = {72, 95, 88};
        System.out.println("95 earns: " + letterGrade(95));
        System.out.println("72 curved: " + curve(72));
        System.out.println("98 curved by 10: " + curve(98, 10));
        double[] stats = summarize(quiz);
        System.out.printf("Low: %.0f, high: %.0f, average: %.1f%n", stats[0], stats[1], stats[2]);
        // Edge case: a void method returns nothing, so int x = someVoidMethod(); will not compile.
    }
}
