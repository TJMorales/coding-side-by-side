// Four ticket booths sell tickets at the same time and update one shared total.
const BOOTHS = 4;
const SALES_PER_BOOTH = 100_000;

// Stands in for slow work such as a payment check. await pauses one booth
// and lets the other booths run, all on the same single thread.
const checkPayment = () => Promise.resolve();

class TicketCounter {
  sold = 0;

  // JavaScript runs one piece of code at a time, so this.sold++ always
  // finishes before another booth runs. No lock is needed.
  async sellSafe() {
    await checkPayment();
    this.sold++;
  }

  // The race comes back if you read, await, then write. Every booth reads
  // the same old value while the others are paused, so sales are lost.
  async sellUnsafe() {
    const current = this.sold;
    await checkPayment();
    this.sold = current + 1;
  }
}

async function booth(sell) {
  for (let i = 0; i < SALES_PER_BOOTH; i++) {
    await sell();
  }
  return SALES_PER_BOOTH;
}

async function main() {
  console.log(`Expected tickets: ${BOOTHS * SALES_PER_BOOTH}`);

  const safe = new TicketCounter();
  const booths = Array.from({ length: BOOTHS }, () => booth(() => safe.sellSafe()));
  // Edge case: the booths have started, but none has finished a sale yet.
  console.log(`Sold before waiting: ${safe.sold}`);
  // Promise.all waits for every booth, like join() on threads.
  const perBooth = await Promise.all(booths);
  console.log(`Each booth sold: [${perBooth.join(", ")}]`);
  console.log(`No await between read and write: ${safe.sold}`);

  // Single-threaded code still loses updates when an await splits read and write.
  const unsafe = new TicketCounter();
  await Promise.all(Array.from({ length: BOOTHS }, () => booth(() => unsafe.sellUnsafe())));
  console.log(`await between read and write: ${unsafe.sold}`);
}

main();
