#!/usr/bin/env python3
"""Write the five page shells (docs/index.html, web.html, sql.html, shell.html, git.html) from one template.

Each page differs only in its data file, hero image, tagline, language toggle, and code fonts.
Run after changing the template, a hero image, or VERSION (the cache-busting number on css/js links).
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
VERSION = "11"
CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3FHspHdiasmC0fwfZkWWBnKEGp0/"

BASE_FONTS = "family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Condensed:wght@500;600;700&family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..900,0..1,0..1,0..1"

PAGES = {
    "code": {
        "file": "index.html", "title": "Side by Side: Python, Java, and JavaScript",
        "desc": "A code reference for Python, Java, and JavaScript, from your first print statement to threads, generics, and game loops. Compare the languages concept by concept.",
        "tagline": "Python, Java, and JavaScript, one concept at a time. From your first <code>print</code> to threads and game loops.",
        "hero": "hero.webp", "hero_fallback": "hero.jpg", "tone": "light",
        "fonts": "&family=JetBrains+Mono:ital,wght@0,400;0,600;1,400&family=Fira+Code:wght@400;600",
        "search": "Try: loop, constructor, HashMap, async",
    },
    "web": {
        "file": "web.html", "title": "Side by Side: HTML and CSS",
        "desc": "HTML and CSS side by side with a live preview, from a page skeleton to grid, container queries, and :has().",
        "tagline": "HTML for structure, CSS for style, and a live preview of both. From your first page to container queries.",
        "hero": CDN + "hf_20261020_122857_24653e42-f4b0-4410-99be-f0529f39234d.png", "tone": "dark",
        "fonts": "&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&family=DM+Mono:ital,wght@0,400;0,500;1,400",
        "search": "Try: flexbox, form, hover, grid",
    },
    "sql": {
        "file": "sql.html", "title": "Side by Side: SQL",
        "desc": "SQL queries run against a sample school database, with the real sqlite3 results. From SELECT to window functions.",
        "tagline": "Ask questions of a school database. Every query runs in sqlite3, and the results are real.",
        "hero": CDN + "hf_20261020_122857_7adc23bc-b95f-46ed-9189-0cf2c8991afe.png", "tone": "dark",
        "fonts": "&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400",
        "search": "Try: join, GROUP BY, NULL, index",
    },
    "shell": {
        "file": "shell.html", "title": "Side by Side: Linux command line and bash",
        "desc": "Linux commands and bash scripts with real terminal output, from pwd and ls to pipes, permissions, and safe scripts.",
        "tagline": "Linux commands and bash scripts, run in a real terminal. From <code>pwd</code> to pipes and safe scripts.",
        "hero": None, "tone": "dark",
        "fonts": "&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400",
        "search": "Try: grep, chmod, pipe, loop",
    },
    "git": {
        "file": "git.html", "title": "Side by Side: Git",
        "desc": "Git commands with real output from a real repository, from git init to rebase, bisect, and hooks.",
        "tagline": "Version control with real output from a real repository. From <code>git init</code> to bisect and hooks.",
        "hero": CDN + "hf_20261020_122858_e566dc8a-6a25-4349-96d8-4131b8dc9609.png", "tone": "dark",
        "fonts": "&family=Red+Hat+Mono:ital,wght@0,400;0,600;1,400",
        "search": "Try: branch, merge, undo, remote",
    },
}

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content="{desc}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?{fonts}&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="style.css?v={v}" />
    {hero_style}
  </head>
  <body data-track="{track}">
    <a class="skip" href="#concepts">Skip to concepts</a>

    <header class="masthead hero hero-{track} hero-{tone}">
      <nav class="pages" aria-label="Pages">
{nav}
      </nav>
      <div class="masthead-top">
        <p class="wordmark" aria-label="Side by Side">
          <span class="wm-py">Side</span><span class="wm-seam" aria-hidden="true"></span><span class="wm-java">by Side</span>
        </p>
        <h1 class="page-title">{h1}</h1>
        <p class="tagline">{tagline}</p>
      </div>

      <form class="facets{facet_class}" role="search" aria-label="Filter concepts" onsubmit="return false">
        <div class="facet facet-search">
          <label for="q">Search</label>
          <input id="q" type="search" placeholder="{search}" autocomplete="off" spellcheck="false" />
        </div>
{lang_facet}
        <fieldset class="facet facet-level">
          <legend>Level <span class="legend-hint">Pick one or more</span></legend>
          <div class="ladder" id="levels"></div>
        </fieldset>
      </form>
    </header>

    <div class="status-row">
      <div class="status-text">
        <p class="count" id="count" aria-live="polite"></p>
        <p class="elsewhere" id="elsewhere"></p>
      </div>
      <div class="color-keys" id="color-keys" aria-label="Syntax color key"></div>
    </div>

    <div class="layout">
      <nav class="rail" id="rail" aria-label="Topics and concepts">
        <details class="rail-box" id="rail-box" open>
          <summary>Topics</summary>
          <div id="topics"></div>
        </details>
      </nav>
      <main id="concepts" tabindex="-1"></main>
    </div>

    <footer class="foot">
      <p>{foot}</p>
    </footer>

    <script src="highlight.js?v={v}"></script>
    <script src="data/{track}.js?v={v}"></script>
    <script src="data/index.js?v={v}"></script>
    <script src="app.js?v={v}"></script>
  </body>
</html>
"""

