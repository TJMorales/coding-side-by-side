# Authoring guide: Side by Side code reference

Audience: high school CS students (grades 9-12) at a Texas public high school, from day one of Intro CS through AP CSA and beyond. The site is a reference they open while coding.

The site has five pages (tracks), listed in tools/tracks.json. Each track has a concept list in tools/tracks/<track>.json (id, level, topic, title, contrast). Every concept needs an example in every language of its track, with the same id:
- code: python, java, javascript (compared side by side)
- web: html and css (shown side by side with a live preview)
- sql: sql
- shell: bash (Linux command line and bash scripting)
- git: git

Do not edit tools/tracks/*.json or tools/build.py. If a title or contrast sentence is wrong, say so in your report.

## Files you write

Python, concept id `X`:
- `examples/python/X.py`  the complete program students see
- `examples/python/X.json` metadata

Java, concept id `X`:
- `examples/java/X/Main.java`  complete program, `public class Main` with `main`. Helper classes go in the same file as non-public classes (no `public` on them), or as static nested classes.
- `examples/java/X.json` metadata

Copy the format of `hello-output` in both languages.

## Metadata JSON

```json
{
  "summary": "1-2 plain sentences: what this is and when you use it.",
  "notes": ["Up to 3 short notes, each about one specific line or rule in the code."],
  "pitfall": "One common student mistake and its symptom.",
  "keywords": ["searchable terms: function names, keywords, synonyms students would type"],
  "stdin": "optional: text piped to the program for input() / Scanner, lines separated by \n",
  "run": true
}
```
- `run: false` ONLY for GUI programs (turtle, Swing). They are compile-checked, not run.
- `expect_error: true` only for an example whose point is showing a runtime error message (e.g. the `errors` concept). Its stderr is captured as output.

## The code itself

- Standard library only. Python 3.12+. Java 21. No CodeHS libraries.
- Graphics: Python uses `turtle`; Java uses Swing (`JFrame`, `JPanel`, `paintComponent`, `javax.swing.Timer`).
- Output must be deterministic: seed random (`random.seed(42)`, `new Random(42)`), join threads before printing, no timestamps. Timing examples (big-o) must print counts of operations, or round/label timings so output is stable; prefer counting steps.
- Any program reading input must have `stdin` in its JSON, or it will hang.
- File examples write and read a file in the current folder (e.g. `scores.txt`).
- Length: Intro 8-25 lines. Intermediate up to 35. Advanced up to 55. Brilliant up to 70. Shorter is better if the concept is complete.
- Comments explain the WHY or the rule, in plain language, sentence case. Roughly one comment per idea, not per line.
- Use realistic, school-flavored names and data: grades, scores, a playlist, a gradebook, a band roster, a bank account, a game character. Avoid foo/bar.
- Show the concept, then one extra case that shows its edge (e.g. off-by-one, empty list, what changes when).
- Print results so the output panel teaches. Label printed values ("Average: 87.5"), not bare numbers.
- Idiomatic code for each language. Python: snake_case, f-strings from Intermediate on (Intro may use commas or f-strings). Java: camelCase, `final` where it matters, braces always.
- Python and Java versions of a concept should demonstrate the same idea with the same scenario/data, so students can compare line by line. Do not force unidiomatic code to match.

## Writing rules (strict)

- NO em dashes anywhere (the character U+2014). Use periods, commas, colons, or parentheses.
- No metaphors or cute phrasing. Direct, specific, factual.
- Sentence case. Address the student as "you".
- Notes and pitfalls name the exact function, keyword, or error (e.g. "IndexError: list index out of range").

## Levels

- intro: first weeks of CS1.
- intermediate: late CS1 / early CS2.
- advanced: AP CSA / CS2 level, OOP and classic algorithms.
- brilliant: beyond AP. College intro and capstone level.

## Language-specific rules

### JavaScript (examples/javascript/<id>.js + .json)
- Runs with Node 22 as CommonJS: use require(), not import. No npm packages.
- Same scenario and data as the Python and Java versions of the concept (read both first) so students can compare line by line. Idiomatic modern JS: const/let (never var except to show its pitfall), ===, template literals from Intermediate on, arrow functions where natural, classes for OOP.
- Input: use `const readline = require("readline/promises")` with `rl.question(...)` inside an async main(), and give "stdin" in the JSON. The build echoes typed answers into the output.
- The JSON must also have "contrast": one or two sentences on how JavaScript differs from Python and Java for this concept (plain, specific, checkable).
- Browser-only examples (graphics-shapes, graphics-events, game-loop): set "run": false and "browser": true. The file is a script loaded by a page that already contains `<canvas id="screen" width="400" height="300"></canvas>`. Draw with the Canvas 2D API; events with addEventListener; animation with requestAnimationFrame. Give "gui_actions" like the Python/Java versions ([["click", x, y], ["key", "ArrowLeft"], ["keydown", "ArrowLeft", 0.8], ["wait", 0.5]]) and "shot_note" if actions run before the screenshot. The lead captures the screenshot.
- Concurrency in JS: show async/await, Promise.all, and why there is no data race on a single thread; keep output deterministic (use setTimeout with fixed delays only if order is guaranteed).

### HTML and CSS (examples/html/<id>.html + .json, examples/css/<id>.css + .json)
- The HTML is a complete page and links the stylesheet with exactly `<link rel="stylesheet" href="style.css">`. The site shows the HTML, the CSS, and a live preview of both together (an iframe, scripts disabled, about 640px wide).
- No JavaScript, no external images or fonts. For images use a data: URI SVG or an inline <svg>. Links can point to example.com.
- Set "preview_height" (pixels, 120 to 420) in the HTML JSON so the whole result shows.
- The CSS JSON summary/notes explain the CSS; the HTML JSON explains the HTML. Each file stands alone in its pane, so put comments in both.
- Use a consistent student-site scenario (a class portfolio, a club page, a gradebook table).
- Every property must work in current Chrome, Firefox, and Safari. Note in a comment if something is new (for example :has(), container queries, @layer, popover).

### SQL (examples/sql/<id>.sql + .json)
- Runs in the sqlite3 shell (SQLite 3.45) against the sample school database tools/fixtures/sql/school.sql (students, courses, enrollments). Read it first. The output is a real sqlite3 session: each statement is echoed after `sqlite> ` and followed by its result table.
- Use standard SQL that also works in other databases where possible. When something is SQLite-specific, say so in a note.
- Examples that change data (INSERT, UPDATE, DELETE, CREATE) start from the sample database each time, so they can change it freely. Show the table before and/or after.
- Set "expect_error": true only if a statement is meant to fail; otherwise any error is a build failure.
- Keep result tables short: use WHERE or LIMIT so a result has at most about 12 rows.

### Command line: bash (examples/bash/<id>.sh + .json)
- Runs as user `student` on Linux (bash 5, GNU coreutils) under a real terminal, in /home/student, which starts with the files in tools/fixtures/shell (look at them: cs/, logs/, music/, notes.txt). All files have the timestamp 2026-09-08 08:15.
- Session mode (default): each unindented line of the .sh file is typed at the prompt, and the output shows `student@linux:~$ command` followed by what it printed. Lines starting with # are shown in the code but not typed. Indented lines continue the previous command (for multi-line commands). Every command runs; errors are fine and show up as they would in a terminal.
- Script mode: set "mode": "script", "filename": "greet.sh", and "session": the commands typed to run it (for example ["./greet.sh Maya", "./greet.sh"]). The file is saved in the starting folder and made executable unless "no_chmod": true. Start the script with #!/bin/bash.
- Optional "cwd": starting folder relative to /home/student (default "."). Optional "setup": list of commands run silently first, with "setup_note" describing the starting state to students.
- No network, no sudo, no interactive programs (nano, vim, less, top, man). For man, show `man ls | head` is not possible; teach --help and mention man in notes. Do not use `read` from the keyboard; pass input with arguments, a pipe, or a here-string.
- Output must be identical on every run: no PIDs, dates, or random values. Check with --twice.

### Git (examples/git/<id>.sh + .json)
- Same session engine as bash. Starts in an empty folder /home/student/project (or set "cwd"). Git identity is Maya Lopez <maya@example.com>, default branch main, color on, no pager, and each command gets a clock one minute later than the previous one, so commit hashes are identical on every run.
- Use "setup" (hidden commands) to build any starting history the concept needs, and describe it in "setup_note" (for example "Starts in a repository with three commits on main."). Keep visible sessions focused on the concept.
- Remotes: use a local bare repository as the remote (for example setup runs `git init --bare ../remote.git`). No network.
- No interactive editors: use `git commit -m`, `git merge --no-edit`, `git rebase` without -i, and edit files with echo, printf, or sed.

## Verify before you finish

From `/home/claude/side-by-side` run:
```
python3 tools/build.py --check --twice --only <lang> --ids id1,id2,...
```
Shell and git examples share /home/student; the build locks it, so runs simply wait for each other. To read an example's real output:
```
python3 -c "import sys; sys.path.insert(0,'tools'); import build; e,p=build.build_one('<lang>','<id>','<track>'); print(p); print(e['output'])"
```
Every line must say `ok`. Read the printed output of each program (add `--check` prints status only; to see output, run the program yourself) and confirm it is what the comments claim. Fix anything that fails. Do NOT run build.py without --check (the lead builds data.js).
