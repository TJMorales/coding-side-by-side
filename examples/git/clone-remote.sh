# git clone copies a repository and its whole history into a new folder.
git clone ~/gradebook.git
cd gradebook
ls
git log --oneline
# The clone remembers where it came from under the name origin.
git remote -v
# -a also lists remote-tracking branches. origin/main is your copy of main on origin.
git branch -a
git status
# Add a second remote and push to it. This is how you connect a project to a new GitHub repository.
git remote add backup ~/backup.git
git remote -v
git push --no-progress backup main
