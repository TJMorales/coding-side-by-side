#!/usr/bin/env python3
"""Build docs/data/<track>.js for every page from tools/tracks.json and examples/<lang>/.

Every runnable example is executed and its real output is embedded.

Example files by language (meta is always examples/<lang>/<id>.json):
  python      examples/python/<id>.py
  java        examples/java/<id>/Main.java
  javascript  examples/javascript/<id>.js
  html        examples/html/<id>.html          (shown with css in a live preview)
  css         examples/css/<id>.css
  sql         examples/sql/<id>.sql            (run in sqlite3 against tools/fixtures/sql/school.sql)
  bash        examples/bash/<id>.sh            (run as user student in /home/student)
  git         examples/git/<id>.sh             (same, with a fixed git identity and clock)

Usage: build.py [--track code] [--only lang] [--ids a,b] [--check] [--twice]
  --check  run and report, write nothing
  --twice  run every example twice and flag output that changes between runs
"""
import argparse, fcntl, json, os, pathlib, re, shutil, sqlite3, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
EX = ROOT / "examples"
FIX = ROOT / "tools" / "fixtures"
DOCS = ROOT / "docs"
ENV = {k: v for k, v in os.environ.items() if k != "JAVA_TOOL_OPTIONS"}
ENV["PYTHONHASHSEED"] = "0"
BANNED = ["—"]  # em dash

SRC = {
    "python": lambda i: EX / "python" / f"{i}.py",
    "java": lambda i: EX / "java" / i / "Main.java",
    "javascript": lambda i: EX / "javascript" / f"{i}.js",
    "html": lambda i: EX / "html" / f"{i}.html",
    "css": lambda i: EX / "css" / f"{i}.css",
    "sql": lambda i: EX / "sql" / f"{i}.sql",
    "bash": lambda i: EX / "bash" / f"{i}.sh",
    "git": lambda i: EX / "git" / f"{i}.sh",
}

# When a program reads input, these harnesses echo each typed line into the output,
# so the captured output looks like a terminal session. The code students see is unchanged.
PY_HARNESS = """import builtins, runpy, sys
_orig = builtins.input
def _echo(prompt=""):
    value = _orig(prompt)
    print(value)
    return value
builtins.input = _echo
sys.argv = ["main.py"]
runpy.run_path("main.py", run_name="__main__")
"""
JAVA_HARNESS = r"""import java.io.*;
public class SbsHarness {
    public static void main(String[] args) throws Exception {
        final BufferedReader src = new BufferedReader(new InputStreamReader(System.in));
        System.setIn(new InputStream() {
            byte[] buf = new byte[0]; int pos = 0;
            boolean fill() throws IOException {
                String line = src.readLine();
                if (line == null) return false;
                System.out.println(line); System.out.flush();
                buf = (line + "\n").getBytes(); pos = 0; return true;
            }
            public int read() throws IOException { if (pos >= buf.length && !fill()) return -1; return buf[pos++] & 0xff; }
            public int read(byte[] b, int off, int len) throws IOException {
                if (len == 0) return 0;
                if (pos >= buf.length && !fill()) return -1;
                int n = Math.min(len, buf.length - pos);
                System.arraycopy(buf, pos, b, off, n); pos += n; return n;
            }
            public int available() { return buf.length - pos; }
        });
        Main.main(args);
    }
}
"""
JS_HARNESS = r"""// Echo answers typed into readline so piped input looks like a terminal session.
// Piped stdin arrives in one chunk, so lines that come before question() is called
// are queued and handed to the next question() instead of being dropped.
const rl = require("readline");
const rlp = require("readline/promises");
const queues = new WeakMap();
for (const I of [rl.Interface, rlp.Interface]) {
  const q = I.prototype.question;
  I.prototype.question = function (query, ...rest) {
    if (!queues.has(this)) {
      const pending = [];
      queues.set(this, pending);
      this.on("line", (line) => pending.push(line));
    }
    const pending = queues.get(this);
    const cb = rest.find((f) => typeof f === "function");
    if (pending.length) {
      const ans = pending.shift();
      process.stdout.write(query + ans + "\n");
      if (cb) { cb(ans); return; }
      return Promise.resolve(ans);
    }
    if (cb) {
      const opts = rest.filter((x) => x !== cb);
      return q.call(this, query, ...opts, (ans) => { process.stdout.write(ans + "\n"); cb(ans); });
    }
    const p = q.call(this, query, ...rest);
    return p && p.then ? p.then((a) => { process.stdout.write(a + "\n"); return a; }) : p;
  };
}
"""


