# cp SOURCE DEST makes a copy. The original stays.
cp notes.txt notes-backup.txt
ls
# mv moves a file into a folder.
mkdir old
mv notes-backup.txt old
# mv also renames: the "move" stays in the same folder with a new name.
mv old/notes-backup.txt old/notes-week1.txt
ls old
# cp -r copies a folder and everything in it.
cp -r music music-copy
# rm deletes a file. There is no trash can, so it is gone for good.
rm old/notes-week1.txt
rm old/notes-week1.txt
# rm needs -r to delete a folder and its contents.
rm music-copy
rm -r music-copy old
ls
