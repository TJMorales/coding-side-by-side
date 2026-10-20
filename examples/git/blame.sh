# Line 3 rounds the average. Who changed it, and why?
cat gradebook.py
# blame shows, for each line, the commit, author, and date of its last change.
git blame gradebook.py
# -L 3,3 shows only line 3.
git blame -L 3,3 gradebook.py
# Look up the commit blame named to read its message and the full change.
git show 4a4b43c