def run(cmd, cwd, stdin="", env=None, timeout=60):
    p = subprocess.run(cmd, cwd=cwd, input=stdin, capture_output=True, text=True, timeout=timeout, env=env or ENV)
    return p.returncode, p.stdout, p.stderr


# ---------------------------------------------------------------- runners
def run_python(src, meta, tmp, problems):
    shutil.copy(src, tmp / "main.py")
    rc, so, se = run([sys.executable, "-m", "py_compile", "main.py"], tmp)
    if rc:
        problems.append("py_compile failed: " + se.strip()[-400:]); return None
    if not meta.get("run", True):
        return None
    stdin = meta.get("stdin", "")
    if stdin:
        (tmp / "sbs_run.py").write_text(PY_HARNESS)
        rc, so, se = run([sys.executable, "sbs_run.py"], tmp, stdin)
    else:
        rc, so, se = run([sys.executable, "main.py"], tmp)
    if rc and not meta.get("expect_error"):
        problems.append(f"exit {rc}: " + se.strip()[-400:])
    return so + (se if meta.get("expect_error") else "")


def run_java(src, meta, tmp, problems):
    shutil.copy(src, tmp / "Main.java")
    rc, so, se = run(["javac", "-Xlint:none", "Main.java"], tmp)
    if rc:
        if meta.get("expect_compile_error"):
            return se
        problems.append("javac failed: " + se.strip()[-400:]); return None
    if not meta.get("run", True):
        return None
    main_class = "Main"
    stdin = meta.get("stdin", "")
    if stdin:
        (tmp / "SbsHarness.java").write_text(JAVA_HARNESS)
        run(["javac", "-Xlint:none", "SbsHarness.java"], tmp)
        main_class = "SbsHarness"
    rc, so, se = run(["java", "-ea", "-cp", ".", main_class], tmp, stdin)
    if rc and not meta.get("expect_error"):
        problems.append(f"exit {rc}: " + se.strip()[-400:])
    return so + (se if meta.get("expect_error") else "")


def run_javascript(src, meta, tmp, problems):
    shutil.copy(src, tmp / "main.js")
    rc, so, se = run(["node", "--check", "main.js"], tmp)
    if rc:
        problems.append("node --check failed: " + se.strip()[-400:]); return None
    if not meta.get("run", True):
        return None
    stdin = meta.get("stdin", "")
    if stdin and not stdin.endswith("\n"):
        stdin += "\n"
    cmd = ["node", "main.js"]
    if stdin:
        (tmp / "sbs-echo.cjs").write_text(JS_HARNESS)
        cmd = ["node", "--require", "./sbs-echo.cjs", "main.js"]
    rc, so, se = run(cmd, tmp, stdin)
    if rc and not meta.get("expect_error"):
        problems.append(f"exit {rc}: " + se.strip()[-400:])
    return so + (se if meta.get("expect_error") else "")


def split_sql(code):
    """Split a .sql file into (statement_text) items, the way the sqlite3 shell reads them."""
    items, buf = [], []
    for line in code.split("\n"):
        s = line.strip()
        if not buf and (not s or s.startswith("--")):
            continue
        if not buf and s.startswith("."):
            items.append(line); continue
        buf.append(line)
        text = "\n".join(buf)
        if sqlite3.complete_statement(text):
            # drop full-line comments inside the statement from the echoed prompt
            items.append("\n".join(l for l in buf if not l.strip().startswith("--")).strip("\n"))
            buf = []
    if buf:
        items.append("\n".join(buf))
    return items


