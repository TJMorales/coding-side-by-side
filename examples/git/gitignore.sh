# Python made a __pycache__ folder, and the program wrote debug.log. Neither belongs in the history.
git status
# Each line of .gitignore is a pattern. A trailing / matches a folder. * matches any name.
printf '__pycache__/\n*.log\n' > .gitignore
cat .gitignore
# The ignored files no longer show up. .gitignore itself is a normal file to commit.
git status
git add .gitignore
git commit -m "Ignore cache and log files"
# --ignored lists the files Git is skipping.
git status --ignored
