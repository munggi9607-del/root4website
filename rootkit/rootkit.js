/*
 * ROOTKIT 화면 전용 스크립트 — 담당 혜린
 * 브리프: ../screens/rootkit.md
 *
 * 1. Work Process: 단계 카드 펼치기
 * 2. Playground: 조작 패널 → 미리보기 즉시 반영
 * 3. Library: 카테고리 → 견본
 *
 * 견본 값과 선택지는 kit.js(window.ROOTKIT_KIT)와 kit.css에 있습니다.
 */
(function () {
  var KIT = window.ROOTKIT_KIT;
  if (!KIT) return;

  /* ────────────────────────────────────────────
   * 작업 프로세스 내용 (초기안 — 실제 작업 방식에 맞춰 여기만 고칩니다)
   * ──────────────────────────────────────────── */
  var PROCESS = [
    {
      name: "Discover", ko: "발견",
      summary: "프로젝트와 사용자를 깊이 이해합니다.",
      tasks: ["프로젝트 및 서비스 분석", "사용자와 비즈니스 요구사항 파악"],
      methods: ["이해관계자 인터뷰", "경쟁 서비스 분석", "데이터 리뷰"],
      output: "분석 리포트, 요구사항 정의서"
    },
    {
      name: "Define", ko: "정의",
      summary: "무엇을, 어떤 방향으로 만들지 정합니다.",
      tasks: ["서비스 구조 및 방향성 정의", "UX 전략 및 디자인 방향 설정"],
      methods: ["정보 구조(IA)", "사용자 흐름", "디자인 원칙"],
      output: "IA, 화면 흐름도, 디자인 방향"
    },
    {
      name: "Design", ko: "설계",
      summary: "ROOTKIT으로 빠르게 그리고, 넓게 펼쳐 봅니다.",
      tasks: ["디자인 시스템 및 베이직 요소 활용", "UI 설계 및 다양한 디자인 베리에이션 제작"],
      methods: ["ROOTKIT 토큰", "ROOTKIT 컴포넌트", "베리에이션 시안"],
      output: "UI 디자인, 베리에이션 시안",
      kit: true
    },
    {
      name: "Develop", ko: "구현",
      summary: "같은 규칙을 코드로 옮겨 그대로 구현합니다.",
      tasks: ["설계된 디자인을 기반으로 구현", "개발 효율성과 일관성 확보"],
      methods: ["토큰 기반 스타일", "공통 컴포넌트", "디자인 QA"],
      output: "동작하는 화면, 공통 컴포넌트",
      kit: true
    },
    {
      name: "Evolve", ko: "개선",
      summary: "써 보고, 고치고, 다시 키웁니다.",
      tasks: ["결과물 검토 및 개선", "지속적인 업데이트와 최적화"],
      methods: ["사용성 점검", "지표 리뷰", "시스템 업데이트"],
      output: "개선안, 업데이트된 ROOTKIT"
    }
  ];

  /* ── 도움 함수 ── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  /* 하나만 고르는 묶음 (Chip, role=radiogroup) — 좌우·위아래 화살표로 옮깁니다 */
  function radioGroup(container, options, current, onChange, extra) {
    container.setAttribute("role", "radiogroup");
    var buttons = options.map(function (opt) {
      var b = el("button", {
        type: "button",
        class: "rootkit-chip",
        role: "radio",
        "data-value": opt.id
      }, extra ? extra(opt) : [opt.label]);
      b.addEventListener("click", function () { onChange(opt.id); });
      container.appendChild(b);
      return b;
    });
    container.addEventListener("keydown", function (e) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var i = buttons.indexOf(document.activeElement);
      if (i < 0) return;
      var next = buttons[(i + keys[e.key] + buttons.length) % buttons.length];
      next.focus();
      next.click();
    });
    return {
      sync: function (value) {
        buttons.forEach(function (b) {
          var on = b.getAttribute("data-value") === value;
          b.setAttribute("aria-checked", String(on));
          b.tabIndex = on ? 0 : -1;
        });
      }
    };
  }

  /* ────────────────────────────────────────────
   * 1. Work Process
   * ──────────────────────────────────────────── */
  (function () {
    var list = document.querySelector("[data-process]");
    if (!list) return;
    var items = [];
    var hoverTimer = null;
    /* 마우스로 펼치기는 단계가 가로로 놓이는 넓은 화면에서만 (세로로 쌓이면 높이가 출렁여서) */
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1051px)");

    PROCESS.forEach(function (step, i) {
      var id = "rootkit-step-" + (i + 1);
      var detail = el("div", { class: "rootkit-step-detail", id: id + "-detail", role: "region", "aria-labelledby": id + "-btn" }, [
        el("div", { class: "rootkit-step-detail-inner" }, [
          el("div", { class: "rootkit-step-block" }, [
            el("p", { class: "rootkit-step-label", text: "하는 일" }),
            el("ul", { class: "rootkit-step-tasks" }, step.tasks.map(function (t) { return el("li", { text: t }); }))
          ]),
          el("div", { class: "rootkit-step-block" }, [
            el("p", { class: "rootkit-step-label", text: "쓰는 방법" }),
            el("ul", { class: "rootkit-step-tags" }, step.methods.map(function (t) { return el("li", { text: t }); }))
          ]),
          el("div", { class: "rootkit-step-block" }, [
            el("p", { class: "rootkit-step-label", text: "결과물" }),
            el("p", { class: "rootkit-step-output", text: step.output })
          ])
        ])
      ]);

      var btn = el("button", {
        type: "button",
        class: "rootkit-step-btn",
        id: id + "-btn",
        "aria-expanded": "false",
        "aria-controls": id + "-detail"
      }, [
        el("span", { class: "rootkit-step-top", "aria-hidden": "true" }, [
          el("span", { class: "rootkit-step-no", text: pad2(i + 1) }),
          el("span", { class: "rootkit-step-line" })
        ]),
        el("span", { class: "rootkit-step-name" }, [
          el("span", { class: "rootkit-step-en", text: step.name.toUpperCase() }),
          el("span", { class: "rootkit-step-ko", text: step.ko })
        ]),
        el("span", { class: "rootkit-step-summary", text: step.summary }),
        step.kit ? el("span", { class: "rootkit-step-kit", text: "ROOTKIT 활용" }) : null
      ]);

      var li = el("li", { class: "rootkit-step" }, [btn, detail]);
      list.appendChild(li);
      items.push({ li: li, btn: btn });

      btn.addEventListener("click", function () { open(i); });
      li.addEventListener("mouseenter", function () {
        if (!canHover.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { open(i); }, 140);
      });
      li.addEventListener("mouseleave", function () { clearTimeout(hoverTimer); });
    });

    function open(index) {
      items.forEach(function (it, i) {
        var on = i === index;
        it.li.classList.toggle("is-open", on);
        it.li.classList.toggle("is-passed", i < index);
        it.btn.setAttribute("aria-expanded", String(on));
      });
    }
    open(0);
  })();

  /* ────────────────────────────────────────────
   * 2. Playground
   * ──────────────────────────────────────────── */
  var kitNodes = Array.prototype.slice.call(document.querySelectorAll(".rootkit-kit"));
  var syncLibrary = function () {};

  (function () {
    var controls = document.querySelector("[data-controls]");
    var stage = document.querySelector("[data-stage]");
    if (!controls || !stage) return;

    var D = KIT.defaults;
    var S = {};
    function resetState() { Object.keys(D).forEach(function (k) { S[k] = D[k]; }); }
    resetState();

    var card = stage.querySelector("[data-preview-card]");
    var main = stage.querySelector("[data-preview-main]");
    var sub = stage.querySelector("[data-preview-sub]");
    var actions = stage.querySelector("[data-preview-actions]");
    var variationsBox = stage.querySelector("[data-variations]");
    var readout = document.querySelector("[data-readout]");
    var changes = document.querySelector("[data-changes]");
    var resetBtn = document.querySelector("[data-reset]");
    var shuffleBtn = document.querySelector("[data-shuffle]");

    var syncers = [];

    /* 묶음 하나 (fieldset) */
    function group(letter, title, hint) {
      var box = el("fieldset", { class: "rootkit-group" }, [
        el("legend", { class: "rootkit-group-title" }, [
          el("span", { class: "rootkit-group-letter", "aria-hidden": "true", text: letter }),
          title
        ])
      ]);
      if (hint) box.appendChild(el("p", { class: "rootkit-group-hint", text: hint }));
      controls.appendChild(box);
      return box;
    }

    /* 칩 선택 줄 */
    function choiceRow(parent, label, key, options, extra) {
      var labelId = "rootkit-ctl-" + key;
      var row = el("div", { class: "rootkit-ctl" }, [el("p", { class: "rootkit-ctl-label", id: labelId, text: label })]);
      var chips = el("div", { class: "rootkit-chips", "aria-labelledby": labelId });
      row.appendChild(chips);
      parent.appendChild(row);
      var rg = radioGroup(chips, options, S[key], function (v) { set(key, v); }, extra);
      syncers.push(function () { rg.sync(S[key]); });
    }

    /* 간격 슬라이더: kit.js의 spacing 단계에만 멈춥니다 */
    function slider(parent, label, key) {
      var steps = KIT.spacing;
      var id = "rootkit-ctl-" + key;
      var out = el("output", { class: "rootkit-ctl-value", for: id });
      var input = el("input", {
        class: "rootkit-range",
        type: "range",
        id: id,
        min: "0",
        max: String(steps.length - 1),
        step: "1"
      });
      /* 눈금 위치 = 손잡이 가운데 (손잡이 폭 16의 절반 8만큼 안쪽에서 시작) */
      var ticks = el("div", { class: "rootkit-range-ticks", "aria-hidden": "true" },
        steps.map(function (v, i) {
          return el("span", { text: String(v), style: "left: calc(8px + (100% - 16px) * " + i + " / " + (steps.length - 1) + ")" });
        }));
      var row = el("div", { class: "rootkit-ctl" }, [
        el("div", { class: "rootkit-ctl-head" }, [el("label", { class: "rootkit-ctl-label", for: id, text: label }), out]),
        input,
        ticks
      ]);
      parent.appendChild(row);
      input.addEventListener("input", function () { set(key, steps[Number(input.value)]); });
      syncers.push(function () {
        var idx = steps.indexOf(S[key]);
        if (idx < 0) idx = 0;
        input.value = String(idx);
        input.style.setProperty("--fill", (idx / (steps.length - 1)) * 100 + "%");
        input.setAttribute("aria-valuetext", S[key] + "px");
        out.textContent = S[key] + "px";
        ticks.querySelectorAll("span").forEach(function (t, i) { t.classList.toggle("is-on", i === idx); });
      });
    }

    /* A. Spacing */
    var gA = group("A", "Spacing", "간격 단계에만 멈춥니다.");
    slider(gA, "카드 Padding", "cardPadding");
    slider(gA, "요소 사이 Gap", "gap");
    slider(gA, "버튼 Padding", "buttonPadding");

    /* B. Button state */
    var gB = group("B", "Button State");
    choiceRow(gB, "상태", "state", KIT.states);

    /* C. Variation */
    var gC = group("C", "Component Variation");
    choiceRow(gC, "형태", "type", KIT.types);
    choiceRow(gC, "크기", "size", KIT.sizes);
    choiceRow(gC, "모서리", "radius", KIT.radii);
    choiceRow(gC, "컬러 테마", "theme", KIT.themes, function (opt) {
      return [
        el("span", { class: "rootkit-theme-dot rootkit-kit", "data-kit-theme": opt.id, "aria-hidden": "true" }),
        opt.label
      ];
    });

    /* 버튼 형태 비교 줄 (미리보기 아래) */
    var variationItems = KIT.types.map(function (t) {
      var sample = el("span", { class: "kit-btn kit-btn--" + t.id, "aria-hidden": "true", text: "시작하기" });
      var item = el("button", { type: "button", class: "rootkit-variation", role: "radio", "data-value": t.id }, [
        sample,
        el("span", { class: "rootkit-variation-label", text: t.label })
      ]);
      item.addEventListener("click", function () { set("type", t.id); });
      variationsBox.appendChild(item);
      return { item: item, sample: sample, id: t.id };
    });
    variationsBox.addEventListener("keydown", function (e) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var ids = KIT.types.map(function (t) { return t.id; });
      var i = ids.indexOf(S.type);
      set("type", ids[(i + keys[e.key] + ids.length) % ids.length]);
      variationItems.forEach(function (v) { if (v.id === S.type) v.item.focus(); });
    });

    /* 크기를 바꾸면 버튼 Padding이 그 크기의 기본값으로 옮겨 갑니다 */
    function set(key, value) {
      if (S[key] === value) return;
      S[key] = value;
      if (key === "size") S.buttonPadding = find(KIT.sizes, value).paddingX;
      render();
    }

    function buttonClasses(type, extra) {
      var cls = ["kit-btn", "kit-btn--" + type, "kit-btn--" + S.size];
      if (S.radius === "sharp") cls.push("kit-btn--sharp");
      if (S.radius === "pill") cls.push("kit-btn--pill");
      if (S.state !== "default") cls.push("is-" + S.state);
      if (extra) cls.push(extra);
      return cls.join(" ");
    }

    function changedKeys() {
      return Object.keys(D).filter(function (k) { return S[k] !== D[k]; });
    }

    function render() {
      /* 컬러 테마: 키트 견본 전체(미리보기·Library)에 같이 적용 */
      kitNodes.forEach(function (n) { n.setAttribute("data-kit-theme", S.theme); });

      card.style.setProperty("--card-p", S.cardPadding + "px");
      card.style.setProperty("--card-gap", S.gap + "px");
      actions.style.gap = S.gap + "px";

      main.className = buttonClasses(S.type);
      main.style.setProperty("--btn-px", S.buttonPadding + "px");
      main.setAttribute("aria-disabled", String(S.state === "disabled"));

      var subCls = ["kit-btn", "kit-btn--neutral", "kit-btn--" + S.size];
      if (S.radius !== "rounded") subCls.push("kit-btn--" + S.radius);
      sub.className = subCls.join(" ");
      sub.style.setProperty("--btn-px", S.buttonPadding + "px");

      variationItems.forEach(function (v) {
        v.sample.className = buttonClasses(v.id);
        v.sample.style.setProperty("--btn-px", S.buttonPadding + "px");
        var on = v.id === S.type;
        v.item.setAttribute("aria-checked", String(on));
        v.item.tabIndex = on ? 0 : -1;
      });

      syncers.forEach(function (fn) { fn(); });

      /* 상단: 지금 설정 */
      var size = find(KIT.sizes, S.size);
      var radius = find(KIT.radii, S.radius);
      var changed = changedKeys();
      var parts = [
        { k: "type", t: find(KIT.types, S.type).label },
        { k: "size", t: size.label + " " + size.height },
        { k: "radius", t: radius.label + " " + (radius.value === 999 ? "999" : radius.value) },
        { k: "state", t: find(KIT.states, S.state).label },
        { k: "theme", t: find(KIT.themes, S.theme).label },
        { k: "cardPadding", t: "padding " + S.cardPadding },
        { k: "gap", t: "gap " + S.gap },
        { k: "buttonPadding", t: "btn-x " + S.buttonPadding }
      ];
      readout.textContent = "";
      parts.forEach(function (p) {
        readout.appendChild(el("span", {
          class: "rootkit-token" + (changed.indexOf(p.k) >= 0 ? " is-changed" : ""),
          text: p.t
        }));
      });

      /* 하단: 바뀐 개수 */
      changes.textContent = changed.length
        ? "기본값에서 " + changed.length + "가지를 바꿨어요."
        : "기본 설정입니다.";
      resetBtn.disabled = changed.length === 0;

      syncLibrary(S.theme);
    }

    resetBtn.addEventListener("click", function () {
      resetState();
      render();
    });

    shuffleBtn.addEventListener("click", function () {
      S.type = pick(KIT.types).id;
      S.size = pick(KIT.sizes).id;
      S.radius = pick(KIT.radii).id;
      S.theme = pick(KIT.themes).id;
      S.state = "default";
      S.cardPadding = pick(KIT.spacing.slice(3, 8));
      S.gap = pick(KIT.spacing.slice(1, 6));
      S.buttonPadding = pick(KIT.spacing.slice(2, 7));
      render();
    });

    /* 미리보기 안 버튼은 견본이라 눌러도 아무 일이 없습니다 */
    [main, sub].forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); });
    });

    window.__rootkitRender = render;
  })();

  /* ────────────────────────────────────────────
   * 3. Library
   * ──────────────────────────────────────────── */
  (function () {
    var list = document.querySelector("[data-cats]");
    var detail = document.querySelector("[data-detail]");
    if (!list || !detail) return;

    function kitValue(name) {
      return getComputedStyle(detail).getPropertyValue(name).trim();
    }
    function hexOf(name) {
      var v = kitValue(name);
      var m = v.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) {
        return "#" + [m[1], m[2], m[3]].map(function (x) { return pad2hex(Number(x)); }).join("");
      }
      return v.toUpperCase();
    }
    function pad2hex(n) { var s = n.toString(16); return s.length < 2 ? "0" + s : s; }
    function block(title, note, children) {
      return el("div", { class: "rootkit-lib-block" }, [
        el("div", { class: "rootkit-lib-block-head" }, [
          el("h4", { class: "rootkit-lib-block-title", text: title }),
          note ? el("p", { class: "rootkit-lib-block-note", text: note }) : null
        ])
      ].concat(children));
    }
    function caption(text) { return el("span", { class: "rootkit-lib-cap", text: text }); }
    function btn(type, size, extra, label) {
      var c = "kit-btn kit-btn--" + type + " kit-btn--" + size + (extra ? " " + extra : "");
      return el("span", { class: c, text: label || "Button" });
    }

    var CATS = [
      {
        id: "color", name: "Color", meta: "Foundation / 01",
        desc: "주 색, 보조 색, 무채색, 상태 색",
        thumb: function () {
          return el("span", { class: "rootkit-thumb-colors" }, [
            "--kit-primary-500", "--kit-secondary-500", "--kit-neutral-700", "--kit-success"
          ].map(function (v) { return el("span", { style: "background: var(" + v + ")" }); }));
        },
        render: function () {
          return KIT.colors.map(function (g) {
            var note = g.note + (g.themed ? " · 지금 테마: " + find(KIT.themes, detail.getAttribute("data-kit-theme")).label : "");
            return block(g.group, note, [
              el("ul", { class: "rootkit-swatches" }, g.items.map(function (c) {
                return el("li", { class: "rootkit-swatch" }, [
                  el("span", { class: "rootkit-swatch-chip", style: "background: var(" + c.v + ")" }),
                  el("span", { class: "rootkit-swatch-name", text: c.name }),
                  el("span", { class: "rootkit-swatch-code", text: hexOf(c.v) })
                ]);
              }))
            ]);
          });
        }
      },
      {
        id: "type", name: "Typography", meta: "Foundation / 02",
        desc: "제목, 본문, 캡션과 굵기",
        thumb: function () { return el("span", { class: "rootkit-thumb-type kit-t-h1", text: "Aa가" }); },
        render: function () {
          return [
            block("Scale", "Heading · Body · Caption", [
              el("ul", { class: "rootkit-type-list" }, KIT.type.map(function (t) {
                return el("li", { class: "rootkit-type-row" }, [
                  el("div", { class: "rootkit-type-meta" }, [
                    el("span", { class: "rootkit-lib-strong", text: t.role }),
                    caption(t.spec)
                  ]),
                  el("p", { class: t.cls + " rootkit-type-sample", text: t.sample })
                ]);
              }))
            ]),
            block("Font Weight", "DM Sans · Noto Sans KR", [
              el("ul", { class: "rootkit-weights" }, KIT.weights.map(function (w) {
                return el("li", null, [
                  el("span", { class: "rootkit-weight-sample", style: "font-weight:" + w.value, text: "Aa 가" }),
                  caption(w.label + " " + w.value)
                ]);
              }))
            ])
          ];
        }
      },
      {
        id: "spacing", name: "Spacing", meta: "Foundation / 03",
        desc: "간격 단계와 padding · margin · gap",
        thumb: function () {
          return el("span", { class: "rootkit-thumb-spacing" }, [8, 16, 24, 32].map(function (w) {
            return el("span", { style: "width:" + w + "px" });
          }));
        },
        render: function () {
          return [
            block("Spacing Scale", "4의 배수, 아홉 단계", [
              el("ul", { class: "rootkit-scale" }, KIT.spacing.map(function (v) {
                return el("li", null, [
                  el("span", { class: "rootkit-scale-bar", style: "width:" + v + "px;height:" + v + "px" }),
                  caption(String(v))
                ]);
              }))
            ]),
            block("Padding · Margin · Gap", "같은 단계를 세 가지 자리에 씁니다", [
              el("div", { class: "rootkit-space-demos" }, [
                el("figure", { class: "rootkit-space-demo" }, [
                  el("div", { class: "rootkit-demo-pad" }, [el("span", { class: "rootkit-demo-box", text: "content" })]),
                  el("figcaption", null, [el("span", { class: "rootkit-lib-strong", text: "Padding 24" }), caption("면 안쪽 여백")])
                ]),
                el("figure", { class: "rootkit-space-demo" }, [
                  el("div", { class: "rootkit-demo-margin" }, [
                    el("span", { class: "rootkit-demo-box", text: "block" }),
                    el("span", { class: "rootkit-demo-gapmark is-v" }),
                    el("span", { class: "rootkit-demo-box", text: "block" })
                  ]),
                  el("figcaption", null, [el("span", { class: "rootkit-lib-strong", text: "Margin 16" }), caption("덩어리 사이 바깥 여백")])
                ]),
                el("figure", { class: "rootkit-space-demo" }, [
                  el("div", { class: "rootkit-demo-gap" }, [
                    el("span", { class: "rootkit-demo-box", text: "A" }),
                    el("span", { class: "rootkit-demo-gapmark" }),
                    el("span", { class: "rootkit-demo-box", text: "B" }),
                    el("span", { class: "rootkit-demo-gapmark" }),
                    el("span", { class: "rootkit-demo-box", text: "C" })
                  ]),
                  el("figcaption", null, [el("span", { class: "rootkit-lib-strong", text: "Gap 12" }), caption("나란한 요소 사이")])
                ])
              ])
            ])
          ];
        }
      },
      {
        id: "button", name: "Button", meta: "Component / 04",
        desc: "형태, 크기, 상태",
        thumb: function () { return btn("filled", "s", "kit-btn--pill", "Button"); },
        render: function () {
          var sizes = KIT.sizes;
          var table = el("div", { class: "rootkit-btn-grid", role: "table", "aria-label": "버튼 형태와 크기" }, [
            el("div", { class: "rootkit-btn-grid-row", role: "row" }, [el("span", { role: "columnheader" })].concat(
              sizes.map(function (s) { return el("span", { role: "columnheader", class: "rootkit-lib-cap", text: s.label + " " + s.height }); })
            ))
          ].concat(KIT.types.map(function (t) {
            return el("div", { class: "rootkit-btn-grid-row", role: "row" }, [
              el("span", { role: "rowheader", class: "rootkit-lib-strong", text: t.label })
            ].concat(sizes.map(function (s) {
              return el("span", { role: "cell" }, [btn(t.id, s.id)]);
            })));
          })));
          return [
            block("Type × Size", "Filled · Outlined · Text / Small · Medium · Large", [el("div", { class: "rootkit-btn-scroll" }, [table])]),
            block("State", "Filled 기준", [
              el("ul", { class: "rootkit-state-row" }, KIT.states.map(function (st) {
                return el("li", null, [
                  btn("filled", "m", st.id === "default" ? "" : "is-" + st.id),
                  caption(st.label)
                ]);
              }))
            ]),
            block("Shape", "Sharp · Rounded · Pill", [
              el("ul", { class: "rootkit-state-row" }, KIT.radii.map(function (r) {
                return el("li", null, [
                  btn("outlined", "m", r.id === "rounded" ? "" : "kit-btn--" + r.id),
                  caption(r.label + " " + r.value)
                ]);
              }))
            ])
          ];
        }
      },
      {
        id: "form", name: "Form Element", meta: "Component / 05",
        desc: "입력칸, 체크박스, 라디오, 선택",
        thumb: function () {
          return el("span", { class: "rootkit-thumb-form" }, [
            el("span", { class: "rootkit-thumb-check" }),
            el("span", { class: "rootkit-thumb-line" })
          ]);
        },
        render: function () {
          return [
            block("Input", "기본 · 포커스 · 오류", [
              el("div", { class: "rootkit-form-row" }, [
                el("div", { class: "kit-field" }, [
                  el("label", { class: "kit-label", for: "rootkit-lib-in1", text: "이름" }),
                  el("input", { class: "kit-input", id: "rootkit-lib-in1", type: "text", placeholder: "이름을 입력하세요" })
                ]),
                el("div", { class: "kit-field" }, [
                  el("label", { class: "kit-label", for: "rootkit-lib-in2", text: "이메일" }),
                  el("input", { class: "kit-input is-focus", id: "rootkit-lib-in2", type: "email", value: "hello@root4" })
                ]),
                el("div", { class: "kit-field" }, [
                  el("label", { class: "kit-label", for: "rootkit-lib-in3", text: "연락처" }),
                  el("input", { class: "kit-input is-error", id: "rootkit-lib-in3", type: "text", value: "010-12", "aria-describedby": "rootkit-lib-in3-help", "aria-invalid": "true" }),
                  el("span", { class: "kit-help is-error", id: "rootkit-lib-in3-help", text: "번호를 끝까지 입력해 주세요." })
                ])
              ])
            ]),
            block("Checkbox · Radio", "선택됨 · 선택 안 됨 · 사용 불가", [
              el("div", { class: "rootkit-form-row" }, [
                el("div", { class: "rootkit-form-col", role: "group", "aria-label": "체크박스 견본" }, [
                  el("label", { class: "kit-check" }, [el("input", { type: "checkbox", checked: "" }), "뉴스레터 받기"]),
                  el("label", { class: "kit-check" }, [el("input", { type: "checkbox" }), "이벤트 알림"]),
                  el("label", { class: "kit-check" }, [el("input", { type: "checkbox", disabled: "" }), "사용할 수 없음"])
                ]),
                el("div", { class: "rootkit-form-col", role: "radiogroup", "aria-label": "라디오 견본" }, [
                  el("label", { class: "kit-check" }, [el("input", { type: "radio", name: "rootkit-lib-radio", checked: "" }), "웹사이트"]),
                  el("label", { class: "kit-check" }, [el("input", { type: "radio", name: "rootkit-lib-radio" }), "앱"]),
                  el("label", { class: "kit-check" }, [el("input", { type: "radio", name: "rootkit-lib-radio", disabled: "" }), "준비 중"])
                ]),
                el("div", { class: "kit-field" }, [
                  el("label", { class: "kit-label", for: "rootkit-lib-sel", text: "프로젝트 종류" }),
                  el("select", { class: "kit-select", id: "rootkit-lib-sel" }, ["브랜드 사이트", "커머스", "서비스 앱", "사내 시스템"].map(function (o) {
                    return el("option", { text: o });
                  })),
                  el("span", { class: "kit-help", text: "하나를 골라 주세요." })
                ])
              ])
            ])
          ];
        }
      },
      {
        id: "surface", name: "Surface", meta: "Foundation / 06",
        desc: "카드, 컨테이너, 선, 모서리, 그림자",
        thumb: function () {
          return el("span", { class: "rootkit-thumb-surface" }, [el("span"), el("span")]);
        },
        render: function () {
          return [
            block("Card · Container · Border", "면을 쌓는 세 가지 방법", [
              el("div", { class: "rootkit-surface-row" }, [
                el("figure", { class: "rootkit-surface-item" }, [
                  el("div", { class: "kit-card rootkit-surface-card" }, [
                    el("span", { class: "kit-t-h3", text: "Card" }),
                    el("span", { class: "kit-t-body-m rootkit-kit-sub", text: "흰 면 + 선 + 그림자" })
                  ]),
                  el("figcaption", null, [caption("surface · border · shadow-md")])
                ]),
                el("figure", { class: "rootkit-surface-item" }, [
                  el("div", { class: "rootkit-surface-container" }, [
                    el("span", { class: "kit-t-h3", text: "Container" }),
                    el("span", { class: "kit-t-body-m rootkit-kit-sub", text: "낮게 깔린 바탕" })
                  ]),
                  el("figcaption", null, [caption("surface-sunken")])
                ]),
                el("figure", { class: "rootkit-surface-item" }, [
                  el("div", { class: "rootkit-surface-borders" }, [
                    el("span", { class: "is-default", text: "border" }),
                    el("span", { class: "is-strong", text: "border-strong" }),
                    el("span", { class: "is-primary", text: "primary" })
                  ]),
                  el("figcaption", null, [caption("1px 선 세 가지")])
                ])
              ])
            ]),
            block("Radius", "0 · 4 · 8 · 16 · 999", [
              el("ul", { class: "rootkit-radius-row" }, KIT.radiusScale.map(function (r) {
                return el("li", null, [
                  el("span", { class: "rootkit-radius-box", style: "border-radius: var(" + r.v + ")" }),
                  caption(r.name + " " + r.label)
                ]);
              }))
            ]),
            block("Shadow", "높이에 따라 세 단계", [
              el("ul", { class: "rootkit-shadow-row" }, KIT.shadows.map(function (s) {
                return el("li", null, [
                  el("span", { class: "rootkit-shadow-box", style: "box-shadow: var(" + s.v + ")" }, [
                    el("span", { class: "rootkit-lib-strong", text: s.name }),
                    caption(s.use)
                  ])
                ]);
              }))
            ])
          ];
        }
      }
    ];

    var current = CATS[0].id;
    var cards = CATS.map(function (c, i) {
      var b = el("button", {
        type: "button",
        class: "rootkit-cat",
        "aria-pressed": "false",
        "aria-controls": "rootkit-detail"
      }, [
        el("span", { class: "rootkit-cat-thumb rootkit-kit", "aria-hidden": "true" }, [c.thumb()]),
        el("span", { class: "rootkit-cat-body" }, [
          el("span", { class: "rootkit-cat-meta", text: c.meta }),
          el("span", { class: "rootkit-cat-title", text: c.name }),
          el("span", { class: "rootkit-cat-desc", text: c.desc })
        ])
      ]);
      b.addEventListener("click", function () {
        current = c.id;
        draw();
        if (window.matchMedia("(max-width: 1050px)").matches) {
          detail.focus({ preventScroll: true });
          detail.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        }
      });
      list.appendChild(el("li", null, [b]));
      return { id: c.id, btn: b };
    });

    /* 새로 생긴 견본 썸네일도 테마를 따르게 */
    list.querySelectorAll(".rootkit-cat-thumb").forEach(function (n) { kitNodes.push(n); });

    function draw() {
      var cat = null;
      CATS.forEach(function (c) { if (c.id === current) cat = c; });
      cards.forEach(function (c) { c.btn.setAttribute("aria-pressed", String(c.id === current)); });
      detail.textContent = "";
      detail.appendChild(el("div", { class: "rootkit-detail-head" }, [
        el("div", null, [
          el("p", { class: "rootkit-detail-meta", text: cat.meta }),
          el("h3", { class: "rootkit-detail-title", id: "rootkit-detail-title", text: cat.name })
        ]),
        el("p", { class: "rootkit-detail-ver", text: KIT.name + " " + KIT.version })
      ]));
      var body = el("div", { class: "rootkit-detail-body" }, cat.render());
      detail.appendChild(body);
    }

    /* 테마가 바뀔 때만 다시 그립니다 (색 견본의 값이 바뀌므로). 다른 값은 Library와 상관없습니다 */
    var lastTheme = null;
    syncLibrary = function (theme) {
      if (theme === lastTheme) return;
      lastTheme = theme;
      if (current === "color") draw();
    };
    draw();
  })();

  /* 첫 그리기 (Library가 준비된 뒤 테마를 한 번에 맞춤) */
  if (window.__rootkitRender) window.__rootkitRender();
})();
