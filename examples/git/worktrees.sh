# Maya is on letter-grades with unfinished changes when a fix is needed on main.
git status
# worktree add makes a second folder with its own branch. -b hotfix creates that branch from main.
git worktree add -b hotfix ../hotfix main
git worktree list
# Work in the new folder. The unfinished changes in project are not touched.
cd ../hotfix
sed -i 's/socres/scores/' README.md
git commit -am "Fix typo in README"
# Back in the first folder, the unfinished work is still there.
cd ../project
git status
git log --oneline --graph --all
# Remove the extra folder when you are done. The hotfix branch and its commit stay.
git worktree remove ../hotfix
git worktree list
