# ls -l shows permissions first: - for a file (d for a folder), then
# rwx for the owner, the group, and everyone else.
ls -l notes.txt
ls -ld cs
# greet.sh is a script, but nobody has x (execute) permission yet.
cat greet.sh
ls -l greet.sh
./greet.sh
# chmod +x adds execute permission.
chmod +x greet.sh
ls -l greet.sh
./greet.sh
# chmod 644 sets exact permissions with numbers: 6 = rw- for you, 4 = r-- for others.
chmod 644 greet.sh
ls -l greet.sh
# bash greet.sh runs the script without the execute bit.
bash greet.sh
