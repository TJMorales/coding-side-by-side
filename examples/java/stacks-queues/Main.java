import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.Queue;

public class Main {
    // A stack is last in, first out (LIFO). ArrayDeque works as a stack:
    // push() adds to the front and pop() removes from the front, both O(1).
    static boolean isBalanced(String code) {
        final Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : code.toCharArray()) {
            if ("([{".indexOf(ch) >= 0) {
                stack.push(ch);
            } else if (pairs.containsKey(ch)) {
                // A closer must match the most recent opener still waiting.
                if (stack.isEmpty() || !stack.pop().equals(pairs.get(ch))) {
                    return false;
                }
            }
        }
        // Any opener left over was never closed.
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] samples = {"print(scores[0])", "if (x > 0) { y = [1, 2]; }", "grades[(0]", "total = (a + b"};
        for (String code : samples) {
            System.out.printf("%-28s balanced: %b%n", code, isBalanced(code));
        }
        // Edge case: a closer with nothing on the stack.
        System.out.printf("%-28s balanced: %b%n", ")(", isBalanced(")("));

        // A queue is first in, first out (FIFO). The same ArrayDeque class works:
        // offer() adds to the back and poll() removes from the front, both O(1).
        Queue<String> printQueue = new ArrayDeque<>();
        for (String job : new String[] {"essay.docx", "lab-report.pdf", "poster.png"}) {
            printQueue.offer(job);
            System.out.println("Queued: " + job);
        }

        System.out.println("Next up: " + printQueue.peek());
        while (!printQueue.isEmpty()) {
            System.out.println("Printing: " + printQueue.poll());
        }
        System.out.println("Jobs left: " + printQueue.size());
    }
}
