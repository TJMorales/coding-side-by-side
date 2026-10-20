# Both branches changed Liam's line in scores.csv.
git log --oneline --graph --all
# Git cannot choose between the two versions, so the merge stops with a conflict.
git merge retake-scores
git status
# Git wrote both versions into the file between conflict markers.
cat scores.csv
# Keep the retake score. Rewrite the file with no markers.
printf 'name,score\nAva,88\nLiam,97\nNoah,79\nZoe,95\n' > scores.csv
cat scores.csv
# Staging the file tells Git the conflict is resolved. The commit finishes the merge.
git add scores.csv
git commit -m "Merge retake scores"
git log --oneline --graph --all
