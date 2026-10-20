# Overwrite gradebook.py by mistake.
echo "oops" > gradebook.py
cat gradebook.py
git status
# git restore puts the file back to how it was in the last commit. The edit is gone for good.
git restore gradebook.py
cat gradebook.py
# Stage a change, then decide it should not be in the next commit.
echo 'Eli,84' >> scores.csv
git add scores.csv
git status
# restore --staged unstages the file but keeps your edit in the file.
git restore --staged scores.csv
git status
# Plain restore then throws the edit away.
git restore scores.csv
git status
