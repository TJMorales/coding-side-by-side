# Both files are untracked. Nothing is saved in Git yet.
git status
# git add stages a file. Staged files go into the next commit.
git add gradebook.py
git status
# git commit saves everything staged as one snapshot, with a message.
git commit -m "Add gradebook script"
# README.md was not staged, so it is not in that commit.
git status
# git add . stages every new or changed file in this folder.
git add .
git commit -m "Add README"
# Two commits, newest first.
git log --oneline
