# An absolute path starts with / and works from any folder.
ls /home/student/cs
# A relative path starts from the folder you are in now.
cd music
ls
# .. is the folder above, so ../cs means "go up, then into cs".
ls ../cs/project
# . is the current folder. ./playlist.txt and playlist.txt name the same file.
ls ./playlist.txt
# cd works with absolute paths too, from anywhere.
cd /home/student/cs/project/src
pwd
# Each .. goes up one level.
cd ../..
pwd
# ~ is your home folder, so ~/music works from any folder.
cd ~/music
# A relative path that does not exist from here fails.
ls src
