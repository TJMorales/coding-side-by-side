# cat prints a whole file.
cat notes.txt
# cat with two files prints one after the other.
cat cs/hello.py music/playlist.txt
# head shows the first lines. -n sets how many (the default is 10).
head -n 3 logs/server.log
# tail shows the last lines, where the newest log entries are.
tail -n 2 logs/server.log
# head -n 1 on a CSV file shows the column names.
head -n 1 cs/grades.csv
# cat only reads files, not folders.
cat cs
