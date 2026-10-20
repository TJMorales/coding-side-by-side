# find FOLDER lists everything inside it, at every level.
find cs
# -name matches a file name. Quote the wildcard so find gets it.
find . -name "*.py"
# -type d finds folders only. -type f finds files only.
find . -type d
# -iname ignores case.
find . -iname "readme*"
# No match prints nothing.
find . -name "*.java"
# Without quotes, the shell fills in *.py first. In cs that becomes hello.py,
# so find looks for files named exactly hello.py and misses main.py.
cd cs
find . -name *.py
find . -name "*.py"
# -exec runs a command on each file found. {} is the file name.
find . -name "*.py" -exec wc -l {} \;
