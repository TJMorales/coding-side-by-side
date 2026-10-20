# Change Liam's score from 92 to 94.
sed -i 's/Liam,92/Liam,94/' scores.csv
# git diff shows changes you have not staged. - marks the old line and + marks the new line.
git diff
# After git add, plain git diff shows nothing because no unstaged changes are left.
git add scores.csv
git diff
# --staged shows what the next commit will contain.
git diff --staged
git commit -m "Update Liam's score"
# Compare two commits: HEAD~1 is the commit before the newest one, HEAD.
git diff HEAD~1 HEAD
