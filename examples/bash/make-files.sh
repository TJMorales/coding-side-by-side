# mkdir makes a new folder.
mkdir projects
ls
# touch makes an empty file (or updates the time on one that exists).
touch projects/todo.txt
ls projects
# mkdir fails if the folder above the new one does not exist yet.
mkdir projects/web/css
# -p makes every missing folder in the path.
mkdir -p projects/web/css
# ls -R lists a folder and every folder inside it.
ls -R projects
# Quote a name that has a space, or touch makes two files.
touch "projects/lab notes.txt"
ls projects
# mkdir also fails if the folder already exists.
mkdir projects
