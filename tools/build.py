#!/usr/bin/env python3
"""Build docs/data.js from tools/concepts.json and examples/<lang>/.

Python example:  examples/python/<id>.py   + examples/python/<id>.json
Java example:    examples/java/<id>/Main.java + examples/java/<id>.json

Runnable examples are executed and their real output is embedded.
Usage: build.py [--only python|java] [--ids a,b,c] [--check]  (--check: run, report, do not write)
"""
import json, os, subprocess, sys, tempfile, shutil, argparse, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
EX = ROOT / "examples"
LANGS = ["python", "java"]
ENV = {k: v for k, v in os.environ.items() if k != "JAVA_TOOL_OPTIONS"}
ENV["PYTHONHASHSEED"] = "0"
BANNED = ["—"]  # em dash

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


def run(cmd, cwd, stdin):
    p = subprocess.run(cmd, cwd=cwd, input=stdin, capture_output=True, text=True, timeout=30, env=ENV)
    return p.returncode, p.stdout, p.stderr


def build_one(lang, cid):
    meta_p = EX / lang / f"{cid}.json"
    src_p = EX / lang / f"{cid}.py" if lang == "python" else EX / lang / cid / "Main.java"
    if not meta_p.exists() or not src_p.exists():
        return None, f"missing {meta_p.name if not meta_p.exists() else src_p}"
    meta = json.loads(meta_p.read_text())
    code = src_p.read_text().rstrip("\n")
    problems = []
    for b in BANNED:
        if b in code or b in meta_p.read_text():
            problems.append("contains em dash")
    stdin = meta.get("stdin", "")
    runnable = meta.get("run", True)
    out = None
    with tempfile.TemporaryDirectory() as tmp:
        if lang == "python":
            shutil.copy(src_p, pathlib.Path(tmp) / "main.py")
            rc, so, se = run([sys.executable, "-m", "py_compile", "main.py"], tmp, "")
            if rc:
                problems.append("py_compile failed: " + se.strip()[-400:])
            elif runnable:
                if stdin:
                    (pathlib.Path(tmp) / "sbs_run.py").write_text(PY_HARNESS)
                    rc, so, se = run([sys.executable, "sbs_run.py"], tmp, stdin)
                else:
                    rc, so, se = run([sys.executable, "main.py"], tmp, stdin)
                if rc and not meta.get("expect_error"):
                    problems.append(f"exit {rc}: " + se.strip()[-400:])
                out = so + (se if meta.get("expect_error") else "")
        else:
            shutil.copy(src_p, pathlib.Path(tmp) / "Main.java")
            rc, so, se = run(["javac", "-Xlint:none", "Main.java"], tmp, "")
            if rc and not meta.get("expect_compile_error"):
                problems.append("javac failed: " + se.strip()[-400:])
            elif runnable and not rc:
                main_class = "Main"
                if stdin:
                    (pathlib.Path(tmp) / "SbsHarness.java").write_text(JAVA_HARNESS)
                    run(["javac", "-Xlint:none", "SbsHarness.java"], tmp, "")
                    main_class = "SbsHarness"
                rc, so, se = run(["java", "-ea", "-cp", ".", main_class], tmp, stdin)
                if rc and not meta.get("expect_error"):
                    problems.append(f"exit {rc}: " + se.strip()[-400:])
                out = so + (se if meta.get("expect_error") else "")
            elif meta.get("expect_compile_error"):
                out = se
    if out is not None:
        out = out.replace(tmp, ".").rstrip("\n")
    entry = {
        "code": code,
        "summary": meta.get("summary", ""),
        "notes": meta.get("notes", []),
        "pitfall": meta.get("pitfall", ""),
        "keywords": meta.get("keywords", []),
        "stdin": stdin,
        "output": out,
        "run": runnable,
        "shot": f"shots/{lang}-{cid}.png" if (ROOT / "docs" / "shots" / f"{lang}-{cid}.png").exists() else None,
        "shot_note": meta.get("shot_note", ""),
    }
    if not entry["summary"]:
        problems.append("no summary")
    return entry, "; ".join(problems)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only")
    ap.add_argument("--ids")
    ap.add_argument("--check", action="store_true")
    a = ap.parse_args()
    concepts = json.loads((ROOT / "tools" / "concepts.json").read_text())
    ids = set(a.ids.split(",")) if a.ids else None
    langs = [a.only] if a.only else LANGS
    data = {"concepts": concepts, "examples": {l: {} for l in LANGS}}
    bad = 0
    for lang in langs:
        for c in concepts:
            if ids and c["id"] not in ids:
                continue
            entry, prob = build_one(lang, c["id"])
            if entry:
                data["examples"][lang][c["id"]] = entry
            status = "ok " if not prob else "BAD"
            if prob:
                bad += 1
            if prob or a.check:
                print(f"{status} {lang:6} {c['id']:22} {prob}")
    print(f"done, {bad} problem(s)")
    if not a.check:
        js = "window.SBS_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
        (ROOT / "docs" / "data.js").write_text(js)
        print("wrote docs/data.js", len(js), "bytes")


if __name__ == "__main__":
    main()
