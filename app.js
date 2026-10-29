(() => {
"use strict";

/* ---------- Daten aufbereiten ---------- */
const DECKS = {
  fisi1: { name: "Konzeption & Administration von IT-Systemen", short: "Teil 1 · IT-Systeme", color: "var(--d1)" },
  fisi2: { name: "Analyse & Entwicklung von Netzwerken", short: "Teil 2 · Netzwerke", color: "var(--d2)" },
  wiso:  { name: "Wirtschafts- und Sozialkunde", short: "WiSo", color: "var(--d3)" },
};
// Aktualität: je neuer die Prüfung, desto höher
const RECENCY = { S26: 11, W25: 10, S25: 9, W24: 8, S24: 7, W23: 6, S23: 5, W22: 4, S22: 3, W21: 2, Basis: 4 };
const HOT = new Set(["W25", "S26"]);

function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }

const CARDS = (window.CARDS || []).map(([deck, topic, src, q, a]) => {
  const srcs = src.split(",").map(s => s.trim()).filter(Boolean);
  const rec = Math.max(...srcs.map(s => RECENCY[s] || 1));
  return { id: deck + "-" + hash(q), deck, topic, srcs, q, a, rec,
    recent: srcs.some(s => ["S24", "W24", "S25", "W25", "S26"].includes(s)) };
});
const byId = Object.fromEntries(CARDS.map(c => [c.id, c]));

/* ---------- Speicher ---------- */
const KEY = "fisi-ap2-v1";
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(KEY + ":" + k)); return v ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(KEY + ":" + k, JSON.stringify(v)); } catch {} },
};
let progress = store.get("progress", {}); // id -> {box, due, seen, lapses}
let prefs = store.get("prefs", { decks: ["fisi1", "fisi2", "wiso"], recent: false, topicsOff: [] });
const saveP = () => store.set("progress", progress);
const saveF = () => store.set("prefs", prefs);

/* ---------- Spaced Repetition (Leitner) ---------- */
const DAY = 864e5;
const INTERVALS = [0, 1, 3, 7, 16, 35, 80]; // Tage je Box
const MASTER_BOX = 4;
const now = () => Date.now();
const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
function nextBox(box, r) {
  if (r === 1) return 0;
  if (r === 2) return Math.max(1, box);
  if (r === 3) return Math.min(Math.max(box + 1, 2), INTERVALS.length - 1);
  return Math.min(Math.max(box + 2, 3), INTERVALS.length - 1);
}
function fmtInt(days) { return days < 1 ? "heute" : days === 1 ? "1 Tag" : days < 30 ? days + " Tage" : Math.round(days / 30) + " Mon."; }
const isDue = p => p && p.due <= startOfDay(now()) + DAY - 1;

/* ---------- Auswahl ---------- */
function topicsFor(decks) {
  const m = new Map();
  CARDS.filter(c => decks.includes(c.deck)).forEach(c => m.set(c.deck + "|" + c.topic, (m.get(c.deck + "|" + c.topic) || 0) + 1));
  return [...m.entries()];
}
function selection() {
  return CARDS.filter(c => prefs.decks.includes(c.deck)
    && !prefs.topicsOff.includes(c.deck + "|" + c.topic)
    && (!prefs.recent || c.recent || c.srcs.some(s => HOT.has(s))));
}

/* ---------- DOM-Helfer ---------- */
const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => s.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
function srcBadges(c) { return c.srcs.map(s => `<span class="src${HOT.has(s) ? " hot" : ""}" title="${HOT.has(s) ? "Neues Thema (Erfahrungsberichte)" : s === "Basis" ? "Grundlagenwissen" : "Thema kam in dieser Prüfung vor"}">${HOT.has(s) ? "NEU " + s : s}</span>`).join(""); }

/* ---------- Ansichten ---------- */
let current = "home";
function show(view) {
  current = view;
  document.querySelectorAll(".view").forEach(v => v.hidden = v.id !== "view-" + view);
  document.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("on", b.dataset.view === view));
  if (view === "home") renderHome();
  if (view === "browse") renderBrowse();
  if (view === "stats") renderStats();
  window.scrollTo(0, 0);
}

