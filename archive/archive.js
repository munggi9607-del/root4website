/*
 * ARCHIVE 화면 전용 스크립트 — 담당 혜린
 * 카테고리 칩(Chip filter)으로 글 목록을 걸러 봅니다. 브리프: ../screens/archive.md
 */
(function () {
  var root = document.querySelector(".archive-posts");
  if (!root) return;

  var chips = root.querySelectorAll(".archive-chip");
  var cards = root.querySelectorAll(".archive-card");
  var empty = root.querySelector(".archive-empty");
  var reset = root.querySelector("[data-filter-reset]");

  function countOf(filter) {
    if (filter === "all") return cards.length;
    var n = 0;
    cards.forEach(function (c) { if (c.dataset.category === filter) n++; });
    return n;
  }

  // 칩 뒤 개수
  chips.forEach(function (chip) {
    chip.querySelector(".archive-chip-count").textContent = countOf(chip.dataset.filter);
  });

  function select(filter) {
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
    });
    var shown = 0;
    cards.forEach(function (c) {
      var show = filter === "all" || c.dataset.category === filter;
      c.hidden = !show;
      if (show) shown++;
    });
    empty.hidden = shown > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { select(chip.dataset.filter); });
  });

  reset.addEventListener("click", function () {
    select("all");
    root.querySelector('[data-filter="all"]').focus();
  });
})();
