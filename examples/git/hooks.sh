# The team keeps its hook script in the repository. It blocks any commit that adds a TODO line.
cat hooks/pre-commit
# Git only runs hooks from .git/hooks, and only if the file is executable.
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
# Try to commit a line with TODO in it.
echo '# TODO: print the highest score' >> gradebook.py
git add gradebook.py
git commit -m "Plan the highest score"
# The hook exited with 1, so Git made no commit. The change is still staged.
git status
# Replace the TODO with real code and commit again. The hook exits with 0 this time.
sed -i 's/# TODO: print the highest score/print("Highest:", max(scores))/' gradebook.py
git add gradebook.py
git commit -m "Print the highest score"
git log --oneline