function deckCounts(deck) {
  const cs = CARDS.filter(c => c.deck === deck);
  let n = 0, l = 0, m = 0, due = 0;
  cs.forEach(c => { const p = progress[c.id]; if (!p) n++; else { if (p.box >= MASTER_BOX) m++; else l++; if (isDue(p)) due++; } });
  return { total: cs.length, n, l, m, due };
}

function renderHome() {
  $("#cardCount").textContent = CARDS.length;
  let due = 0, nw = 0, ms = 0;
  CARDS.forEach(c => { const p = progress[c.id]; if (!p) nw++; else { if (isDue(p)) due++; if (p.box >= MASTER_BOX) ms++; } });
  $("#dueCount").textContent = due; $("#newCount").textContent = nw; $("#masteredCount").textContent = ms;

  const box = $("#decks"); box.innerHTML = "";
  Object.entries(DECKS).forEach(([k, d]) => {
    const s = deckCounts(k); const on = prefs.decks.includes(k);
    const b = el("button", "deck" + (on ? " on" : ""));
    b.setAttribute("aria-pressed", on);
    b.innerHTML = `<span class="dot" style="background:${d.color}"></span>
      <span class="t"><b>${d.name}</b><small>${s.total} Karten · ${s.due} fällig · ${s.m} gefestigt</small>
      <span class="bar"><i style="width:${s.m / s.total * 100}%;background:var(--good)"></i><i style="width:${s.l / s.total * 100}%;background:var(--hard)"></i></span></span>
      <span class="check">✓</span>`;
    b.onclick = () => { prefs.decks = on ? prefs.decks.filter(x => x !== k) : [...prefs.decks, k]; saveF(); renderHome(); };
    box.appendChild(b);
  });

  $("#optRecent").checked = prefs.recent;
  const tb = $("#topics"); tb.innerHTML = "";
  topicsFor(prefs.decks).forEach(([key, n]) => {
    const on = !prefs.topicsOff.includes(key);
    const ch = el("button", "chip" + (on ? " on" : ""), `${esc(key.split("|")[1])}<small>${n}</small>`);
    ch.onclick = () => { prefs.topicsOff = on ? [...prefs.topicsOff, key] : prefs.topicsOff.filter(x => x !== key); saveF(); renderHome(); };
    tb.appendChild(ch);
  });
  const sel = selection().length;
  $("#startLearn").disabled = $("#startExam").disabled = sel === 0;
}

/* ---------- Lernsitzung ---------- */
let queue = [], pos = 0, sessionTotal = 0, mode = "learn", revealed = false, doneCount = 0;

