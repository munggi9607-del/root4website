/*
 * Projects 화면 전용 스크립트 — 담당 명지
 *
 * 시안 보드는 자기 다크 모드(body.studio-dark)를 따로 가지고 있습니다.
 * 공통 AppShell의 테마(<html data-theme>)가 바뀌면 시안 보드도 같은 테마로 맞춥니다.
 * 시안의 테마 버튼(#studio-theme)은 숨겨져 있고, 여기서만 대신 누릅니다.
 */
(function () {
  "use strict";

  function wantDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function sync() {
    var sianDark = document.body.classList.contains("studio-dark");
    if (sianDark === wantDark()) return;
    var btn = document.getElementById("studio-theme");
    if (btn) btn.click();
  }

  /*
   * 프로젝트 상세: 시안은 카드를 누르면 팝업(#detail)을 엽니다(showProject).
   * 2026-11-25부터 팝업 대신 상세페이지(detail/?p=02)로 이동합니다.
   * 번호 = 보드 카드 순서 = ../projects-data.js 순서.
   */
  /*
   * 색 확대 전환: 누른 카드 위에 그 프로젝트의 바탕색이 먼저 덮이고(0.18초),
   * 그 색 면이 화면 전체로 커진 뒤(0.6초) 상세페이지로 넘어갑니다.
   * 상세페이지는 같은 색 덮개에서 시작해 걷히므로 한 장면처럼 이어집니다.
   * '동작 줄이기'를 켠 사용자는 바로 이동합니다.
   */
  var opening = false;
  var overlay = null;

  function sourceBox(i) {
    // 보드 카드 → 모바일 목록에서 누른 항목 → 화면 가운데 순서로 찾습니다.
    var node = document.querySelectorAll("#projects .node")[i];
    var cands = [node && (node.querySelector("img") || node.querySelector(".art") || node), document.activeElement];
    for (var k = 0; k < cands.length; k++) {
      var el = cands[k];
      if (!el || el === document.body) continue;
      var r = el.getBoundingClientRect();
      if (r.width > 8 && r.height > 8 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) return r;
    }
    var s = Math.min(innerWidth, innerHeight) * 0.3;
    return { left: (innerWidth - s) / 2, top: (innerHeight - s) / 2, width: s, height: s };
  }

  function openDetail(i) {
    if (opening) return;
    var no = String(i + 1).padStart(2, "0");
    var url = new URL(location.protocol === "file:" ? "detail/index.html" : "detail/", location.href);
    url.search = "?p=" + no;
    var data = (window.ROOT4_PROJECTS || [])[i] || {};
    /* Archive 글로 연결된 카드(예: 01 About the project → 홈페이지 제작기) */
    if (data.archive && window.ROOT4) {
      url = new URL(ROOT4.href("archive") + (location.protocol === "file:" ? "post/index.html" : "post/") + "?id=" + encodeURIComponent(data.archive));
      data = { color: getComputedStyle(document.body).getPropertyValue("--surface-panel").trim() || "#ffffff" };
    }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !document.body.animate) { location.href = url.href; return; }

    opening = true;
    var r = sourceBox(i);
    overlay = document.createElement("div");
    overlay.className = "projects-zoom";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.background = data.color || "#ede8de";
    document.body.appendChild(overlay);

    var card = { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: "12px" };
    var full = { left: "0px", top: "0px", width: innerWidth + "px", height: innerHeight + "px", borderRadius: "0px" };
    // 1) 카드 위에 색이 덮임  2) 색 면이 화면 전체로 커짐
    var zoom = overlay.animate([
      Object.assign({ opacity: 0 }, card),
      Object.assign({ opacity: 1, offset: 0.23 }, card),
      Object.assign({ opacity: 1 }, full),
    ], { duration: 780, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" });
    zoom.onfinish = function () { location.href = url.href; };
  }

  // 상세에서 뒤로 가기로 돌아왔을 때(bfcache) 덮개가 남지 않게
  window.addEventListener("pageshow", function () {
    if (overlay) { overlay.remove(); overlay = null; }
    opening = false;
  });

  // 시안 스크립트가 처음 상태를 다 그린 뒤에 맞춥니다.
  window.addEventListener("load", function () {
    window.showProject = openDetail;
    sync();
    new MutationObserver(sync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  });
})();

/*
 * 보드 사이사이의 다른 메뉴 카드 — 담당 명지 (2026-11-26)
 *
 * 1. RootKit 썸네일: 사진 카드와 다르게 '살아 있는 키트 미리보기'. 견본 하나가 몇 초마다 모서리·간격을 바꿉니다.
 * 2. Archive 최근 글 5개: 글 위주 카드. Archive 목록(../archive/)을 읽어 위에서부터 5개를 꺼냅니다.
 * - 프로젝트 카드(.node)가 아니므로 보드 번호(01–20)와 필터 개수에 섞이지 않습니다.
 * - 필터가 All일 때만 보입니다. 누르면 그 메뉴(RootKit) / 그 글 상세(Archive)로 갑니다.
 * - 모바일 List 보기에도 같이 섞습니다.
 */
(function () {
  "use strict";

  var isFile = location.protocol === "file:";
  function menu(id) { return window.ROOT4 ? ROOT4.href(id) : "../" + id + "/"; }
  function postHref(id) { return menu("archive") + (isFile ? "post/index.html" : "post/") + "?id=" + encodeURIComponent(id); }
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  /* 보드 위 자리 (보드 좌표, 프로젝트 카드 사이 빈자리) */
  var SPOT_ROOTKIT = [1520, 400];
  var SPOTS_ARCHIVE = [[850, 900], [70, 1250], [1530, 1080], [850, 1190], [1530, 1330]];

  function rootkitCard(tag) {
    var el = document.createElement(tag);
    el.className = "projects-extra projects-kit";
    el.href = menu("rootkit");
    el.setAttribute("data-extra-href", el.href);
    el.setAttribute("aria-label", "RootKit — ROOT4 디자인시스템 키트 보기");
    el.innerHTML =
      '<span class="projects-kit-eyebrow"><i aria-hidden="true"></i>ROOTKIT · DESIGN SYSTEM</span>' +
      '<span class="projects-kit-stage" aria-hidden="true">' +
      '  <span class="projects-kit-sample">Button</span>' +
      '  <span class="projects-kit-swatches"><b></b><b></b><b></b></span>' +
      '  <span class="projects-kit-type">Aa <small>30 / 500</small></span>' +
      "</span>" +
      '<span class="projects-kit-title">Build Faster,<br>Create Freely.</span>' +
      '<span class="projects-kit-cta">Try the kit <span aria-hidden="true">↗</span></span>';
    return el;
  }

  function archiveCard(post, tag) {
    var el = document.createElement(tag);
    el.className = "projects-extra projects-post";
    el.href = postHref(post.id);
    el.setAttribute("data-extra-href", el.href);
    el.innerHTML =
      '<span class="projects-post-meta">' + esc(post.meta.toUpperCase()) + "</span>" +
      '<span class="projects-post-title">' + esc(post.title) + "</span>" +
      '<span class="projects-post-desc">' + esc(post.desc) + "</span>" +
      '<span class="projects-post-foot"><span>Archive</span><span aria-hidden="true">↗</span></span>';
    return el;
  }

  function place(el, spot) {
    /* 보드 간격을 넓힌 배율(ROOT4_BOARD_SPREAD)을 같이 적용 */
    var S = window.ROOT4_BOARD_SPREAD || { x: 1, y: 1, ox: 0, oy: 0 };
    el.style.left = Math.round(S.ox + (spot[0] - S.ox) * S.x) + "px";
    el.style.top = Math.round(S.oy + (spot[1] - S.oy) * S.y) + "px";
  }

  function readPosts() {
    if (isFile) return Promise.resolve([]);
    return fetch(menu("archive"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var linked = (window.ROOT4_PROJECTS || []).map(function (p) { return p.archive; }).filter(Boolean);
        var cards = [].filter.call(doc.querySelectorAll(".archive-card[id]"), function (li) { return linked.indexOf(li.id) < 0; });
        return cards.slice(0, 5).map(function (li) {
          var t = function (sel) { var n = li.querySelector(sel); return n ? n.textContent.trim() : ""; };
          return { id: li.id, meta: t(".archive-card-meta"), title: t(".archive-card-title"), desc: t(".archive-card-desc") };
        });
      })
      .catch(function () { return []; });
  }

  function build() {
    var world = document.getElementById("world");
    if (!world) return;

    /* 보드 */
    var kit = rootkitCard("a");
    place(kit, SPOT_ROOTKIT);
    world.appendChild(kit);

    /* 모바일 List */
    var gallery = document.querySelector(".mobile-project-gallery");
    var mobileCards = gallery ? gallery.querySelectorAll(".mobile-project-card") : [];
    if (gallery && mobileCards[1]) mobileCards[1].after(rootkitCard("a"));

    readPosts().then(function (posts) {
      posts.forEach(function (post, i) {
        var c = archiveCard(post, "a");
        place(c, SPOTS_ARCHIVE[i]);
        world.appendChild(c);
        var anchor = mobileCards[(i + 1) * 4 - 1];
        if (anchor) anchor.after(archiveCard(post, "a"));
      });
    });

    /* 누르기: 보드는 끌어서 둘러보기 때문에 캔버스가 포인터를 잡습니다. 끌지 않고 뗐을 때만 이동합니다. */
    var canvas = document.getElementById("canvas") || world.parentElement;
    canvas.addEventListener("pointerup", function (e) {
      var dragged = false;
      try { dragged = typeof moved !== "undefined" && moved; } catch (err) {}
      if (dragged) return;
      var hit = document.elementFromPoint(e.clientX, e.clientY);
      var card = hit && hit.closest("[data-extra-href]");
      if (card && world.contains(card)) location.href = card.getAttribute("data-extra-href");
    });

    /* 필터: All일 때만 보이기 */
    document.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        var all = b.getAttribute("data-filter") === "all";
        document.querySelectorAll("#world .projects-extra").forEach(function (c) {
          c.classList.toggle("is-filtered", !all);
          c.inert = !all;
        });
      });
    });
  }

  window.addEventListener("load", build);
})();

