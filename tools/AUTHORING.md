# Authoring guide: Side by Side code reference

Audience: high school CS students (grades 9-12) at a Texas public high school, from day one of Intro CS through AP CSA and beyond. The site is a reference they open while coding. Each concept exists in Python AND Java with the same id so the site can show them side by side.

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

## Verify before you finish

From `/home/claude/side-by-side` run:
```
python3 tools/build.py --check --only python --ids id1,id2,...
python3 tools/build.py --check --only java --ids id1,id2,...
```
Every line must say `ok`. Read the printed output of each program (add `--check` prints status only; to see output, run the program yourself) and confirm it is what the comments claim. Fix anything that fails. Do NOT run build.py without --check (the lead builds data.js).
