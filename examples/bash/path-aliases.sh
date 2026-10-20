# PATH is the list of folders bash searches for commands, separated by colons.
echo $PATH
# Make your own command: a script in ~/bin.
mkdir -p ~/bin
printf '#!/bin/bash\necho "Today: CS quiz on loops"\n' > ~/bin/agenda
chmod +x ~/bin/agenda
# ~/bin is not in PATH yet, so bash cannot find agenda.
agenda
# Add ~/bin to the front of PATH for this session.
export PATH="$HOME/bin:$PATH"
agenda
# which shows the folder a command was found in.
which agenda
# An alias is a short name for a longer command. Aliases are off in scripts,
# and this page runs your commands from a script, so turn them on first.
shopt -s expand_aliases
alias ll='ls -l'
ll music
# type also explains built-in commands and aliases.
type ll
