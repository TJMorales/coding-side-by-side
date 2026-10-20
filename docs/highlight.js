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

  /* ---------- JavaScript ---------- */
  const JS_KEYWORDS = new Set(("break case catch class const continue debugger default delete do else export extends finally for " +
    "function if import in instanceof let new return super switch this throw try typeof var void while with yield async await " +
    "of static get set true false null undefined NaN Infinity").split(" "));
  const JS_BUILTINS = new Set(("console Math JSON Array Object String Number Boolean Map Set WeakMap Promise Date RegExp Error " +
    "TypeError RangeError SyntaxError ReferenceError require module exports process document window parseInt parseFloat " +
    "isNaN setTimeout clearTimeout setInterval requestAnimationFrame Symbol BigInt structuredClone globalThis").split(" "));
  function javascript(src) {
    let out = "", i = 0, prev = "", prevSig = "";
    const n = src.length;
    while (i < n) {
      const c = src[i], two = src.slice(i, i + 2);
      if (two === "//") { let j = src.indexOf("\n", i); if (j < 0) j = n; out += wrap("comment", src.slice(i, j)); i = j; continue; }
      if (two === "/*") { let j = src.indexOf("*/", i + 2); j = j < 0 ? n : j + 2; out += wrap(src.startsWith("/**", i) ? "javadoc" : "comment", src.slice(i, j)); i = j; continue; }
      if (c === '"' || c === "'" || c === "`") {
        let j = i + 1;
        while (j < n && src[j] !== c) { if (src[j] === "\\") j++; else if (c !== "`" && src[j] === "\n") break; j++; }
        j = Math.min(j + 1, n);
        out += wrap("string", src.slice(i, j)); i = j; prevSig = "str"; continue;
      }
      if (/[0-9]/.test(c) && !(i > 0 && /[\w$]/.test(src[i - 1]))) {
        const m = /^(0[xXbBoO][0-9a-fA-F_]+n?|\d[\d_]*(\.\d+)?([eE][+-]?\d+)?n?)/.exec(src.slice(i))[0];
        out += wrap("number", m); i += m.length; prevSig = "num"; continue;
      }
      if (/[A-Za-z_$#]/.test(c)) {
        const m = /^[#A-Za-z_$][\w$]*/.exec(src.slice(i))[0];
        let role = null;
        const after = src.slice(i + m.length).match(/^\s*(\(|=\s*(async\s*)?(\(|[A-Za-z_$][\w$]*\s*=>)|=>)/);
        if (prev === "function" || prev === "class") role = "definition";
        else if (JS_KEYWORDS.has(m)) role = "keyword";
        else if (JS_BUILTINS.has(m) && src[i - 1] !== ".") role = "builtin";
        else if (/^\s*\(/.test(src.slice(i + m.length)) && /(^|\n)\s*(static\s+|async\s+|get\s+|set\s+)*$/.test(src.slice(0, i)) ) role = "definition";
        else if (after && (prev === "const" || prev === "let") && !after[1].startsWith("(")) role = "definition";
        out += wrap(role, m); prev = m; prevSig = "id"; i += m.length; continue;
      }
      if (!/\s/.test(c)) { prev = ""; prevSig = c; }
      out += esc(c); i++;
    }
    return out;
  }

  /* ---------- HTML ---------- */
  function html(src) {
    let out = "", i = 0;
    const n = src.length;
    while (i < n) {
      if (src.startsWith("<!--", i)) { let j = src.indexOf("-->", i); j = j < 0 ? n : j + 3; out += wrap("comment", src.slice(i, j)); i = j; continue; }
      if (/^<!doctype/i.test(src.slice(i, i + 9))) { const j = src.indexOf(">", i) + 1; out += wrap("doctype", src.slice(i, j)); i = j; continue; }
      if (src[i] === "<" && /[A-Za-z\/]/.test(src[i + 1] || "")) {
        const m = /^<\/?[A-Za-z][\w-]*/.exec(src.slice(i))[0];
        out += wrap("tag", m); i += m.length;
        // attributes until >
        while (i < n && src[i] !== ">") {
          const ws = /^\s+/.exec(src.slice(i));
          if (ws) { out += esc(ws[0]); i += ws[0].length; continue; }
          if (src.startsWith("/>", i)) break;
          const an = /^[^\s=>\/]+/.exec(src.slice(i));
          if (an) {
            out += wrap("attr", an[0]); i += an[0].length;
            if (src[i] === "=") {
              out += "="; i++;
              const v = /^("[^"]*"|'[^']*'|[^\s>]+)/.exec(src.slice(i));
              if (v) { out += wrap("attrval", v[0]); i += v[0].length; }
            }
            continue;
          }
          out += esc(src[i]); i++;
        }
        const close = src.startsWith("/>", i) ? "/>" : src[i] === ">" ? ">" : "";
        out += wrap("tag", close); i += close.length;
        continue;
      }
      if (src[i] === "&") { const m = /^&[#\w]+;/.exec(src.slice(i)); if (m) { out += wrap("number", m[0]); i += m[0].length; continue; } }
      out += esc(src[i]); i++;
    }
    return out;
  }

  /* ---------- CSS ---------- */
  function css(src) {
    let out = "", i = 0, depth = 0, inValue = false;
    const n = src.length;
    while (i < n) {
      const c = src[i];
      if (src.startsWith("/*", i)) { let j = src.indexOf("*/", i + 2); j = j < 0 ? n : j + 2; out += wrap("comment", src.slice(i, j)); i = j; continue; }
      if (c === '"' || c === "'") { let j = i + 1; while (j < n && src[j] !== c) j++; j++; out += wrap("string", src.slice(i, j)); i = j; continue; }
      if (c === "@") {
        const m = /^@[\w-]+/.exec(src.slice(i))[0]; out += wrap("atrule", m); i += m.length;
        // the at-rule's prelude, e.g. (max-width: 600px), up to { or ;
        const end = src.slice(i).search(/[{;]/);
        const pre = end < 0 ? src.slice(i) : src.slice(i, i + end);
        out += esc(pre).replace(/(-?\d*\.?\d+)(px|rem|em|%|vw|vh|ch|dpi)?/g, (x) => wrap("number", x)); i += pre.length;
        continue;
      }
      if (c === "{") { depth++; inValue = false; out += "{"; i++; continue; }
      if (c === "}") { depth = Math.max(0, depth - 1); inValue = false; out += "}"; i++; continue; }
      if (c === ";") { inValue = false; out += ";"; i++; continue; }
      // Inside a block: property names before ":", values after. Outside: selectors.
      const rest = src.slice(i);
      const blockStart = rest.search(/[{;}]/);
      const looksLikeDecl = depth > 0 && !inValue && /^[\w-]+\s*:/.test(rest) && (blockStart < 0 || rest[blockStart] !== "{");
      if (looksLikeDecl) {
        const m = /^[\w-]+/.exec(rest)[0];
        out += wrap("property", m); i += m.length;
        const colon = /^\s*:/.exec(src.slice(i))[0]; out += esc(colon); i += colon.length; inValue = true; continue;
      }
      if (inValue) {
        const num = /^-?\d*\.?\d+(%|[a-z]+)?/i.exec(rest);
        if (num && !/[\w-]/.test(src[i - 1] || "")) { out += wrap("number", num[0]); i += num[0].length; continue; }
        const hex = /^#[0-9a-fA-F]{3,8}\b/.exec(rest);
        if (hex) { out += wrap("number", hex[0]); i += hex[0].length; continue; }
        if (rest.startsWith("!important")) { out += wrap("keyword", "!important"); i += 10; continue; }
        const fn = /^[\w-]+(?=\()/.exec(rest);
        if (fn) { out += wrap("builtin", fn[0]); i += fn[0].length; continue; }
        const word = /^[\w-]+/.exec(rest);
        if (word) { out += wrap("value", word[0]); i += word[0].length; continue; }
        out += esc(c); i++; continue;
      }
      // selector text up to "{" (or a nested rule)
      if (blockStart >= 0 && rest[blockStart] === "{") {
        const sel = rest.slice(0, blockStart);
        out += sel.split(/(\s+|,)/).map((p) => /^\s+$|^,$/.test(p) || !p ? esc(p) : wrap("selector", p)).join("");
        i += sel.length; continue;
      }
      out += esc(c); i++;
    }
    return out;
  }

  /* ---------- SQL ---------- */
  const SQL_KEYWORDS = new Set(("select from where and or not order by group having limit offset as distinct insert into values update set " +
    "delete create table drop alter add column primary key foreign references unique check default null is in between like " +
    "join inner left right outer full cross on union all exists case when then else end begin commit rollback transaction " +
    "index view with recursive asc desc integer text real blob numeric autoincrement explain query plan over partition " +
    "conflict do nothing if replace returning cascade glob escape row rows range unbounded preceding following current true false").split(" "));
  const SQL_FUNCS = new Set(("count sum avg min max round length upper lower substr trim coalesce ifnull nullif abs typeof " +
    "rank dense_rank row_number lag lead ntile first_value last_value printf date datetime strftime julianday cast group_concat total instr replace").split(" "));
  function sql(src) {
    let out = "", i = 0;
    const n = src.length;
    while (i < n) {
      const c = src[i];
      if (src.startsWith("--", i)) { let j = src.indexOf("\n", i); if (j < 0) j = n; out += wrap("comment", src.slice(i, j)); i = j; continue; }
      if (src.startsWith("/*", i)) { let j = src.indexOf("*/", i + 2); j = j < 0 ? n : j + 2; out += wrap("comment", src.slice(i, j)); i = j; continue; }
      if (c === "'") { let j = i + 1; while (j < n && !(src[j] === "'" && src[j + 1] !== "'")) { if (src[j] === "'") j++; j++; } j++; out += wrap("string", src.slice(i, j)); i = j; continue; }
      if (c === "." && (i === 0 || src[i - 1] === "\n")) { const m = /^\.[\w]+/.exec(src.slice(i))[0]; out += wrap("builtin", m); i += m.length; continue; }
      if (/[0-9]/.test(c) && !/[\w]/.test(src[i - 1] || "")) { const m = /^\d+(\.\d+)?/.exec(src.slice(i))[0]; out += wrap("number", m); i += m.length; continue; }
      if (/[A-Za-z_]/.test(c)) {
        const m = /^[A-Za-z_]\w*/.exec(src.slice(i))[0];
        const lower = m.toLowerCase();
        const isCall = /^\s*\(/.test(src.slice(i + m.length));
        const role = SQL_FUNCS.has(lower) && isCall ? "builtin" : SQL_KEYWORDS.has(lower) ? "keyword" : null;
        out += wrap(role, m); i += m.length; continue;
      }
      out += esc(c); i++;
    }
    return out;
  }

  /* ---------- bash and git ---------- */
  const SH_KEYWORDS = new Set("if then else elif fi for while until do done case esac in function return local export select break continue readonly declare set shift trap source exit".split(" "));
  function bash(src) {
    return src.split("\n").map((line) => {
      let out = "", i = 0, cmdPos = true;
      const n = line.length;
      while (i < n) {
        const c = line[i];
        if (c === "#" && (i === 0 || /\s/.test(line[i - 1]))) { out += wrap("comment", line.slice(i)); break; }
        if (c === "'") { let j = line.indexOf("'", i + 1); j = j < 0 ? n : j + 1; out += wrap("string", line.slice(i, j)); i = j; cmdPos = false; continue; }
        if (c === '"') {
          let j = i + 1; while (j < n && line[j] !== '"') { if (line[j] === "\\") j++; j++; } j = Math.min(j + 1, n);
          out += wrap("string", line.slice(i, j)); i = j; cmdPos = false; continue;
        }
        if (c === "$") {
          const m = /^\$(\{[^}]*\}|\(\(|\(|[\w@#?*!$-]+)/.exec(line.slice(i));
          if (m) {
            if (m[1] === "(" || m[1] === "((") { out += wrap("variable", m[0]); i += m[0].length; cmdPos = m[1] === "("; continue; }
            out += wrap("variable", m[0]); i += m[0].length; cmdPos = false; continue;
          }
        }
        if (/\s/.test(c)) { out += c; i++; continue; }
        if (/[|;&()]/.test(c)) { out += esc(c); i++; cmdPos = true; continue; }
        if (c === ">" || c === "<") { const m = /^(\d?>>?|<<<?|<|&>)/.exec(line.slice(i)); const t = m ? m[0] : c; out += wrap("keyword", t); i += t.length; continue; }
        const word = /^[^\s|;&()<>"'$]+/.exec(line.slice(i));
        const w = word ? word[0] : c;
        let role = null;
        if (SH_KEYWORDS.has(w) && (cmdPos || (w === "in" && /^\s*(for|select|case)\b/.test(line)))) role = "keyword";
        else if (/^-{1,2}[\w-]/.test(w)) role = "option";
        else if (cmdPos && /^[\w.\/~-]+$/.test(w) && !/=/.test(w)) role = "command";
        else if (/^\d+$/.test(w)) role = "number";
        if (/^[A-Za-z_]\w*=/.test(w) && cmdPos) { const eq = w.indexOf("="); out += wrap("variable", w.slice(0, eq)) + "=" + esc(w.slice(eq + 1)); i += w.length; continue; }
        out += wrap(role, w); i += w.length;
        if (role === "command" && (w === "git" || w === "sudo")) { cmdPos = w === "sudo"; const sub = /^\s+([a-z][\w-]*)/.exec(line.slice(i)); if (w === "git" && sub) { out += esc(sub[0].slice(0, sub[0].length - sub[1].length)) + wrap("command", sub[1]); i += sub[0].length; } cmdPos = false; continue; }
        cmdPos = SH_KEYWORDS.has(w) && ["then", "else", "do", "elif", "if", "while", "until", "!"].includes(w);
      }
      return out;
    }).join("\n");
  }

  /* ---------- console output ---------- */
  // ANSI color codes (git prints them) become spans.
  const ANSI = { 1: "ansi-bold", 31: "ansi-red", 32: "ansi-green", 33: "ansi-yellow", 34: "ansi-blue", 35: "ansi-magenta", 36: "ansi-cyan", 90: "ansi-dim" };
  function ansi(text) {
    let out = "", open = 0;
    const parts = text.split(/\x1b\[([\d;]*)m/);
    for (let k = 0; k < parts.length; k++) {
      if (k % 2 === 0) { out += esc(parts[k]); continue; }
      const codes = parts[k].split(";").filter(Boolean).map(Number);
      if (!codes.length || codes.includes(0)) { out += "</span>".repeat(open); open = 0; }
      codes.filter((x) => ANSI[x]).forEach((x) => { out += '<span class="' + ANSI[x] + '">'; open++; });
    }
    return out + "</span>".repeat(open);
  }

  function output(text, lang) {
    if (lang === "bash" || lang === "git") {
      return text.split("\n").map((line) => {
        const m = /^(student@linux):([^$]*)\$ (.*)$/.exec(line);
        if (m) return '<span class="pr-user">' + m[1] + '</span>:<span class="pr-path">' + esc(m[2]) + '</span>$ <span class="pr-cmd">' + esc(m[3]) + "</span>";
        if (/^> /.test(line)) return '<span class="pr-cmd">' + esc(line) + "</span>";
        return ansi(line);
      }).join("\n");
    }
    if (lang === "sql") {
      // sqlite3 prints results as box tables; show them as real result grids.
      const lines = text.split("\n");
      const outParts = [];
      for (let k = 0; k < lines.length; k++) {
        if (lines[k].startsWith("┌")) {
          const rows = [];
          let j = k + 1, header = null;
          for (; j < lines.length && !lines[j].startsWith("└"); j++) {
            if (lines[j].startsWith("├")) continue;
            const cells = lines[j].split("│").slice(1, -1).map((x) => x.trim());
            if (!header) header = cells; else rows.push(cells);
          }
          const num = (v) => /^-?\d+(\.\d+)?$/.test(v);
          const numericCol = (header || []).map((_, c) => rows.length > 0 && rows.every((r) => r[c] === "NULL" || num(r[c])));
          outParts.push('</pre><div class="grid-wrap"><table class="result-grid"><thead><tr>' +
            (header || []).map((h, c) => '<th' + (numericCol[c] ? ' class="num"' : "") + ">" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
            rows.map((r) => "<tr>" + r.map((v, c) => '<td' + (numericCol[c] ? ' class="num"' : "") + ">" + (v === "NULL" ? '<span class="null">NULL</span>' : esc(v)) + "</td>").join("") + "</tr>").join("") +
            '</tbody></table><p class="grid-count">' + rows.length + (rows.length === 1 ? " row" : " rows") + '</p></div><pre tabindex="0">');
          k = j;
          continue;
        }
        outParts.push(sqlLine(lines[k]) + "\n");
      }
      return outParts.join("").replace(/\n(<\/pre>)/g, "$1");
    }
    function sqlLine(line) {
      if (/^(sqlite>| {3}\.\.\.>) /.test(line)) return '<span class="pr-sql">' + esc(line.slice(0, 8)) + '</span><span class="pr-cmd">' + esc(line.slice(8)) + "</span>";
      if (/^(Parse|Runtime) error|^Error:|\^--- error here/.test(line)) return '<span class="out-err">' + esc(line) + "</span>";
      return esc(line);
    }
    // Once a traceback or uncaught exception starts, everything after it is stderr.
    let inErr = false;
    return text.split("\n").map((line) => {
      if (/^(Traceback \(most recent call last\)|Exception in thread)/.test(line)) inErr = true;
      if (lang === "javascript" && /^(Uncaught |\S+Error: |    at |Node\.js v|node:internal)/.test(line)) inErr = true;
      if (lang === "javascript" && /^\/.*:\d+$/.test(line)) inErr = true;
      return inErr ? '<span class="out-err">' + esc(line) + "</span>" : esc(line);
    }).join("\n");
  }

  window.SBSHighlight = { python, java, javascript, html, css, sql, bash, git: bash, output, esc };
})();
