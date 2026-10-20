# | sends the output of the left command into the right command.
cat music/playlist.txt | head -n 2
# wc -l counts lines, so this counts the items in cs.
ls cs | wc -l
# Chain as many commands as you need. Each one works on the last one's output.
cat cs/roster.txt | sort | head -n 3
# The last 3 log lines, then the first of those.
tail -n 3 logs/server.log | head -n 1
# In a pipe, ls prints one name per line instead of columns.
ls cs
ls cs | cat
# Errors skip the pipe and go to the screen, so wc counts 0 lines.
ls games | wc -l
# echo does not read input, so the piped text is ignored.
cat notes.txt | echo
