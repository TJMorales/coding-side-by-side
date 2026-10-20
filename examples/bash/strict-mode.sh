#!/bin/bash
# Usage: ./archive.sh FOLDER
# -e: stop at the first command that fails.
# -u: stop if the script uses a variable that was never set.
# -o pipefail: a pipeline fails if ANY command in it fails, not only the last.
set -euo pipefail

tmp="archive-tmp"

# trap ... EXIT runs cleanup when the script ends, for any reason.
cleanup() {
  if [ -d "$tmp" ]; then
    rm -r "$tmp"
    echo "Cleanup: removed $tmp"
  fi
}
trap cleanup EXIT

# -u: with no argument, $1 is unset and the script stops here.
folder="$1"
mkdir "$tmp"

# pipefail: if ls fails, this line fails, instead of wc reporting 0 items.
count=$(ls "$folder" | wc -l)
echo "$folder has $count items"

cp -r "$folder" "$tmp/"
# -e: if the folder has no README.md, cp fails and the script stops here.
cp "$folder/README.md" "$tmp/"
echo "Archive of $folder is ready"
