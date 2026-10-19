/* Side by Side: syntax highlighting.
   Python tokens follow IDLE's color roles. Java tokens follow IntelliJ Darcula's roles.
   Output is HTML: <span class="tk-ROLE">...</span>, escaped. */
(function () {
  "use strict";

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const PY_KEYWORDS = new Set(("False None True and as assert async await break class continue def del elif else except " +
    "finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case type").split(" "));
  const PY_BUILTINS = new Set(("print input len range int float str bool list dict set tuple type isinstance sum min max abs round " +
    "sorted reversed enumerate zip map filter open super object iter next any all repr hash id ord chr format divmod pow " +
    "frozenset bytes property staticmethod classmethod callable getattr setattr hasattr vars dir help slice " +
    "Exception ValueError TypeError IndexError KeyError ZeroDivisionError NameError AttributeError FileNotFoundError " +
    "RuntimeError StopIteration NotImplementedError RecursionError AssertionError OSError IOError ArithmeticError NotImplemented").split(" "));

  const JAVA_KEYWORDS = new Set(("abstract assert boolean break byte case catch char class const continue default do double else enum " +
    "extends final finally float for goto if implements import instanceof int interface long native new package private protected " +
    "public return short static strictfp super switch synchronized this throw throws transient try void volatile while var record " +
    "sealed permits yield true false null").split(" "));

  function wrap(role, text) {
    return role ? '<span class="tk-' + role + '">' + esc(text) + "</span>" : esc(text);
  }

  /* ---------- Python ---------- */
  function python(src) {
    let out = "";
    let i = 0;
    let prevWord = "";
    const n = src.length;
    while (i < n) {
      const c = src[i];
      // comment
      if (c === "#") {
        let j = src.indexOf("\n", i);
        if (j < 0) j = n;
        out += wrap("comment", src.slice(i, j));
        i = j;
        continue;
      }
      // string with optional prefix
      const sm = /^([rRbBuUfF]{0,2})("""|'''|"|')/.exec(src.slice(i, i + 5));
      if (sm && (sm[1] === "" || /[A-Za-z]/.test(c)) && !(i > 0 && /\w/.test(src[i - 1]) && sm[1] === "")) {
        const q = sm[2];
        let j = i + sm[0].length;
        while (j < n) {
          if (src[j] === "\\") { j += 2; continue; }
          if (src.startsWith(q, j)) { j += q.length; break; }
          if (q.length === 1 && src[j] === "\n") break;
          j++;
        }
        const isDoc = q.length === 3 && /(^|\n)[ \t]*$/.test(src.slice(0, i));
        out += wrap(isDoc ? "docstring" : "string", src.slice(i, j));
        prevWord = "";
        i = j;
        continue;
      }
      // decorator
      if (c === "@" && /^@[A-Za-z_][\w.]*/.test(src.slice(i))) {
        const m = /^@[A-Za-z_][\w.]*/.exec(src.slice(i))[0];
        out += wrap("decorator", m);
        i += m.length;
        continue;
      }
      // number
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] || ""))) {
        if (!(i > 0 && /\w/.test(src[i - 1]))) {
          const m = /^(0[xX][0-9a-fA-F_]+|0[bB][01_]+|(\d[\d_]*)?\.?\d[\d_]*([eE][+-]?\d+)?j?)/.exec(src.slice(i))[0];
          out += wrap("number", m);
          i += m.length;
          continue;
        }
      }
      // identifier
      if (/[A-Za-z_]/.test(c)) {
        const m = /^[A-Za-z_]\w*/.exec(src.slice(i))[0];
        let role = null;
        if (prevWord === "def" || prevWord === "class") role = "definition";
        else if (PY_KEYWORDS.has(m)) role = "keyword";
        else if (PY_BUILTINS.has(m) && src[i - 1] !== ".") role = "builtin";
        else if (m === "self" || m === "cls") role = "self";
        out += wrap(role, m);
        prevWord = m;
        i += m.length;
        continue;
      }
      if (!/\s/.test(c)) prevWord = "";
      out += esc(c);
      i++;
    }
    return out;
  }

  /* ---------- Java ---------- */
  function java(src) {
    // first pass: tokens
    const toks = [];
    let i = 0;
    const n = src.length;
    while (i < n) {
      const c = src[i];
      const rest = src.slice(i, i + 3);
      if (rest.startsWith("/**")) {
        let j = src.indexOf("*/", i + 3); j = j < 0 ? n : j + 2;
        toks.push(["javadoc", src.slice(i, j)]); i = j; continue;
      }
      if (rest.startsWith("/*")) {
        let j = src.indexOf("*/", i + 2); j = j < 0 ? n : j + 2;
        toks.push(["comment", src.slice(i, j)]); i = j; continue;
      }
      if (rest.startsWith("//")) {
        let j = src.indexOf("\n", i); if (j < 0) j = n;
        toks.push(["comment", src.slice(i, j)]); i = j; continue;
      }
      if (rest === '"""') {
        let j = src.indexOf('"""', i + 3); j = j < 0 ? n : j + 3;
        toks.push(["string", src.slice(i, j)]); i = j; continue;
      }
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < n && src[j] !== c && src[j] !== "\n") { if (src[j] === "\\") j++; j++; }
        j = Math.min(j + 1, n);
        toks.push(["string", src.slice(i, j)]); i = j; continue;
      }
      if (c === "@" && /^@[A-Za-z_]\w*/.test(src.slice(i))) {
        const m = /^@[A-Za-z_]\w*/.exec(src.slice(i))[0];
        toks.push(["annotation", m]); i += m.length; continue;
      }
      if (/[0-9]/.test(c) && !(i > 0 && /\w/.test(src[i - 1]))) {
        const m = /^(0[xX][0-9a-fA-F_]+[lL]?|\d[\d_]*(\.\d[\d_]*)?([eE][+-]?\d+)?[lLfFdD]?)/.exec(src.slice(i))[0];
        toks.push(["number", m]); i += m.length; continue;
      }
      if (/[A-Za-z_$]/.test(c)) {
        const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i))[0];
        toks.push(["ident", m]); i += m.length; continue;
      }
      if (/\s/.test(c)) {
        const m = /^\s+/.exec(src.slice(i))[0];
        toks.push(["ws", m]); i += m.length; continue;
      }
      toks.push(["punct", c]); i++;
    }
    // second pass: roles for identifiers
    const sig = (k, dir) => { // next/prev significant token index
      for (let j = k + dir; j >= 0 && j < toks.length; j += dir) if (toks[j][0] !== "ws") return j;
      return -1;
    };
    let out = "";
    for (let k = 0; k < toks.length; k++) {
      const [type, text] = toks[k];
      if (type !== "ident") {
        out += wrap(type === "ws" || type === "punct" ? null : type, text);
        continue;
      }
      let role = null;
      const nx = sig(k, 1), pv = sig(k, -1);
      const nxText = nx >= 0 ? toks[nx][1] : "";
      const pvTok = pv >= 0 ? toks[pv] : ["", ""];
      if (JAVA_KEYWORDS.has(text)) role = "keyword";
      else if (pvTok[1] === "." && pv > 0) {
        const owner = sig(pv, -1);
        if (owner >= 0 && toks[owner][1] === "this" && nxText !== "(") role = "field";
        else if (/^[A-Z][A-Z0-9_]+$/.test(text)) role = "constant";
      } else if (nxText === "(" && (pvTok[0] === "ident" && !JAVA_KEYWORDS.has(pvTok[1]) || pvTok[1] === ">" || pvTok[1] === "]" || (pvTok[0] === "ident" && ["void", "int", "double", "boolean", "long", "char", "float", "short", "byte"].includes(pvTok[1])))) {
        if (pvTok[1] !== "new") role = "method-decl";
      } else if (nxText === "(" && /^[A-Z]/.test(text) && (["{", "}", ";", ""].includes(pvTok[1]) || ["public", "private", "protected"].includes(pvTok[1]))) {
        role = "method-decl"; // constructor declaration
      } else if (/^[A-Z][A-Z0-9_]+$/.test(text) && text.length > 1) role = "constant";
      if (!role && /^[A-Z]/.test(text) && !/^[A-Z][A-Z0-9_]+$/.test(text)) role = "type";
      if (role === "method-decl" && pvTok[0] === "ident" && pvTok[1] === "new") role = "type";
      out += wrap(role, text);
    }
    return out;
  }

  /* ---------- console output ---------- */
  function output(text, lang) {
    // Once a traceback or uncaught exception starts, everything after it is stderr.
    let inErr = false;
    return text.split("\n").map((line) => {
      if (/^(Traceback \(most recent call last\)|Exception in thread)/.test(line)) inErr = true;
      return inErr ? '<span class="out-err">' + esc(line) + "</span>" : esc(line);
    }).join("\n");
  }

  window.SBSHighlight = { python, java, output, esc };
})();
