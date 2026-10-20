# * matches any characters. The shell replaces the pattern with matching names.
ls *.txt
ls cs/*.py
# */ looks one folder down: every .txt file in any folder.
ls */*.txt
# ? matches exactly one character. -d lists the folder itself, not what is in it.
ls -d ?s
# [gr]* matches names that start with g or r.
ls cs/[gr]*
# echo shows what the shell turns a pattern into before the command runs.
echo cs/*
# Wildcards work with any command, like cp.
mkdir backup
cp cs/*.csv cs/*.txt backup
ls backup
# If nothing matches, the pattern is left as typed, and ls looks for a file named *.mp3.
ls music/*.mp3
