/*
 * Archive 글 상세(임시) — 담당 혜린 (2026-11-26 리드가 만듦, 혜린이 이어서 업데이트)
 * 주소: /archive/post/?id=insight-01
 *
 * 글 목록(../index.html)의 카드에서 제목·분류·요약을 읽어 그립니다. 글 목록이 바뀌면 상세도 따라 바뀝니다.
 * 본문은 아직 없어서 요약을 바탕으로 한 임시 문단입니다. 실제 본문이 생기면 이 파일의 BODY 부분을 바꿉니다.
 */
(function () {
  "use strict";

  var root = document.querySelector(".archive-post");
  var id = new URLSearchParams(location.search).get("id") || "";
  var isFile = location.protocol === "file:";
  var LIST = isFile ? "../index.html" : "../";

  var LABEL = { insight: "Insight", "project-story": "Project Story", culture: "Culture" };
  var KO = { insight: "인사이트", "project-story": "프로젝트 비하인드", culture: "컬처" };

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function fail(msg) {
    root.innerHTML =
      '<p class="archive-post-loading">' + esc(msg) + "</p>" +
      '<p><a class="archive-post-ghost" href="' + LIST + '">← 글 목록으로</a></p>';
  }

  /* 임시 본문: 분류별로 같은 틀. 실제 글이 생기면 바꿉니다 */
  var BODY = {
    insight: [
      ["왜 이 주제를 골랐나", "프로젝트를 하며 반복해서 마주친 질문에서 출발했습니다. 같은 고민을 하는 팀이 바로 써 볼 수 있도록 기준과 예시를 함께 정리합니다."],
      ["무엇을 봤나", "최근 진행한 작업과 업계 사례를 같은 기준으로 다시 살펴봤습니다. 화면에서 실제로 쓰인 것과 이야기만 많았던 것을 나눴습니다."],
      ["우리의 기준", "오래 갈 것은 사용자 행동을 줄여 주는 것, 금방 지나갈 것은 보기만 새로운 것이라는 기준으로 정리했습니다."],
    ],
    "project-story": [
      ["시작할 때의 문제", "처음 받은 요구사항과 실제로 풀어야 했던 문제가 어떻게 달랐는지부터 이야기합니다."],
      ["바꾼 것과 지킨 것", "여러 번의 시안을 거치며 덜어낸 것과 끝까지 지킨 것을 기획 의도와 함께 돌아봅니다."],
      ["결과", "Before와 After를 나란히 두고, 사용자가 한 번에 끝내는 일이 어떻게 달라졌는지 정리합니다."],
    ],
    culture: [
      ["이야기를 나눈 사람", "기획·디자인·개발이 같은 자리에서 일하는 방식을 직접 겪은 팀원의 이야기입니다."],
      ["달라진 점", "문서를 넘기는 대신 같은 화면을 보며 이야기하자, 결정이 빨라지고 다시 하는 일이 줄었습니다."],
      ["다음에 바꿀 것", "잘 된 것과 아직 어려운 것을 나누고, 다음 분기에 바꿔 볼 것을 정했습니다."],
    ],
  };

  /*
   * 실제 본문이 있는 글 (id별). 없으면 위 BODY 임시 문단을 씁니다.
   * 글: { cover: 비주얼, sections: [섹션...] }
   * 섹션: { h: 제목, p: [문단...], mid: [비주얼...], list: [[이름, 설명, 사진]...], after: [문단...], end: [비주얼...] }
   * 비주얼:
   *   { shot: "transition.jpg", cap, size }              화면 한 장(브라우저 틀). size: inline(글 폭) / wide(넓게)
   *   { scroll: "scroll-rootkit", cap, size }             스크롤 영상처럼: 긴 캡처가 틀 안에서 천천히 내려가고, 고정 부분(헤더·목차)은 그대로
   *                                                       파일 = {이름}.jpg(긴 본문) + {이름}-chrome.png(고정 부분, 투명 PNG)
   *   { pan: "board-canvas.jpg", cap, size }              탐색 영상처럼: 확대한 화면이 천천히 이리저리 움직임
   *   { pair: [{ shot, cap }, { shot, cap }] }              두 장 나란히
   *   { band: "board-dark.jpg", text: "한 문장" }           본문 폭을 넘는 띠, 사진이 천천히 움직임
   *   { palette: true } { dot: true } { type: true } { projectColors: true } { flow: [단계...] }   디자인시스템 전시
   * 사진은 archive/post/assets/ 에 둡니다 (2026-11-26 이 사이트 화면을 헤드리스 Chrome으로 1.6배 캡처한 임시 이미지, 폭 1280 기준).
   */
  var POSTS = {
    /* 2026-11-26 리드 작성: 메인 보드 첫 카드(About the project)가 이 글로 연결됩니다 */
    "project-story-04": {
      cover: { pan: "board-canvas.jpg", cap: "Projects 보드 — 팀의 대화와 작업이 한 화면에서 함께 움직입니다." },
      sections: [
        { h: "보여 주는 곳이 아니라, 함께 머무는 곳", p: [
          "회사 웹사이트는 보통 결과물을 나열하는 곳입니다. 우리는 그보다 먼저 ‘루트포와 함께 일하면 어떤 느낌일까’를 전하고 싶었습니다. 그래서 웹사이트를 소개 페이지가 아니라 하나의 스튜디오로 설계했습니다.",
          "컨셉은 ROOT4 Open Studio — 함께 만드는 스튜디오입니다. 방문자의 참여로 완성되는 인터랙티브 스튜디오라는 뜻입니다. 프로젝트와 사람, 디자인 시스템이 모두 열려 있고, 방문자는 그 안에 자연스럽게 들어와 참여합니다. 핵심은 메뉴마다 루트포의 작업 방식을 직접 경험하고, 사이트가 방문자의 행동에 반응한다는 점입니다.",
        ], end: [
          { band: "board-canvas-dark.jpg", eyebrow: "CONCEPT", text: "ROOT4 Open Studio —\n함께 만드는 스튜디오" },
        ]},
        { h: "메뉴마다 다른 참여 방식", p: [
          "다섯 개의 메뉴는 따로 떨어진 페이지가 아니라 한 스튜디오 안의 다른 공간입니다. 공간마다 방문자가 맡는 역할이 다릅니다.",
        ], list: [
          ["Projects — 함께 들어가는 작업 공간", "팀의 대화를 따라 작업을 살펴보고, 관심 있는 프로젝트로 대화의 방향을 바꿉니다.", "scroll-detail-09"],
          ["About — 팀원과 만나는 스튜디오", "사람을 선택하고 질문하며 각자의 관점과 작업 방식을 알아갑니다.", "scroll-about"],
          ["Archive — 생각이 모이는 공동 보드", "팀이 남긴 기록을 탐색하고, 그 위에 자신의 반응과 생각을 더합니다.", "scroll-archive"],
          ["RootKit — 직접 만드는 컴포넌트 플레이그라운드", "루트포의 컴포넌트를 조립하고 배치하며 디자인 시스템을 직접 경험합니다.", "scroll-rootkit"],
          ["Contact — 함께 시작하는 첫 기획", "관심사와 프로젝트 조건을 조합하며 의뢰의 방향을 구체화합니다.", null],
        ], after: [
          "일부 공간은 지금도 만들어 가는 중입니다. 완성된 모습보다 만들어지는 과정이 보이는 것도 이 스튜디오의 일부라고 생각합니다.",
        ]},
        { h: "놀이처럼 탐색하고, 협업처럼 이해하는 경험", p: [
          "디자인 방향은 이 한 문장으로 정리했습니다. 각 인터랙션이 루트포의 전문성이나 작업 방식을 발견하게 해 준다면, 재미와 브랜드 경험이 같은 방향으로 움직인다고 봤습니다.",
        ], mid: [
          { pair: [
            { shot: "transition.jpg", cap: "프로젝트를 고르면 그 프로젝트의 색이 카드 위에 덮이고, 화면 전체로 커지며 안으로 들어갑니다." },
            { shot: "detail-stage.jpg", cap: "상세에서는 스크롤하는 동안 비주얼이 화면 가득 커집니다." },
          ]},
        ], after: [
          "보드를 끌어 둘러보면 팀원들의 커서와 대화가 함께 움직이고, RootKit에서는 값 몇 가지를 바꾸는 것만으로 결과가 얼마나 달라지는지 직접 확인할 수 있습니다. 둘러보는 행동 자체가 우리가 일하는 방식을 보여 주도록 했습니다.",
        ], end: [
          { scroll: "scroll-detail-13", cap: "프로젝트 상세 — 목차는 그대로 두고, 프로젝트의 흐름을 따라 내려가며 읽습니다.", size: "wide" },
        ]},
        { h: "브랜딩: 조용한 작업 공간과 보라 한 점", p: [
          "스튜디오는 조용해야 작업이 잘 보입니다. 회색 바탕 위에 흰 면을 얹고, 선은 가늘게 한 가지 회색만 썼습니다. 색은 거의 쓰지 않고, 강조는 보라 하나를 점과 선택 상태, 주요 버튼처럼 작게만 씁니다.",
        ], mid: [
          { dot: true },
          { palette: true },
        ], after: [
          "라이트와 다크는 같은 이름의 색이 값만 바꿉니다. 화면은 ‘바탕’, ‘흰 면’, ‘글자’ 같은 역할 이름으로 색을 고르기 때문에, 테마를 바꿔도 모든 화면이 함께 바뀝니다.",
        ], end: [
          { pair: [
            { pan: "board-canvas.jpg", cap: "Light" },
            { pan: "board-canvas-dark.jpg", cap: "Dark" },
          ]},
          { type: true },
          { text: "대신 화면 어딘가에는 늘 팀의 대화와 질문할 수 있는 자리가 있습니다. 방문자가 언제든 물어볼 수 있다는 것이 루트포의 일하는 방식이기 때문입니다." },
          { text: "프로젝트 상세에서는 반대로 사이트의 색을 내려놓고, 프로젝트마다 고유한 색으로 화면 전체를 채웁니다. 그 순간만큼은 루트포가 아니라 프로젝트가 주인공이 되도록 했습니다." },
          { projectColors: true },
        ]},
        { h: "설계 과정: 하나의 시스템, 여러 사람의 화면", p: [
          "시안 한 장에서 출발해, 모든 화면이 함께 쓸 값(색, 글자, 간격, 모서리)과 버튼·카드 같은 컴포넌트의 규칙을 먼저 정리했습니다. 이 디자인 시스템이 RootKit의 바탕이기도 합니다.",
        ], mid: [
          { flow: ["시안 한 장", "토큰\n색 · 글자 · 간격 · 모서리", "컴포넌트 계약\n버튼 · 칩 · 카드 …", "화면 틀\n작업 공간 · 읽는 페이지 · 쇼케이스", "메뉴별 화면\n여러 사람이 동시에", "하나의 사이트"] },
        ], after: [
          "메뉴는 팀원들이 나눠 동시에 만들었습니다. 헤더와 메뉴는 한 벌만 두고 각자는 자기 화면의 본문만 만들도록 정해, 따로 만든 화면이 하나의 사이트로 자연스럽게 합쳐지게 했습니다.",
          "AI와 함께 만들 때도 같은 규칙 문서를 읽게 하고, 만들기 전에 무엇을 적용하고 무엇을 새로 정해야 하는지 먼저 확인하는 순서를 지켰습니다. 처음 팝업이던 프로젝트 상세를 페이지로 바꾼 것처럼, 방향이 바뀌면 그 결정도 문서에 남기며 만들어 왔습니다.",
        ], end: [
          { scroll: "scroll-rootkit", cap: "RootKit — 사이트를 만든 같은 규칙을 방문자가 직접 만져 볼 수 있게 열어 두었습니다.", size: "wide" },
        ]},
        { h: "이렇게 둘러보세요", p: [
          "Projects 보드에서 팀의 대화를 잠시 따라가 보세요. 마음에 드는 카드를 누르면 그 프로젝트 안으로 들어갑니다. RootKit에서 컴포넌트를 직접 조합해 보고, 함께 만들고 싶은 것이 떠오르면 Contact에서 첫 기획을 시작해 주세요. 사이트를 둘러보는 과정이 곧 루트포와의 첫 협업이 되기를 바랍니다.",
        ], end: [
          { links: [["projects", "Projects 보드 둘러보기"], ["rootkit", "RootKit 만져 보기"], ["contact", "Contact로 첫 기획 시작"]] },
        ]},
      ],
    },
  };

  /* ── 디자인시스템 전시에 쓰는 값 (DESIGN.md의 값을 그대로 보여 줌) ── */
  var PALETTE = [
    ["surface-page", "바탕", "#ECEEEF", "#272B31"],
    ["surface-panel", "흰 면", "#FFFFFF", "#343941"],
    ["surface-control", "칩·입력", "#F0F2F4", "#373E47"],
    ["border-default", "선", "#DFE3E7", "#454D58"],
    ["text-primary", "글자", "#303944", "#E1E6EC"],
    ["text-secondary", "설명 글자", "#6B7280", "#C3CCD6"],
    ["surface-accent", "보라 한 점", "#7F65E9", "#7F65E9"],
    ["surface-action-primary", "주 버튼", "#7C64CB", "#7C64CB"],
  ];

  function img(name) { return "assets/" + name; }

  /* 틀 안의 화면: 한 장 / 스크롤 영상 / 탐색 영상 */
  function view(v) {
    var alt = esc(v.cap || "");
    if (v.scroll) {
      return '<div class="archive-shot-view archive-motion archive-motion--scroll">' +
        '<img class="archive-scroll-body" src="' + img(v.scroll + ".jpg") + '" alt="' + alt + '" loading="lazy">' +
        '<img class="archive-scroll-chrome" src="' + img(v.scroll + "-chrome.png") + '" alt="" loading="lazy">' +
        "</div>";
    }
    if (v.pan) {
      /* 보드 사진 + 팀원 커서 3개가 함께 움직이는 무대. 커서는 사진과 같이 확대·이동하고, 각자 카드 사이를 돌아다닙니다 */
      var cursors = [
        ["민지 · Design", "컬러 비교 중"],
        ["준 · Planning", "기획 메모 중"],
        ["현우 · Dev", "인터랙션 검토 중"],
      ].map(function (c, i) {
        return '<span class="archive-cursor archive-cursor--' + (i + 1) + '" aria-hidden="true">' +
          '<svg viewBox="0 0 24 30"><path d="M5 3.5C3.8 3 2.7 4 3 5.3l4.2 18c.3 1.4 2.2 1.7 2.8.3l3.2-7.2 7.6-2.7c1.4-.5 1.3-2.4-.1-2.9L5 3.5Z"/></svg>' +
          "<b>" + c[0] + "<small>" + c[1] + "</small></b></span>";
      }).join("");
      return '<div class="archive-shot-view archive-motion archive-motion--pan"><div class="archive-pan-stage">' +
        '<img src="' + img(v.pan) + '" alt="' + alt + '" loading="lazy">' + cursors + "</div></div>";
    }
    return '<div class="archive-shot-view"><img src="' + img(v.shot) + '" alt="' + alt + '" loading="lazy"></div>';
  }

  function shot(v, extra) {
    return (
      '<figure class="archive-shot ' + (extra || "") + (v.size === "wide" ? " archive-wide" : "") + '">' +
      '<div class="archive-shot-frame"><span class="archive-shot-bar" aria-hidden="true"><i></i><i></i><i></i></span>' +
      view(v) + "</div>" +
      (v.cap ? "<figcaption>" + esc(v.cap) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function visual(v) {
    if (v.shot || v.scroll || v.pan) return shot(v);
    if (v.pair) return '<div class="archive-pair archive-wide">' + v.pair.map(function (s) { return shot(s); }).join("") + "</div>";
    if (v.band) {
      return (
        '<figure class="archive-band" aria-label="' + esc(v.text.replace(/\n/g, " ")) + '">' +
        '<img src="' + img(v.band) + '" alt="" data-speed="0.18">' +
        '<figcaption><span>' + esc(v.eyebrow || "") + "</span>" + esc(v.text).replace(/\n/g, "<br>") + "</figcaption>" +
        "</figure>"
      );
    }
    if (v.text) return "<p>" + esc(v.text) + "</p>";
    if (v.dot) {
      /* 회색 면 위 보라 한 점: 사이트 색의 무게를 보여 주는 그림 */
      var cells = "";
      for (var i = 0; i < 24; i++) cells += "<i" + (i === 9 ? ' class="is-accent"' : "") + "></i>";
      return (
        '<figure class="archive-art archive-wide archive-dot-art">' +
        '<div class="archive-dot-grid" aria-hidden="true">' + cells + "</div>" +
        "<figcaption><b>QUIET STUDIO, ONE PURPLE DOT</b>회색 바탕, 흰 면, 가는 선. 그리고 보라는 한 점만.</figcaption>" +
        "</figure>"
      );
    }
    if (v.palette) {
      return (
        '<figure class="archive-art archive-wide">' +
        '<div class="archive-palette">' +
        PALETTE.map(function (c) {
          return (
            '<div class="archive-swatch">' +
            '<div class="archive-swatch-chip" aria-hidden="true"><span style="background:' + c[2] + '"></span><span style="background:' + c[3] + '"></span></div>' +
            "<b>" + c[1] + "</b><code>--" + c[0] + "</code>" +
            "<small>Light " + c[2] + " · Dark " + c[3] + "</small>" +
            "</div>"
          );
        }).join("") +
        "</div>" +
        "<figcaption><b>COLOR TOKENS</b>화면은 이 역할 이름으로만 색을 고릅니다. 왼쪽 반은 라이트, 오른쪽 반은 다크 값입니다.</figcaption>" +
        "</figure>"
      );
    }
    if (v.type) {
      return (
        '<figure class="archive-art archive-wide archive-type">' +
        '<div class="archive-type-row"><span>display-lg · 50 / 500</span><p class="archive-type-display">다른 시선이 모여</p></div>' +
        '<div class="archive-type-row"><span>heading-lg · 30 / 500</span><p class="archive-type-heading">함께 만드는 스튜디오</p></div>' +
        '<div class="archive-type-row"><span>body-lg · 14 / 400</span><p class="archive-type-body">방문자의 참여로 완성되는 인터랙티브 스튜디오입니다.</p></div>' +
        '<div class="archive-type-row"><span>eyebrow · 11 / 2px</span><p class="archive-type-eyebrow">ROOT4 / OPEN STUDIO</p></div>' +
        "<figcaption><b>TYPOGRAPHY</b>DM Sans + Noto Sans KR 한 벌. 제목도 모두 산세리프, 가장 작은 글자는 11px입니다.</figcaption>" +
        "</figure>"
      );
    }
    if (v.projectColors) {
      var list = window.ROOT4_PROJECTS || [];
      if (!list.length) return "";
      return (
        '<figure class="archive-art archive-wide">' +
        '<div class="archive-project-colors">' +
        list.filter(function (x) { return !x.archive; }).map(function (x) {
          return '<span style="background:' + x.color + ";color:" + x.text + '" title="' + esc(x.label) + '"><b>' + x.no + "</b>" + esc(x.label) + "</span>";
        }).join("") +
        "</div>" +
        "<figcaption><b>PROJECT COLORS</b>프로젝트 상세는 사이트 색 대신 각 프로젝트의 색으로 화면을 채웁니다. 원색은 눈이 피곤하지 않게 한 단계 눌러 씁니다.</figcaption>" +
        "</figure>"
      );
    }
    if (v.flow) {
      return (
        '<figure class="archive-art archive-wide">' +
        '<ol class="archive-flow">' +
        v.flow.map(function (s, i) {
          var parts = s.split("\n");
          return "<li><span>" + String(i + 1).padStart(2, "0") + "</span><b>" + esc(parts[0]) + "</b>" + (parts[1] ? "<small>" + esc(parts[1]) + "</small>" : "") + "</li>";
        }).join("") +
        "</ol>" +
        "<figcaption><b>HOW WE BUILT IT</b>규칙을 먼저 정하고, 그 위에서 여러 사람이 동시에 만들었습니다.</figcaption>" +
        "</figure>"
      );
    }
    if (v.links) {
      return '<p class="archive-post-links">' + v.links.map(function (l) {
        return '<a class="archive-post-ghost" data-route="' + l[0] + '" href="' + (window.ROOT4 ? ROOT4.href(l[0]) : "#") + '">' + esc(l[1]) + ' <span aria-hidden="true">↗</span></a>';
      }).join("") + "</p>";
    }
    return "";
  }

  function section(s) {
    var html = "<section class=\"archive-post-section\"><h2>" + esc(s.h) + "</h2>";
    (s.p || []).forEach(function (t) { html += "<p>" + esc(t) + "</p>"; });
    (s.mid || []).forEach(function (v) { html += visual(v); });
    if (s.list) {
      var withThumb = s.list.some(function (it) { return it[2] !== undefined; });
      html += '<dl class="archive-post-list' + (withThumb ? " archive-post-list--thumbs archive-wide" : "") + '">' + s.list.map(function (it) {
        var thumb = withThumb
          ? (it[2] ? '<div class="archive-list-thumb">' + view({ scroll: it[2] }) + "</div>" : '<div class="archive-list-thumb archive-list-thumb--soon" aria-hidden="true">Coming soon</div>')
          : "";
        return "<div>" + thumb + "<dt>" + esc(it[0]) + "</dt><dd>" + esc(it[1]) + "</dd></div>";
      }).join("") + "</dl>";
    }
    (s.after || []).forEach(function (t) { html += "<p>" + esc(t) + "</p>"; });
    (s.end || []).forEach(function (v) { html += visual(v); });
    return html + "</section>";
  }

  /* 스크롤에 따라 사진이 틀 안에서 천천히 움직임 (동작 줄이기면 끔) */
  function startParallax() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var movers = [].slice.call(root.querySelectorAll("[data-speed]"));
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      movers.forEach(function (n) {
        if (reduce.matches) { n.style.transform = ""; return; }
        var box = n.parentElement.getBoundingClientRect();
        if (box.bottom < -vh || box.top > vh * 2) return;
        var c = box.top + box.height / 2 - vh / 2;
        n.style.transform = "translate3d(0," + (c * parseFloat(n.getAttribute("data-speed"))).toFixed(1) + "px,0)";
      });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
    /* 영상처럼 움직이는 화면: 화면에 보일 때만 재생 */
    root.querySelectorAll(".archive-scroll-body").forEach(function (im) {
      function setTravel() {
        var frame = im.parentElement;
        if (!im.naturalWidth || !frame.clientWidth) return;
        var h = frame.clientWidth * im.naturalHeight / im.naturalWidth;
        frame.style.setProperty("--travel", Math.max(0, (h - frame.clientHeight) / h * 100).toFixed(2) + "%");
      }
      if (im.complete) setTravel(); else im.addEventListener("load", setTravel);
      window.addEventListener("resize", setTravel);
    });
    var motions = root.querySelectorAll(".archive-motion");
    if ("IntersectionObserver" in window && !reduce.matches) {
      var play = new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.target.classList.toggle("is-playing", e.isIntersecting); });
      }, { threshold: 0.25 });
      motions.forEach(function (m) { play.observe(m); });
    }

    /* 화면에 들어오면 나타나기 */
    var items = root.querySelectorAll(".archive-shot, .archive-art, .archive-band, .archive-pair, .archive-post-list--thumbs > div");
    if ("IntersectionObserver" in window && !reduce.matches) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { threshold: 0.15 });
      items.forEach(function (n) { n.classList.add("archive-reveal"); io.observe(n); });
    }
  }

  function render(posts) {
    var index = posts.findIndex(function (p) { return p.id === id; });
    if (index < 0) { fail("글을 찾지 못했습니다."); return; }
    var p = posts[index];
    var prev = posts[index - 1];
    var next = posts[index + 1];
    var real = POSTS[p.id];
    var sections = real ? real.sections : (BODY[p.category] || BODY.insight).map(function (b) { return { h: b[0], p: [b[1]] }; });
    /* 비주얼이 있는 글의 표지: 스크롤하는 동안 고정된 채 화면 전체로 커지는 장면 (coverStage) */
    var cover = real && real.cover
      ? '<div class="archive-cover-track"><div class="archive-cover-stage">' + shot(real.cover, "archive-cover-shot") + "</div></div>"
      : '<div class="archive-post-cover" aria-hidden="true"></div>';

    document.title = p.title + " — ARCHIVE — ROOT4";
    root.classList.toggle("archive-post--rich", !!real);
    root.innerHTML =
      '<header class="archive-post-head">' +
      '  <p class="archive-post-eyebrow">ROOT4 / ARCHIVE / ' + esc((LABEL[p.category] || p.category).toUpperCase()) + "</p>" +
      '  <h1 class="archive-post-title">' + esc(p.title) + "</h1>" +
      '  <p class="archive-post-lead">' + esc(p.desc) + "</p>" +
      '  <p class="archive-post-meta">' + esc(p.meta) + " · " + esc(KO[p.category] || "") + " · ROOT4 팀</p>" +
      "</header>" +
      cover +
      '<div class="archive-post-body">' +
      sections.map(section).join("") +
      (real ? '<p class="archive-post-note">이미지는 이 사이트의 화면을 캡처한 것입니다. 보드와 프로젝트의 레퍼런스 이미지는 예시 콘텐츠입니다.</p>' : '<p class="archive-post-note">임시 본문입니다. 실제 글은 Archive 담당자가 업데이트합니다.</p>') +
      "</div>" +
      '<nav class="archive-post-nav" aria-label="다른 글">' +
      (prev ? '<a class="archive-post-near" href="?id=' + prev.id + '"><span>← 이전 글</span>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="archive-post-near archive-post-near--next" href="?id=' + next.id + '"><span>다음 글 →</span>' + esc(next.title) + "</a>" : "<span></span>") +
      "</nav>" +
      '<p class="archive-post-back"><a class="archive-post-ghost" href="' + LIST + "#" + p.id + '">← 글 목록으로</a></p>';
    startParallax();
    if (real) coverStage();
  }

  /*
   * 표지 장면 (비주얼이 있는 글)
   * - 스크롤 약 2화면 동안 표지가 화면에 고정되고, 넓은 카드 크기에서 화면 가로·세로 전체로 커집니다(진행도 0–70%).
   * - 첫 섹션 제목("보여 주는 곳이 아니라…")이 화면 위쪽에 오기 전까지는 헤더·레일을 숨깁니다(ROOT4.immersive).
   * - 동작 줄이기면 고정·확대 없이 넓은 카드로 보이고, 헤더·레일도 그대로 둡니다.
   */
  function coverStage() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var track = root.querySelector(".archive-cover-track");
    var fig = track && track.querySelector(".archive-cover-shot");
    var firstH2 = root.querySelector(".archive-post-section h2");
    if (!track || !fig) return;
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    var ticking = false;
    function update() {
      ticking = false;
      var vw = document.documentElement.clientWidth, vh = window.innerHeight;
      /* 헤더·레일: 첫 섹션 제목이 화면 위쪽 1/4에 닿기 전까지 숨김 */
      if (window.ROOT4 && ROOT4.immersive) {
        var on = !reduce.matches && (!firstH2 || firstH2.getBoundingClientRect().top > vh * 0.25);
        ROOT4.immersive(on);
      }
      if (reduce.matches) { track.classList.add("is-static"); fig.removeAttribute("style"); return; }
      track.classList.remove("is-static");
      var r = track.getBoundingClientRect();
      var p = clamp(-r.top / Math.max(1, r.height - vh));
      var g = ease(clamp(p / 0.7));
      var w0 = Math.min(1040, vw - 64), h0 = w0 * 0.625 + 30;
      if (h0 > vh * 0.82) { h0 = vh * 0.82; w0 = (h0 - 30) / 0.625; }
      var w = w0 + (vw - w0) * g, h = h0 + (vh - h0) * g;
      fig.style.width = w.toFixed(1) + "px";
      fig.style.height = h.toFixed(1) + "px";
      fig.style.left = ((vw - w) / 2).toFixed(1) + "px";
      fig.style.top = ((vh - h) / 2).toFixed(1) + "px";
      fig.style.setProperty("--g", g.toFixed(3));
      track.classList.toggle("is-full", g > 0.98);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* 글 목록 페이지에서 카드 읽기 */
  fetch(LIST)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var posts = [].map.call(doc.querySelectorAll(".archive-card[id]"), function (li) {
        var t = function (sel) { var n = li.querySelector(sel); return n ? n.textContent.trim() : ""; };
        return { id: li.id, category: li.dataset.category, meta: t(".archive-card-meta"), title: t(".archive-card-title"), desc: t(".archive-card-desc") };
      });
      if (posts.some(function (x) { return x.id === id; }) && POSTS[id] && !window.ROOT4_PROJECTS) {
        var sc = document.createElement("script");
        sc.src = "../../projects/projects-data.js";
        sc.onload = sc.onerror = function () { render(posts); };
        document.head.appendChild(sc);
      } else {
        render(posts);
      }
    })
    .catch(function () {
      fail(isFile ? "파일로 바로 열면 글을 불러올 수 없습니다. 로컬 서버(bun scripts/serve.js)로 열어 주세요." : "글을 불러오지 못했습니다.");
    });
})();
