# sed 's/old/new/' replaces the first match on each line and prints the result.
sed 's/Miles Davis/Miles Dewey Davis/' music/playlist.txt
# The file itself did not change.
head -n 1 music/playlist.txt
# -i edits the file in place.
sed -i 's/Friday/Thursday/' notes.txt
cat notes.txt
# /g replaces every match on the line, not only the first.
head -n 3 cs/grades.csv | sed 's/,/ | /g'
# -n with p prints only the lines you name, here lines 4 to 5.
sed -n '4,5p' logs/server.log
# awk splits each line into fields: $1, $2, ... -F, splits at commas.
# NR is the line number, so NR > 1 skips the header.
awk -F, 'NR > 1 && $3 >= 90 {print $1, $3}' cs/grades.csv
# END runs once after the last line.
awk -F, 'NR > 1 {sum += $3; n++} END {print "Average:", sum / n}' cs/grades.csv
# Without -F, awk splits at spaces. $3 in the log is the level.
awk '{print $3}' logs/server.log | sort | uniq -c
