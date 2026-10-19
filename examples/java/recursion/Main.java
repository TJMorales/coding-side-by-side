public class Main {
    static long factorial(int n) {
        // Base case: 0! and 1! are both 1. This is where the calls stop.
        if (n <= 1) {
            return 1;
        }
        // Recursive case: n! = n * (n - 1)!, a smaller version of the same problem.
        return n * factorial(n - 1);
    }

    static int sumOfDigits(int n) {
        // Base case: a one-digit number is its own digit sum.
        if (n < 10) {
            return n;
        }
        // Recursive case: the last digit plus the digit sum of the rest.
        return n % 10 + sumOfDigits(n / 10);
    }

    static int depth(int n) {
        // Base case: no more calls to make.
        if (n == 0) {
            return 0;
        }
        return 1 + depth(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("factorial(5) = " + factorial(5));
        System.out.println("factorial(0) = " + factorial(0));
        System.out.println("sumOfDigits(2026) = " + sumOfDigits(2026));
        System.out.println("sumOfDigits(7) = " + sumOfDigits(7));

        // Every call waits on the stack until the base case returns.
        System.out.println("depth(500) = " + depth(500));
        // Java has no fixed call limit like Python's 1000. 5000 calls fit easily.
        System.out.println("depth(5000) = " + depth(5000));

        // Edge case: with no base case reached, the stack runs out of memory.
        try {
            depth(-1);
        } catch (StackOverflowError error) {
            System.out.println("StackOverflowError: depth(-1) never reached its base case");
        }
    }
}