/*
 * 보드 정리 (2026-11-26) — 담당 명지
 * 1. 첫 카드(About the project)를 '홈페이지 제작기' 강조 카드로: 누르면 Archive 글 project-story-04
 * 2. 카드 사이 간격 넓히기: 모든 카드 자리를 보드 왼쪽 위 기준으로 가로 1.3배·세로 1.25배 퍼뜨림
 *    (시안 카메라가 쓰는 positions 배열도 같이 바꿔서, 투어·포커스가 새 자리를 따라갑니다)
 */
window.ROOT4_BOARD_SPREAD = { x: 1.3, y: 1.25, ox: 70, oy: 70 };
(function () {
  "use strict";
  var S = window.ROOT4_BOARD_SPREAD;

  function makingOf() {
    var node = document.querySelectorAll("#world .node")[0];
    if (!node || node.classList.contains("projects-makingof")) return;
    node.classList.add("projects-makingof");
    var art = node.querySelector(".art");
    if (art) {
      art.removeAttribute("style");
      art.innerHTML =
        '<span class="projects-mo-eyebrow"><i aria-hidden="true"></i>ARCHIVE · MAKING OF</span>' +
        '<span class="projects-mo-title">이 스튜디오는<br>어떻게 만들어졌을까?</span>' +
        '<span class="projects-mo-cta">제작기 읽기 <span aria-hidden="true">↗</span></span>';
    }
    var cap = node.querySelector(".minimal-caption");
    if (cap) cap.innerHTML = "<strong>Making of ROOT4</strong><span>웹사이트 제작기 · Archive</span><span class=\"minimal-arrow\">↗</span>";
    node.setAttribute("aria-label", "Making of ROOT4 — 이 스튜디오는 어떻게 만들어졌을까? 제작기 읽기");
    /* 시안의 팀 대화·검색이 쓰는 이름 */
    try { titles[0] = "Making of ROOT4 — 웹사이트 제작기"; desc[0] = "ROOT4 Open Studio의 컨셉과 브랜딩, 설계 과정을 소개하는 제작기입니다."; } catch (e) {}
    /* 왼쪽 팀 대화: 자동 투어가 이 카드에 오면 제작기 이야기를 합니다 (시안 reviewScenes의 0번 장면) */
    try {
      var scene = reviewScenes.filter(function (sc) { return sc.id === 0; })[0];
      if (scene) scene.lines = [
        ["기획팀 · 준", "이 카드는 우리 사이트 제작기예요. 방문자와 함께 완성하는 스튜디오라는 컨셉에서 출발했어요."],
        ["디자인팀 · 민지", "조용한 회색 바탕에 보라 한 점. 색과 글자 규칙을 먼저 정하고 화면을 만들었어요."],
        ["개발팀 · 현우", "규칙을 한 벌로 맞춰 두니, 여럿이 나눠 만든 메뉴가 하나의 사이트로 합쳐졌어요."],
      ];
    } catch (e) {}
    /* 모바일 List 첫 카드 */
    var m = document.querySelector(".mobile-project-card");
    if (m) {
      m.classList.add("projects-makingof-mobile");
      m.innerHTML = '<div class="mobile-card-thumb mobile-note-thumb">Making of ROOT4</div><div class="mobile-card-copy"><strong>이 스튜디오는 어떻게 만들어졌을까?</strong><small>Archive / Making of</small></div>';
    }
  }

  function spreadNodes() {
    var world = document.getElementById("world");
    if (!world || world.dataset.spread) return;
    world.dataset.spread = "1";
    document.querySelectorAll("#world .node").forEach(function (n, i) {
      var l = parseFloat(n.style.left) || n.offsetLeft, t = parseFloat(n.style.top) || n.offsetTop;
      var nl = S.ox + (l - S.ox) * S.x, nt = S.oy + (t - S.oy) * S.y;
      n.style.left = Math.round(nl) + "px";
      n.style.top = Math.round(nt) + "px";
      try { if (positions[i]) positions[i] = [Math.round(nl), Math.round(nt)]; } catch (e) {}
    });
    world.style.width = Math.round((parseFloat(world.style.width) || 2000) * S.x) + "px";
    world.style.height = Math.round((parseFloat(world.style.height) || 2400) * S.y) + "px";
  }

  /* 퍼뜨린 보드 전체가 캔버스에 들어오게 맞추기 (시안의 '원위치' 버튼도 이 계산으로) */
  function fitBoard() {
    try {
      var canvas = document.getElementById("canvas");
      var items = [].filter.call(document.querySelectorAll("#world .node, #world .projects-extra"), function (e) { return e.offsetWidth; });
      if (!canvas || !items.length || canvas.clientWidth < 300) return;
      var L = Math.min.apply(null, items.map(function (e) { return e.offsetLeft; }));
      var T = Math.min.apply(null, items.map(function (e) { return e.offsetTop; }));
      var R = Math.max.apply(null, items.map(function (e) { return e.offsetLeft + e.offsetWidth; }));
      var B = Math.max.apply(null, items.map(function (e) { return e.offsetTop + e.offsetHeight; }));
      var w = canvas.clientWidth, h = canvas.clientHeight, top = 150, pad = 40;
      scale = Math.max(0.12, Math.min((w - pad * 2) / (R - L), (h - top - pad) / (B - T), 0.85));
      x = (w - (R - L) * scale) / 2 - L * scale;
      y = top + (h - top - pad - (B - T) * scale) / 2 - T * scale;
      transform();
    } catch (e) {}
  }

  window.addEventListener("load", function () {
    makingOf();
    spreadNodes();
    /* 다른 메뉴 카드(RootKit·Archive)는 projects.js 위쪽에서 같은 배율로 놓입니다 */
    setTimeout(fitBoard, 300);
    var reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", function () { setTimeout(fitBoard, 0); });
  });
})();
