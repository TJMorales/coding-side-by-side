#!/bin/bash
# Usage: ./welcome.sh NAME
name="${1:-Maya}"
count=$(wc -l < cs/roster.txt)

# cat << EOF sends every line up to EOF into cat.
# $variables and $(commands) inside are filled in.
cat << EOF
Welcome to CS, $name!
Students on the roster: $count
First file to open: $(ls cs/*.py)
EOF

# Quote the marker ('EOF') to keep $ signs exactly as typed.
cat << 'EOF'
Lab fee: $5. Type $name in your own script to use a variable.
EOF

# Redirect a here document into a file to write several lines at once.
cat << EOF > welcome.txt
Name: $name
Room: 2115
EOF
echo "Wrote welcome.txt"

# <<- removes leading TABS, so the text can be indented inside an if.
if [ "$count" -gt 5 ]; then
	cat <<- EOF
	Big class: $count students
	EOF
fi

# Any command that reads input can take a here document, like sort.
sort << EOF
Noah
Ava
Maya
EOF

# <<< (a here string) sends a single line.
wc -w <<< "So What Take Five"
