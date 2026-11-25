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
