import threading

# Four ticket booths sell tickets at the same time and update one shared total.
BOOTHS = 4
SALES_PER_BOOTH = 100_000


class TicketCounter:
    def __init__(self):
        self.sold = 0
        self.lock = threading.Lock()

    def sell_unsafe(self):
        # self.sold += 1 is three steps: read, add, write. Another thread can
        # run between them, so two sales can both read 10 and both write 11.
        self.sold += 1

    def sell_safe(self):
        # Only one thread at a time can be inside the with block.
        with self.lock:
            self.sold += 1


def run_booths(sell):
    def booth():
        for _ in range(SALES_PER_BOOTH):
            sell()

    threads = [threading.Thread(target=booth) for _ in range(BOOTHS)]
    for t in threads:
        t.start()
    # join() waits for each thread to finish. Without it, you would print too early.
    for t in threads:
        t.join()


expected = BOOTHS * SALES_PER_BOOTH
print("Expected tickets:", expected)

# The unsafe total can come out lower than expected, and it can change from run
# to run, so this example runs it but does not print it.
unsafe = TicketCounter()
run_booths(unsafe.sell_unsafe)

safe = TicketCounter()
run_booths(safe.sell_safe)
print("With a lock:", safe.sold)
print("Lock total matches:", safe.sold == expected)

# Edge case: reading shared data is safe after join(), because no thread is still running.
print("Threads still running:", threading.active_count() - 1)
