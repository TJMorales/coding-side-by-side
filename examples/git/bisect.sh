# The test passed in the first commit and fails now. Six commits came after it.
python3 test_gradebook.py
git log --oneline
# Start bisect: the newest commit is bad and the first commit (HEAD~6) is good.
git bisect start HEAD HEAD~6
# bisect run checks out commits and runs the test. Exit code 0 means good, 1 means bad.
git bisect run python3 test_gradebook.py
# Go back to where you started.
git bisect reset
