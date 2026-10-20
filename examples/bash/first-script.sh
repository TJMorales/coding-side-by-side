#!/bin/bash
# The first line (the shebang) tells Linux to run this file with bash.
# A script is a list of commands that run in order, top to bottom,
# exactly as if you typed them at the prompt.

echo "Class files report"
echo "Folder: $(pwd)"

# Paths in a script are relative to where you RUN it, not where the file is.
echo "Students on roster: $(wc -l < cs/roster.txt)"
echo "Songs in playlist: $(wc -l < music/playlist.txt)"
echo "Errors in server log: $(grep -c ERROR logs/server.log)"
echo "Report done"