FOOT = {
    "code": "Every example on this page was run with Python 3, Java 21, and Node 22. Console output is copied from those runs, and graphics examples show a screenshot of the window or canvas they drew.",
    "web": "Each preview is the HTML and CSS above it, rendered live in your browser with scripts turned off.",
    "sql": "Every query ran in sqlite3 3.45 against the sample database at the top of the page. The tables are the real results.",
    "shell": "Every session ran in bash 5 on Linux as the user student, in a real terminal. The output is what the commands printed.",
    "git": "Every session ran with real Git in a fresh repository. Commit dates and the author are fixed so the output is the same on every run.",
}
H1 = {"code": "Python · Java · JavaScript", "web": "HTML + CSS", "sql": "SQL", "shell": "Linux command line and bash", "git": "Git"}


def main():
    tracks = json.loads((ROOT / "tools" / "tracks.json").read_text())
    for tr in tracks:
        cfg = PAGES[tr["id"]]
        nav = "\n".join(
            f'        <a href="{t["page"]}"' + (' aria-current="page"' if t["id"] == tr["id"] else "") + f'>{t["nav"]}</a>'
            for t in tracks)
        lang_facet = ""
        if len(tr["langs"]) > 1:
            lang_facet = ('        <div class="facet facet-lang" role="group" aria-labelledby="lang-label">\n'
                          '          <span class="facet-label" id="lang-label">Languages <span class="legend-hint">Pick one or more</span></span>\n'
                          '          <div class="lang-toggle" id="langs"></div>\n'
                          '        </div>')
        hero_style = ""
        if cfg["hero"]:
            if cfg.get("hero_fallback"):
                url = f'image-set(url("{cfg["hero"]}") type("image/webp"), url("{cfg["hero_fallback"]}") type("image/jpeg"))'
                hero_style = f'<style>.hero {{ background-image: url("{cfg["hero_fallback"]}"); background-image: {url}; }}</style>'
            else:
                hero_style = f'<style>.hero {{ background-image: url("{cfg["hero"]}"); }}</style>'
        html = TEMPLATE.format(
            title=cfg["title"], desc=cfg["desc"], fonts=BASE_FONTS + cfg["fonts"], v=VERSION, hero_style=hero_style,
            track=tr["id"], tone=cfg["tone"], nav=nav, h1=H1[tr["id"]], tagline=cfg["tagline"], search=cfg["search"],
            lang_facet=lang_facet, facet_class="" if lang_facet else " facets-solo", foot=FOOT[tr["id"]])
        (DOCS / cfg["file"]).write_text(html)
        print("wrote docs/" + cfg["file"])


if __name__ == "__main__":
    main()
