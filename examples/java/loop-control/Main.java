public class Main {
    public static void main(String[] args) {
        int[] scores = {88, -1, 92, 47, 75};

        // continue skips the rest of this pass and moves to the next item.
        // break ends the whole loop right away.
        for (int score : scores) {
            if (score == -1) {
                System.out.println("Absent, skipping");
                continue;
            }
            if (score < 60) {
                System.out.println("Failing score found: " + score + ". Stopping.");
                break;
            }
            System.out.println("Passing: " + score);
        }
        // 75 is never checked because break ended the loop at 47.

        // Java has no for...else. A boolean flag records whether break ran.
        System.out.println("Checking 2nd period:");
        boolean foundFailing = false;
        for (int score : new int[] {90, 85, 77}) {
            if (score < 60) {
                System.out.println("Failing score found: " + score);
                foundFailing = true;
                break;
            }
        }
        if (!foundFailing) {
            System.out.println("No failing scores");
        }
    }
}
