#!/bin/bash
# Usage: ./shoutout.sh NAME [EVENT]
# Words typed after the script name are its arguments: $1, $2, and so on.

echo "Script name: $0"
echo "Number of arguments: $#"
echo "All arguments: $*"

# ${1:-everyone} means: use $1, or "everyone" if $1 is missing or empty.
name="${1:-everyone}"
event="${2:-band rehearsal}"
echo "Great job at $event, $name!"

# shift drops $1 and moves every argument down one place.
shift
echo "After shift: $# left ($*)"
