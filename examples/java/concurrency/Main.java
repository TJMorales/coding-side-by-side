import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

// Four ticket booths sell tickets at the same time and update one shared total.
class TicketCounter {
    private int sold = 0;
    final AtomicInteger atomicSold = new AtomicInteger();

    void sellUnsafe() {
        // sold++ is three steps: read, add, write. Another thread can run
        // between them, so two sales can both read 10 and both write 11.
        sold++;
    }

    // synchronized lets only one thread at a time run this method on this object.
    synchronized void sellSafe() {
        sold++;
    }

    // AtomicInteger does the read, add, and write as one step, with no lock.
    void sellAtomic() {
        atomicSold.incrementAndGet();
    }

    synchronized int getSold() { return sold; }
}

public class Main {
    static final int BOOTHS = 4;
    static final int SALES_PER_BOOTH = 100_000;

    static void runBooths(Runnable sell) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(BOOTHS);
        for (int b = 0; b < BOOTHS; b++) {
            pool.submit(() -> {
                for (int i = 0; i < SALES_PER_BOOTH; i++) {
                    sell.run();
                }
            });
        }
        // shutdown() stops new tasks. awaitTermination() waits for running ones, like join().
        pool.shutdown();
        pool.awaitTermination(1, TimeUnit.MINUTES);
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("Expected tickets: " + BOOTHS * SALES_PER_BOOTH);

        // The unsafe total is usually lower than expected and changes from run
        // to run, so this example runs it but does not print it.
        TicketCounter unsafe = new TicketCounter();
        runBooths(unsafe::sellUnsafe);

        TicketCounter safe = new TicketCounter();
        runBooths(safe::sellSafe);
        System.out.println("With synchronized: " + safe.getSold());

        TicketCounter atomic = new TicketCounter();
        runBooths(atomic::sellAtomic);
        System.out.println("With AtomicInteger: " + atomic.atomicSold.get());

        // Edge case: Thread.join() is the lower-level way to wait for one thread.
        Thread extraBooth = new Thread(safe::sellSafe);
        extraBooth.start();
        extraBooth.join();
        System.out.println("After one more sale: " + safe.getSold());
    }
}
