scores = [88, -1, 92, 47, 75]

# continue skips the rest of this pass and moves to the next item.
# break ends the whole loop right away.
for score in scores:
    if score == -1:
        print("Absent, skipping")
        continue
    if score < 60:
        print(f"Failing score found: {score}. Stopping.")
        break
    print(f"Passing: {score}")
# 75 is never checked because break ended the loop at 47.

# for...else: the else block runs only if the loop finished without break.
print("Checking 2nd period:")
for score in [90, 85, 77]:
    if score < 60:
        print(f"Failing score found: {score}")
        break
else:
    print("No failing scores")

# Edge case: when break runs, the else block is skipped.
print("Checking 3rd period:")
for score in [90, 55, 77]:
    if score < 60:
        print(f"Failing score found: {score}")
        break
else:
    print("No failing scores")
