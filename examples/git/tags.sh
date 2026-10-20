# No tags yet.
git tag
# An annotated tag (-a) stores a message, who made the tag, and when.
git tag -a v1.0 -m "Version turned in for Unit 1"
# The tag shows next to its commit in the log.
git log --oneline
# git show displays the tag details and the commit it points to.
git show --no-patch v1.0
# Tag an older commit by naming it. HEAD~1 is the commit before the newest one.
git tag -a v0.9 -m "Draft for peer review" HEAD~1
git tag
git log --oneline
