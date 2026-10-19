/* Side by Side: faceted reference app. Data comes from data.js (window.SBS_DATA). */
(function () {
  "use strict";

  const DATA = window.SBS_DATA;
  const H = window.SBSHighlight;
  const LEVELS = [
    { id: "intro", label: "Intro", blurb: "First weeks of CS1" },
    { id: "intermediate", label: "Intermediate", blurb: "Late CS1, early CS2" },
    { id: "advanced", label: "Advanced", blurb: "AP CSA, OOP, algorithms" },
    { id: "brilliant", label: "Brilliant", blurb: "Beyond AP, capstone" },
  ];
  const LANGS = {
    python: { name: "Python", file: "main.py", runHint: "To try it yourself, run it in IDLE or Thonny, where turtle can open a window." },
    java: { name: "Java", file: "Main.java", runHint: "To try it yourself, run it in IntelliJ, VS Code, or BlueJ, where Swing can open a window." },
  };
  const COLLAPSE_AT = 30;

  const concepts = DATA.concepts;
  const topics = [...new Set(concepts.map((c) => c.topic))];

  /* ---------- state <-> URL ---------- */
  const state = { lang: "both", levels: ["intro"], topics: [], q: "" };

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    const lang = p.get("lang");
    if (lang && ["python", "java", "both"].includes(lang)) state.lang = lang;
    else {
      try { const saved = localStorage.getItem("sbs-lang"); if (saved) state.lang = saved; } catch (e) { /* storage unavailable */ }
    }
    if (p.get("level")) state.levels = p.get("level").split(",").filter((l) => LEVELS.some((x) => x.id === l));
    if (!state.levels.length) state.levels = ["intro"];
    state.topics = p.get("topic") ? p.get("topic").split(",").filter((t) => topics.includes(t)) : [];
    state.q = p.get("q") || "";
  }

  function writeHash() {
    const p = new URLSearchParams();
    p.set("lang", state.lang);
    p.set("level", state.levels.join(","));
    if (state.topics.length) p.set("topic", state.topics.join(","));
    if (state.q) p.set("q", state.q);
    try { history.replaceState(null, "", "#" + p.toString()); } catch (e) { location.hash = p.toString(); }
    try { localStorage.setItem("sbs-lang", state.lang); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- filtering ---------- */
  function langsShown() {
    return state.lang === "both" ? ["python", "java"] : [state.lang];
  }

  function haystack(c) {
    const parts = [c.title, c.topic, c.contrast, c.id.replace(/-/g, " ")];
    langsShown().forEach((l) => {
      const ex = DATA.examples[l][c.id];
      if (ex) parts.push(ex.summary, ex.keywords.join(" "), ex.code, ex.notes.join(" "));
    });
    return parts.join(" ").toLowerCase();
  }
  const hayCache = {};
  function matchesQuery(c) {
    if (!state.q.trim()) return true;
    const key = c.id + "|" + state.lang;
    const hay = hayCache[key] || (hayCache[key] = haystack(c));
    return state.q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
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

  function renderFacets() {
    levelsEl.innerHTML = LEVELS.map((l, idx) => {
      const on = state.levels.includes(l.id);
      const steps = LEVELS.map((_, k) => '<i class="' + (k <= idx ? "on" : "") + '"></i>').join("");
      return '<button type="button" class="rung rung-' + l.id + '" data-level="' + l.id + '" aria-pressed="' + on + '">' +
        '<span class="steps" aria-hidden="true">' + steps + "</span>" +
        '<span class="rung-label">' + l.label + "</span>" +
        '<span class="rung-blurb">' + l.blurb + "</span></button>";
    }).join("");

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

    document.querySelectorAll('input[name="lang"]').forEach((r) => { r.checked = r.value === state.lang; });
    document.body.dataset.lang = state.lang;
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

  topicsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-topic]");
    if (!b) return;
    const t = b.dataset.topic;
    if (!t) state.topics = [];
    else state.topics = state.topics.includes(t) ? state.topics.filter((x) => x !== t) : [...state.topics, t];
    update();
  });

  document.querySelectorAll('input[name="lang"]').forEach((r) =>
    r.addEventListener("change", () => { state.lang = r.value; update(); }));

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
    python: [["keyword", "if"], ["builtin", "print"], ["string", '"text"'], ["comment", "# note"], ["definition", "def name"], ["number", "42"]],
    java: [["keyword", "public"], ["type", "String"], ["string", '"text"'], ["comment", "// note"], ["method-decl", "method()"], ["number", "42"], ["field", "this.field"]],
  };
  const KEY_NAMES = { keyword: "keyword", builtin: "built-in", string: "text", comment: "comment", definition: "name you define", number: "number", type: "class/type", "method-decl": "method you define", field: "field" };
  function renderKeys() {
    $("#color-keys").innerHTML = langsShown().map((l) =>
      '<details class="key key-' + l + '"><summary>' + LANGS[l].name + " colors</summary><dl>" +
      KEYS[l].map(([role, sample]) => {
        const shown = role === "definition" ? '<span class="tk-keyword">def</span> <span class="tk-definition">name</span>' : '<span class="tk-' + role + '">' + H.esc(sample) + "</span>";
        return "<div><dt><code>" + shown + "</code></dt><dd>" + KEY_NAMES[role] + "</dd></div>";
      }).join("") + "</dl></details>").join("");
  }

  /* ---------- concept rendering ---------- */
  const levelOf = (id) => LEVELS.findIndex((l) => l.id === id);

  function codeBlock(lang, ex, cid) {
    const html = (lang === "python" ? H.python : H.java)(ex.code);
    const lines = html.split("\n");
    const long = lines.length > COLLAPSE_AT;
    const body = lines.map((l) => '<span class="ln">' + (l || " ") + "</span>").join("");
    return '<figure class="code' + (long ? " is-collapsed" : "") + '">' +
      '<figcaption class="code-bar"><span class="code-file">' + LANGS[lang].file + '</span>' +
      '<span class="code-lines">' + lines.length + " lines</span>" +
      '<button type="button" class="btn-copy" data-copy="' + lang + ":" + cid + '">Copy code</button></figcaption>' +
      "<pre tabindex=\"0\"><code>" + body + "</code></pre>" +
      (long ? '<button type="button" class="btn-expand" aria-expanded="false">Show all ' + lines.length + " lines</button>" : "") +
      "</figure>";
  }

  function consoleBlock(lang, ex) {
    if (!ex.run) {
      const img = ex.shot ? '<img class="console-shot" src="' + ex.shot + '" alt="' + H.esc(LANGS[lang].name) + ' window this program opens" loading="lazy" />' : "";
      return '<div class="console console-gui"><div class="console-bar">Window</div>' + img +
        '<p class="console-note">' + (ex.shot ? (ex.shot_note ? H.esc(ex.shot_note) + " " : "") + "Screenshot from a real run. " : "") + LANGS[lang].runHint + "</p></div>";
    }
    const cmd = lang === "java" ? '<span class="console-cmd">$ java Main</span>\n' : '<span class="console-cmd">= RESTART: main.py</span>\n';
    return '<div class="console"><div class="console-bar">Output</div>' +
      '<pre tabindex="0">' + cmd + (ex.output ? H.output(ex.output, lang) : '<span class="console-empty">(no output)</span>') + "</pre></div>";
  }

  function pane(lang, c) {
    const ex = DATA.examples[lang][c.id];
    const head = '<header class="pane-head"><span class="pane-lang">' + LANGS[lang].name + "</span>" +
      (lang === "java" ? '<span class="pane-stereo">«' + c.level + "»</span>" : "") + "</header>";
    if (!ex) {
      return '<section class="pane pane-' + lang + '" aria-label="' + LANGS[lang].name + '">' + head +
        '<p class="pane-missing">No ' + LANGS[lang].name + " example for this concept yet.</p></section>";
    }
    const notes = ex.notes.length ? '<ul class="notes">' + ex.notes.map((n) => "<li>" + inlineCode(n) + "</li>").join("") + "</ul>" : "";
    const pit = ex.pitfall ? '<p class="pitfall"><strong>Watch out</strong> ' + inlineCode(ex.pitfall) + "</p>" : "";
    return '<section class="pane pane-' + lang + '" aria-label="' + LANGS[lang].name + '">' + head +
      '<div class="pane-body"><p class="summary">' + inlineCode(ex.summary) + "</p>" +
      codeBlock(lang, ex, c.id) + consoleBlock(lang, ex) +
      '<div class="pane-notes">' + notes + pit + "</div></div></section>";
  }

  // Turn `code` spans and obvious code tokens in prose into <code>.
  // Prose from the data names functions like print() or System.out.println(); set those in code type.
  const CODEISH = /`([^`]+)`|((?:[A-Za-z_][\w]*\.)*[A-Za-z_][\w]*\(\))|(\b[A-Z]?[a-z]+[A-Za-z]*(?:Error|Exception)\b)|(\b[a-z_]+=(?:""|\w+))|(\b(?:__\w+__|self\.\w+|this\.\w+|int\[\]|String\[\]))/g;
  function inlineCode(s) {
    return H.esc(s).replace(CODEISH, (m, tick) => "<code>" + (tick || m) + "</code>");
  }

  function conceptHTML(c) {
    const lv = levelOf(c.level);
    const steps = LEVELS.map((_, k) => '<i class="' + (k <= lv ? "on" : "") + '"></i>').join("");
    return '<article class="concept" id="c-' + c.id + '" data-level="' + c.level + '">' +
      '<header class="concept-head">' +
      '<p class="concept-meta"><span class="meta-level"><span class="steps" aria-hidden="true">' + steps + "</span>" + LEVELS[lv].label + "</span>" +
      '<span class="meta-topic">' + H.esc(c.topic) + "</span></p>" +
      '<h3 class="concept-title" tabindex="-1">' + H.esc(c.title) + "</h3></header>" +
      '<div class="panes panes-' + state.lang + '">' + langsShown().map((l) => pane(l, c)).join("") +
      (state.lang === "both" ? '<p class="contrast"><span class="contrast-label">Key difference</span> ' + inlineCode(c.contrast) + "</p>" : "") +
      "</div>" +
      (state.lang !== "both" ? '<p class="contrast contrast-solo"><span class="contrast-label">Compared with ' + LANGS[state.lang === "python" ? "java" : "python"].name + "</span> " + inlineCode(c.contrast) + "</p>" : "") +
      "</article>";
  }

  const main = $("#concepts");
  const rail = $("#rail");
  const countEl = $("#count");

  function renderConcepts() {
    const list = visible();
    const n = list.length;
    const lvNames = state.levels.map((l) => LEVELS[levelOf(l)].label).join(", ");
    countEl.textContent = n + (n === 1 ? " concept" : " concepts") + " · " + lvNames + (state.topics.length ? " · " + state.topics.join(", ") : "") + (state.q ? ' · matching "' + state.q + '"' : "");

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

  readHash();
  update();
  window.addEventListener("hashchange", () => {
    readHash(); renderFacets(); renderKeys(); renderConcepts();
  });
})();
