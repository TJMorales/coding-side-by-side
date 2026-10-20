# grep PATTERN FILE prints every line that contains the pattern.
grep ERROR logs/server.log
# grep is case-sensitive. -i ignores case.
grep miles music/playlist.txt
grep -i miles music/playlist.txt
# -c counts matching lines instead of printing them.
grep -c INFO logs/server.log
# -v prints the lines that do NOT match.
grep -v INFO logs/server.log
# -n adds line numbers. ^ means "at the start of the line".
grep -n "^A" cs/roster.txt
# -r searches every file in a folder. Each match starts with its file name.
grep -ri average cs
# grep reads from a pipe too.
cat cs/grades.csv | grep ",10," | wc -l
