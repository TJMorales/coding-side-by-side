import java.util.HashMap;
import java.util.Map;

public class Main {
    static int naiveCalls = 0;
    static int memoCalls = 0;
    // The memo maps n to fib(n). long holds bigger values than int.
    static final Map<Integer, Long> memo = new HashMap<>();

    // Naive Fibonacci recomputes the same values again and again.
    static long fibNaive(int n) {
        naiveCalls++;
        if (n <= 1) {
            return n;
        }
        return fibNaive(n - 1) + fibNaive(n - 2);
    }

    // Memoization: save each answer the first time, then look it up after that.
    static long fibMemo(int n) {
        memoCalls++;
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        long result = (n <= 1) ? n : fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) {
        int n = 25;
        System.out.println("Naive fib(" + n + ") = " + fibNaive(n) + " using " + naiveCalls + " calls");
        System.out.println("Memo fib(" + n + ") = " + fibMemo(n) + " using " + memoCalls + " calls");
        // Java has no built-in cache annotation. The HashMap is the cache.
        System.out.println("Saved answers: " + memo.size());

        // Edge case: a second call reuses the saved answers, so it costs 1 call.
        memoCalls = 0;
        fibMemo(n);
        System.out.println("Second memo call for fib(" + n + "): " + memoCalls + " call");
        // long is exact up to fib(92). fib(93) would overflow and turn negative.
        System.out.println("fib(90) = " + fibMemo(90));
    }
}
