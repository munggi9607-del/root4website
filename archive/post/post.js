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

  function render(posts) {
    var index = posts.findIndex(function (p) { return p.id === id; });
    if (index < 0) { fail("글을 찾지 못했습니다."); return; }
    var p = posts[index];
    var prev = posts[index - 1];
    var next = posts[index + 1];
    var body = BODY[p.category] || BODY.insight;

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
      body.map(function (b) {
        return "<h2>" + esc(b[0]) + "</h2><p>" + esc(b[1]) + "</p>";
      }).join("") +
      '  <p class="archive-post-note">임시 본문입니다. 실제 글은 Archive 담당자가 업데이트합니다.</p>' +
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
