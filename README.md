# Side by Side

A code reference for high school computer science students. 55 concepts, each written in Python and Java, from `print` to threads, generics, memoization, and a game loop. Students filter by language, level, topic, and search, and can view both languages side by side.

Live site: https://tjmorales.github.io/coding-side-by-side/

## Levels

| Level | Who it is for |
| --- | --- |
| Intro | First weeks of CS1 |
| Intermediate | Late CS1, early CS2 |
| Advanced | AP CSA, OOP, classic algorithms |
| Brilliant | Beyond AP: data structures, functional style, concurrency, testing |

## Linking to a filtered view

The filters live in the URL, so you can post a link that opens exactly what you want students to see:

- Python only, Intro: `#lang=python&level=intro`
- Both languages, OOP at Advanced: `#lang=both&level=advanced&topic=OOP`
- Search: `#lang=java&level=intro,intermediate&q=scanner`

## How it is built

```
docs/        the website (GitHub Pages serves this folder)
  index.html, style.css, app.js, highlight.js
  data.js    generated, do not edit by hand
  shots/     generated window screenshots for graphics examples
examples/
  python/<id>.py + <id>.json
  java/<id>/Main.java + <id>.json
tools/
  concepts.json   the concept list: id, level, topic, title, and the one-line Python vs Java difference
  build.py        runs every example and writes docs/data.js with the real output
  gui_capture.py  runs graphics examples on a virtual display and saves screenshots
  AUTHORING.md    rules for writing examples
```

Every runnable example is executed during the build, and the output on the page is the captured output. Programs that read input get their typed answers from the `stdin` field in the JSON.

### Rebuild after editing an example

```
python3 tools/build.py --check        # run everything, report problems, write nothing
python3 tools/build.py                # write docs/data.js
python3 tools/gui_capture.py          # only needed after changing a graphics example (needs xvfb, xdotool, tkinter)
```

### Add a concept

1. Add an entry to `tools/concepts.json`.
2. Write `examples/python/<id>.py` and `.json`, and `examples/java/<id>/Main.java` and `.json`, following `tools/AUTHORING.md`.
3. Run the build.

### Add a language

Add the language to `LANGS` in `tools/build.py` (with how to compile and run it), a tokenizer in `docs/highlight.js`, an entry in `LANGS` in `docs/app.js`, and a token set and pane style in `docs/style.css`. Each language has its own design system: Python uses IDLE's editor colors on sage paper with indentation guides; Java uses IntelliJ Darcula colors in UML-style class boxes.
