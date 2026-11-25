/*
 * 프로젝트 상세(임시) — 담당 명지
 * 주소: /projects/detail/?p=02  (번호 = 보드 카드 순서, ../projects-data.js)
 *
 * 1. 데이터로 상단 바·목차·본문을 그립니다. 문구는 임시입니다(CONCEPT DEMO).
 * 2. 색은 프로젝트 고유색(data의 color·text)만 씁니다 → --project-bg / --project-fg
 * 3. 왼쪽 목차: 누르면 그 영역으로 이동, 스크롤 위치에 맞춰 현재 항목 표시
 * 4. [data-speed] 요소는 스크롤에 따라 다른 속도로 움직입니다(패럴렉스).
 *    '동작 줄이기'를 켠 사용자에게는 움직이지 않습니다.
 */
(function () {
  "use strict";

  var list = window.ROOT4_PROJECTS || [];
  var TYPE_KO = { Brand: "브랜드", Digital: "디지털", Service: "서비스" };
  var isFile = location.protocol === "file:";
  var BOARD = isFile ? "../index.html" : "../";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function img(file) { return "../assets/" + file; }
  function detailHref(x) { return (isFile ? "index.html" : "./") + "?p=" + x.no; }

  /* 지금 프로젝트 */
  var q = new URLSearchParams(location.search).get("p") || "01";
  var index = list.findIndex(function (x) { return x.no === String(q).padStart(2, "0"); });
  if (index < 0) index = 0;
  var p = list[index];
  var next = list[(index + 1) % list.length];
  var typeKo = TYPE_KO[p.type] || "";

  /* 프로젝트 고유색 */
  var root = document.documentElement;
  root.style.setProperty("--project-bg", p.color || "#ede8de");
  root.style.setProperty("--project-fg", p.text || "#141414");
  /* 보조 글자(옅은 글자색)는 바탕과 대비가 넉넉할 때만 씁니다. 원색 바탕에서는 글자색 그대로 */
  function lum(hex) {
    return [1, 3, 5].map(function (i) { return parseInt(hex.slice(i, i + 2), 16) / 255; })
      .map(function (v) { return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
      .reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  var a = lum(p.color || "#ede8de"), b = lum(p.text || "#141414");
  var contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  if (contrast < 7) root.style.setProperty("--project-muted", "var(--project-fg)");
  var meta = document.querySelector('meta[name="theme-color"]') || document.head.appendChild(document.createElement("meta"));
  meta.name = "theme-color";
  meta.content = p.color || "#ede8de";

  /* 장면에 쓸 사진: 자기 사진 + 같은 분류의 다른 사진 (모자라면 아무 사진) */
  var withImage = list.filter(function (x) { return x.image; });
  var same = withImage.filter(function (x) { return x.type === p.type && x !== p; });
  var others = withImage.filter(function (x) { return x.type !== p.type && x !== p; });
  var pool = (p.image ? [p] : []).concat(same, others);
  function pick(n) { return pool[n % pool.length]; }

  /* Visual 장면: 가운데는 가장 큰 사진, 양옆은 나머지 */
  var visualPool = [pick(1), pick(2), pick(3), pick(0)].filter(function (x, i, a) { return a.indexOf(x) === i; });
  var visualMain = visualPool.slice().sort(function (a, b) { return b.width * b.height - a.width * a.height; })[0];
  var visualSide = visualPool.filter(function (x) { return x !== visualMain; }).concat([visualMain, visualMain]);

  function figure(item, cls, speed) {
    if (!item) return "";
    return (
      '<figure class="projects-figure ' + (cls || "") + '">' +
      '<img src="' + img(item.image) + '" alt="' + esc(item.label + " — " + item.caption) + '"' +
      (speed ? ' data-speed="' + speed + '"' : "") + ' loading="lazy">' +
      "</figure>"
    );
  }

  /* 목차 = 본문 섹션 */
  var toc = [
    { id: "overview", label: "Overview" },
    { id: "concept", label: "Concept" },
    { id: "process", label: "Process" },
    { id: "visual", label: "Visual" },
    { id: "next", label: "Next" },
  ];
  function num(i) { return String(i + 1).padStart(2, "0"); }
  function sectionHead(i) {
    return '<p class="projects-section-label"><span>' + num(i) + "</span>" + toc[i].label.toUpperCase() + "</p>";
  }

  /* ── 상단 바 ── */
  document.querySelector(".projects-bar").innerHTML =
    '<p class="projects-bar-title"><a href="' + BOARD + '">ROOT4</a><span aria-hidden="true">/</span>' + esc(p.label.toUpperCase()) + "</p>" +
    '<div class="projects-bar-actions">' +
    '  <a class="projects-bar-link" href="' + BOARD + '">Index</a>' +
    '  <a class="projects-bar-link" href="' + detailHref(next) + '">Next</a>' +
    '  <a class="projects-bar-link projects-bar-close" href="' + BOARD + '" aria-label="닫고 보드로 돌아가기"><span aria-hidden="true">×</span></a>' +
    "</div>";

  /* ── 목차 ── */
  document.querySelector(".projects-toc").innerHTML =
    "<ol>" + toc.map(function (t, i) {
      return '<li><a href="#' + t.id + '" data-toc="' + t.id + '"><span>' + num(i) + "</span>" + t.label.toUpperCase() + "</a></li>";
    }).join("") + "</ol>";

  var heroVisual = p.image
    ? figure(p, "projects-hero-figure", "-0.08")
    : '<div class="projects-hero-note" data-speed="-0.08">' + p.note + "</div>";

  var steps = [
    { eyebrow: "THINK TOGETHER", title: "질문으로 시작합니다.", body: "기획·디자인·개발이 같은 보드 앞에 모여 " + esc(p.caption) + "에 대한 질문부터 나눕니다. 무엇을 바꾸고 무엇을 지킬지 먼저 정합니다." },
    { eyebrow: "MAKE IT REAL", title: "경험으로 구체화합니다.", body: "레퍼런스와 스케치를 한 화면에 올려 방향을 좁힙니다. 말로 합의한 것을 바로 화면과 프로토타입으로 확인합니다." },
    { eyebrow: "KEEP EVOLVING", title: "운영하며 더 나아갑니다.", body: "만든 뒤에도 보드는 닫히지 않습니다. 사용자의 반응을 다시 보드에 붙이고, 다음 질문으로 이어 갑니다." },
  ];

  var html =
    /* 01 Overview */
    '<section class="projects-section projects-overview" id="overview" aria-labelledby="projects-title">' +
    sectionHead(0) +
    '  <div class="projects-hero">' +
    '    <div class="projects-hero-copy" data-speed="0.05">' +
    '      <p class="projects-eyebrow">ROOT4 · ' + esc(p.type.toUpperCase()) + " EXPERIENCE · " + p.no + "</p>" +
    '      <h1 id="projects-title" class="projects-hero-title">' + esc(p.label) + "</h1>" +
    '      <p class="projects-hero-caption">' + esc(p.caption) + "</p>" +
    "    </div>" +
    "    " + heroVisual +
    "  </div>" +
    '  <div class="projects-intro">' +
    '    <h2 class="projects-heading">' + typeKo + " 경험을<br>하나의 보드에서 정리했습니다.</h2>" +
    '    <p class="projects-body">' + esc(p.label) + " — 기획·디자인·개발이 한 보드에서 방향을 맞춘 " + typeKo + " 경험 컨셉입니다. 레퍼런스에서 출발해 사람의 맥락과 브랜드의 목소리를 함께 정리했습니다.</p>" +
    '    <dl class="projects-meta">' +
    "      <div><dt>분류</dt><dd>" + esc(p.type) + " experience</dd></div>" +
    "      <div><dt>함께한 팀</dt><dd>기획 · 디자인 · 개발</dd></div>" +
    "      <div><dt>기간</dt><dd>2026 · 8주 (예시)</dd></div>" +
    "      <div><dt>상태</dt><dd>CONCEPT DEMO</dd></div>" +
    "    </dl>" +
    "  </div>" +
    "</section>" +

    /* 02 Concept: 한 문장 띠 */
    '<section class="projects-section projects-concept" id="concept" aria-label="Concept">' +
    sectionHead(1) +
    '  <div class="projects-quote">' +
    '    <div class="projects-quote-bg" aria-hidden="true"><img src="' + img(pick(0).image) + '" alt="" data-speed="0.2"></div>' +
    '    <p class="projects-quote-text" data-speed="-0.05">같은 보드를 보며,<br>같은 방향으로 만듭니다.</p>' +
    "  </div>" +
    "</section>" +

    /* 03 Process: 장면 3개 */
    '<section class="projects-section projects-process" id="process" aria-label="Process">' +
    sectionHead(2) +
    steps.map(function (s, i) {
      return (
        '<article class="projects-scene' + (i % 2 ? " projects-scene--reverse" : "") + '">' +
        '  <div class="projects-scene-media">' + figure(pick(i), "projects-scene-figure", "0.1") + "</div>" +
        '  <div class="projects-scene-copy" data-speed="-0.05">' +
        '    <p class="projects-eyebrow">0' + (i + 1) + " / " + s.eyebrow + "</p>" +
        '    <h3 class="projects-heading">' + s.title + "</h3>" +
        '    <p class="projects-body">' + s.body + "</p>" +
        "  </div>" +
        "</article>"
      );
    }).join("") +
    "</section>" +

    /* 04 Visual: 스크롤하는 동안 화면에 고정된 채, 가운데 사진이 카드 크기에서 화면 전체로 커집니다.
       양옆 사진은 바깥으로 밀려나며 사라지고, 다 덮으면 한 줄 설명이 나타납니다. */
    '<section class="projects-visual" id="visual" aria-label="Visual">' +
    '  <div class="projects-visual-head">' + sectionHead(3) + "</div>" +
    '  <div class="projects-stage-track">' +
    '    <div class="projects-stage">' +
    '      <figure class="projects-stage-side projects-stage-side--l"><img src="' + img(visualSide[0].image) + '" alt="' + esc(visualSide[0].label) + '"></figure>' +
    '      <figure class="projects-stage-side projects-stage-side--r"><img src="' + img(visualSide[1].image) + '" alt="' + esc(visualSide[1].label) + '"></figure>' +
    '      <figure class="projects-stage-main"><img src="' + img(visualMain.image) + '" alt="' + esc(visualMain.label + " — " + visualMain.caption) + '"></figure>' +
    '      <div class="projects-stage-caption">' +
    '        <p class="projects-eyebrow">VISUAL / ' + esc(visualMain.label.toUpperCase()) + "</p>" +
    '        <p class="projects-stage-title">한 장면으로<br>방향을 보여 줍니다.</p>' +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</section>" +

    /* 05 Next */
    '<section class="projects-section projects-next" id="next" aria-labelledby="projects-next-title">' +
    sectionHead(4) +
    '  <a class="projects-next-card" href="' + detailHref(next) + '" style="--next-bg:' + (next.color || "#ede8de") + ";--next-fg:" + (next.text || "#141414") + '">' +
    (next.image ? figure(next, "projects-next-figure") : '<div class="projects-next-figure projects-next-note">' + next.note + "</div>") +
    '    <div class="projects-next-copy">' +
    '      <p class="projects-eyebrow">NEXT PROJECT / ' + next.no + "</p>" +
    '      <h2 id="projects-next-title" class="projects-heading">' + esc(next.label) + "</h2>" +
    '      <p class="projects-body">' + esc(next.caption) + "</p>" +
    "    </div>" +
    "  </a>" +
    '  <div class="projects-actions">' +
    '    <a class="projects-btn projects-btn--ghost" href="' + BOARD + '">← 보드로 돌아가기</a>' +
    '    <a class="projects-btn projects-btn--primary" href="' + detailHref(next) + '">다음 프로젝트 <span aria-hidden="true">↗</span></a>' +
    "  </div>" +
    '  <p class="projects-demo-note">CONCEPT DEMO · 보드의 레퍼런스 이미지를 적용한 예시입니다. 실제 수행 프로젝트가 아닙니다.</p>' +
    "</section>";

  var main = document.querySelector(".projects-detail");
  main.innerHTML = html;
  document.title = p.label + " — PROJECT — ROOT4";

  /* ── 들어오는 장면: 보드에서 덮은 색이 걷힙니다 ── */
  var cover = document.querySelector(".projects-cover");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add("is-entered"); });
  });
  cover.addEventListener("transitionend", function () { cover.hidden = true; });
  if (reduce.matches) cover.hidden = true;
  /* 뒤로 가기로 다시 왔을 때(bfcache)도 덮개가 남지 않게 */
  window.addEventListener("pageshow", function () { document.body.classList.add("is-entered"); });

  /* ── 목차: 현재 위치 표시 ── */
  var links = {};
  document.querySelectorAll("[data-toc]").forEach(function (a) { links[a.getAttribute("data-toc")] = a; });
  function setActive(id) {
    Object.keys(links).forEach(function (k) {
      var on = k === id;
      links[k].classList.toggle("is-active", on);
      if (on) links[k].setAttribute("aria-current", "location");
      else links[k].removeAttribute("aria-current");
    });
    /* 모바일 가로 목차: 현재 항목이 보이게 */
    var a = links[id];
    if (a && a.parentNode.parentNode.scrollWidth > a.parentNode.parentNode.clientWidth) {
      a.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce.matches ? "auto" : "smooth" });
    }
  }
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    toc.forEach(function (t) { spy.observe(document.getElementById(t.id)); });
  }
  setActive(location.hash ? location.hash.slice(1) : "overview");

  /* ── 패럴렉스 ── */
  var movers = [].slice.call(main.querySelectorAll("[data-speed]"));
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    movers.forEach(function (node) {
      if (reduce.matches) { node.style.transform = ""; return; }
      var box = (node.closest("figure, .projects-quote, .projects-hero, article") || node).getBoundingClientRect();
      if (box.bottom < -vh || box.top > vh * 2) return;
      var center = box.top + box.height / 2 - vh / 2;
      node.style.transform = "translate3d(0," + (center * parseFloat(node.getAttribute("data-speed"))).toFixed(1) + "px,0)";
    });
  }
  /* ── Visual 고정 장면 ──
   * 진행도 0 → 0.6: 가운데 사진이 카드(세로 3:4) 크기에서 무대 전체로 커지고 모서리가 사라짐
   *         0 → 0.5: 양옆 사진이 바깥으로 밀려나며 사라짐
   *       0.62 이상: 한 줄 설명이 나타남 (아래 색 그라데이션 + 한 글자씩)
   * 동작 줄이기면 CSS가 다 덮은 상태로 고정해 보여 줍니다. */
  var track = main.querySelector(".projects-stage-track");
  var stage = main.querySelector(".projects-stage");
  var stageMain = main.querySelector(".projects-stage-main");
  var stageImg = stageMain.querySelector("img");
  var sides = main.querySelectorAll(".projects-stage-side");
  var caption = main.querySelector(".projects-stage-caption");
  function clamp(v) { return Math.max(0, Math.min(1, v)); }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function updateStage() {
    if (reduce.matches) return;
    var t = track.getBoundingClientRect();
    var W = stage.clientWidth, H = stage.clientHeight;
    var scrollable = t.height - H;
    var p = clamp(-t.top / (scrollable || 1));
    var grow = ease(clamp(p / 0.6));
    /* 시작 틀: 높이의 62%, 세로 3:4. 좁은 화면이면 폭의 58%까지 */
    var h0 = Math.min(H * 0.62, (W * 0.58) * 4 / 3), w0 = h0 * 3 / 4;
    var x = (W - w0) / 2 * (1 - grow), y = (H - h0) / 2 * (1 - grow);
    var r = 12 * (1 - grow);
    stageMain.style.clipPath = "inset(" + y.toFixed(1) + "px " + x.toFixed(1) + "px " + y.toFixed(1) + "px " + x.toFixed(1) + "px round " + r.toFixed(1) + "px)";
    stageImg.style.transform = "scale(" + (1.18 - 0.18 * grow).toFixed(3) + ")";
    var out = ease(clamp(p / 0.5));
    sides.forEach(function (s, i) {
      var dir = i === 0 ? -1 : 1;
      s.style.setProperty("--w0", w0 + "px");
      s.style.setProperty("--h0", h0 + "px");
      s.style.transform = "translate(calc(-50% + " + (dir * (w0 * 0.5 + 24 + w0 * 0.36 + out * W * 0.45)).toFixed(1) + "px), calc(-50% + " + (dir * h0 * 0.08 - out * H * 0.1).toFixed(1) + "px)) scale(" + (1 - out * 0.15).toFixed(3) + ")";
      s.style.opacity = (1 - out).toFixed(3);
    });
    var on = p > 0.62;
    caption.classList.toggle("is-on", on);
    if (on) caption.querySelector(".projects-split, .projects-stage-title").classList.add("is-typed");
  }

  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); updateStage(); }); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (reduce.addEventListener) reduce.addEventListener("change", update);
  update();
  updateStage();

  /* ── 주요 문구: 영역에 들어오면 한 글자씩 나타나기 ──
   * 글자마다 <span class="projects-char" style="--i:n">로 나눕니다. 단어는 줄바꿈 때 쪼개지지 않게 묶습니다.
   * 화면 읽기 프로그램에는 원래 문장 한 번만 읽히게 aria-label을 두고 글자 묶음은 숨깁니다. */
  var SPLIT = ".projects-stage-title, .projects-hero-title, .projects-intro .projects-heading, .projects-quote-text, .projects-scene .projects-heading, .projects-next-copy .projects-heading";
  function splitChars(el) {
    var label = el.textContent.replace(/\s+/g, " ").trim();
    var count = 0;
    var nodes = [].slice.call(el.childNodes);
    var holder = document.createElement("span");
    holder.setAttribute("aria-hidden", "true");
    nodes.forEach(function (n) {
      if (n.nodeType !== 3) { holder.appendChild(n); return; } // <br> 등은 그대로
      n.textContent.split(/(\s+)/).forEach(function (word) {
        if (!word) return;
        if (/^\s+$/.test(word)) { holder.appendChild(document.createTextNode(" ")); return; }
        var w = document.createElement("span");
        w.className = "projects-word";
        Array.from(word).forEach(function (ch) {
          var c = document.createElement("span");
          c.className = "projects-char";
          c.textContent = ch;
          c.style.setProperty("--i", count++);
          w.appendChild(c);
        });
        holder.appendChild(w);
      });
    });
    el.textContent = "";
    el.appendChild(holder);
    el.setAttribute("aria-label", label);
    el.classList.add("projects-split");
    /* 긴 문장도 0.9초 안에 다 나오도록 글자 사이 간격을 줄입니다 */
    el.style.setProperty("--step", Math.min(32, Math.round(900 / Math.max(count, 1))) + "ms");
  }
  var splitTargets = main.querySelectorAll(SPLIT);
  if (!reduce.matches) splitTargets.forEach(splitChars);
  if ("IntersectionObserver" in window && !reduce.matches) {
    var textIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-typed"); textIo.unobserve(e.target); } });
    }, { threshold: 0.3 });
    splitTargets.forEach(function (n) { if (!n.classList.contains("projects-stage-title")) textIo.observe(n); }); // Visual 설명은 updateStage가 켬
  } else {
    splitTargets.forEach(function (n) { n.classList.add("is-typed"); });
  }

  /* 장면이 화면에 들어오면 나타나기 */
  var reveal = main.querySelectorAll(".projects-intro, .projects-scene, .projects-next-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveal.forEach(function (n) { io.observe(n); });
  } else {
    reveal.forEach(function (n) { n.classList.add("is-in"); });
  }
})();
