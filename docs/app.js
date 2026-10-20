/* Side by Side: faceted reference app.
   Each page loads data/<track>.js (window.SBS_DATA) and data/index.js (window.SBS_INDEX, every page's concepts for search). */
(function () {
  "use strict";

  const DATA = window.SBS_DATA;
  const INDEX = window.SBS_INDEX || [];
  const H = window.SBSHighlight;
  const TRACK = DATA.track;
  const LEVELS = [
    { id: "intro", label: "Intro", blurb: "First weeks of CS1" },
    { id: "intermediate", label: "Intermediate", blurb: "Late CS1, early CS2" },
    { id: "advanced", label: "Advanced", blurb: "AP CSA, OOP, algorithms" },
    { id: "brilliant", label: "Brilliant", blurb: "Beyond AP, capstone" },
  ];
  const PAGES = { code: "Python · Java · JavaScript", web: "HTML + CSS", sql: "SQL", shell: "Command line", git: "Git" };
  const LANGS = {
    python: { name: "Python", file: () => "main.py", out: "Output", cmd: "= RESTART: main.py",
      runHint: "To try it yourself, run it in IDLE or Thonny, where turtle can open a window." },
    java: { name: "Java", file: () => "Main.java", out: "Output", cmd: "$ java Main",
      runHint: "To try it yourself, run it in IntelliJ, VS Code, or BlueJ, where Swing can open a window." },
    javascript: { name: "JavaScript", file: () => "main.js", out: "Console", cmd: "$ node main.js",
      runHint: "This script draws on a page with a canvas. To try it, add it to a page with <canvas id=\"screen\" width=\"400\" height=\"300\"> and open the page in a browser." },
    html: { name: "HTML", file: () => "index.html" },
    css: { name: "CSS", file: () => "style.css" },
    sql: { name: "SQL", file: () => "query.sql", out: "sqlite3 session", cmd: "$ sqlite3 school.db" },
    bash: { name: "Bash", file: (ex) => ex.mode === "script" ? (ex.filename || "script.sh") : "Typed at the prompt", out: "Terminal" },
    git: { name: "Git", file: () => "Typed at the prompt", out: "Terminal" },
  };
  const COLLAPSE_AT = 30;
  const multi = TRACK.langs.length > 1;

  const concepts = DATA.concepts;
  const topics = [...new Set(concepts.map((c) => c.topic))];

  /* ---------- state <-> URL ---------- */
  const state = { langs: TRACK.default_langs.slice(), levels: ["intro"], topics: [], q: "" };
  const storeKey = "sbs-langs-" + TRACK.id;

  function cleanLangs(list) {
    const ok = TRACK.langs.filter((l) => list.includes(l));
    return ok.length ? ok : TRACK.default_langs.slice();
  }

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    let lang = p.get("lang");
    if (lang === "both") lang = "python,java";
    if (lang) state.langs = cleanLangs(lang.split(","));
    else {
      try { const saved = localStorage.getItem(storeKey); if (saved) state.langs = cleanLangs(saved.split(",")); } catch (e) { /* storage unavailable */ }
    }
    state.levels = p.get("level") ? p.get("level").split(",").filter((l) => LEVELS.some((x) => x.id === l)) : ["intro"];
    if (!state.levels.length) state.levels = ["intro"];
    state.topics = p.get("topic") ? p.get("topic").split(",").filter((t) => topics.includes(t)) : [];
    state.q = p.get("q") || "";
  }

  function writeHash() {
    const p = new URLSearchParams();
    if (multi) p.set("lang", state.langs.join(","));
    p.set("level", state.levels.join(","));
    if (state.topics.length) p.set("topic", state.topics.join(","));
    if (state.q) p.set("q", state.q);
    try { history.replaceState(null, "", "#" + p.toString()); } catch (e) { location.hash = p.toString(); }
    try { localStorage.setItem(storeKey, state.langs.join(",")); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- filtering ---------- */
  function haystack(c) {
    const parts = [c.title, c.topic, c.contrast || "", c.js_contrast || "", c.id.replace(/-/g, " ")];
    state.langs.forEach((l) => {
      const ex = DATA.examples[l][c.id];
      if (ex) parts.push(ex.summary, ex.keywords.join(" "), ex.code, ex.notes.join(" "));
    });
    return parts.join(" ").toLowerCase();
  }
  const hayCache = {};
  const words = () => state.q.toLowerCase().split(/\s+/).filter(Boolean);
  function matchesQuery(c) {
    if (!state.q.trim()) return true;
    const key = c.id + "|" + state.langs.join(",");
    const hay = hayCache[key] || (hayCache[key] = haystack(c));
    return words().every((w) => hay.includes(w));
  }

  function visible() {
    return concepts.filter((c) =>
      state.levels.includes(c.level) &&
      (state.topics.length === 0 || state.topics.includes(c.topic)) &&
      matchesQuery(c));
  }

  /* ---------- facet controls ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const levelsEl = $("#levels");
  const topicsEl = $("#topics");
  const searchEl = $("#q");
  const langEl = $("#langs");

  function renderFacets() {
    levelsEl.innerHTML = LEVELS.map((l, idx) => {
      const on = state.levels.includes(l.id);
      const steps = LEVELS.map((_, k) => '<i class="' + (k <= idx ? "on" : "") + '"></i>').join("");
      return '<button type="button" class="rung rung-' + l.id + '" data-level="' + l.id + '" aria-pressed="' + on + '">' +
        '<span class="steps" aria-hidden="true">' + steps + "</span>" +
        '<span class="rung-label">' + l.label + "</span>" +
        '<span class="rung-blurb">' + l.blurb + "</span></button>";
    }).join("");

    if (langEl) {
      langEl.innerHTML = TRACK.langs.map((l) =>
        '<button type="button" class="lang-btn lang-' + l + '" data-lang="' + l + '" aria-pressed="' + state.langs.includes(l) + '">' +
        '<span class="lang-check" aria-hidden="true"></span>' + LANGS[l].name + "</button>").join("");
    }

    // The sidebar is the only topic filter: each topic toggles, and lists the concepts it contains.
    const pool = concepts.filter((c) => state.levels.includes(c.level) && matchesQuery(c));
    const shown = new Set(visible().map((c) => c.id));
    topicsEl.innerHTML =
      '<button type="button" class="topic-all" data-topic="" aria-pressed="' + (state.topics.length === 0) + '">All topics <span class="topic-n">' + pool.length + "</span></button>" +
      topics.map((t) => {
        const inTopic = pool.filter((c) => c.topic === t);
        const on = state.topics.includes(t);
        const links = inTopic.filter((c) => shown.has(c.id));
        return '<section class="topic' + (inTopic.length ? "" : " topic-empty") + '">' +
          '<button type="button" class="topic-btn" data-topic="' + H.esc(t) + '" aria-pressed="' + on + '"' + (inTopic.length ? "" : " disabled") + ">" +
          H.esc(t) + ' <span class="topic-n">' + inTopic.length + "</span></button>" +
          (links.length ? "<ol>" + links.map((c) => '<li><a href="#c-' + c.id + '" data-rail="' + c.id + '">' + H.esc(c.title) + "</a></li>").join("") + "</ol>" : "") +
          "</section>";
      }).join("");

    document.body.dataset.langs = state.langs.join(" ");
    document.body.dataset.count = String(state.langs.length);
    if (searchEl.value !== state.q) searchEl.value = state.q;
  }

  levelsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-level]");
    if (!b) return;
    const id = b.dataset.level;
    // Toggle membership, keep ladder order, never leave zero levels selected.
    if (state.levels.includes(id)) {
      if (state.levels.length > 1) state.levels = state.levels.filter((x) => x !== id);
    } else {
      state.levels = LEVELS.map((x) => x.id).filter((x) => x === id || state.levels.includes(x));
    }
    update();
  });

  if (langEl) langEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (!b) return;
    const id = b.dataset.lang;
    // Toggle a language; at least one stays on.
    if (state.langs.includes(id)) {
      if (state.langs.length > 1) state.langs = state.langs.filter((x) => x !== id);
    } else {
      state.langs = TRACK.langs.filter((x) => x === id || state.langs.includes(x));
    }
    update();
  });

  topicsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-topic]");
    if (!b) return;
    const t = b.dataset.topic;
    if (!t) state.topics = [];
    else state.topics = state.topics.includes(t) ? state.topics.filter((x) => x !== t) : [...state.topics, t];
    update();
  });

  let qTimer;
  searchEl.addEventListener("input", () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.q = searchEl.value; update(); }, 120);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchEl && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault();
      searchEl.focus();
    }
  });

  /* ---------- color key ---------- */
  const KEYS = {
    python: [["keyword", "if"], ["builtin", "print"], ["string", '"text"'], ["comment", "# note"], ["definition", "name you define", "def name"], ["number", "42"]],
    java: [["keyword", "public"], ["type", "String"], ["string", '"text"'], ["comment", "// note"], ["method-decl", "method()"], ["number", "42"], ["field", "this.field"]],
    javascript: [["keyword", "const"], ["builtin", "console"], ["string", '"text"'], ["comment", "// note"], ["definition", "name you define", "greet"], ["number", "42"]],
    html: [["tag", "<p>"], ["attr", "class"], ["attrval", '"intro"'], ["comment", "<!-- note -->"], ["doctype", "<!DOCTYPE html>"]],
    css: [["selector", ".card"], ["property", "color"], ["number", "16px"], ["value", "bold"], ["builtin", "var()"], ["atrule", "@media"], ["comment", "/* note */"]],
    sql: [["keyword", "SELECT"], ["builtin", "COUNT()"], ["string", "'text'"], ["number", "42"], ["comment", "-- note"]],
    bash: [["command", "ls"], ["option", "-l"], ["keyword", "if"], ["variable", "$name"], ["string", '"text"'], ["comment", "# note"]],
    git: [["command", "git commit"], ["option", "-m"], ["string", '"message"'], ["comment", "# note"]],
  };
  const KEY_NAMES = { keyword: "keyword", builtin: "built-in", string: "text", comment: "comment", definition: "name you define", number: "number",
    type: "class/type", "method-decl": "method you define", field: "field", tag: "tag", attr: "attribute", attrval: "attribute value", doctype: "doctype",
    selector: "selector", property: "property", value: "keyword value", atrule: "at-rule", command: "command", option: "option", variable: "variable" };
  function renderKeys() {
    $("#color-keys").innerHTML = state.langs.map((l) =>
      '<details class="key key-' + l + ' syn-' + l + '"><summary>' + LANGS[l].name + " colors</summary><dl>" +
      KEYS[l].map(([role, sample, code]) => {
        const shown = code ? (l === "python" ? '<span class="tk-keyword">def</span> <span class="tk-definition">name</span>' : '<span class="tk-definition">' + H.esc(code) + "</span>")
          : '<span class="tk-' + role + '">' + H.esc(sample) + "</span>";
        return "<div><dt><code>" + shown + "</code></dt><dd>" + KEY_NAMES[role] + "</dd></div>";
      }).join("") + "</dl></details>").join("");
  }

  /* ---------- concept rendering ---------- */
  const levelOf = (id) => LEVELS.findIndex((l) => l.id === id);

  // Split highlighted HTML into lines. A token that spans lines (a docstring or Javadoc)
  // is closed at each line break and reopened on the next line, so every line is valid HTML.
  function splitLines(html) {
    const out = [];
    let cur = "";
    const open = [];
    const re = /(<span class="[^"]*">)|(<\/span>)|(\n)|([^<\n]+)/g;
    let m;
    while ((m = re.exec(html))) {
      if (m[1]) { open.push(m[1]); cur += m[1]; }
      else if (m[2]) { open.pop(); cur += m[2]; }
      else if (m[3]) { cur += "</span>".repeat(open.length); out.push(cur); cur = open.join(""); }
      else cur += m[4];
    }
    out.push(cur);
    return out;
  }

  function codeBlock(lang, ex, cid) {
    const lines = splitLines(H[lang](ex.code));
    const long = lines.length > COLLAPSE_AT;
    const body = lines.map((l) => '<span class="ln">' + (l.replace(/<[^>]+>/g, "") ? l : l + " ") + "</span>").join("");
    return '<figure class="code' + (long ? " is-collapsed" : "") + '">' +
      '<figcaption class="code-bar"><span class="code-file">' + H.esc(LANGS[lang].file(ex)) + '</span>' +
      '<span class="code-lines">' + lines.length + " lines</span>" +
      '<button type="button" class="btn-copy" data-copy="' + lang + ":" + cid + '">Copy code</button></figcaption>' +
      "<pre tabindex=\"0\"><code>" + body + "</code></pre>" +
      (long ? '<button type="button" class="btn-expand" aria-expanded="false">Show all ' + lines.length + " lines</button>" : "") +
      "</figure>";
  }

  function consoleBlock(lang, ex) {
    if (lang === "html" || lang === "css") return "";
    if (!ex.run) {
      const img = ex.shot ? '<img class="console-shot" src="' + ex.shot + '" alt="' + H.esc(LANGS[lang].name) + ' window this program opens" loading="lazy" />' : "";
      return '<div class="console console-gui"><div class="console-bar">Window</div>' + img +
        '<p class="console-note">' + (ex.shot ? (ex.shot_note ? H.esc(ex.shot_note) + " " : "") + "Screenshot from a real run. " : "") + H.esc(LANGS[lang].runHint || "") + "</p></div>";
    }
    const cmd = LANGS[lang].cmd ? '<span class="console-cmd">' + H.esc(LANGS[lang].cmd) + "</span>\n" : "";
    return '<div class="console"><div class="console-bar">' + LANGS[lang].out + "</div>" +
      '<pre tabindex="0">' + cmd + (ex.output ? H.output(ex.output, lang) : '<span class="console-empty">(no output)</span>') + "</pre></div>";
  }

  function pane(lang, c) {
    const ex = DATA.examples[lang][c.id];
    const head = '<header class="pane-head"><span class="pane-lang">' + LANGS[lang].name + "</span>" +
      (lang === "java" ? '<span class="pane-stereo">«' + c.level + "»</span>" : "") + "</header>";
    if (!ex) {
      return '<section class="pane pane-' + lang + " syn-" + lang + '" aria-label="' + LANGS[lang].name + '">' + head +
        '<p class="pane-missing">No ' + LANGS[lang].name + " example for this concept yet.</p></section>";
    }
    const notes = ex.notes.length ? '<ul class="notes">' + ex.notes.map((n) => "<li>" + inlineCode(n) + "</li>").join("") + "</ul>" : "";
    const pit = ex.pitfall ? '<p class="pitfall"><strong>Watch out</strong> ' + inlineCode(ex.pitfall) + "</p>" : "";
    const setup = ex.setup_note ? '<p class="setup-note"><strong>Starting point</strong> ' + inlineCode(ex.setup_note) + "</p>" : "";
    return '<section class="pane pane-' + lang + " syn-" + lang + '" aria-label="' + LANGS[lang].name + '">' + head +
      '<div class="pane-body"><p class="summary">' + inlineCode(ex.summary) + "</p>" + setup +
      codeBlock(lang, ex, c.id) + consoleBlock(lang, ex) +
      '<div class="pane-notes">' + notes + pit + "</div></div></section>";
  }

  // The live preview for HTML + CSS: both files combined in a sandboxed frame (no scripts run).
  function previewBlock(c) {
    const h = DATA.examples.html && DATA.examples.html[c.id];
    if (!h) return "";
    const s = DATA.examples.css && DATA.examples.css[c.id];
    let doc = h.code;
    if (s) doc = doc.replace(/<link[^>]*href="style\.css"[^>]*>/, "<style>\n" + s.code + "\n</style>");
    const height = h.preview_height || 220;
    return '<figure class="preview">' +
      '<figcaption class="preview-bar"><span class="preview-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
      '<span class="preview-url">index.html</span><span class="preview-label">Live preview</span></figcaption>' +
      '<iframe class="preview-frame" title="Live preview: ' + H.esc(c.title) + '" sandbox="" loading="lazy" style="height:' + height + 'px" srcdoc="' +
      doc.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"></iframe></figure>';
  }

  // Turn `code` spans and obvious code tokens in prose into <code>.
  const CODEISH = /`([^`]+)`|((?:[A-Za-z_][\w]*\.)*[A-Za-z_][\w]*\(\))|(\b[A-Z]?[a-z]+[A-Za-z]*(?:Error|Exception)\b)|(\b[a-z_]+=(?:""|\w+))|(\b(?:__\w+__|self\.\w+|this\.\w+|int\[\]|String\[\]))|(&lt;\/?[a-z][\w-]*(?:\s[^&]*)?&gt;)/g;
  function inlineCode(s) {
    // Backticks mark code, except around a JavaScript template literal, where they are part of the code.
    return H.esc(s).replace(CODEISH, (m, tick) => "<code>" + (tick ? (tick.includes("${") ? "`" + tick + "`" : tick) : m) + "</code>");
  }

  function contrastHTML(c) {
    if (TRACK.id !== "code") return "";
    const L = state.langs;
    const items = [];
    if (L.length === 1) {
      if (L[0] === "javascript") { if (c.js_contrast) items.push(["Compared with Python and Java", c.js_contrast]); }
      else items.push(["Compared with " + (L[0] === "python" ? "Java" : "Python"), c.contrast]);
    } else {
      if (L.includes("python") && L.includes("java")) items.push(["Python vs Java", c.contrast]);
      if (L.includes("javascript") && c.js_contrast) items.push(["JavaScript", c.js_contrast]);
    }
    if (!items.length) return "";
    return '<div class="contrast' + (L.length === 1 ? " contrast-solo" : "") + '">' +
      items.map(([label, text]) => '<p><span class="contrast-label">' + label + "</span> " + inlineCode(text) + "</p>").join("") + "</div>";
  }

  function conceptHTML(c) {
    const lv = levelOf(c.level);
    const steps = LEVELS.map((_, k) => '<i class="' + (k <= lv ? "on" : "") + '"></i>').join("");
    const n = state.langs.length;
    return '<article class="concept" id="c-' + c.id + '" data-level="' + c.level + '">' +
      '<header class="concept-head">' +
      '<p class="concept-meta"><span class="meta-level"><span class="steps" aria-hidden="true">' + steps + "</span>" + LEVELS[lv].label + "</span>" +
      '<span class="meta-topic">' + H.esc(c.topic) + "</span></p>" +
      '<h3 class="concept-title" tabindex="-1">' + H.esc(c.title) + "</h3></header>" +
      '<div class="panes panes-' + n + (n > 1 ? " panes-multi" : " panes-solo") + '">' + state.langs.map((l) => pane(l, c)).join("") + "</div>" +
      (TRACK.id === "web" ? previewBlock(c) : "") +
      contrastHTML(c) +
      "</article>";
  }

  const main = $("#concepts");
  const rail = $("#rail");
  const countEl = $("#count");
  const elsewhereEl = $("#elsewhere");

  // Search also counts matches on the other pages, so a student can jump to them.
  function renderElsewhere() {
    if (!elsewhereEl) return;
    if (!state.q.trim()) { elsewhereEl.innerHTML = ""; return; }
    const w = words();
    const counts = {};
    INDEX.forEach((e) => {
      if (e.t === TRACK.id) return;
      const hay = (e.title + " " + e.kw).toLowerCase();
      if (w.every((x) => hay.includes(x))) counts[e.p] = (counts[e.p] || 0) + 1;
    });
    const pages = Object.entries(counts);
    const nameOf = (p) => { const e = INDEX.find((x) => x.p === p); return PAGES[e.t]; };
    elsewhereEl.innerHTML = pages.length ? "Also on " + pages.map(([p, k]) =>
      '<a href="' + p + "#level=intro,intermediate,advanced,brilliant&q=" + encodeURIComponent(state.q) + '">' + H.esc(nameOf(p)) + " (" + k + ")</a>").join(", ") : "";
  }

  function renderConcepts() {
    const list = visible();
    const n = list.length;
    const lvNames = state.levels.map((l) => LEVELS[levelOf(l)].label).join(", ");
    countEl.textContent = n + (n === 1 ? " concept" : " concepts") + " · " + lvNames + (state.topics.length ? " · " + state.topics.join(", ") : "") + (state.q ? ' · matching "' + state.q + '"' : "");
    renderElsewhere();

    if (!n) {
      const others = concepts.filter((c) => !state.levels.includes(c.level) && (state.topics.length === 0 || state.topics.includes(c.topic)) && matchesQuery(c)).length;
      main.innerHTML = '<div class="empty"><p class="empty-title">Nothing matches at the selected levels.</p>' +
        "<p>" + (others ? others + " concept" + (others === 1 ? "" : "s") + " match at other levels." : "Try a shorter search or a different topic.") + "</p>" +
        '<div class="empty-actions">' +
        (others ? '<button type="button" class="btn" data-act="all-levels">Show all levels</button>' : "") +
        '<button type="button" class="btn btn-quiet" data-act="clear">Clear filters</button></div></div>';
      return;
    }

    let html = "";
    if (TRACK.id === "sql" && DATA.seed) {
      html += '<details class="seed syn-sql"><summary>Sample database: students, courses, enrollments</summary>' +
        "<p>Every query on this page runs against this database. Examples that change data start from a fresh copy.</p>" +
        '<figure class="code"><figcaption class="code-bar"><span class="code-file">school.sql</span></figcaption><pre tabindex="0"><code>' +
        splitLines(H.sql(DATA.seed.trimEnd())).map((l) => '<span class="ln">' + (l.replace(/<[^>]+>/g, "") ? l : l + " ") + "</span>").join("") +
        "</code></pre></figure></details>";
    }
    LEVELS.forEach((l) => {
      const group = list.filter((c) => c.level === l.id);
      if (!group.length) return;
      if (state.levels.length > 1) html += '<h2 class="level-head" id="lv-' + l.id + '">' + l.label + ' <span>' + l.blurb + "</span></h2>";
      else html += '<h2 class="visually-hidden">' + l.label + "</h2>";
      html += group.map(conceptHTML).join("");
    });
    main.innerHTML = html;
    observeRail();
  }

  main.addEventListener("click", (e) => {
    const copy = e.target.closest(".btn-copy");
    if (copy) {
      const [lang, id] = copy.dataset.copy.split(":");
      copyText(DATA.examples[lang][id].code).then((ok) => {
        copy.textContent = ok ? "Copied" : "Select and copy";
        setTimeout(() => { copy.textContent = "Copy code"; }, 1600);
      });
      return;
    }
    const exp = e.target.closest(".btn-expand");
    if (exp) {
      const fig = exp.closest(".code");
      const open = fig.classList.toggle("is-collapsed") === false;
      exp.setAttribute("aria-expanded", String(open));
      const n = fig.querySelectorAll(".ln").length;
      exp.textContent = open ? "Show fewer lines" : "Show all " + n + " lines";
      return;
    }
    const act = e.target.closest("[data-act]");
    if (act) {
      if (act.dataset.act === "all-levels") state.levels = LEVELS.map((l) => l.id);
      if (act.dataset.act === "clear") { state.levels = ["intro"]; state.topics = []; state.q = ""; }
      update();
    }
  });

  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(t).then(() => true, () => fallbackCopy(t));
    }
    return Promise.resolve(fallbackCopy(t));
  }
  function fallbackCopy(t) {
    const ta = document.createElement("textarea");
    ta.value = t; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  /* ---------- rail tracking ---------- */
  let io;
  function observeRail() {
    if (io) io.disconnect();
    if (!("IntersectionObserver" in window)) return;
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id.slice(2);
        rail.querySelectorAll("a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.rail === id));
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    main.querySelectorAll(".concept").forEach((el) => io.observe(el));
  }

  rail.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-rail]");
    if (!a) return;
    e.preventDefault();
    const el = document.getElementById("c-" + a.dataset.rail);
    if (el) { el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); el.querySelector(".concept-title").focus({ preventScroll: true }); }
  });

  /* ---------- go ---------- */
  function update() {
    writeHash();
    renderFacets();
    renderKeys();
    renderConcepts();
  }

  // Topics start open beside the content on wide screens and folded on phones.
  const railBox = document.getElementById("rail-box");
  if (railBox && !matchMedia("(min-width: 981px)").matches) railBox.open = false;

  readHash();
  update();
  window.addEventListener("hashchange", () => {
    if (/^#c-/.test(location.hash)) return;
    readHash(); renderFacets(); renderKeys(); renderConcepts();
  });
})();
