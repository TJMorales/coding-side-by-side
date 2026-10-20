# letter-grades started before main got "Fix typo in README".
git log --oneline --graph --all
# Rebase replays the branch's commits on top of the newest main.
git switch letter-grades
git rebase main
# The history is one straight line now. The two branch commits got new hashes.
git log --oneline --graph --all
# main can fast-forward, so no merge commit is needed.
git switch main
git merge letter-grades
git log --oneline --graph
