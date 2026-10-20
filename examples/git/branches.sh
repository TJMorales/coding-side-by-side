# git branch lists branches. * marks the one you are on.
git branch
# switch -c creates a new branch and moves to it.
git switch -c letter-grades
git branch
# New commits go on the current branch only. -a stages every changed tracked file.
printf 'print("Letter:", "A" if average >= 90 else "B")\n' >> gradebook.py
git commit -am "Print a letter grade"
# --graph --all draws every branch. main still points at the older commit.
git log --oneline --graph --all
# Switching branches changes the files in the folder to match that branch.
git switch main
cat gradebook.py
git switch letter-grades
cat gradebook.py
