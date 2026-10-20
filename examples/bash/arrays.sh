#!/bin/bash
# An array holds a list of values. Quotes keep "So What" as one item.
songs=("So What" "Take Five" "Blue in Green")

# Indexes start at 0.
echo "First song: ${songs[0]}"
echo "Song count: ${#songs[@]}"

# += adds to the end.
songs+=("Footprints")
echo "Last song: ${songs[-1]}"

# "${songs[@]}" in double quotes gives each item as one word.
for song in "${songs[@]}"; do
  echo "- $song"
done

# Without quotes, items split at spaces: 4 songs become 8 words.
words=0
for w in ${songs[@]}; do
  words=$((words + 1))
done
echo "Unquoted loop ran $words times"

# ${!songs[@]} lists the indexes, for a numbered list.
for i in "${!songs[@]}"; do
  echo "$((i + 1)). ${songs[i]}"
done

# An index that was never set is empty, not an error.
echo "Song 10: '${songs[9]}'"

# mapfile reads a file into an array, one line per item.
mapfile -t roster < cs/roster.txt
echo "Roster size: ${#roster[@]}"
# ${roster[@]:0:3} is a slice: 3 items starting at index 0.
echo "First three: ${roster[@]:0:3}"

# declare -A makes an associative array: names as keys instead of numbers.
declare -A scores
scores[Maya]=92
scores[Leo]=78
scores[Ava]=88
echo "Leo's score: ${scores[Leo]}"
# Keys come back in no fixed order, so sort them for a stable list.
for name in $(printf '%s\n' "${!scores[@]}" | sort); do
  echo "$name: ${scores[$name]}"
done
