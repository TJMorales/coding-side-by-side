# Three commits on main.
git log --oneline
# reset --hard HEAD~1 moves main back one commit. "Print a letter grade" is no longer in the log.
git reset --hard HEAD~1
git log --oneline
# The reflog lists every commit HEAD has pointed to, including the one that was dropped.
git reflog
# HEAD@{1} is where HEAD was one step ago, before the reset. Reset back to it.
git reset --hard HEAD@{1}
git log --oneline
cat gradebook.py
