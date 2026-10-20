# Most commands print their own help with --help.
# The help for ls is long, so save it to a file and read the top.
ls --help > ls-help.txt
head -n 5 ls-help.txt
# Short commands have short help. Each line lists an option and what it does.
rmdir --help
# A wrong option prints a hint that points you to --help.
ls -j
# type tells you if a command is built into the shell or is a program file.
type sort
type cd
# Built-in commands like cd use help instead of --help. -d gives one line.
help -d cd
