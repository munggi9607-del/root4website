/*
 * 프로젝트 상세(임시) — 담당 명지
 * 주소: /projects/detail/?p=02  (번호 = 보드 카드 순서, ../projects-data.js)
 *
 * 1. 데이터로 화면을 그립니다. 실제 내용이 정해지기 전이라 문구는 임시입니다(CONCEPT DEMO).
 * 2. [data-speed]가 붙은 요소를 스크롤에 따라 조금씩 다른 속도로 움직입니다(패럴렉스).
 *    '동작 줄이기'를 켠 사용자에게는 움직이지 않습니다.
 */
(function () {
  "use strict";

  var list = window.ROOT4_PROJECTS || [];
  var TYPE_KO = { Brand: "브랜드", Digital: "디지털", Service: "서비스" };

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function img(file) { return "../assets/" + file; }
  function detailHref(p) { return "./?p=" + p.no; }

  /* 지금 프로젝트 */
  var q = new URLSearchParams(location.search).get("p") || "01";
  var index = list.findIndex(function (p) { return p.no === String(q).padStart(2, "0"); });
  if (index < 0) index = 0;
  var p = list[index];
  var next = list[(index + 1) % list.length];
  var typeKo = TYPE_KO[p.type] || "";

  /* 장면에 쓸 사진: 자기 사진 + 같은 분류의 다른 사진 2장 (모자라면 아무 사진) */
  var withImage = list.filter(function (x) { return x.image; });
  var same = withImage.filter(function (x) { return x.type === p.type && x !== p; });
  var others = withImage.filter(function (x) { return x.type !== p.type && x !== p; });
  var pool = (p.image ? [p] : []).concat(same, others);
  function pick(n) { return pool[n % pool.length]; }

  function figure(item, cls, speed) {
    if (!item) return "";
    return (
      '<figure class="projects-figure ' + (cls || "") + '">' +
      '<img src="' + img(item.image) + '" alt="' + esc(item.label + " — " + item.caption) + '"' +
      (speed ? ' data-speed="' + speed + '"' : "") + " loading=\"lazy\">" +
      "</figure>"
    );
  }

  var heroVisual = p.image
    ? figure(p, "projects-hero-figure", "-0.12")
    : '<div class="projects-hero-note" data-speed="-0.12">' + p.note + "</div>";
  var backdrop = pick(0);

  var steps = [
    { eyebrow: "01 / THINK TOGETHER", title: "질문으로 시작합니다.", body: "기획·디자인·개발이 같은 보드 앞에 모여 " + esc(p.caption) + "에 대한 질문부터 나눕니다. 무엇을 바꾸고 무엇을 지킬지 먼저 정합니다." },
    { eyebrow: "02 / MAKE IT REAL", title: "경험으로 구체화합니다.", body: "레퍼런스와 스케치를 한 화면에 올려 방향을 좁힙니다. 말로 합의한 것을 바로 화면과 프로토타입으로 확인합니다." },
    { eyebrow: "03 / KEEP EVOLVING", title: "운영하며 더 나아갑니다.", body: "만든 뒤에도 보드는 닫히지 않습니다. 사용자의 반응을 다시 보드에 붙이고, 다음 질문으로 이어 갑니다." },
  ];

  var html =
    /* ① 대표 장면 */
    '<section class="projects-hero" aria-labelledby="projects-title">' +
    '  <div class="projects-hero-bg" aria-hidden="true"><img src="' + img(backdrop.image) + '" alt="" data-speed="0.3"></div>' +
    '  <div class="projects-hero-inner">' +
    '    <div class="projects-hero-copy" data-speed="0.08">' +
    '      <p class="projects-eyebrow projects-eyebrow--inverse">PROJECT ' + p.no + " / " + esc(p.type.toUpperCase()) + " EXPERIENCE</p>" +
    '      <h1 id="projects-title" class="projects-hero-title">' + esc(p.label) + "</h1>" +
    '      <p class="projects-hero-caption">' + esc(p.caption) + "</p>" +
    "    </div>" +
    "    " + heroVisual +
    "  </div>" +
    '  <p class="projects-scroll-hint" aria-hidden="true">SCROLL ↓</p>' +
    "</section>" +

    /* ② 개요 */
    '<section class="projects-wrap projects-overview" aria-labelledby="projects-overview-title">' +
    '  <div class="projects-overview-head">' +
    '    <p class="projects-eyebrow">OVERVIEW</p>' +
    '    <h2 id="projects-overview-title" class="projects-heading">' + esc(p.caption) + "</h2>" +
    "  </div>" +
    '  <div class="projects-overview-body">' +
    '    <p class="projects-lead">' + esc(p.label) + " — 기획·디자인·개발이 한 보드에서 방향을 맞춘 " + typeKo + " 경험 컨셉입니다. 레퍼런스에서 출발해 사람의 맥락과 브랜드의 목소리를 함께 정리했습니다.</p>" +
    '    <dl class="projects-meta">' +
    "      <div><dt>분류</dt><dd>" + esc(p.type) + " experience</dd></div>" +
    "      <div><dt>함께한 팀</dt><dd>기획 · 디자인 · 개발</dd></div>" +
    "      <div><dt>기간</dt><dd>2026 · 8주 (예시)</dd></div>" +
    "      <div><dt>상태</dt><dd>CONCEPT DEMO</dd></div>" +
    "    </dl>" +
    "  </div>" +
    "</section>" +

    /* ③ 과정 장면 3개: 사진과 글이 다른 속도로 지나갑니다 */
    '<section class="projects-wrap projects-scenes" aria-label="진행 과정">' +
    steps.map(function (s, i) {
      return (
        '<article class="projects-scene' + (i % 2 ? " projects-scene--reverse" : "") + '">' +
        '  <div class="projects-scene-media">' + figure(pick(i), "projects-scene-figure", "0.12") + "</div>" +
        '  <div class="projects-scene-copy" data-speed="-0.06">' +
        '    <p class="projects-eyebrow">' + s.eyebrow + "</p>" +
        '    <h3 class="projects-heading">' + s.title + "</h3>" +
        '    <p class="projects-body">' + s.body + "</p>" +
        "  </div>" +
        "</article>"
      );
    }).join("") +
    "</section>" +

    /* ④ 한 문장 띠 */
    '<section class="projects-quote" aria-label="한 문장">' +
    '  <div class="projects-quote-bg" aria-hidden="true"><img src="' + img(pick(0).image) + '" alt="" data-speed="0.25"></div>' +
    '  <p class="projects-quote-text" data-speed="-0.05">같은 보드를 보며,<br>같은 방향으로 만듭니다.</p>' +
    "</section>" +

    /* ⑤ 다음 프로젝트 */
    '<section class="projects-wrap projects-next" aria-labelledby="projects-next-title">' +
    '  <a class="projects-next-card" href="' + detailHref(next) + '">' +
    (next.image ? figure(next, "projects-next-figure") : '<div class="projects-next-figure projects-next-note">' + next.note + "</div>") +
    '    <div class="projects-next-copy">' +
    '      <p class="projects-eyebrow">NEXT PROJECT / ' + next.no + "</p>" +
    '      <h2 id="projects-next-title" class="projects-heading">' + esc(next.label) + "</h2>" +
    '      <p class="projects-body">' + esc(next.caption) + "</p>" +
    "    </div>" +
    "  </a>" +
    '  <div class="projects-actions">' +
    '    <a class="projects-btn projects-btn--ghost" data-route="projects" href="../">← 보드로 돌아가기</a>' +
    '    <a class="projects-btn projects-btn--primary" href="' + detailHref(next) + '">다음 프로젝트 <span aria-hidden="true">↗</span></a>' +
    "  </div>" +
    '  <p class="projects-demo-note">CONCEPT DEMO · 보드의 레퍼런스 이미지를 적용한 예시입니다. 실제 수행 프로젝트가 아닙니다.</p>' +
    "</section>";

  var main = document.querySelector(".projects-detail");
  main.innerHTML = html;
  document.title = p.label + " — PROJECT — ROOT4";
  if (window.ROOT4 && ROOT4.subcrumb) ROOT4.subcrumb(p.label);
  /* AppShell이 이미 그렸다면 새로 넣은 data-route 링크도 채웁니다 */
  main.querySelectorAll("a[data-route]").forEach(function (a) {
    if (window.ROOT4) a.setAttribute("href", ROOT4.href(a.getAttribute("data-route")));
  });

  /* ── 패럴렉스 ── */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var movers = [].slice.call(main.querySelectorAll("[data-speed]"));
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    movers.forEach(function (node) {
      if (reduce.matches) { node.style.transform = ""; return; }
      var box = (node.closest("figure, section, article") || node).getBoundingClientRect();
      if (box.bottom < -vh || box.top > vh * 2) return;
      var center = box.top + box.height / 2 - vh / 2;
      var y = center * parseFloat(node.getAttribute("data-speed"));
      node.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
    });
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (reduce.addEventListener) reduce.addEventListener("change", update);
  update();

  /* 장면이 화면에 들어오면 나타나기 */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    main.querySelectorAll(".projects-scene, .projects-overview, .projects-next").forEach(function (n) { io.observe(n); });
  } else {
    main.querySelectorAll(".projects-scene, .projects-overview, .projects-next").forEach(function (n) { n.classList.add("is-in"); });
  }
})();
