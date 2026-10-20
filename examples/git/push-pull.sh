# Maya adds a score and commits. The commit is only on her computer so far.
echo 'Eli,84' >> scores.csv
git commit -am "Add Eli's score"
# status compares with origin/main as of the last download, so it does not know about Jordan's push.
git status
# git push sends your commits to origin. It is rejected because origin has a commit you do not have.
git push
# git pull downloads the new commits (fetch) and merges them into your branch. --no-progress hides the transfer counters.
git pull --no-progress --no-edit
git log --oneline --graph --all
# Now your branch includes everything on origin, so the push works.
git push --no-progress
git status
