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
  function openDetail(i) {
    var no = String(i + 1).padStart(2, "0");
    var url = new URL(location.protocol === "file:" ? "detail/index.html" : "detail/", location.href);
    url.search = "?p=" + no;
    location.href = url.href;
  }

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
