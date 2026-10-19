public class Main {
    public static void main(String[] args) {
        // Three parts: start (int lap = 1); condition (lap < 6); update (lap++).
        // The loop runs while the condition is true, so it prints 1 to 5.
        for (int lap = 1; lap < 6; lap++) {
            System.out.println("Lap " + lap);
        }

        // Starting at 0 with i < 5 gives 0 to 4.
        int total = 0;
        for (int i = 0; i < 5; i++) {
            total = total + i;
        }
        System.out.println("Sum of 0 to 4: " + total);

        // The update can be any change. This counts down by 2.
        for (int seconds = 10; seconds > 0; seconds -= 2) {
            System.out.println("Countdown: " + seconds);
        }
    }
}