def run_sql(src, meta, tmp, problems):
    if not meta.get("run", True):
        return None
    code = src.read_text()
    stmts = split_sql(code)
    feed = [".bail off", ".headers on", ".mode box", ".nullvalue NULL"]
    if not meta.get("no_seed"):
        feed.append(".read " + str(FIX / "sql" / "school.sql"))
    for k, s in enumerate(stmts):
        feed.append(f".print @@SBS{k}@@")
        feed.append(s)
    feed.append(f".print @@SBS{len(stmts)}@@")
    # stderr goes into the same stream (both unbuffered) so each error lands under its statement.
    p = subprocess.run(["stdbuf", "-o0", "-e0", "sqlite3", ":memory:"], cwd=tmp, input="\n".join(feed) + "\n",
                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, timeout=60, env=ENV)
    raw = p.stdout
    if "@@SBS" not in raw:
        problems.append("sqlite3 failed: " + raw[-300:]); return None
    # rebuild as an interactive session: prompt, statement, output
    parts = re.split(r"@@SBS(\d+)@@\n?", raw)
    chunks = {}
    for k in range(1, len(parts) - 1, 2):
        chunks[int(parts[k])] = parts[k + 1]
    out = []
    errors = 0
    for k, s in enumerate(stmts):
        lines = s.split("\n")
        out.append("sqlite> " + lines[0])
        out += ["   ...> " + l for l in lines[1:]]
        body = chunks.get(k, "")
        body = re.sub(r"(Parse|Runtime) error near line \d+:", r"\1 error:", body)
        if re.search(r"(Parse|Runtime) error:|^Error:", body, re.M):
            errors += 1
        if body.strip():
            out.append(body.rstrip("\n"))
    if errors and not meta.get("expect_error"):
        problems.append(f"{errors} statement(s) raised an error; set expect_error if intended")
    return "\n".join(out)