function buildLearnQueue(limitNew = 20) {
  const sel = selection();
  const due = sel.filter(c => progress[c.id] && isDue(progress[c.id]))
    .sort((a, b) => progress[a.id].due - progress[b.id].due || b.rec - a.rec);
  const fresh = sel.filter(c => !progress[c.id])
    .sort((a, b) => b.rec - a.rec || Math.random() - .5)
    .slice(0, limitNew);
  // neue Karten zwischen fällige mischen
  const out = []; let i = 0, j = 0;
  while (i < due.length || j < fresh.length) {
    if (i < due.length) out.push(due[i++]);
    if (i < due.length) out.push(due[i++]);
    if (j < fresh.length) out.push(fresh[j++]);
  }
  return out;
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function startSession(m) {
  mode = m;
  if (m === "learn") queue = buildLearnQueue();
  else {
    // Prüfungsmodus: zufällig, aber neuere Themen etwas wahrscheinlicher
    const sel = selection().map(c => ({ c, k: Math.random() * (1 + c.rec / 6) }));
    queue = sel.sort((a, b) => b.k - a.k).slice(0, 20).map(x => x.c);
  }
  pos = 0; doneCount = 0; sessionTotal = queue.length;
  show("study");
  $("#doneBox").hidden = true; $("#card").hidden = false;
  if (!queue.length) return finish(true);
  renderCard();
}

function renderCard() {
  const c = queue[pos]; revealed = false;
  $("#cDeck").textContent = DECKS[c.deck].short;
  $("#cDeck").style.background = `color-mix(in srgb, ${DECKS[c.deck].color} 22%, transparent)`;
  $("#cTopic").textContent = c.topic;
  $("#cSrc").innerHTML = srcBadges(c);
  $("#cQ").innerHTML = c.q;
  $("#cA").innerHTML = c.a; $("#cA").hidden = true;
  $("#revealBtn").hidden = false; $("#rateBar").hidden = true;
  const p = progress[c.id] || { box: 0 };
  [2, 3, 4].forEach(r => $("#i" + r).textContent = fmtInt(INTERVALS[nextBox(p.box, r)]));
  $("#progFill").style.width = (doneCount / Math.max(sessionTotal, 1) * 100) + "%";
  $("#progText").textContent = `${doneCount} / ${sessionTotal}`;
  $("#card").focus({ preventScroll: true });
}
function reveal() {
  if (revealed) return; revealed = true;
  $("#cA").hidden = false; $("#revealBtn").hidden = true; $("#rateBar").hidden = false;
}
function rate(r) {
  if (!revealed) return;
  const c = queue[pos];
  const p = progress[c.id] || { box: 0, seen: 0, lapses: 0 };
  p.box = nextBox(p.box, r); p.seen = (p.seen || 0) + 1; if (r === 1) p.lapses = (p.lapses || 0) + 1;
  p.due = startOfDay(now()) + INTERVALS[p.box] * DAY; p.last = now();
  progress[c.id] = p; saveP();
  if (r === 1) { // später in dieser Sitzung wiederholen
    const at = Math.min(pos + 4, queue.length);
    queue.splice(at, 0, c);
  } else doneCount++;
  pos++;
  if (pos >= queue.length) return finish();
  renderCard();
}
function finish(empty) {
  $("#card").hidden = true; $("#rateBar").hidden = true; $("#doneBox").hidden = false;
  $("#progFill").style.width = "100%"; $("#progText").textContent = `${doneCount} / ${sessionTotal}`;
  $("#doneText").textContent = empty
    ? "Für deine Auswahl ist gerade nichts fällig. Wähle weitere Bereiche/Themen oder nutze den Prüfungsmodus."
    : `${doneCount} Karten bearbeitet. Weiter so!`;
}

/* ---------- Alle Karten ---------- */
function renderBrowse() {
  const sel = $("#browseDeck");
  if (sel.options.length === 1) Object.entries(DECKS).forEach(([k, d]) => sel.add(new Option(d.short, k)));
  const term = $("#search").value.trim().toLowerCase();
  const strip = s => s.replace(/<[^>]+>/g, " ").toLowerCase();
  const list = CARDS.filter(c => (!sel.value || c.deck === sel.value)
    && (!term || strip(c.q + " " + c.a + " " + c.topic).includes(term)));
  $("#browseCount").textContent = `${list.length} Karten`;
  const box = $("#list"); box.innerHTML = "";
  const frag = document.createDocumentFragment();
  list.forEach(c => {
    const p = progress[c.id];
    const col = !p ? "var(--line)" : p.box >= MASTER_BOX ? "var(--good)" : "var(--hard)";
    const d = el("details", "item");
    d.innerHTML = `<summary><span class="lvl" style="background:${col}"></span><span class="qq">${c.q}<span class="tt">${DECKS[c.deck].short} · ${esc(c.topic)} · ${c.srcs.map(s => HOT.has(s) ? "NEU " + s : s).join(", ")}</span></span></summary><div class="a">${c.a}</div>`;
    frag.appendChild(d);
  });
  box.appendChild(frag);
}

/* ---------- Statistik ---------- */
function renderStats() {
  const box = $("#statsBox"); box.innerHTML = "";
  const g = el("div", "statgrid");
  Object.entries(DECKS).forEach(([k, d]) => {
    const s = deckCounts(k);
    const st = el("div", "stat");
    st.innerHTML = `<h3>${d.short}</h3><div class="bar"><i style="width:${s.m / s.total * 100}%;background:var(--good)"></i><i style="width:${s.l / s.total * 100}%;background:var(--hard)"></i></div>
      <small class="muted">${s.m} gefestigt · ${s.l} in Arbeit · ${s.n} neu · ${s.due} fällig</small>`;
    g.appendChild(st);
  });
  box.appendChild(g);
  box.appendChild(el("div", "legend", `<span style="--c:var(--good)">gefestigt (≥ 16 Tage Intervall)</span><span style="--c:var(--hard)">in Arbeit</span><span style="--c:var(--surface2)">neu</span>`));

  // schwächste Themen
  const t = new Map();
  CARDS.forEach(c => {
    const key = DECKS[c.deck].short + " · " + c.topic;
    const o = t.get(key) || { n: 0, sum: 0 };
    o.n++; o.sum += Math.min((progress[c.id]?.box || 0) / MASTER_BOX, 1); t.set(key, o);
  });
  const rows = [...t.entries()].map(([k, o]) => [k, o.sum / o.n]).sort((a, b) => a[1] - b[1]);
  const ts = el("div", "topicstats", `<h2 class="sectionh">Themen – schwächste zuerst</h2>`);
  rows.forEach(([k, v]) => ts.appendChild(el("div", "trow", `<span>${esc(k)}</span><span class="bar"><i style="width:${v * 100}%"></i></span><b>${Math.round(v * 100)}%</b>`)));
  box.appendChild(ts);
}

/* ---------- Events ---------- */
$("#homeBtn").onclick = () => show("home");
document.querySelectorAll(".navbtn").forEach(b => b.onclick = () => show(b.dataset.view));
$("#optRecent").onchange = e => { prefs.recent = e.target.checked; saveF(); renderHome(); };
$("#topicAll").onclick = () => { prefs.topicsOff = []; saveF(); renderHome(); };
$("#topicNone").onclick = () => { prefs.topicsOff = topicsFor(prefs.decks).map(x => x[0]); saveF(); renderHome(); };
$("#startLearn").onclick = () => startSession("learn");
$("#startExam").onclick = () => startSession("exam");
$("#quitStudy").onclick = () => show("home");
$("#doneHome").onclick = () => show("home");
$("#doneMore").onclick = () => startSession(mode);
$("#revealBtn").onclick = reveal;
$("#card").onclick = e => { if (!revealed && !e.target.closest("a")) reveal(); };
document.querySelectorAll(".r").forEach(b => b.onclick = () => rate(+b.dataset.r));
document.addEventListener("keydown", e => {
  if (current !== "study" || e.target.matches("input,select,textarea")) return;
  if ((e.key === " " || e.key === "Enter") && !revealed) { e.preventDefault(); reveal(); }
  else if (revealed && ["1", "2", "3", "4"].includes(e.key)) rate(+e.key);
  else if (e.key === "Escape") show("home");
});
let st; $("#search").oninput = () => { clearTimeout(st); st = setTimeout(renderBrowse, 120); };
$("#browseDeck").onchange = renderBrowse;

$("#exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify({ v: 1, progress, prefs }, null, 1)], { type: "application/json" });
  const a = el("a"); a.href = URL.createObjectURL(blob); a.download = "fisi-ap2-fortschritt.json"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};
$("#importFile").onchange = async e => {
  const f = e.target.files[0]; if (!f) return;
  try { const d = JSON.parse(await f.text()); if (d.progress) { progress = d.progress; saveP(); } if (d.prefs) { prefs = { ...prefs, ...d.prefs }; saveF(); } renderStats(); }
  catch { $("#statsBox").prepend(el("p", "muted", "Die Datei konnte nicht gelesen werden.")); }
};
let resetArmed = false;
$("#resetBtn").onclick = () => {
  if (!resetArmed) { resetArmed = true; $("#resetBtn").textContent = "Wirklich zurücksetzen? Nochmal klicken"; setTimeout(() => { resetArmed = false; $("#resetBtn").textContent = "Fortschritt zurücksetzen"; }, 4000); return; }
  progress = {}; saveP(); resetArmed = false; $("#resetBtn").textContent = "Fortschritt zurücksetzen"; renderStats();
};

// Theme
const theme = store.get("theme", null);
if (theme) document.documentElement.dataset.theme = theme;
$("#themeBtn").onclick = () => {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  store.set("theme", document.documentElement.dataset.theme);
};

// Offline-Unterstützung
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});

show("home");
})();
