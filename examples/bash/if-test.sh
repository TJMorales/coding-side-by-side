#!/bin/bash
# Usage: ./grade.sh NAME
# Looks up a student in cs/grades.csv and prints a letter grade.
name="$1"

# -z is true when a string is empty (no argument given).
if [ -z "$name" ]; then
  echo "Usage: ./grade.sh NAME"
  exit 1
fi

# -f is true when a file exists. ! flips true and false.
if [ ! -f cs/grades.csv ]; then
  echo "Missing cs/grades.csv"
  exit 1
fi

# cut -d, -f3 keeps the 3rd comma-separated column (the score).
score=$(grep "^$name," cs/grades.csv | cut -d, -f3)
if [ -z "$score" ]; then
  echo "$name is not in grades.csv"
  exit 1
fi

# Numbers use -ge (>=), -gt (>), -lt (<), -le (<=), -eq (=), -ne (not =).
if [ "$score" -ge 90 ]; then
  letter="A"
elif [ "$score" -ge 80 ]; then
  letter="B"
elif [ "$score" -ge 70 ]; then
  letter="C"
else
  letter="F"
fi
echo "$name: $score ($letter)"

# Strings use = and !=. Spaces inside [ ] are required.
if [ "$letter" = "F" ]; then
  echo "Reminder: tutoring is Tuesday after school."
fi
