/*
 * About 화면 전용 스크립트 — 담당 병하
 * (2026-11-25 리드가 시안 회사소개를 배포용으로 옮기며 만든 임시 연결. 재작업 때 정리)
 *
 * 1. 시안 다크 모드(body.studio-dark)를 공통 AppShell 테마(<html data-theme>)에 맞춥니다.
 * 2. 시안 안에서 프로젝트 화면(#projects)으로 가려 하면 사이트의 Projects 메뉴로 보냅니다.
 *    회사소개 말고 다른 시안 화면이 이 주소에 뜨지 않게 하기 위해서입니다.
 */
(function () {
  "use strict";

  function wantDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function syncTheme() {
    var sianDark = document.body.classList.contains("studio-dark");
    if (sianDark === wantDark()) return;
    var btn = document.getElementById("studio-theme");
    if (btn) btn.click();
  }

  function stayOnTeam() {
    if (location.hash === "#team") return;
    if (location.hash === "#projects" || location.hash === "" || location.hash === "#home") {
      location.href = ROOT4.href("projects");
    }
  }

  window.addEventListener("hashchange", stayOnTeam);

  window.addEventListener("load", function () {
    syncTheme();
    new MutationObserver(syncTheme).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  });
})();
