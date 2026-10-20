# main needs the fix from experiment, but not the chart work.
git log --oneline --graph --all
# Copy that one commit onto main by its hash.
git cherry-pick 66e60d2
git log --oneline --graph --all
# main has the fix. chart.py stayed on experiment.
cat gradebook.py
ls
