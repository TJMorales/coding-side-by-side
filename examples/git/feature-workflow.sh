# Start a feature branch from main.
git switch -c letter-grades
printf 'print("Letter:", "A" if average >= 90 else "B")\n' >> gradebook.py
git commit -am "Print a letter grade"
# Push the branch. -u links it to origin/letter-grades for later push and pull. --no-progress hides the transfer counters.
git push --no-progress -u origin letter-grades
# On GitHub, Maya would open a pull request here. Jordan reviews it and merges it into main.
cd ../jordan
git fetch --no-progress
git merge --no-ff --no-edit origin/letter-grades
git push --no-progress
# Back in Maya's folder, update main with the merged work.
cd ../project
git switch main
git pull --no-progress
git log --oneline --graph --all
# The feature is in main, so delete the branch here and on origin.
git branch -d letter-grades
git push origin --delete letter-grades
