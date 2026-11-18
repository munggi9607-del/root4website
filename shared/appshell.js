/*
 * ROOT4 AppShell — 헤더 + 레일(모바일 하단 탭바) + 테마 전환
 * 계약: components/AppShell.md
 *
 * 쓰는 법 (각 메뉴의 index.html <head>):
 *   <link rel="stylesheet" href="../tokens.css">
 *   <link rel="stylesheet" href="../shared/appshell.css">
 *   <script src="../shared/routes.js"></script>
 *   <script src="../shared/appshell.js"></script>
 * 그리고 <body data-menu="archive"> 안에 <main> 하나만 둡니다.
 *
 * 이 파일은 화면에서 고치지 않습니다. 바꿀 것이 있으면 리드에게 제안합니다.
 */
(function () {
  "use strict";

  var THEME_KEY = "root4-theme";
  var routes = window.ROOT4_ROUTES || [];

  /* ── 사이트 루트: 이 스크립트(shared/appshell.js)의 한 단계 위 ── */
  var script = document.currentScript;
  var siteRoot = new URL("../", script ? script.src : location.href);
  var isFile = location.protocol === "file:";

  function find(id) {
    for (var i = 0; i < routes.length; i++) if (routes[i].id === id) return routes[i];
    return null;
  }

  /* 메뉴 id → 실제로 이동할 주소 */
  function href(id) {
    var r = find(id);
    if (!r) return "#";
    if (!r.ready && r.temp) return r.temp;
    var url = new URL(r.path, siteRoot).href;
    // 파일로 바로 열었을 때(file://)는 폴더가 아니라 index.html을 열어야 합니다.
    if (isFile && /\/$/.test(url)) url += "index.html";
    return url;
  }

  function isTemp(id) {
    var r = find(id);
    return !!(r && !r.ready && r.temp);
  }

  /* ── 테마: 그리기 전에 먼저 적용해 깜빡임을 막습니다 ── */
  function readTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function applyTheme(theme) {
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  applyTheme(readTheme());

  window.ROOT4 = { href: href, routes: routes, theme: currentTheme };

  /* ── 그리기 ── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] === null || attrs[k] === undefined) continue;
      if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function themeButton(extraClass) {
    var btn = el("button", { type: "button", class: "r4-theme " + (extraClass || "") });
    function sync() {
      var dark = currentTheme() === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "라이트 모드로 전환" : "다크 모드로 전환");
      btn.innerHTML = "";
      btn.appendChild(el("span", { class: "r4-icon", "aria-hidden": "true", text: dark ? "☀" : "☾" }));
      btn.appendChild(el("span", { class: "r4-label", text: dark ? "Light mode" : "Dark mode" }));
    }
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      document.querySelectorAll(".r4-theme").forEach(function (b) { b._sync && b._sync(); });
    });
    btn._sync = sync;
    sync();
    return btn;
  }

  function build() {
    var body = document.body;
    var current = body.getAttribute("data-menu");
    var cur = find(current);
    if (!cur) console.warn("[AppShell] body data-menu 값이 routes.js에 없습니다:", current);

    /* Header */
    var logo = el("a", { class: "r4-logo", href: href(window.ROOT4_HOME || "projects") }, [
      document.createTextNode("Root4"),
      el("sup", { text: "®" }),
    ]);
    var crumb = el("p", { class: "r4-crumb" }, [
      el("span", { class: "r4-crumb-root", text: "Workspace" }),
      el("span", { class: "r4-crumb-sep", "aria-hidden": "true", text: "/" }),
      el("span", { class: "r4-crumb-current", text: cur ? cur.crumb : "" }),
    ]);
    var contact = el("a", { class: "r4-contact", href: href("contact") }, [
      document.createTextNode("Contact Us"),
      el("span", { "aria-hidden": "true", text: "↗" }),
    ]);
    var header = el("header", { class: "r4-header" }, [
      logo,
      crumb,
      el("div", { class: "r4-header-actions" }, [contact, themeButton("r4-theme--header")]),
    ]);

    /* Rail */
    var list = el("ul", { class: "r4-rail-list" });
    routes.forEach(function (r) {
      var active = r.id === current;
      var a = el("a", {
        class: "r4-rail-item" + (active ? " is-active" : ""),
        href: href(r.id),
        "aria-current": active ? "page" : null,
        title: isTemp(r.id) ? r.label + " (시안으로 임시 연결)" : null,
        "data-route": r.id,
      }, [
        el("span", { class: "r4-icon", "aria-hidden": "true", text: r.icon }),
        el("span", { class: "r4-label", text: r.label }),
      ]);
      list.appendChild(el("li", null, [a]));
    });
    var rail = el("nav", { class: "r4-rail", "aria-label": "주 메뉴" }, [
      list,
      themeButton("r4-theme--rail"),
    ]);

    /* Skip link + main */
    var main = body.querySelector("main");
    if (!main) {
      console.warn("[AppShell] <main>이 없습니다. 본문은 <main> 하나에 넣어 주세요.");
      main = el("main");
      body.appendChild(main);
    }
    if (!main.id) main.id = "main";
    main.classList.add("r4-main");
    var skip = el("a", { class: "r4-skip", href: "#" + main.id, text: "본문으로 건너뛰기" });

    /* 본문의 <a data-route="about"> 링크에 주소표 주소를 채웁니다 */
    main.querySelectorAll("a[data-route]").forEach(function (a) {
      a.setAttribute("href", href(a.getAttribute("data-route")));
    });

    body.classList.add("r4-shell");
    body.insertBefore(rail, body.firstChild);
    body.insertBefore(header, body.firstChild);
    body.insertBefore(skip, body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
