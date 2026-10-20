# Make the folder a Git repository.
git init
# status shows what Git sees. Nothing is tracked yet.
git status
# Create a file. Git notices it but does not track it yet.
echo "print('hello')" > hello.py
git status
