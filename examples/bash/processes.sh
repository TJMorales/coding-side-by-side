# & at the end runs a command in the background, so the prompt comes back right away.
sleep 30 &
sleep 60 &
# jobs lists the background jobs this shell started. + is the newest.
jobs
# ps lists running processes. -o comm= shows only the command names.
ps -o comm=
# kill %1 stops job number 1.
kill %1
jobs
kill %2
jobs
ps -o comm=
# timeout stops a command that runs too long. Exit code 124 means it was stopped.
timeout 2 sleep 10; echo "Exit code: $?"
# A command without & makes you wait until it finishes.
sleep 1; echo "Done waiting"
