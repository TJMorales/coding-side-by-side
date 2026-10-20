#!/usr/bin/env python3
"""Run GUI examples (meta "run": false) on a virtual display and save a screenshot of the window.

Python turtle runs with /usr/bin/python3.12 (has tkinter). Java Swing runs with java.
Optional meta "gui_actions": list of xdotool steps run before the capture, e.g.
  [["key", "Right"], ["click", 200, 150], ["wait", 0.5]]
Writes docs/shots/<lang>-<id>.png and reports any stderr (a crash means the code is broken).
Usage: gui_capture.py [ids...]
"""
import json, os, pathlib, shutil, subprocess, sys, tempfile, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
EX = ROOT / "examples"
OUT = ROOT / "docs" / "shots"
ENV = {k: v for k, v in os.environ.items() if k != "JAVA_TOOL_OPTIONS"}

SCRIPT = r"""
set -u
"$@" > prog.out 2> prog.err &
P=$!
for i in $(seq 1 40); do
  W=$(xwininfo -root -children | python3 -c "
import sys,re
best=None
for l in sys.stdin:
    m=re.match(r'\s+(0x[0-9a-f]+) .*?(\d+)x(\d+)\+',l)
    if m and 'IconWindow' not in l:
        a=int(m.group(2))*int(m.group(3))
        if a>100 and (best is None or a>best[0]): best=(a,m.group(1))
print(best[1] if best else '')
")
  [ -n "$W" ] && break
  sleep 0.25
done
sleep "${SETTLE:-1.5}"
W=$(xwininfo -root -children | python3 -c "
import sys,re
best=None
for l in sys.stdin:
    m=re.match(r'\s+(0x[0-9a-f]+) .*?(\d+)x(\d+)\+',l)
    if m and 'IconWindow' not in l:
        a=int(m.group(2))*int(m.group(3))
        if a>100 and (best is None or a>best[0]): best=(a,m.group(1))
print(best[1] if best else '')
")
if [ -n "$W" ]; then
  xdotool windowfocus "$W" 2>/dev/null || true
  python3 -c "
import json,subprocess,time,os
for a in json.loads(os.environ.get('ACTIONS','[]')):
    if a[0]=='wait': time.sleep(a[1])
    elif a[0]=='key': subprocess.run(['xdotool','key',a[1]]); time.sleep(0.15)
    elif a[0]=='keydown': subprocess.run(['xdotool','keydown',a[1]]); time.sleep(a[2]); subprocess.run(['xdotool','keyup',a[1]])
    elif a[0]=='click': subprocess.run(['xdotool','mousemove','--window','$W',str(a[1]),str(a[2]),'click','1']); time.sleep(0.2)
"
  sleep 0.4
  import -window "$W" shot.png
fi
kill $P 2>/dev/null
wait $P 2>/dev/null
exit 0
"""


def capture_browser(cid, meta):
    """JavaScript canvas examples: load the script into a page with a canvas in headless Chromium."""
    os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
    from playwright.sync_api import sync_playwright
    code = (EX / "javascript" / f"{cid}.js").read_text()
    host = ('<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;background:#fff}canvas{display:block}</style></head>'
            '<body><canvas id="screen" width="400" height="300"></canvas><script>' + code + '</script></body></html>')
    errors = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 800, "height": 600})
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        pg.set_content(host)
        pg.wait_for_timeout(int(meta.get("gui_settle", 1.0) * 1000))
        canvas = pg.locator("#screen")
        box = canvas.bounding_box()
        for a in meta.get("gui_actions", []):
            if a[0] == "wait":
                pg.wait_for_timeout(int(a[1] * 1000))
            elif a[0] == "click":
                pg.mouse.click(box["x"] + a[1], box["y"] + a[2])
            elif a[0] == "key":
                pg.keyboard.press(a[1])
            elif a[0] == "keydown":
                pg.keyboard.down(a[1]); pg.wait_for_timeout(int(a[2] * 1000)); pg.keyboard.up(a[1])
            pg.wait_for_timeout(150)
        pg.wait_for_timeout(300)
        OUT.mkdir(exist_ok=True)
        canvas.screenshot(path=str(OUT / f"javascript-{cid}.png"))
        b.close()
    return ("errors: " + "; ".join(errors)) if errors else ""


def capture(lang, cid):
    meta = json.loads((EX / lang / f"{cid}.json").read_text())
    if meta.get("run", True):
        return None
    if lang == "javascript":
        return capture_browser(cid, meta) if meta.get("browser") else None
    with tempfile.TemporaryDirectory() as tmp:
        t = pathlib.Path(tmp)
        (t / "cap.sh").write_text(SCRIPT)
        if lang == "python":
            shutil.copy(EX / lang / f"{cid}.py", t / "main.py")
            cmd = ["/usr/bin/python3.12", "main.py"]
        else:
            shutil.copy(EX / lang / cid / "Main.java", t / "Main.java")
            r = subprocess.run(["javac", "Main.java"], cwd=t, capture_output=True, text=True, env=ENV)
            if r.returncode:
                return "javac: " + r.stderr[-300:]
            cmd = ["java", "Main"]
        env = dict(ENV, ACTIONS=json.dumps(meta.get("gui_actions", [])), SETTLE=str(meta.get("gui_settle", 1.5)))
        subprocess.run(["xvfb-run", "-a", "-s", "-screen 0 1280x900x24", "bash", "cap.sh", *cmd],
                       cwd=t, env=env, capture_output=True, text=True, timeout=90)
        err = (t / "prog.err").read_text() if (t / "prog.err").exists() else ""
        err = "\n".join(l for l in err.splitlines() if "JAVA_TOOL_OPTIONS" not in l and l.strip())
        if not (t / "shot.png").exists():
            return "no window captured. " + err[-400:]
        OUT.mkdir(exist_ok=True)
        dest = OUT / f"{lang}-{cid}.png"
        subprocess.run(["convert", str(t / "shot.png"), "-strip", str(dest)])
        return ("stderr: " + err[-400:]) if err else ""


if __name__ == "__main__":
    concepts = json.loads((ROOT / "tools" / "tracks" / "code.json").read_text())
    ids = sys.argv[1:] or [c["id"] for c in concepts]
    for lang in ["python", "java", "javascript"]:
        for cid in ids:
            if not (EX / lang / f"{cid}.json").exists():
                continue
            res = capture(lang, cid)
            if res is None:
                continue
            print(("ok " if not res else "BAD"), lang, cid, res)
