# echo prints its words.
echo Hello, class
# > sends the output into a file instead of the screen. It creates the file.
echo "Bring headphones Monday." > reminders.txt
cat reminders.txt
# >> adds to the end of the file.
echo "Field trip forms due Friday." >> reminders.txt
cat reminders.txt
# > replaces everything that was in the file.
echo "Quiz moved to Tuesday." > reminders.txt
cat reminders.txt
# Error messages are separate. 2> sends only errors to a file.
ls missing.txt 2> errors.txt
cat errors.txt
