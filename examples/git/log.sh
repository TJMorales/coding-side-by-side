# git log lists every commit, newest first, with its author and date.
git log
# --oneline shows one commit per line: a short hash and the message.
git log --oneline
# -2 limits the list to the two newest commits.
git log --oneline -2
# Put a file name after -- to see only the commits that changed that file.
git log --oneline -- scores.csv
# -p shows the exact lines each commit changed. -1 shows only the newest commit.
git log -p -1
