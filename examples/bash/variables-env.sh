# Set a variable with name=value. No spaces around =.
name=Maya
# $name reads it. Double quotes fill in variables.
echo "Hello, $name"
# Single quotes print exactly what you type.
echo 'Hello, $name'
# Use ${name} when letters come right after the variable.
score=92
echo "Score: ${score}pts"
# $(command) saves a command's output in a variable.
count=$(wc -l < cs/roster.txt)
echo "The roster has $count names"
# Environment variables are set for you. Names are in capitals by tradition.
echo "$USER lives in $HOME"
# A new bash program (a child) does not see a plain variable...
bash -c 'echo "Child sees: $name"'
# ...until you export it.
export name
bash -c 'echo "Child sees: $name"'
