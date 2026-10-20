# wc counts lines, words, and characters (bytes).
wc notes.txt
# -l counts lines only. The roster has 10 names.
wc -l cs/roster.txt
# sort puts lines in alphabetical order.
sort cs/roster.txt
# uniq only removes duplicates that are next to each other, so nothing changes here.
uniq cs/roster.txt | wc -l
# Sort first, then uniq.
sort cs/roster.txt | uniq | wc -l
# -c counts how many times each line appears. -d shows only duplicates.
sort cs/roster.txt | uniq -c
sort cs/roster.txt | uniq -d
# Top 3 scores: skip the header, sort by the 3rd comma column as numbers, highest first.
tail -n +2 cs/grades.csv | sort -t, -k3 -n -r | head -n 3
# How many students in each grade level.
tail -n +2 cs/grades.csv | cut -d, -f2 | sort | uniq -c
