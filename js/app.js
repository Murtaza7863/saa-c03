(() => {
  const view = document.getElementById("view");
  const sideNav = document.getElementById("side-nav");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");
  const search = document.getElementById("search");

  const DOMAINS = [
    {
      id: 0,
      name: "Foundations",
      blurb:
        "Pictures, optional throwaway account, then how the written exam thinks.",
      color: "d0",
    },
    {
      id: 1,
      name: "Lock the door",
      blurb:
        "Who is allowed to do what, private networks, encryption. 30% of the exam.",
      color: "d1",
      weight: 30,
    },
    {
      id: 2,
      name: "Stay up",
      blurb: "Stay up when a building or a computer dies. 26%.",
      color: "d2",
      weight: 26,
    },
    {
      id: 3,
      name: "The right box",
      blurb: "The right computer, disk, database, and network. 24%.",
      color: "d3",
      weight: 24,
    },
    {
      id: 4,
      name: "The bill",
      blurb:
        "Don’t pay for idle machines or the wrong door to the internet. 20%.",
      color: "d4",
      weight: 20,
    },
    {
      id: 5,
      name: "Exam day",
      blurb: "Decision trees and exam-day pacing. Finish line B.",
      color: "d0",
    },
    {
      id: 6,
      name: "Operate",
      blurb:
        "How a cloud practitioner actually works: accounts, CLI, patch, restore. Finish line A around the diagram.",
      color: "d0",
    },
  ];

  function mode() {
    return Store.get().mode === "exam" ? "exam" : "learn";
  }
  function isExam() {
    return mode() === "exam";
  }
  function extra(id) {
    return (window.SAA.extras || {})[id] || {};
  }

  function lessons() {
    return (window.SAA.lessons || []).slice().sort((a, b) => a.order - b.order);
  }
  function lessonById(id) {
    return lessons().find((l) => l.id === id);
  }
  function phaseList() {
    return window.SAA.phases || [];
  }
  function phaseKids(ph) {
    return (ph.ids || []).map(lessonById).filter(Boolean);
  }
  function phaseProgress(ph) {
    const kids = phaseKids(ph);
    const done = kids.filter((l) => lessonState(l.id) === "done").length;
    return {
      done,
      total: kids.length,
      pct: kids.length ? Math.round((100 * done) / kids.length) : 0,
    };
  }
  function byDomain(d) {
    return lessons().filter((l) => l.domain === d);
  }

  function progress() {
    const all = lessons();
    const st = Store.get().lessons;
    let read = 0;
    let quizPts = 0;
    let quizMax = 0;
    for (const l of all) {
      const s = st[l.id];
      if (s && s.read) read++;
      if (s && s.quizTotal) {
        quizPts += s.quizScore;
        quizMax += s.quizTotal;
      }
    }
    return {
      read,
      total: all.length,
      pct: all.length ? Math.round((read / all.length) * 100) : 0,
      quizPct: quizMax ? Math.round((quizPts / quizMax) * 100) : 0,
    };
  }

  function domainProgress(d) {
    const ls = byDomain(d);
    const st = Store.get().lessons;
    const done = ls.filter(
      (l) =>
        st[l.id] &&
        (st[l.id].quizTotal
          ? st[l.id].quizScore / st[l.id].quizTotal >= 0.7
          : st[l.id].read),
    ).length;
    return {
      done,
      total: ls.length,
      pct: ls.length ? Math.round((done / ls.length) * 100) : 0,
    };
  }

  function lessonState(id) {
    const s = Store.get().lessons[id];
    if (!s) return "";
    if (s.quizTotal && s.quizScore / s.quizTotal >= 0.7) return "done";
    if (s.read || s.quizTotal) return "partial";
    return "";
  }

  function applyTheme() {
    const t = Store.get().theme || "light";
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.setAttribute("data-mode", mode());
    const themeBtn = document.getElementById("theme-btn");
    if (themeBtn)
      themeBtn.textContent = t === "dark" ? "Light mode" : "Dark mode";
    const ml = document.getElementById("mode-learn");
    const me = document.getElementById("mode-exam");
    if (ml) ml.classList.toggle("on", !isExam());
    if (me) me.classList.toggle("on", isExam());
    const sub = document.getElementById("brand-sub");
    if (sub)
      sub.textContent = isExam() ? "Exam mode" : "Learn the job, then the exam";
  }

  function closeMenu() {
    if (sidebar) sidebar.classList.remove("open");
    if (scrim) scrim.classList.remove("on");
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function wordAliases(w) {
    return [w.t].concat(w.aka || []).filter(Boolean);
  }

  function wordsSorted() {
    return (window.SAA.words || []).slice().sort((a, b) => {
      const la = Math.max.apply(
        null,
        wordAliases(a).map((x) => x.length),
      );
      const lb = Math.max.apply(
        null,
        wordAliases(b).map((x) => x.length),
      );
      return lb - la;
    });
  }

  function wordRegex(alias, cs) {
    return new RegExp(
      "(^|[^A-Za-z0-9])(" + escapeRe(alias) + ")(?![A-Za-z0-9])",
      cs ? "" : "i",
    );
  }

  function wordsInText(text) {
    const blob = String(text || "");
    const hits = [];
    for (const w of wordsSorted()) {
      const cs = !!w.cs;
      for (const a of wordAliases(w).sort((x, y) => y.length - x.length)) {
        if (a.length < 2) continue;
        if (wordRegex(a, cs).test(blob)) {
          hits.push(w);
          break;
        }
      }
    }
    return hits;
  }

  function lessonBlob(l) {
    const quiz = (l.quiz || [])
      .map(
        (q) =>
          q.q + " " + (q.explain || "") + " " + (q.choices || []).join(" "),
      )
      .join(" ");
    return [
      l.title,
      l.summary,
      (l.youCan || []).join(" "),
      (l.already || []).join(" "),
      String(l.body || "").replace(/<[^>]+>/g, " "),
      (l.traps || []).join(" "),
      quiz,
    ].join("\n");
  }

  function wordsBox(hits, startOpen) {
    if (!hits.length) return "";
    return `<details class="words-box"${startOpen ? " open" : ""}>
      <summary><strong>Words in this lesson (${hits.length})</strong> — hover dotted words in the text, or open this list</summary>
      <p class="words-help">Each short name in plain language. Full course list: <a href="#/glossary">Glossary</a>.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Word</th><th>In plain language</th></tr></thead>
        <tbody>${hits.map((w) => `<tr><td><strong>${esc(w.t)}</strong></td><td>${esc(w.d)}</td></tr>`).join("")}</tbody>
      </table></div>
    </details>`;
  }

  function annotateHtml(html) {
    const list = wordsSorted();
    if (!html || !list.length) return html;
    const parts = String(html).split(/(<[^>]+>)/);
    const used = {};
    return parts
      .map((part, i, arr) => {
        if (!part) return part;
        if (part.charAt(0) === "<") return part;
        const prev = arr[i - 1] || "";
        if (/^<(abbr|code|pre|script|style)\b/i.test(prev)) return part;
        const slots = [];
        let out = part;
        for (const w of list) {
          if (used[w.t]) continue;
          const cs = !!w.cs;
          const aliases = wordAliases(w).sort((x, y) => y.length - x.length);
          for (const a of aliases) {
            if (a.length < 2) continue;
            const re = wordRegex(a, cs);
            const m = re.exec(out);
            if (!m) continue;
            const token = "\uE000" + slots.length + "\uE001";
            out =
              out.slice(0, m.index) +
              m[1] +
              token +
              out.slice(m.index + m[0].length);
            slots.push(
              '<abbr class="term" title="' + esc(w.d) + '">' + m[2] + "</abbr>",
            );
            used[w.t] = true;
            break;
          }
        }
        return out.replace(/\uE000(\d+)\uE001/g, (_, n) => slots[+n]);
      })
      .join("");
  }

  function nextIncomplete() {
    return lessons().find((l) => lessonState(l.id) !== "done") || lessons()[0];
  }

  function relatedCompares(id) {
    const ids = extra(id).compares || [];
    const items = window.SAA.compares || [];
    return ids.map((x) => items.find((c) => c.id === x)).filter(Boolean);
  }

  function renderNav(active) {
    const p = progress();
    const top = document.getElementById("top-progress");
    if (top)
      top.textContent = isExam()
        ? `${p.quizPct}% quiz · exam`
        : `${p.pct}% lessons · ${p.quizPct}% quiz`;
    const toolIds = [
      "studio",
      "ops",
      "drill",
      "exam",
      "cards",
      "compare",
      "cheatsheet",
      "glossary",
      "scope",
    ];
    const toolsOpen = toolIds.includes(active);
    let html = "";
    html += `<a href="#/" class="${active === "home" ? "active" : ""}">Home</a>`;
    html += `<a href="#/guide" class="${active === "guide" ? "active" : ""}">How to study</a>`;
    html += `<a href="#/misses" class="${active === "misses" ? "active" : ""}">What people miss</a>`;
    html += `<a href="#/path" class="${active === "path" ? "active" : ""}">${isExam() ? "Exam notes" : "Learn path"}</a>`;
    if (!isExam()) {
      html += `<a href="#/use" class="${active === "use" ? "active" : ""}">Using AWS</a>`;
      html += `<a href="#/labs" class="${active === "labs" ? "active" : ""}">Hands-on labs</a>`;
    }
    html += `<details class="nav-group" ${toolsOpen ? "open" : ""}><summary><span>Tools</span></summary>`;
    if (isExam()) {
      html += `<a href="#/drill" class="${active === "drill" ? "active" : ""}">Question trainer</a>`;
      html += `<a href="#/exam" class="${active === "exam" ? "active" : ""}">Timed exams</a>`;
    } else {
      html += `<a href="#/studio" class="${active === "studio" ? "active" : ""}">Architecture studio</a>`;
      html += `<a href="#/ops" class="${active === "ops" ? "active" : ""}">Break/fix playbooks</a>`;
      html += `<a href="#/drill" class="${active === "drill" ? "active" : ""}">Question trainer</a>`;
    }
    html += `<a href="#/cards" class="${active === "cards" ? "active" : ""}">Flashcards</a>`;
    html += `<a href="#/compare" class="${active === "compare" ? "active" : ""}">Service vs service</a>`;
    html += `<a href="#/scope" class="${active === "scope" ? "active" : ""}">In-scope map</a>`;
    html += `<a href="#/cheatsheet" class="${active === "cheatsheet" ? "active" : ""}">Cheat sheet</a>`;
    html += `<a href="#/glossary" class="${active === "glossary" ? "active" : ""}">Glossary</a>`;
    html += `</details>`;
    const phases = !isExam() ? phaseList() : [];
    if (phases.length) {
      for (const ph of phases) {
        const kids = phaseKids(ph);
        if (!kids.length) continue;
        const dp = phaseProgress(ph);
        const open =
          kids.some((l) => l.id === active) ||
          (active === "home" && ph.id === "pictures");
        html += `<details class="nav-group" ${open ? "open" : ""}><summary><span>${esc(ph.name)}</span><span>${dp.done}/${dp.total}</span></summary>`;
        for (const l of kids) {
          const st = lessonState(l.id);
          html += `<a class="nav-lesson ${active === l.id ? "active" : ""}" href="#/lesson/${l.id}"><span class="dot ${st}"></span>${esc(l.title)}</a>`;
        }
        html += `</details>`;
      }
    } else {
      const show = DOMAINS.filter((d) => (isExam() ? d.id !== 6 : true));
      for (const d of show) {
        const dp = domainProgress(d.id);
        if (!dp.total) continue;
        const kids = byDomain(d.id);
        const open =
          kids.some((l) => l.id === active) ||
          (active === "home" && d.id === 0);
        html += `<details class="nav-group" ${open ? "open" : ""}><summary><span>${esc(d.name)}</span><span>${dp.done}/${dp.total}</span></summary>`;
        for (const l of kids) {
          const st = lessonState(l.id);
          html += `<a class="nav-lesson ${active === l.id ? "active" : ""}" href="#/lesson/${l.id}"><span class="dot ${st}"></span>${esc(l.title)}</a>`;
        }
        html += `</details>`;
      }
    }
    sideNav.innerHTML = html;
  }

  function stopExamTimers() {
    Object.keys(examLive).forEach((id) => {
      if (examLive[id] && examLive[id].timer) {
        clearInterval(examLive[id].timer);
        examLive[id].timer = null;
      }
    });
  }

  function route() {
    closeMenu();
    applyTheme();
    stopExamTimers();
    let hash = "/";
    try {
      hash = decodeURIComponent(location.hash.slice(1) || "/");
    } catch (e) {
      hash = "/";
    }
    const parts = hash.split("/").filter(Boolean);
    const q = (search.value || "").trim();
    if (q && !parts[0]) return renderSearch(q);

    const head = parts[0] || "";
    if (!head) return renderHome();
    if (head === "guide") return renderGuide();
    if (head === "use") return renderUse();
    if (head === "misses") return renderMisses();
    if (head === "path") return renderPath();
    if (head === "lesson") return renderLesson(parts[1], parts[2] === "quiz");
    if (head === "exam") return renderExamHub(parts[1], parts[2]);
    if (head === "drill") return renderDrill(parts[1]);
    if (head === "cards") return renderCards();
    if (head === "compare") return renderCompare(parts[1]);
    if (head === "cheatsheet") return renderCheatsheet();
    if (head === "glossary") return renderGlossary();
    if (head === "scope") return renderScope();
    if (head === "labs") return renderLabs(parts[1]);
    if (head === "studio") return renderStudio(parts[1]);
    if (head === "ops") return renderOps(parts[1]);
    renderHome();
  }

  function renderHome() {
    renderNav("home");
    const p = progress();
    const last = Store.get().lastLesson;
    const lastL = last && lessonById(last);
    const next = nextIncomplete();
    const exams = window.SAA.exams || [];
    const labN = (window.SAA.labs || []).length;
    const labDone = Object.keys(Store.get().labs || {}).length;
    const skills = window.SAA.skills || [];
    const skDone = skills.filter(
      (s) => Store.get().skills && Store.get().skills[s.id],
    ).length;

    if (isExam()) {
      view.innerHTML = `
        <section class="hero">
          <p class="kicker">Exam mode · SAA-C03</p>
          <h1>Train the way the test asks.</h1>
          <p>The test is 65 written questions (no console). Learn mode is pictures, an optional account, and labs — start there if AWS still just “does cloud.” Come back here when you have a map.</p>
          <div class="hero-actions">
            <a class="btn primary" href="#/misses">What people miss</a>
            <a class="btn" href="#/drill">Question trainer</a>
            <a class="btn ghost" href="#/cheatsheet">Cheat sheet</a>
          </div>
          <p class="meta" style="margin-top:1rem;color:var(--muted)">Quiz bank ${p.quizPct}% · ${exams.length} full exams · switch to Learn when you miss a topic and don't know why</p>
        </section>
        ${
          next
            ? `<a class="card continue-card" href="#/lesson/${esc(next.id)}">
          <p class="kicker">Next exam notes</p>
          <h2 style="margin:0 0 .35rem;font-size:1.15rem">${esc(next.title)}</h2>
          <p>${esc(next.summary)}</p>
        </a>`
            : ""
        }
        <div class="grid-4">
          ${DOMAINS.filter((d) => d.weight)
            .map((d) => {
              const dp = domainProgress(d.id);
              return `<a class="card" href="#/drill/${d.id}">
              <p class="kicker">${d.weight}% of scored exam</p>
              <h3>${esc(d.name)}</h3>
              <p>Drill only this domain, exam wording.</p>
              <div class="bar ${d.color}"><span style="width:${dp.pct}%"></span></div>
              <div class="meta">${dp.done}/${dp.total} lessons at ≥70%</div>
            </a>`;
            })
            .join("")}
        </div>
        <div class="grid-3" style="margin-top:1rem">
          <a class="card" href="#/misses"><h3>High-miss mix-ups</h3><p>Cross-account IAM, NAT vs endpoints, Multi-AZ vs replica — documented candidate traps.</p></a>
          <a class="card" href="#/cards"><h3>Flashcards</h3><p>Service cue → answer. Lowest Leitner box first.</p></a>
          <a class="card" href="#/compare"><h3>Service vs service</h3><p>Almost every item is a disguised comparison.</p></a>
        </div>
        <div class="grid-2" style="margin-top:1rem">
          ${exams
            .map((e) => {
              const rec = Store.get().exams[e.id];
              return `<a class="card" href="#/exam/${e.id}"><h3>${esc(e.title)}</h3><p>${e.questions.length} questions · ${e.minutes} min · pass cue 720 scaled</p><div class="meta">${rec ? `Last: ${rec.pct}% (${rec.scaled})` : "Not attempted"}</div></a>`;
            })
            .join("")}
        </div>`;
      return;
    }

    view.innerHTML = `
      <section class="hero">
        <p class="kicker">Learn mode · from zero</p>
        <h1>From “AWS is cloud” to using it — and sitting the exam.</h1>
        <p>Start with pictures. Open a throwaway account only when a lesson says so. Labs teach you to click. Later, Exam mode teaches you the written test (65 questions, no console). You can finish both if you go in order.</p>
        <div class="hero-actions">
          ${next ? `<a class="btn primary" href="#/lesson/${esc(next.id)}">${p.read ? "Continue" : "Start lesson 1"}</a>` : ""}
          <a class="btn" href="#/path">See the path</a>
          <a class="btn ghost" href="#/guide">How the exam works (later)</a>
        </div>
        <p class="meta" style="margin-top:1rem;color:var(--muted)">${p.read}/${p.total} lessons · streak ${Store.get().streak.count} day${Store.get().streak.count === 1 ? "" : "s"}${lastL ? ` · last: ${esc(lastL.title)}` : ""}</p>
      </section>
      ${
        next
          ? `<a class="card continue-card" href="#/lesson/${esc(next.id)}">
        <p class="kicker">${p.read ? "Continue" : "Start here"}</p>
        <h2 style="margin:0 0 .35rem;font-size:1.15rem">${esc(next.title)}</h2>
        <p>${esc(next.summary)}</p>
        <div class="meta">${next.minutes} min · ${esc((DOMAINS.find((d) => d.id === next.domain) || {}).name || "")}</div>
      </a>`
          : ""
      }
      <div class="grid-3" style="margin-top:1rem">
        <a class="card" href="#/lesson/start-here"><p class="kicker">Start</p><h3>Lesson 1 · What AWS is</h3><p>One diagram. Then the console. Then an optional account. No exam score today.</p></a>
        <a class="card" href="#/labs"><p class="kicker">Use AWS</p><h3>Sandbox labs (${labDone}/${labN})</h3><p>After the account lesson. Click in the AWS website. Delete what you create the same day.</p></a>
        <a class="card" href="#/use"><p class="kicker">Use AWS</p><h3>Using AWS (${skDone}/${skills.length || 0})</h3><p>Tick only what you have actually done. Empty boxes are normal until the labs.</p></a>
      </div>
      <div class="phase-home">
        ${phaseList()
          .map((ph) => {
            const dp = phaseProgress(ph);
            const kids = phaseKids(ph);
            const first =
              kids.find((l) => lessonState(l.id) !== "done") || kids[0];
            if (!first) return "";
            return `<a class="card" href="#/lesson/${first.id}">
            <p class="kicker">${esc(ph.week)}</p>
            <h3>${esc(ph.name)}</h3>
            <p>${esc(ph.blurb)}</p>
            <div class="bar d0"><span style="width:${dp.pct}%"></span></div>
            <div class="meta">${dp.done}/${dp.total} · ${esc(ph.use)}</div>
          </a>`;
          })
          .join("")}
      </div>
      <div class="grid-2" style="margin-top:1rem">
        <a class="card" href="#/ops"><h3>Break/fix playbooks</h3><p>ALB 502, RDS timeout, NAT bills, permission denied — how you debug at work.</p></a>
        <a class="card" href="#/compare"><h3>Service vs service</h3><p>The pairwise choices both the job and the exam use.</p></a>
      </div>
    `;
  }

  function renderGuide() {
    renderNav("guide");
    view.innerHTML = `<div class="lesson"><p class="kicker">Study guide</p><h1>How to study SAA-C03</h1>
      <p class="lede">Two finish lines: use AWS (labs + this checklist), and sit the written exam. Official exam facts first. Method is labeled. Nothing here invents a pass rate.</p>
      <div class="lesson-body">${window.SAA.guide}</div></div>`;
  }

  function renderUse() {
    renderNav("use");
    const skills = window.SAA.skills || [];
    const recipes = window.SAA.cliRecipes || [];
    const done = Store.get().skills || {};
    const n = skills.filter((s) => done[s.id]).length;
    view.innerHTML = `
      <article class="lesson">
        <p class="kicker">Hands-on · later, not day one</p>
        <h1>Using AWS</h1>
        <p class="lede">This page is finish line A: you can log in, build a network, and not get a surprise bill. Tick only what you have actually done in a sandbox — not what you have read. Empty boxes are expected until the labs.</p>
        <div class="callout tip"><strong>If you are new</strong>Pictures first: <a href="#/lesson/start-here">lesson 1</a>. When you want a real account, <a href="#/lesson/open-account">open a throwaway one</a>, then <a href="#/labs/lab-account">Lab 1</a> (billing alarm, not root for daily work). Finish line B (the written exam) is Exam mode, after Foundations.</div>
        <p class="meta" id="skill-meter">${n}/${skills.length} proven</p>
        <div class="skill-list">
          ${skills
            .map((s) => {
              const on = !!done[s.id];
              return `<label class="skill-item ${on ? "on" : ""}">
                <input type="checkbox" data-skill="${esc(s.id)}" ${on ? "checked" : ""}>
                <span>
                  <strong>${esc(s.title)}</strong>
                  <span class="meta">${esc(s.proof)}</span>
                  ${s.lab ? `<a href="#/labs/${esc(s.lab)}">Open lab</a>` : ""}
                </span>
              </label>`;
            })
            .join("")}
        </div>
        <h2>CloudShell / CLI you will type constantly</h2>
        <p>Open CloudShell from the console (terminal icon, top right) or use a local AWS CLI profile. Run these in the Region your lab lives in.</p>
        ${recipes
          .map(
            (r) =>
              `<div class="cli-block"><p class="cli-label">${esc(r.t)}</p><pre class="cli">${esc(r.c)}</pre></div>`,
          )
          .join("")}
        <p><a class="btn primary" href="#/lesson/use-aws">Lesson: how you actually use AWS</a> <a class="btn" href="#/labs">All labs</a></p>
      </article>`;
    view.querySelectorAll("[data-skill]").forEach((el) => {
      el.onchange = () => {
        Store.toggleSkill(el.dataset.skill);
        const d = Store.get().skills || {};
        const count = skills.filter((s) => d[s.id]).length;
        const meter = document.getElementById("skill-meter");
        if (meter) meter.textContent = `${count}/${skills.length} proven`;
        const item = el.closest(".skill-item");
        if (item) item.classList.toggle("on", el.checked);
      };
    });
  }

  function renderMisses() {
    renderNav("misses");
    view.innerHTML = `<div class="lesson"><p class="kicker">Community patterns + AWS behavior</p><h1>What people miss</h1>
      <p class="lede">AWS does not publish which items candidates get wrong. This page is the overlap of trainer/candidate write-ups with documented service behavior.</p>
      <div class="lesson-body">${window.SAA.misses}</div></div>`;
  }

  function renderPath() {
    renderNav("path");
    const nxt = nextIncomplete();
    if (isExam()) {
      const list = DOMAINS.filter((d) => d.id !== 6);
      view.innerHTML = `<p class="kicker">Exam notes</p><h1>If the question says X, pick Y</h1>
    <p class="lede">Open a lesson for compressed exam notes and a quiz. Use Learn mode for labs and the why.</p>
    ${list
      .map((d) => {
        const dp = domainProgress(d.id);
        if (!dp.total) return "";
        return `
        <section style="margin-bottom:1.6rem">
          <div class="kicker">${d.weight ? d.weight + "% of scored exam" : "Start here"}</div>
          <h2 style="margin:0 0 .35rem">${esc(d.name)}</h2>
          <p style="color:var(--muted);margin:.2rem 0 .8rem">${esc(d.blurb)}</p>
          <div class="bar ${d.color}"><span style="width:${dp.pct}%"></span></div>
          <div class="grid-2" style="margin-top:.85rem">
            ${byDomain(d.id)
              .map((l) => {
                const n = lessons().findIndex((x) => x.id === l.id) + 1;
                const st = Store.get().lessons[l.id];
                const quiz =
                  st && st.quizTotal
                    ? `${st.quizScore}/${st.quizTotal}`
                    : "no quiz yet";
                return `<a class="card ${l.id === nxt.id ? "continue-card" : ""}" href="#/lesson/${l.id}">
                <h3>${n}. ${esc(l.title)}</h3>
                <p>${esc(l.summary)}</p>
                <div class="meta">${l.minutes} min · ${quiz} · ${lessonState(l.id) || "not started"}</div>
              </a>`;
              })
              .join("")}
          </div>
        </section>`;
      })
      .join("")}`;
      return;
    }

    const phases = phaseList();
    view.innerHTML = `<p class="kicker">Learn path</p><h1>Learn in this order</h1>
    <p class="lede">Weeks are a method, not an AWS timetable. Pictures first. Labs = use AWS. Later, Exam mode = sit the test. Lookup lessons are a phone book — search when a question names the tool.</p>
    ${phases
      .map((ph) => {
        const dp = phaseProgress(ph);
        const kids = phaseKids(ph);
        if (!kids.length) return "";
        return `
        <section class="phase-block">
          <div class="kicker">${esc(ph.week)}</div>
          <h2 style="margin:0 0 .35rem">${esc(ph.name)}</h2>
          <p style="color:var(--muted);margin:.2rem 0 .4rem">${esc(ph.blurb)}</p>
          <p class="phase-use"><strong>Use AWS:</strong> ${esc(ph.use)}</p>
          <div class="bar d0"><span style="width:${dp.pct}%"></span></div>
          <div class="meta" style="margin:.35rem 0 .85rem">${dp.done}/${dp.total} lessons</div>
          <div class="grid-2">
            ${kids
              .map((l) => {
                const n = lessons().findIndex((x) => x.id === l.id) + 1;
                const st = Store.get().lessons[l.id];
                const quiz =
                  st && st.quizTotal
                    ? `${st.quizScore}/${st.quizTotal}`
                    : "no quiz yet";
                const lab = (window.SAA.labs || []).find(
                  (lb) => lb.id === extra(l.id).labId,
                );
                return `<a class="card ${l.id === nxt.id ? "continue-card" : ""}" href="#/lesson/${l.id}">
                <h3>${n}. ${esc(l.title)}${l.skim ? ` <span class="badge-skim">lookup</span>` : ""}</h3>
                <p>${esc(l.summary)}</p>
                <div class="meta">${l.minutes} min · ${quiz} · ${lessonState(l.id) || "not started"}${lab ? ` · lab: ${esc(lab.title)}` : ""}</div>
              </a>`;
              })
              .join("")}
          </div>
        </section>`;
      })
      .join("")}`;
  }

  function renderLesson(id, quizMode) {
    const list = lessons();
    const i = list.findIndex((l) => l.id === id);
    const l = list[i];
    if (!l) {
      view.innerHTML = `<p>Lesson not found.</p>`;
      renderNav("home");
      return;
    }
    renderNav(l.id);
    Store.markRead(l.id);
    if (quizMode) return renderQuiz(l, i, list);

    const prev = list[i - 1];
    const next = list[i + 1];
    const x = extra(l.id);
    const lab = (window.SAA.labs || []).find((lb) => lb.id === x.labId);
    const cues = x.cues || [];
    const rel = relatedCompares(l.id);
    const relHtml = rel.length
      ? `<div class="callout compare"><strong>Compare these</strong><p>${rel.map((c) => `<a href="#/compare/${c.id}">${esc(c.title)}</a>`).join(" · ")}</p></div>`
      : "";
    const bar = `
          <div class="continue-bar">
            ${prev ? `<a class="btn ghost" href="#/lesson/${prev.id}">← Previous</a>` : `<a class="btn ghost" href="#/">Home</a>`}
            <a class="btn primary" href="#/lesson/${l.id}/quiz">${isExam() ? "Exam-style quiz" : "Check understanding"} (${l.quiz.length})</a>
            ${next ? `<a class="btn" href="#/lesson/${next.id}">Next: ${esc(next.title)}</a>` : `<a class="btn" href="#/drill">Question trainer</a>`}
            ${lab && !isExam() ? `<a class="btn ghost" href="#/labs/${lab.id}">Lab</a>` : ""}
          </div>`;
    if (isExam()) {
      view.innerHTML = `
        <article class="lesson">
          <p class="kicker">Exam notes · Lesson ${i + 1} · ${esc((DOMAINS.find((d) => d.id === l.domain) || {}).name || "")}</p>
          <h1>${esc(l.title)}</h1>
          <p class="lede">${esc(l.summary)}</p>
          ${cues.length ? `<div class="table-wrap"><table><thead><tr><th>If the question says…</th><th>Reach for…</th></tr></thead><tbody>${cues.map((c) => `<tr><td>${annotateHtml(esc(c.if || ""))}</td><td>${annotateHtml(esc(c.then || ""))}</td></tr>`).join("")}</tbody></table></div>` : ""}
          <div class="lesson-body">${annotateHtml(x.exam || l.body)}</div>
          ${l.traps && l.traps.length ? `<div class="callout trap"><strong>Wrong answers that look right</strong><ul>${l.traps.map((t) => `<li>${annotateHtml(esc(t))}</li>`).join("")}</ul></div>` : ""}
          ${relHtml}
          ${bar}
          <div class="lesson-nav">
            ${prev ? `<a class="pager" href="#/lesson/${prev.id}">← Previous<strong>${esc(prev.title)}</strong></a>` : `<span></span>`}
            ${next ? `<a class="pager" href="#/lesson/${next.id}" style="text-align:right">Next →<strong>${esc(next.title)}</strong></a>` : `<span></span>`}
          </div>
        </article>`;
      window.scrollTo(0, 0);
      return;
    }
    view.innerHTML = `
      <article class="lesson">
          <p class="kicker">Lesson ${i + 1} · ${esc((DOMAINS.find((d) => d.id === l.domain) || {}).name || "")} · ${l.minutes} min${l.skim ? " · lookup" : ""}</p>
        <h1>${esc(l.title)}</h1>
        <p class="lede">${esc(l.summary)}</p>
        ${
          l.skim && !isExam()
            ? `<div class="callout tip"><strong>Lookup lesson</strong>Do not memorize APIs. Search this when a practice question names the tool. Skim the “when” lines, then move on.</div>`
            : ""
        }
        ${
          l.already && !isExam()
            ? `<div class="callout compare"><strong>You already know</strong><ul>${l.already.map((line) => `<li>${annotateHtml(esc(line))}</li>`).join("")}</ul></div>`
            : ""
        }
        ${
          l.youCan && !isExam()
            ? `<div class="callout tip"><strong>After this lesson you should be able to</strong><ul>${l.youCan.map((line) => `<li>${annotateHtml(esc(line))}</li>`).join("")}</ul></div>`
            : ""
        }
        ${!isExam() ? wordsBox(wordsInText(lessonBlob(l)), l.order < 12) : ""}
        <div class="lesson-body">${annotateHtml(l.body)}</div>
        ${x.job ? `<h2 style="font-family:var(--font)">On the job</h2><div class="lesson-body">${annotateHtml(x.job)}</div>` : ""}
        ${lab ? `<div class="callout tip"><strong>Build this</strong><p>${esc(lab.title)} — ${esc(lab.summary)}</p><a class="btn" href="#/labs/${lab.id}">Open lab</a></div>` : ""}
        ${l.traps && l.traps.length ? `<div class="callout trap"><strong>Common mix-ups</strong><ul>${l.traps.map((t) => `<li>${annotateHtml(esc(t))}</li>`).join("")}</ul></div>` : ""}
        ${relHtml}
        ${bar}
        <div class="lesson-nav">
          ${prev ? `<a class="pager" href="#/lesson/${prev.id}">← Previous<strong>${esc(prev.title)}</strong></a>` : `<span></span>`}
          ${next ? `<a class="pager" href="#/lesson/${next.id}" style="text-align:right">Next →<strong>${esc(next.title)}</strong></a>` : `<span></span>`}
        </div>
      </article>
    `;
    window.scrollTo(0, 0);
  }

  function renderQuiz(l, i, list) {
    const learn = !isExam();
    const all = list || lessons();
    const idx = i >= 0 ? i : all.findIndex((x) => x.id === l.id);
    const num = idx + 1;
    const prev = all[idx - 1];
    const next = all[idx + 1];
    const quiz = l.quiz || [];
    const state = {
      answers: Array(quiz.length).fill(null),
      submitted: false,
      revealed: {},
    };
    function paint() {
      view.innerHTML = `
        <div class="quiz">
          <p class="kicker">${learn ? "Check understanding" : "Exam-style quiz"} · Lesson ${num}</p>
          <h1>${esc(l.title)}</h1>
          <p class="lede">${learn ? "A few short questions. Wrong is fine — you get the why immediately." : "Same shape as the exam: one best answer unless it says choose two. No explanations until you submit."} <strong>${state.answers.filter((a) => a !== null && !(Array.isArray(a) && !a.length)).length}/${quiz.length}</strong> answered.</p>
          ${quiz.map((q, qi) => qBlock(q, qi, { answers: state.answers, submitted: state.submitted || !!state.revealed[qi] })).join("")}
          <div class="continue-bar">
            ${prev ? `<a class="btn ghost" href="#/lesson/${prev.id}">← Previous</a>` : `<a class="btn ghost" href="#/">Home</a>`}
            <button class="btn primary" id="submit-quiz">${state.submitted ? "Back to lesson" : learn ? "Save score" : "Submit quiz"}</button>
            <a class="btn" href="#/lesson/${l.id}">This lesson</a>
            ${next ? `<a class="btn" href="#/lesson/${next.id}">Next: ${esc(next.title)}</a>` : ""}
          </div>
          <div id="quiz-result"></div>
        </div>`;
      bindQuiz(l, state, paint, learn);
    }
    paint();
    window.scrollTo(0, 0);
  }

  function qBlock(q, qi, state, opts = {}) {
    if (!q) return "";
    const multi = !!q.multi;
    const chosen = state.answers[qi];
    const show = state.submitted;
    const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
    return `<div class="q-card" data-q="${qi}">
      <p><strong>Q${qi + 1}.</strong> ${q.multi ? "<em>Choose " + (q.choose || 2) + ".</em> " : ""}${annotateHtml(esc(q.q || ""))}</p>
      ${(q.choices || [])
        .map((c, ci) => {
          let cls = "choice";
          const selected = multi
            ? Array.isArray(chosen) && chosen.includes(ci)
            : chosen === ci;
          if (selected) cls += " selected";
          if (show && correct.includes(ci)) cls += " correct";
          if (show && selected && !correct.includes(ci)) cls += " wrong";
          return `<button type="button" class="${cls}" data-q="${qi}" data-c="${ci}" ${show || opts.locked ? "disabled" : ""}>${annotateHtml(esc(c))}</button>`;
        })
        .join("")}
      ${show ? `<div class="explain">${annotateHtml(esc(q.explain || ""))}</div>` : ""}
    </div>`;
  }

  function bindQuiz(l, state, paint, learn) {
    view.querySelectorAll(".choice").forEach((btn) => {
      btn.onclick = () => {
        const qi = +btn.dataset.q;
        const ci = +btn.dataset.c;
        const q = (l.quiz || [])[qi];
        if (!q || state.submitted || state.revealed[qi]) return;
        if (q.multi) {
          const cur = Array.isArray(state.answers[qi])
            ? state.answers[qi].slice()
            : [];
          const ix = cur.indexOf(ci);
          if (ix >= 0) cur.splice(ix, 1);
          else cur.push(ci);
          state.answers[qi] = cur;
        } else {
          state.answers[qi] = ci;
          if (learn) state.revealed[qi] = true;
        }
        paint();
      };
    });
    const sub = document.getElementById("submit-quiz");
    if (sub)
      sub.onclick = () => {
        if (state.submitted) {
          location.hash = `#/lesson/${l.id}`;
          return;
        }
        if (
          state.answers.some(
            (a) => a === null || (Array.isArray(a) && !a.length),
          )
        ) {
          const warn = document.getElementById("quiz-result");
          if (warn)
            warn.innerHTML = `<p class="callout trap">Answer every question first.</p>`;
          return;
        }
        let score = 0;
        (l.quiz || []).forEach((q, i) => {
          const correct = Array.isArray(q.answer)
            ? q.answer.slice().sort().join(",")
            : String(q.answer);
          const got = Array.isArray(state.answers[i])
            ? state.answers[i].slice().sort().join(",")
            : String(state.answers[i]);
          if (correct === got) score++;
        });
        const total = (l.quiz || []).length;
        Store.saveQuiz(l.id, score, total);
        state.submitted = true;
        paint();
        const res = document.getElementById("quiz-result");
        if (res)
          res.innerHTML = `<div class="callout tip"><strong>Score ${score}/${total}</strong> ${total && score / total >= 0.7 ? "Good. If this was luck, switch to Exam mode and try the trainer." : "Below 70%. Re-read the lesson (Learn mode) or the exam notes, then retry."}</div>`;
        renderNav(l.id);
      };
  }

  function renderExamHub(examId, mode) {
    if (examId) return renderExam(examId, mode);
    renderNav("exam");
    const exams = window.SAA.exams || [];
    view.innerHTML = `
      <p class="kicker">Practice</p>
      <h1>Full exams</h1>
      <p class="lede">Real exam: 65 questions in 130 minutes, 50 scored + 15 unscored. Passing scaled score is 720. These sets use the same stem style: constraints, distractors, “least cost / least ops.” Original scenarios — not dumps.</p>
      <div class="hero-actions" style="margin-bottom:1rem">
        <a class="btn primary" href="#/drill">Mixed trainer (20)</a>
        <a class="btn" href="#/drill/sim">Full mix (65, 130 min)</a>
      </div>
      <div class="grid-2">
        ${exams
          .map((e) => {
            const rec = Store.get().exams[e.id];
            return `<div class="card">
            <h3>${esc(e.title)}</h3>
            <p>${e.blurb}</p>
            <div class="meta">${rec ? `Best/last: ${rec.pct}% · scaled ${rec.scaled}` : "Not attempted"}</div>
            <div class="hero-actions" style="margin-top:.8rem">
              <a class="btn primary" href="#/exam/${e.id}">Start</a>
              ${rec ? `<a class="btn" href="#/exam/${e.id}/review">Review last</a>` : ""}
            </div>
          </div>`;
          })
          .join("")}
      </div>
    `;
  }

  const examLive = {};
  const extraExams = {};

  function getExam(id) {
    return (window.SAA.exams || []).find((e) => e.id === id) || extraExams[id];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function allExamQuestions() {
    const out = [];
    for (const l of lessons()) {
      let d = l.domain;
      if (d === 0 || d === 5) d = 2;
      if (d === 6) d = 4;
      if (d < 1 || d > 4) continue;
      (l.quiz || []).forEach((q) =>
        out.push(Object.assign({ domain: d, src: l.title }, q)),
      );
    }
    for (const e of window.SAA.exams || []) {
      e.questions.forEach((q) => out.push(Object.assign({ src: e.title }, q)));
    }
    for (const q of window.SAA.bank || []) out.push(q);
    return out;
  }

  function renderExam(examId, mode) {
    const exam = getExam(examId);
    if (!exam) {
      view.innerHTML = "<p>Exam not found.</p>";
      return;
    }
    renderNav("exam");
    if (mode === "review") return renderExamReview(exam);
    if (!exam.questions || !exam.questions.length) {
      view.innerHTML = "<p>No questions in this set.</p>";
      return;
    }

    if (!examLive[examId]) {
      examLive[examId] = {
        answers: Array(exam.questions.length).fill(null),
        flagged: {},
        i: 0,
        ends: Date.now() + (exam.minutes || 40) * 60 * 1000,
        timer: null,
      };
    }
    const st = examLive[examId];
    if (Date.now() >= st.ends) {
      submitExam(exam, st);
      return;
    }

    function paint() {
      const q = exam.questions[st.i];
      if (!q) {
        view.innerHTML = "<p>Question missing.</p>";
        return;
      }
      const remain = Math.max(0, st.ends - Date.now());
      const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
      const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
      view.innerHTML = `
        <div class="exam-bar">
          <div><strong>${esc(exam.title)}</strong><div class="tiny">Question ${st.i + 1} / ${exam.questions.length} · Domain ${q.domain}</div></div>
          <div class="timer" id="timer">${mm}:${ss}</div>
        </div>
        <div class="q-grid">
          ${exam.questions.map((_, i) => `<button type="button" class="${i === st.i ? "current" : ""} ${st.answers[i] !== null && !(Array.isArray(st.answers[i]) && !st.answers[i].length) ? "answered" : ""} ${st.flagged[i] ? "flagged" : ""}" data-jump="${i}">${i + 1}</button>`).join("")}
        </div>
        ${qBlock(q, st.i, st, { locked: false })}
        <div class="hero-actions">
          <button class="btn" id="prev" ${st.i === 0 ? "disabled" : ""}>Previous</button>
          <button class="btn" id="flag">${st.flagged[st.i] ? "Unflag" : "Flag"}</button>
          <button class="btn" id="next">${st.i === exam.questions.length - 1 ? "Review & submit" : "Next"}</button>
        </div>
      `;
      view.querySelectorAll(".choice").forEach((btn) => {
        btn.onclick = () => {
          const ci = +btn.dataset.c;
          if (q.multi) {
            const cur = Array.isArray(st.answers[st.i])
              ? st.answers[st.i].slice()
              : [];
            const ix = cur.indexOf(ci);
            if (ix >= 0) cur.splice(ix, 1);
            else cur.push(ci);
            st.answers[st.i] = cur;
          } else st.answers[st.i] = ci;
          paint();
        };
      });
      view.querySelectorAll("[data-jump]").forEach(
        (b) =>
          (b.onclick = () => {
            st.i = +b.dataset.jump;
            paint();
          }),
      );
      const prevBtn = document.getElementById("prev");
      const flagBtn = document.getElementById("flag");
      const nextBtn = document.getElementById("next");
      if (prevBtn)
        prevBtn.onclick = () => {
          st.i--;
          paint();
        };
      if (flagBtn)
        flagBtn.onclick = () => {
          st.flagged[st.i] = !st.flagged[st.i];
          paint();
        };
      if (nextBtn)
        nextBtn.onclick = () => {
          if (st.i === exam.questions.length - 1) submitExam(exam, st);
          else {
            st.i++;
            paint();
          }
        };
    }

    paint();
    if (st.timer) clearInterval(st.timer);
    st.timer = setInterval(() => {
      if (Date.now() >= st.ends) {
        clearInterval(st.timer);
        submitExam(exam, st);
        return;
      }
      const el = document.getElementById("timer");
      if (!el) return;
      const remain = Math.max(0, st.ends - Date.now());
      const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
      const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
      el.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  function gradeAnswers(questions, answers) {
    let score = 0;
    const per = { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0] };
    questions.forEach((q, i) => {
      const d = per[q.domain] ? q.domain : 2;
      per[d][1]++;
      const correct = Array.isArray(q.answer)
        ? q.answer.slice().sort().join(",")
        : String(q.answer);
      const got = Array.isArray(answers[i])
        ? answers[i].slice().sort().join(",")
        : String(answers[i]);
      if (correct === got) {
        score++;
        per[d][0]++;
      }
    });
    const pct = questions.length
      ? Math.round((score / questions.length) * 100)
      : 0;
    const scaled = Math.max(100, Math.min(1000, Math.round(100 + pct * 9)));
    return { score, pct, scaled, per };
  }

  function submitExam(exam, st) {
    if (st.timer) clearInterval(st.timer);
    const g = gradeAnswers(exam.questions, st.answers);
    Store.saveExam(
      exam.id,
      Object.assign({ at: Date.now(), answers: st.answers }, g),
    );
    delete examLive[exam.id];
    location.hash = `#/exam/${exam.id}/review`;
  }

  function renderExamReview(exam) {
    const rec = Store.get().exams[exam.id];
    if (!rec) {
      view.innerHTML = `<p>No attempt yet. <a href="#/exam/${exam.id}">Start the exam</a>.</p>`;
      return;
    }
    const passed = rec.scaled >= 720;
    const st = { answers: rec.answers, submitted: true };
    view.innerHTML = `
      <p class="kicker">Results</p>
      <h1 class="results-score" style="color:${passed ? "var(--good)" : "var(--bad)"}">${rec.pct}%</h1>
      <p>Scaled cue: <strong>${rec.scaled}</strong> (720 to pass). Raw ${rec.score}/${exam.questions.length}. ${passed ? "Treat this as a pass signal — still review every miss." : "Not a pass yet. Drill the weak domain, then retake the other exam first."}</p>
      <div class="grid-4">
        ${[1, 2, 3, 4].map((d) => `<div class="card"><h3>Domain ${d}</h3><p>${(rec.per && rec.per[d] && rec.per[d][0]) || 0}/${(rec.per && rec.per[d] && rec.per[d][1]) || 0}</p></div>`).join("")}
      </div>
      <div class="hero-actions" style="margin:1rem 0">
        <a class="btn" href="#/exam/${exam.id}">Retake</a>
        <a class="btn" href="#/exam">All exams</a>
      </div>
      ${exam.questions.map((q, i) => qBlock(q, i, st, { locked: true })).join("")}
    `;
    window.scrollTo(0, 0);
  }

  function makeDrill(which) {
    const all = allExamQuestions();
    const by = { 1: [], 2: [], 3: [], 4: [] };
    all.forEach((q) => {
      if (by[q.domain]) by[q.domain].push(q);
    });
    let questions;
    let minutes;
    let title;
    if (which === "sim") {
      questions = shuffle([
        ...shuffle(by[1]).slice(0, 20),
        ...shuffle(by[2]).slice(0, 17),
        ...shuffle(by[3]).slice(0, 16),
        ...shuffle(by[4]).slice(0, 12),
      ]);
      minutes = 130;
      title = "Full mix · 65 questions";
    } else if (which && which !== "all") {
      const d = +which;
      questions = shuffle(by[d] || []).slice(0, 20);
      minutes = 40;
      title = `Domain ${d} trainer · 20`;
    } else {
      questions = shuffle(all).slice(0, 20);
      minutes = 40;
      title = "Mixed trainer · 20";
    }
    return {
      id: "drill-" + which,
      title,
      minutes,
      questions,
      blurb: "Drawn from lessons, exams, and the extra bank.",
    };
  }

  function renderDrill(which) {
    if (which) {
      const id = "drill-" + which;
      if (!examLive[id]) extraExams[id] = makeDrill(which);
      else if (!extraExams[id]) extraExams[id] = makeDrill(which);
      return renderExam(id);
    }
    renderNav("drill");
    const all = allExamQuestions();
    const n = { 1: 0, 2: 0, 3: 0, 4: 0 };
    all.forEach((q) => {
      if (n[q.domain] !== undefined) n[q.domain]++;
    });
    view.innerHTML = `
      <p class="kicker">Exam trainer</p>
      <h1>How it will be asked</h1>
      <p class="lede">The real exam is 65 items, 130 minutes, mix of one-answer and choose-two. Stems hide the answer in constraints: <em>least cost, cannot change the app, customer-managed keys, RPO, hybrid</em>. This trainer pulls every scored-style question in the site (${all.length}).</p>
      <div class="callout compare"><strong>Read the last sentence first</strong>Then hunt the stem for the constraint that kills three of the four answers.</div>
      <div class="grid-2">
        <a class="card" href="#/drill/all"><h3>Mixed 20</h3><p>Untimed-ish 40 min cap. All domains.</p></a>
        <a class="card" href="#/drill/sim"><h3>Full mix 65</h3><p>130 minutes. Domain-weighted 30/26/24/20. Closest to test day.</p></a>
      </div>
      <div class="grid-4" style="margin-top:1rem">
        ${[1, 2, 3, 4]
          .map(
            (d) =>
              `<a class="card" href="#/drill/${d}"><h3>Domain ${d}</h3><p>${n[d]} items in bank. 20-question drill.</p></a>`,
          )
          .join("")}
      </div>
      <p class="tiny" style="margin-top:1rem">A new random set is built when you start. Leave and come back mid-drill to resume.</p>
    `;
  }

  function renderLabs(id) {
    renderNav("labs");
    const labs = window.SAA.labs || [];
    const lab = labs.find((x) => x.id === id);
    if (!lab) {
      view.innerHTML = `
        <p class="kicker">Sandbox</p>
        <h1>Hands-on labs</h1>
        <p class="lede">Finish line A: actually use AWS. Open a throwaway account first (<a href="#/lesson/open-account">first hour</a>), then Lab 1 (billing alarm). Each step has a console path and a CLI for CloudShell. Delete what you create. Order: account → network → identity → app → data → observe → money.</p>
        <div class="callout trap"><strong>Cost</strong>NAT gateways, RDS, and ALBs cost money while they exist. The labs tell you what to tear down. Free tier helps; it is not a promise of $0.</div>
        <div class="grid-2">
          ${labs
            .map((x, i) => {
              const done = Store.get().labs[x.id];
              return `<a class="card" href="#/labs/${x.id}">
                <p class="kicker">Lab ${i + 1} · ${x.minutes} min · ${x.cost}</p>
                <h3>${esc(x.title)}</h3>
                <p>${esc(x.summary)}</p>
                <div class="meta">${done ? "Marked done" : "Not done"}</div>
              </a>`;
            })
            .join("")}
        </div>`;
      return;
    }
    const i = labs.indexOf(lab);
    view.innerHTML = `
      <article class="lesson">
        <p class="kicker">Lab ${i + 1} · ${lab.minutes} min · ${esc(lab.cost)}</p>
        <h1>${esc(lab.title)}</h1>
        <p class="lede">${esc(lab.summary)}</p>
        <div class="callout tip"><strong>Goal</strong>${lab.goal}</div>
        <div class="lesson-body">${lab.why || ""}</div>
        ${(lab.steps || [])
          .map((s, n) => {
            const paths = `${s.console ? `<p class="path-console"><strong>Console</strong> ${esc(s.console)}</p>` : ""}${s.cli ? `<pre class="cli">${esc(s.cli)}</pre>` : ""}`;
            return `<div class="lab-step"><h3 data-n="${n + 1}">${esc(s.title || "")}</h3><div class="lesson-body">${s.html || ""}${paths}</div></div>`;
          })
          .join("")}
        <div class="callout compare"><strong>You have it when</strong>${lab.verify}</div>
        <div class="callout trap"><strong>Tear down</strong>${lab.teardown}</div>
        <div class="hero-actions">
          ${i > 0 ? `<a class="btn ghost" href="#/labs/${labs[i - 1].id}">← Previous lab</a>` : `<a class="btn ghost" href="#/labs">All labs</a>`}
          <button class="btn primary" id="lab-done">${Store.get().labs[lab.id] ? "Done" : "Mark lab done"}</button>
          ${labs[i + 1] ? `<a class="btn" href="#/labs/${labs[i + 1].id}">Next lab</a>` : `<a class="btn" href="#/studio">Architecture studio</a>`}
        </div>
      </article>`;
    const doneBtn = document.getElementById("lab-done");
    if (doneBtn)
      doneBtn.onclick = () => {
        Store.markLab(lab.id);
        renderLabs(lab.id);
      };
    window.scrollTo(0, 0);
  }

  function renderStudio(id) {
    renderNav("studio");
    const items = window.SAA.studio || [];
    const cur = items.find((x) => x.id === id);
    if (!cur) {
      view.innerHTML = `
        <p class="kicker">Design</p>
        <h1>Architecture studio</h1>
        <p class="lede">This is the job: a messy brief, several constraints, you choose a shape. Untimed. After you pick, compare to a model answer — not the only possible answer, the one that would also pass SAA.</p>
        <div class="grid-2">
          ${items
            .map((x) => {
              const rec = Store.get().studio[x.id];
              return `<a class="card" href="#/studio/${x.id}"><h3>${esc(x.title)}</h3><p>${esc(x.hook)}</p><div class="meta">${rec ? `Last ${rec.score}/${rec.total}` : "Not attempted"}</div></a>`;
            })
            .join("")}
        </div>`;
      return;
    }
    const picks = new Set();
    function paint(done) {
      const correct = new Set(cur.need || []);
      view.innerHTML = `
        <article class="lesson">
          <p class="kicker">Studio</p>
          <h1>${esc(cur.title)}</h1>
          <div class="lesson-body">${cur.brief}</div>
          <p><strong>Select every building block you would include. Skip extras that the brief does not need.</strong></p>
          ${(cur.options || [])
            .map((o) => {
              let cls = "studio-option";
              if (picks.has(o.id)) cls += " on";
              if (done && correct.has(o.id)) cls += " correct";
              if (done && picks.has(o.id) && !correct.has(o.id))
                cls += " wrong";
              return `<button type="button" class="${cls}" data-id="${o.id}" ${done ? "disabled" : ""}>${esc(o.label)}</button>`;
            })
            .join("")}
          ${done ? `<div class="callout tip"><strong>Model answer</strong>${cur.answer}</div>` : ""}
          <div class="hero-actions">
            ${items[items.indexOf(cur) - 1] ? `<a class="btn ghost" href="#/studio/${items[items.indexOf(cur) - 1].id}">← Previous</a>` : `<a class="btn ghost" href="#/studio">All briefs</a>`}
            <button class="btn primary" id="studio-go">${done ? "Back to studio" : "Compare to model"}</button>
            ${items[items.indexOf(cur) + 1] ? `<a class="btn" href="#/studio/${items[items.indexOf(cur) + 1].id}">Next brief</a>` : ""}
          </div>
        </article>`;
      view.querySelectorAll(".studio-option").forEach((b) => {
        b.onclick = () => {
          const k = b.dataset.id;
          if (picks.has(k)) picks.delete(k);
          else picks.add(k);
          paint(false);
        };
      });
      const studioGo = document.getElementById("studio-go");
      if (studioGo)
        studioGo.onclick = () => {
          if (done) {
            location.hash = "#/studio";
            return;
          }
          let score = 0;
          (cur.options || []).forEach((o) => {
            const want = correct.has(o.id);
            const got = picks.has(o.id);
            if (want === got) score++;
          });
          Store.markStudio(cur.id, score, (cur.options || []).length);
          paint(true);
        };
    }
    paint(false);
    window.scrollTo(0, 0);
  }

  function renderOps(id) {
    renderNav("ops");
    const items = window.SAA.playbooks || [];
    const cur = items.find((x) => x.id === id) || items[0];
    if (!cur) {
      view.innerHTML = "<p>No playbooks loaded.</p>";
      return;
    }
    view.innerHTML = `
      <p class="kicker">Operate</p>
      <h1>Break/fix playbooks</h1>
      <p class="lede">Architects who cannot debug their own diagrams are not practitioners. Work these in order: symptom → likely causes → what you check → the AWS objects involved.</p>
      <div class="hero-actions" style="margin-bottom:1rem">
        ${items.map((x) => `<a class="btn ${x.id === cur.id ? "primary" : ""}" href="#/ops/${x.id}">${esc(x.title)}</a>`).join("")}
      </div>
      <div class="lesson-body">
        <h2>${esc(cur.title)}</h2>
        ${cur.body}
      </div>`;
  }

  function renderCards() {
    renderNav("cards");
    const cards = window.SAA.cards || [];
    if (!cards.length) {
      view.innerHTML = "<p>No flashcards loaded.</p>";
      return;
    }
    let i = 0;
    let showBack = false;
    function due() {
      return cards
        .slice()
        .sort((a, b) => Store.cardBox(a.id) - Store.cardBox(b.id));
    }
    function paint() {
      const list = due();
      const c = list[i % list.length];
      view.innerHTML = `
        <p class="kicker">Flashcards · box ${Store.cardBox(c.id)} / 5</p>
        <h1>Service cues</h1>
        <p class="lede">Unknown cards drop to box 1. Known cards move up. Study the lowest boxes first.</p>
        <div class="flip" id="flip">
          ${showBack ? `<div><div class="kicker">Back</div><h2>${esc(c.front)}</h2><p class="back">${c.back}</p><p style="margin-top:1rem;color:var(--faint)">${esc(c.cue || "")}</p></div>` : `<div><div class="kicker">Front</div><h2>${esc(c.front)}</h2><p class="back">Click to flip</p></div>`}
        </div>
        <div class="hero-actions" style="margin-top:1rem">
          <button class="btn" id="miss">Didn't know</button>
          <button class="btn primary" id="know">Knew it</button>
        </div>
        <p class="tiny">${(i % list.length) + 1} / ${list.length}</p>
      `;
      const flip = document.getElementById("flip");
      const know = document.getElementById("know");
      const miss = document.getElementById("miss");
      if (flip)
        flip.onclick = () => {
          showBack = !showBack;
          paint();
        };
      if (know)
        know.onclick = () => {
          Store.rateCard(c.id, true);
          i++;
          showBack = false;
          paint();
        };
      if (miss)
        miss.onclick = () => {
          Store.rateCard(c.id, false);
          i++;
          showBack = false;
          paint();
        };
    }
    paint();
  }

  function renderCompare(id) {
    renderNav("compare");
    const items = window.SAA.compares || [];
    const cur = items.find((x) => x.id === id) || items[0];
    if (!cur) {
      view.innerHTML = "<p>No comparison tables loaded.</p>";
      return;
    }
    view.innerHTML = `
      <p class="kicker">Decision tables</p>
      <h1>Service vs service</h1>
      <p class="lede">Most SAA questions are a disguised comparison. Pick a pair in the list.</p>
      <div class="compare-layout">
        <nav class="compare-nav">
          ${items.map((x) => `<a class="${x.id === cur.id ? "on" : ""}" href="#/compare/${x.id}">${esc(x.title)}</a>`).join("")}
        </nav>
        <div class="lesson-body">
          <h2>${esc(cur.title)}</h2>
          <p>${cur.intro}</p>
          <div class="table-wrap">${cur.table}</div>
          ${cur.rule ? `<div class="callout tip"><strong>Default rule</strong>${cur.rule}</div>` : ""}
        </div>
      </div>
    `;
  }

  function renderScope() {
    renderNav("scope");
    const rows = window.SAA.scope || [];
    view.innerHTML = `
      <p class="kicker">Official exam guide</p>
      <h1>In-scope service map</h1>
      <p class="lede">From the SAA-C03 in-scope list (AWS says it is non-exhaustive). Filter by name or by the job in the stem. This is a lookup, not a claim that every row is on your form.</p>
      <label class="search" style="max-width:100%;margin:0 0 1rem">
        <span>Filter</span>
        <input id="scope-q" type="search" placeholder="Textract, MQ, Outposts, NAT…">
      </label>
      <div class="table-wrap" id="scope-table"></div>`;
    const box = document.getElementById("scope-q");
    const table = document.getElementById("scope-table");
    if (!box || !table) return;
    function paint() {
      const n = (box.value || "").trim().toLowerCase();
      const show = rows.filter(
        (r) =>
          !n || (r.cat + " " + r.svc + " " + r.when).toLowerCase().includes(n),
      );
      table.innerHTML = `<table><thead><tr><th>Category</th><th>Service</th><th>When the stem is about…</th></tr></thead><tbody>
        ${show.map((r) => `<tr><td>${esc(r.cat)}</td><td><strong>${esc(r.svc)}</strong></td><td>${esc(r.when)}</td></tr>`).join("")}
      </tbody></table>
      <p class="tiny">${show.length} of ${rows.length}</p>`;
    }
    box.addEventListener("input", paint);
    paint();
    box.focus();
  }

  function renderCheatsheet() {
    renderNav("cheatsheet");
    view.innerHTML = `<div class="lesson"><p class="kicker">Night before</p><h1>Exam cheat sheet</h1><div class="lesson-body">${window.SAA.cheatsheet}</div></div>`;
  }

  function renderGlossary() {
    renderNav("glossary");
    const g = window.SAA.glossary || [];
    view.innerHTML = `
      <p class="kicker">Terms</p>
      <h1>Glossary</h1>
      <p class="lede">Every short name the course uses, in plain language. In a lesson, hover a dotted word. This page is the full list.</p>
      <label class="search" style="max-width:100%;margin:0 0 1rem">
        <span>Filter</span>
        <input id="gloss-q" type="search" placeholder="IAM, NAT, queue, Region…">
      </label>
      <div class="table-wrap" id="gloss-table"></div>`;
    const box = document.getElementById("gloss-q");
    const table = document.getElementById("gloss-table");
    if (!box || !table) return;
    function paint() {
      const n = (box.value || "").trim().toLowerCase();
      const show = g.filter(
        (x) => !n || (x.t + " " + x.d).toLowerCase().includes(n),
      );
      table.innerHTML = `<table><thead><tr><th>Word</th><th>In plain language</th></tr></thead><tbody>
        ${show.map((x) => `<tr><td><strong>${esc(x.t)}</strong></td><td>${esc(x.d)}</td></tr>`).join("")}
      </tbody></table>`;
    }
    box.addEventListener("input", paint);
    paint();
  }

  function renderSearch(q) {
    renderNav("home");
    const needle = q.toLowerCase();
    const hits = [];
    for (const l of lessons()) {
      const blob = (
        l.title +
        " " +
        l.summary +
        " " +
        (l.tags || []).join(" ") +
        " " +
        String(l.body || "").replace(/<[^>]+>/g, " ")
      ).toLowerCase();
      if (blob.includes(needle))
        hits.push({ href: `#/lesson/${l.id}`, title: l.title, sub: l.summary });
    }
    for (const lb of window.SAA.labs || []) {
      if ((lb.title + lb.summary).toLowerCase().includes(needle))
        hits.push({ href: `#/labs/${lb.id}`, title: lb.title, sub: "Lab" });
    }
    for (const c of window.SAA.cards || []) {
      if ((c.front + c.back).toLowerCase().includes(needle))
        hits.push({ href: "#/cards", title: c.front, sub: "Flashcard" });
    }
    for (const c of window.SAA.compares || []) {
      const blob = (
        c.title +
        " " +
        c.intro +
        " " +
        (c.rule || "")
      ).toLowerCase();
      if (blob.includes(needle))
        hits.push({
          href: `#/compare/${c.id}`,
          title: c.title,
          sub: "Compare",
        });
    }
    for (const g of window.SAA.glossary || []) {
      if ((g.t + " " + g.d).toLowerCase().includes(needle))
        hits.push({ href: "#/glossary", title: g.t, sub: "Glossary" });
    }
    for (const r of window.SAA.scope || []) {
      if ((r.svc + " " + r.when).toLowerCase().includes(needle))
        hits.push({
          href: "#/scope",
          title: r.svc,
          sub: r.cat + " · in-scope map",
        });
    }
    const pages = [
      {
        href: "#/use",
        title: "Using AWS",
        blob:
          "console cli cloudshell billing identity vpc role " +
          (window.SAA.skills || [])
            .map((s) => s.title + " " + s.proof)
            .join(" ") +
          " " +
          (window.SAA.cliRecipes || []).map((r) => r.t + " " + r.c).join(" "),
        sub: "Hands-on checklist",
      },
      {
        href: "#/guide",
        title: "How to study",
        blob: (window.SAA.guide || "").replace(/<[^>]+>/g, " "),
        sub: "Study guide",
      },
      {
        href: "#/misses",
        title: "What people miss",
        blob: (window.SAA.misses || "").replace(/<[^>]+>/g, " "),
        sub: "Traps",
      },
    ];
    for (const p of pages) {
      if ((p.title + " " + p.blob).toLowerCase().includes(needle))
        hits.push({ href: p.href, title: p.title, sub: p.sub });
    }
    if (hits.length > 40) hits.length = 40;
    view.innerHTML = `<div class="search-results"><h1>Search “${esc(q)}”</h1>${hits.length ? hits.map((h) => `<a href="${h.href}"><strong>${esc(h.title)}</strong><br><span>${esc(h.sub)}</span></a>`).join("") : "<p>Nothing matched. Try IAM, Aurora, NAT, RPO, KMS, Textract.</p>"}</div>`;
  }

  document.getElementById("mode-learn").onclick = () => {
    Store.setMode("learn");
    applyTheme();
    route();
  };
  document.getElementById("mode-exam").onclick = () => {
    Store.setMode("exam");
    applyTheme();
    route();
  };
  document.getElementById("theme-btn").onclick = () => {
    Store.setTheme(Store.get().theme === "dark" ? "light" : "dark");
    applyTheme();
  };
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn)
    menuBtn.onclick = () => {
      if (sidebar) sidebar.classList.add("open");
      if (scrim) scrim.classList.add("on");
    };
  if (scrim) scrim.onclick = closeMenu;
  if (search)
    search.addEventListener("input", () => {
      if ((search.value || "").trim()) {
        if (location.hash && location.hash !== "#/")
          history.replaceState(null, "", "#/");
        renderSearch(search.value.trim());
      } else route();
    });
  window.addEventListener("hashchange", route);
  applyTheme();
  Store.touchStreak();
  route();
})();
