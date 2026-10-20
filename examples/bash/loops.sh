#!/bin/bash
# for runs the loop body once for each word in the list.
for folder in cs logs music; do
  echo "$folder has $(ls "$folder" | wc -l) items"
done

# A wildcard gives the loop a list of file names.
for file in cs/*.py; do
  echo "Python file: $file"
done

# If nothing matches, the pattern itself is the only item.
for file in cs/*.java; do
  echo "Java file: $file"
done

# C-style for counts with a number.
for (( i = 3; i >= 1; i-- )); do
  echo "Countdown: $i"
done

# while read reads a file one line at a time.
# IFS=, splits each line at commas into the three variables.
honor=0
while IFS=, read -r name grade score; do
  # Skip the header row.
  if [ "$name" = "name" ]; then
    continue
  fi
  if [ "$score" -ge 85 ]; then
    echo "Honor roll: $name ($score)"
    honor=$((honor + 1))
  fi
done < cs/grades.csv
echo "Honor roll total: $honor"

# while with a condition: keep going until the test is false.
songs=0
while [ $songs -lt 2 ]; do
  songs=$((songs + 1))
  echo "Playing song $songs"
done
