# xargs reads words from its input and adds them to the end of a command.
# -t prints each command before it runs.
echo "quiz1.txt quiz2.txt quiz3.txt" | xargs -t touch
ls
# find prints file names; xargs turns them into arguments for wc.
find cs -name "*.py" | xargs wc -l
# -n 1 runs the command once per word.
head -n 3 cs/roster.txt | xargs -n 1 echo "Student:"
# -I {} puts each input line where {} is, instead of at the end.
ls quiz*.txt | xargs -I {} cp {} {}.bak
ls quiz*
# xargs splits on spaces, so a name with a space breaks into two.
touch "lab report.txt"
ls lab*.txt | xargs rm
# -d '\n' splits on new lines only, so the whole name stays together.
ls lab*.txt | xargs -d '\n' rm
ls *.txt
