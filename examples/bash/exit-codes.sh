#!/bin/bash
# Usage: ./check-log.sh LOGFILE
# Exit codes: 0 = no errors, 1 = errors found, 2 = no such file.
log="$1"

# || runs the right side only if the left side fails.
[ -f "$log" ] || { echo "No such log: $log"; exit 2; }

# $? holds the exit code of the last command. grep -q prints nothing:
# it exits 0 if it found a match and 1 if it did not.
grep -q ERROR "$log"
status=$?
echo "grep exit code: $status"

if [ $status -eq 0 ]; then
  echo "Errors in $log:"
  grep ERROR "$log"
  exit 1
fi

# && runs the next command only if the one before it worked.
mkdir -p checked && cp "$log" checked/ && echo "No errors. Copied $log to checked/"
