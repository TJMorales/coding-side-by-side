import random

# A seed makes the same "random" numbers every run, which helps when testing.
random.seed(42)

# randint(a, b) includes BOTH ends: 1 to 6 can give 6.
rolls = [random.randint(1, 6) for _ in range(8)]
print(f"Dice rolls: {rolls}")

# randrange(a, b) stops BEFORE b, like range(): 0 to 5.
indexes = [random.randrange(0, 6) for _ in range(8)]
print(f"randrange(0, 6): {indexes}")

# random() gives a float from 0.0 up to, but not including, 1.0.
chance = random.random()
print(f"Chance: {chance:.3f}")
print(f"Critical hit: {chance < 0.25}")

# choice() picks one item. shuffle() reorders the list in place.
team = ["Ana", "Ben", "Chloe", "Dev"]
print(f"Captain: {random.choice(team)}")
random.shuffle(team)
print(f"Shuffled: {team}")

# Edge case: the same seed repeats the same sequence.
random.seed(42)
print(f"First roll again: {random.randint(1, 6)}")
