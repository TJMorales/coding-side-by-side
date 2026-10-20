# Two branches start from main. Neither one is merged yet.
git log --oneline --graph --all
# git merge brings another branch into the branch you are on, so check that you are on main.
git branch
# main has no commits of its own since readme-typo started, so Git just moves main forward (fast-forward).
git merge readme-typo
# Now main and letter-grades each have a commit the other lacks, so Git makes a merge commit.
git merge --no-edit letter-grades
git log --oneline --graph --all
# main now has both changes.
cat README.md gradebook.py
# Both branches are merged, so you can delete their names. The commits stay.
git branch -d readme-typo letter-grades
git log --oneline --graph --all
