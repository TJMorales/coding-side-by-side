# Commit a new score with a typo in the message.
echo 'Eli,84' >> scores.csv
git commit -am "Add Elis score"
git log --oneline
# --amend replaces the last commit. -m gives it a new message.
git commit --amend -m "Add Eli's score"
git log --oneline
# Forgot a file? Stage it and amend again. --no-edit keeps the message.
echo 'Class size: 5' >> README.md
git add README.md
git commit --amend --no-edit
# Still one commit, now with both files. Its hash changed again.
git log --oneline --stat -1
