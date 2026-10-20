# The last two commits need to be undone.
git log --oneline
# "Add debug print" was never pushed. reset moves main back one commit, and --hard also resets the files.
git reset --hard HEAD~1
# That commit is gone from the log.
git log --oneline
# "Drop the lowest score" was already pushed. revert adds a new commit that undoes it, so shared history does not change.
git revert --no-edit HEAD
# The commit and its undo both stay in the log.
git log --oneline
cat gradebook.py
