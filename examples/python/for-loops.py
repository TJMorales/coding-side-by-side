# range(1, 6) gives 1, 2, 3, 4, 5. The stop value 6 is not included.
for lap in range(1, 6):
    print("Lap", lap)

# range(5) starts at 0, so it gives 0 to 4.
total = 0
for i in range(5):
    total = total + i
print("Sum of 0 to 4:", total)

# A third value sets the step. This counts down by 2.
for seconds in range(10, 0, -2):
    print("Countdown:", seconds)
