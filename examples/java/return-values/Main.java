public class Main {
    // void means nothing comes back, so int x = showTotal(30, 35); will not compile.
    static void showTotal(int quiz, int test) {
        System.out.println("Total: " + (quiz + test));
    }
    // int is the return type, so you can store the result and do math with it.
    static int getTotal(int quiz, int test) {
        return quiz + test;
    }
    // return ends the method right away. Every path must return a String.
    static String letterGrade(int score) {
        if (score >= 90) {
            return "A";
        }
        if (score >= 80) {
            return "B";
        }
        return "C or below";
    }
    public static void main(String[] args) {
        showTotal(40, 45);
        int total = getTotal(40, 45);
        System.out.println("Average: " + total / 2.0);
        System.out.println("85 earns: " + letterGrade(85));
    }
}