SANDBOX = pathlib.Path("/home/student")
SHELL_ENV_KEYS = {"LANG": "C.UTF-8", "LC_ALL": "C.UTF-8", "TZ": "America/Chicago", "TERM": "dumb",
                  "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                  "HOME": str(SANDBOX), "USER": "student", "LOGNAME": "student", "SHELL": "/bin/bash"}
GITCONFIG = """[user]
\tname = Maya Lopez
\temail = maya@example.com
[init]
\tdefaultBranch = main
[color]
\tui = always
[core]
\tpager = cat
\teditor = true
[advice]
\tdetachedHead = false
[pull]
\trebase = false
"""


def reset_sandbox(track):
    for p in SANDBOX.iterdir():
        if p.is_dir() and not p.is_symlink():
            shutil.rmtree(p)
        else:
            p.unlink()
    fixture = FIX / track
    if fixture.exists():
        shutil.copytree(fixture, SANDBOX, dirs_exist_ok=True)
    if track == "git":
        (SANDBOX / ".gitconfig").write_text(GITCONFIG)
    subprocess.run(["chown", "-R", "student:student", str(SANDBOX)])
    # every fixture file gets the same timestamp so ls -l output is stable
    subprocess.run(["find", str(SANDBOX), "-exec", "touch", "-h", "-d", "2026-09-08 08:15", "{}", "+"])


def q(s):
    return "'" + s.replace("'", "'\"'\"'") + "'"


def group_commands(lines):
    """A command starts on an unindented line; indented lines continue it. # lines and blanks are skipped."""
    cmds = []
    for line in lines:
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if line[:1] in (" ", "\t") and cmds:
            cmds[-1].append(line)
        else:
            cmds.append([line])
    return cmds


def wrapper_script(track, meta, session_lines, setup_lines):
    w = ["exec 2>&1", "stty cols 80 rows 24 -echo 2>/dev/null", "cd \"$HOME\"", "mkdir -p " + q(meta.get("cwd", "." if track == "bash" else "project")),
         "cd " + q(meta.get("cwd", "." if track == "bash" else "project")),
         "sbs_n=0",
         "sbs_clock() { sbs_n=$((sbs_n+1)); export GIT_AUTHOR_DATE=\"2026-09-08T09:$(printf %02d $sbs_n):00-05:00\"; export GIT_COMMITTER_DATE=\"$GIT_AUTHOR_DATE\"; }",
         "sbs_prompt() { local d=\"${PWD/#$HOME/\\~}\"; printf 'student@linux:%s$ %s\\n' \"$d\" \"$1\"; shift; for l in \"$@\"; do printf '> %s\\n' \"$l\"; done; }"]
    if setup_lines:
        w.append("{")
        for cmd in group_commands(setup_lines):
            w.append("sbs_clock")
            w.append("\n".join(cmd))
        w.append("} >/dev/null 2>&1")
    w.append("printf '@@SBS-START@@\\n'")
    w.append("hash -r")
    w.append("sbs_rc=0")
    for cmd in group_commands(session_lines):
        w.append("sbs_prompt " + " ".join(q(l) for l in cmd))
        w.append("sbs_clock")
        # restore the exit status of the student's previous command, so $? means what it would in a terminal
        w.append("sbs_restore() { return $sbs_rc; }; sbs_restore")
        w.append("\n".join(cmd))
        w.append("sbs_rc=$?")
    return "\n".join(w) + "\n"


def run_shell(src, meta, tmp, problems, track):
    # /home/student is shared, so shell and git examples run one at a time, even across processes.
    with open("/tmp/sbs-sandbox.lock", "w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        return _run_shell(src, meta, tmp, problems, track)


def _run_shell(src, meta, tmp, problems, track):
    code = src.read_text()
    rc, so, se = run(["bash", "-n", str(src)], tmp)
    if rc:
        problems.append("bash -n failed: " + se.strip()[-300:]); return None
    if not meta.get("run", True):
        return None
    reset_sandbox("git" if track == "git" else "shell")
    setup = meta.get("setup", [])
    if meta.get("mode") == "script":
        fname = meta.get("filename", "script.sh")
        cwd = meta.get("cwd", "." if track == "bash" else "project")
        dest = SANDBOX / cwd / fname
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(code + "\n")
        if not meta.get("no_chmod"):
            dest.chmod(0o755)
        subprocess.run(["chown", "-R", "student:student", str(SANDBOX)])
        subprocess.run(["touch", "-d", "2026-09-08 08:15", str(dest)])
        session = meta.get("session", [f"./{fname}"])
    else:
        session = code.split("\n")
    wrap = tmp / "sbs-wrap.sh"
    wrap.write_text(wrapper_script(track, meta, session, setup))
    wrap.chmod(0o755)
    stdin = meta.get("stdin", "")
    # Run under a pseudo-terminal (script) so commands behave as they do when a student types them:
    # ls prints columns, and tools that check for a terminal act normally. Pipes still behave like pipes.
    p = subprocess.run(["runuser", "-u", "student", "--", "env", "-i"] + [f"{k}={v}" for k, v in SHELL_ENV_KEYS.items()] +
                       ["COLUMNS=80", "LINES=24", "script", "-qec", f"bash --norc --noprofile {wrap}", "/dev/null"],
                       cwd=str(SANDBOX), input=stdin, capture_output=True, text=True, timeout=60)
    out = p.stdout.replace("\r\n", "\n")
    if "@@SBS-START@@" not in out:
        problems.append("setup failed: " + (out + p.stderr)[-400:]); return None
    out = out.split("@@SBS-START@@\n", 1)[1]
    # Show what a terminal would: text after a carriage return overwrites the line, erase codes vanish.
    out = re.sub(r"\x1b\[K", "", out)
    out = "\n".join(l.rsplit("\r", 1)[-1] for l in out.split("\n"))
    # bash names the script in its own errors; a student at the prompt sees "bash:" instead.
    out = re.sub(r"^\S*sbs-wrap\.sh: line \d+: ", "bash: ", out, flags=re.M)
    out = out.replace(str(tmp), "/tmp/sbs")
    return out


# ---------------------------------------------------------------- one example
def build_one(lang, cid, track):
    meta_p = EX / lang / f"{cid}.json"
    src_p = SRC[lang](cid)
    if not meta_p.exists() or not src_p.exists():
        return None, f"missing {meta_p.name if not meta_p.exists() else src_p.relative_to(ROOT)}"
    meta_text = meta_p.read_text()
    try:
        meta = json.loads(meta_text)
    except json.JSONDecodeError as e:
        return None, f"bad JSON in {meta_p.name}: {e}"
    code = src_p.read_text().rstrip("\n")
    problems = []
    if any(b in code or b in meta_text for b in BANNED):
        problems.append("contains em dash")
    with tempfile.TemporaryDirectory() as t:
        tmp = pathlib.Path(t)
        os.chmod(tmp, 0o755)
        if lang == "python":
            out = run_python(src_p, meta, tmp, problems)
        elif lang == "java":
            out = run_java(src_p, meta, tmp, problems)
        elif lang == "javascript":
            out = run_javascript(src_p, meta, tmp, problems)
        elif lang == "sql":
            out = run_sql(src_p, meta, tmp, problems)
        elif lang in ("bash", "git"):
            out = run_shell(src_p, meta, tmp, problems, lang)
        else:  # html, css: rendered in the browser preview
            out = None
            meta.setdefault("run", False)
        if out is not None:
            out = out.replace(t, ".").rstrip("\n")
    if lang == "html" and (EX / "css" / f"{cid}.css").exists() and 'href="style.css"' not in code:
        problems.append('html must link the stylesheet with href="style.css"')
    shot = DOCS / "shots" / f"{lang}-{cid}.png"
    entry = {
        "code": code,
        "summary": meta.get("summary", ""),
        "notes": meta.get("notes", []),
        "pitfall": meta.get("pitfall", ""),
        "keywords": meta.get("keywords", []),
        "stdin": meta.get("stdin", ""),
        "output": out,
        "run": meta.get("run", True),
        "shot": f"shots/{lang}-{cid}.png" if shot.exists() else None,
        "shot_note": meta.get("shot_note", ""),
        "setup_note": meta.get("setup_note", ""),
        "preview_height": meta.get("preview_height"),
        "mode": meta.get("mode", "session") if lang in ("bash", "git") else None,
        "filename": meta.get("filename"),
    }
    if lang == "javascript" and meta.get("contrast"):
        entry["contrast"] = meta["contrast"]
    if not entry["summary"]:
        problems.append("no summary")
    return entry, "; ".join(problems)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--track")
    ap.add_argument("--only")
    ap.add_argument("--ids")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--twice", action="store_true")
    a = ap.parse_args()
    tracks = json.loads((ROOT / "tools" / "tracks.json").read_text())
    ids = set(a.ids.split(",")) if a.ids else None
    bad = 0
    index = []
    for tr in tracks:
        if a.track and tr["id"] != a.track:
            continue
        if a.only and a.only not in tr["langs"]:
            continue
        concepts = json.loads((ROOT / "tools" / "tracks" / f"{tr['id']}.json").read_text())
        data = {"track": tr, "concepts": concepts, "examples": {l: {} for l in tr["langs"]}}
        for lang in tr["langs"]:
            if a.only and lang != a.only:
                continue
            for c in concepts:
                if ids and c["id"] not in ids:
                    continue
                entry, prob = build_one(lang, c["id"], tr["id"])
                if entry and a.twice and entry["output"] is not None:
                    again, _ = build_one(lang, c["id"], tr["id"])
                    if again and again["output"] != entry["output"]:
                        prob = (prob + "; " if prob else "") + "output changes between runs"
                if entry:
                    data["examples"][lang][c["id"]] = entry
                    if lang == "javascript" and entry.get("contrast"):
                        c["js_contrast"] = entry["contrast"]
                if prob:
                    bad += 1
                if prob or a.check:
                    print(f"{'ok ' if not prob else 'BAD'} {lang:10} {c['id']:24} {prob}")
        for c in concepts:
            kw = [c["title"], c["topic"]]
            for lang in tr["langs"]:
                e = data["examples"][lang].get(c["id"])
                if e:
                    kw += e["keywords"] + [e["summary"]]
            index.append({"t": tr["id"], "p": tr["page"], "id": c["id"], "title": c["title"], "level": c["level"],
                          "kw": " ".join(kw).lower()})
        if tr["id"] == "sql":
            data["seed"] = (FIX / "sql" / "school.sql").read_text()
        if not a.check and not a.ids and not a.only:
            (DOCS / "data").mkdir(exist_ok=True)
            js = "window.SBS_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
            (DOCS / "data" / f"{tr['id']}.js").write_text(js)
            print(f"wrote docs/data/{tr['id']}.js", len(js), "bytes")
    if not a.check and not a.ids and not a.only and not a.track:
        js = "window.SBS_INDEX = " + json.dumps(index, ensure_ascii=False, separators=(",", ":")) + ";\n"
        (DOCS / "data" / "index.js").write_text(js)
        print("wrote docs/data/index.js", len(js), "bytes")
    elif not a.check and (a.ids or a.only):
        print("partial run: data files not written (drop --ids/--only to write)")
    print(f"done, {bad} problem(s)")


if __name__ == "__main__":
    main()
