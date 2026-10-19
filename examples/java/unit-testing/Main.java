public class Main {
    // The method under test.
    static String letterGrade(int score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("score out of range: " + score);
        }
        if (score >= 90) {
            return "A";
        }
        if (score >= 80) {
            return "B";
        }
        if (score >= 70) {
            return "C";
        }
        return "F";
    }

    static int passed = 0, failed = 0;

    // A tiny stand-in for JUnit's assertEquals.
    static void check(String name, String expected, String actual) {
        if (expected.equals(actual)) {
            passed++;
            System.out.println(name + " ... ok");
        } else {
            failed++;
            System.out.println(name + " ... FAIL: expected " + expected + " but got " + actual);
        }
    }

    // A stand-in for assertThrows: passes only if the code throws.
    static void checkThrows(String name, Runnable code) {
        try {
            code.run();
            failed++;
            System.out.println(name + " ... FAIL: no exception thrown");
        } catch (IllegalArgumentException e) {
            passed++;
            System.out.println(name + " ... ok");
        }
    }

    public static void main(String[] args) {
        check("typical 95", "A", letterGrade(95));
        check("typical 85", "B", letterGrade(85));
        check("typical 42", "F", letterGrade(42));
        // Off-by-one mistakes happen at the cutoffs, so test the exact cutoff values.
        check("boundary 90", "A", letterGrade(90));
        check("boundary 89", "B", letterGrade(89));
        check("boundary 70", "C", letterGrade(70));
        check("boundary 69", "F", letterGrade(69));
        checkThrows("out of range 101", () -> letterGrade(101));
        checkThrows("out of range -1", () -> letterGrade(-1));

        System.out.println("Passed: " + passed + ", Failed: " + failed);
        System.out.println("All passed: " + (failed == 0));
        // The same tests in JUnit 5 (added to a real project with Maven or Gradle):
        // @Test
        // void boundaries() {
        //     assertEquals("A", Main.letterGrade(90));
        //     assertEquals("B", Main.letterGrade(89));
        // }
        // @Test
        // void outOfRangeThrows() {
        //     assertThrows(IllegalArgumentException.class, () -> Main.letterGrade(101));
        // }
    }
}
