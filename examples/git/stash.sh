# Maya is in the middle of a change when she notices a typo she wants to fix first.
printf 'print("Highest:", max(scores))\n' >> gradebook.py
git status
# git stash saves your uncommitted changes and gives you a clean folder.
git stash push -m "highest score in progress"
git status
git stash list
# Make the quick fix and commit it on its own.
sed -i 's/socres/scores/' README.md
git commit -am "Fix typo in README"
# pop puts the stashed changes back and removes them from the stash list.
git stash pop
git status
git stash list
