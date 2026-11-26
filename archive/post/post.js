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
   * 섹션: { h: 제목, p: [문단...], list: [[이름, 설명]...] }
   */
  var POSTS = {
    /* 2026-11-26 리드 작성: 메인 보드 첫 카드(About the project)가 이 글로 연결됩니다 */
    "project-story-04": [
      { h: "보여 주는 곳이 아니라, 함께 머무는 곳", p: [
        "회사 웹사이트는 보통 결과물을 나열하는 곳입니다. 우리는 그보다 먼저 ‘루트포와 함께 일하면 어떤 느낌일까’를 전하고 싶었습니다. 그래서 웹사이트를 소개 페이지가 아니라 하나의 스튜디오로 설계했습니다.",
        "컨셉은 ROOT4 Open Studio — 함께 만드는 스튜디오입니다. 방문자의 참여로 완성되는 인터랙티브 스튜디오라는 뜻입니다. 프로젝트와 사람, 디자인 시스템이 모두 열려 있고, 방문자는 그 안에 자연스럽게 들어와 참여합니다. 핵심은 메뉴마다 루트포의 작업 방식을 직접 경험하고, 사이트가 방문자의 행동에 반응한다는 점입니다.",
      ]},
      { h: "메뉴마다 다른 참여 방식", p: [
        "다섯 개의 메뉴는 따로 떨어진 페이지가 아니라 한 스튜디오 안의 다른 공간입니다. 공간마다 방문자가 맡는 역할이 다릅니다.",
      ], list: [
        ["Projects — 함께 들어가는 작업 공간", "팀의 대화를 따라 작업을 살펴보고, 관심 있는 프로젝트로 대화의 방향을 바꿉니다."],
        ["About — 팀원과 만나는 스튜디오", "사람을 선택하고 질문하며 각자의 관점과 작업 방식을 알아갑니다."],
        ["Archive — 생각이 모이는 공동 보드", "팀이 남긴 기록을 탐색하고, 그 위에 자신의 반응과 생각을 더합니다."],
        ["RootKit — 직접 만드는 컴포넌트 플레이그라운드", "루트포의 컴포넌트를 조립하고 배치하며 디자인 시스템을 직접 경험합니다."],
        ["Contact — 함께 시작하는 첫 기획", "관심사와 프로젝트 조건을 조합하며 의뢰의 방향을 구체화합니다."],
      ], after: [
        "일부 공간은 지금도 만들어 가는 중입니다. 완성된 모습보다 만들어지는 과정이 보이는 것도 이 스튜디오의 일부라고 생각합니다.",
      ]},
      { h: "놀이처럼 탐색하고, 협업처럼 이해하는 경험", p: [
        "디자인 방향은 이 한 문장으로 정리했습니다. 각 인터랙션이 루트포의 전문성이나 작업 방식을 발견하게 해 준다면, 재미와 브랜드 경험이 같은 방향으로 움직인다고 봤습니다.",
        "그래서 보드를 끌어 둘러보면 팀원들의 커서와 대화가 함께 움직이고, 프로젝트를 고르면 그 프로젝트의 색이 화면을 덮으며 안으로 들어갑니다. RootKit에서는 값 몇 가지를 바꾸는 것만으로 결과가 얼마나 달라지는지 직접 확인할 수 있습니다. 둘러보는 행동 자체가 우리가 일하는 방식을 보여 주도록 했습니다.",
      ]},
      { h: "브랜딩: 조용한 작업 공간과 보라 한 점", p: [
        "스튜디오는 조용해야 작업이 잘 보입니다. 회색 바탕 위에 흰 면을 얹고, 선은 가늘게 한 가지 회색만 썼습니다. 색은 거의 쓰지 않고, 강조는 보라 하나를 점과 선택 상태, 주요 버튼처럼 작게만 씁니다.",
        "대신 화면 어딘가에는 늘 팀의 대화와 질문할 수 있는 자리가 있습니다. 방문자가 언제든 물어볼 수 있다는 것이 루트포의 일하는 방식이기 때문입니다.",
        "프로젝트 상세에서는 반대로 사이트의 색을 내려놓고, 프로젝트마다 고유한 색으로 화면 전체를 채웁니다. 그 순간만큼은 루트포가 아니라 프로젝트가 주인공이 되도록 했습니다.",
      ]},
      { h: "설계 과정: 하나의 시스템, 여러 사람의 화면", p: [
        "시안 한 장에서 출발해, 모든 화면이 함께 쓸 값(색, 글자, 간격, 모서리)과 버튼·카드 같은 컴포넌트의 규칙을 먼저 정리했습니다. 이 디자인 시스템이 RootKit의 바탕이기도 합니다.",
        "메뉴는 팀원들이 나눠 동시에 만들었습니다. 헤더와 메뉴는 한 벌만 두고 각자는 자기 화면의 본문만 만들도록 정해, 따로 만든 화면이 하나의 사이트로 자연스럽게 합쳐지게 했습니다.",
        "AI와 함께 만들 때도 같은 규칙 문서를 읽게 하고, 만들기 전에 무엇을 적용하고 무엇을 새로 정해야 하는지 먼저 확인하는 순서를 지켰습니다. 처음 팝업이던 프로젝트 상세를 페이지로 바꾼 것처럼, 방향이 바뀌면 그 결정도 문서에 남기며 만들어 왔습니다.",
      ]},
      { h: "이렇게 둘러보세요", p: [
        "Projects 보드에서 팀의 대화를 잠시 따라가 보세요. 마음에 드는 카드를 누르면 그 프로젝트 안으로 들어갑니다. RootKit에서 컴포넌트를 직접 조합해 보고, 함께 만들고 싶은 것이 떠오르면 Contact에서 첫 기획을 시작해 주세요. 사이트를 둘러보는 과정이 곧 루트포와의 첫 협업이 되기를 바랍니다.",
      ]},
    ],
  };

  function section(s) {
    var html = "<h2>" + esc(s.h) + "</h2>";
    (s.p || []).forEach(function (t) { html += "<p>" + esc(t) + "</p>"; });
    if (s.list) {
      html += '<dl class="archive-post-list">' + s.list.map(function (it) {
        return "<div><dt>" + esc(it[0]) + "</dt><dd>" + esc(it[1]) + "</dd></div>";
      }).join("") + "</dl>";
    }
    (s.after || []).forEach(function (t) { html += "<p>" + esc(t) + "</p>"; });
    return html;
  }

  function render(posts) {
    var index = posts.findIndex(function (p) { return p.id === id; });
    if (index < 0) { fail("글을 찾지 못했습니다."); return; }
    var p = posts[index];
    var prev = posts[index - 1];
    var next = posts[index + 1];
    var real = POSTS[p.id];
    var body = real || (BODY[p.category] || BODY.insight).map(function (b) { return { h: b[0], p: [b[1]] }; });

    document.title = p.title + " — ARCHIVE — ROOT4";
    root.innerHTML =
      '<header class="archive-post-head">' +
      '  <p class="archive-post-eyebrow">ROOT4 / ARCHIVE / ' + esc((LABEL[p.category] || p.category).toUpperCase()) + "</p>" +
      '  <h1 class="archive-post-title">' + esc(p.title) + "</h1>" +
      '  <p class="archive-post-lead">' + esc(p.desc) + "</p>" +
      '  <p class="archive-post-meta">' + esc(p.meta) + " · " + esc(KO[p.category] || "") + " · ROOT4 팀</p>" +
      "</header>" +
      '<div class="archive-post-cover" aria-hidden="true"></div>' +
      '<div class="archive-post-body">' +
      body.map(section).join("") +
      (real ? "" : '  <p class="archive-post-note">임시 본문입니다. 실제 글은 Archive 담당자가 업데이트합니다.</p>') +
      "</div>" +
      '<nav class="archive-post-nav" aria-label="다른 글">' +
      (prev ? '<a class="archive-post-near" href="?id=' + prev.id + '"><span>← 이전 글</span>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="archive-post-near archive-post-near--next" href="?id=' + next.id + '"><span>다음 글 →</span>' + esc(next.title) + "</a>" : "<span></span>") +
      "</nav>" +
      '<p class="archive-post-back"><a class="archive-post-ghost" href="' + LIST + "#" + p.id + '">← 글 목록으로</a></p>';
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
      render(posts);
    })
    .catch(function () {
      fail(isFile ? "파일로 바로 열면 글을 불러올 수 없습니다. 로컬 서버(bun scripts/serve.js)로 열어 주세요." : "글을 불러오지 못했습니다.");
    });
})();
