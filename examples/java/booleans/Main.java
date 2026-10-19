public class Main {
    public static void main(String[] args) {
        // A comparison gives a boolean: true or false.
        int score = 85;
        System.out.println("score >= 70: " + (score >= 70));
        System.out.println("score == 100: " + (score == 100));
        System.out.println("score != 100: " + (score != 100));

        // && (and) is true only when both sides are true.
        boolean homeworkDone = true;
        System.out.println("Passed and homework done: " + (score >= 70 && homeworkDone));

        // || (or) is true when at least one side is true.
        boolean hasLatePass = false;
        System.out.println("Homework done or late pass: " + (homeworkDone || hasLatePass));

        // ! (not) flips true to false and false to true.
        System.out.println("Not homework done: " + !homeworkDone);

        // = assigns a value. == compares two values.
        System.out.println("score == 85: " + (score == 85));
    }
}
