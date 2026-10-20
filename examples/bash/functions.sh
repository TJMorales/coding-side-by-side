#!/bin/bash
# A function must be defined before the line that calls it.
# Arguments arrive as $1, $2, ... just like a script's arguments.
letter_grade() {
  local score=$1
  if [ "$score" -ge 90 ]; then
    echo "A"
  elif [ "$score" -ge 80 ]; then
    echo "B"
  elif [ "$score" -ge 70 ]; then
    echo "C"
  else
    echo "F"
  fi
}

# To return a value, echo it and capture it with $(...).
report() {
  local name=$1
  local score=$2
  echo "$name: $score ($(letter_grade "$score"))"
}

# return sets an exit code (0 = true), so the function works in an if.
is_passing() {
  [ "$1" -ge 70 ]
}

# "$@" is every argument; $# is how many.
average() {
  local total=0
  for s in "$@"; do
    total=$((total + s))
  done
  echo $((total / $#))
}

# Call a function like a command: name, then arguments.
report Maya 92
report Leo 78
report Sofia 64
echo "Average: $(average 92 78 88 95 64)"

if is_passing 64; then
  echo "64 passes"
else
  echo "64 does not pass"
fi

# local keeps a variable inside its function. This total was never changed.
total="not set"
average 90 80 > /dev/null
echo "total after average: $total"
