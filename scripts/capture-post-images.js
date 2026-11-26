/*
 * Archive 제작기 글(project-story-04)에 쓰는 사이트 화면 캡처를 다시 만듭니다.
 * 헤드리스 Chrome을 CDP로 직접 움직여 폭 1280 · 1.6배로 캡처합니다. (puppeteer 없이)
 *
 * 쓰는 법: 로컬 서버(bun scripts/serve.js)를 켠 뒤
 *   bun scripts/capture-post-images.js        → archive/post/assets/ 에 저장
 * 필요한 것: macOS의 Google Chrome
 */
const OUT = process.argv[2] || new URL("../archive/post/assets", import.meta.url).pathname;
const PROFILE = "/tmp/root4-capture-profile";
const BASE = "http://localhost:4173";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const W = 1280, H = 800, DPR = 1.6;

const proc = Bun.spawn([CHROME, "--headless=new", `--remote-debugging-port=${PORT}`, "--user-data-dir=" + PROFILE, "--hide-scrollbars", "--no-first-run", "about:blank"], { stderr: "ignore", stdout: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ver;
for (let i = 0; i < 50; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (ver.length) break; } catch (e) {} await sleep(200); }
const page = ver.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const events = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else events.push(d); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); }).then((d) => { if (d.error) throw new Error(method + ": " + d.error.message); return d.result; });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: DPR, mobile: false });

async function go(path, theme) {
  await send("Page.navigate", { url: BASE + "/projects/" });
  await sleep(300);
  await ev(`localStorage.setItem('root4-theme', '${theme || "light"}'); true`);
  await send("Page.navigate", { url: BASE + path });
  await sleep(3800);
}
async function shot(name, clip, quality = 82) {
  const r = await send("Page.captureScreenshot", { format: "jpeg", quality, captureBeyondViewport: !!clip && clip.height > H, clip: clip ? { ...clip, scale: 1 } : undefined });
  await Bun.write(`${OUT}/${name}.jpg`, Buffer.from(r.data, "base64"));
  console.log("saved", name, clip ? `${clip.width}x${clip.height}` : "viewport");
}
/* 긴 캡처용: 화면 높이(svh)에 묶인 크기를 고정 px로, 나타나기 효과는 다 보이게 */
const FREEZE = `(() => { const s = document.createElement('style'); s.textContent = \`
  .projects-overview{min-height:${H - 56}px!important}
  .projects-stage-track{height:auto!important}
  .projects-stage{position:relative!important;top:0!important;height:${H - 56}px!important}
  .projects-stage-main{clip-path:none!important}
  .projects-stage-side{display:none!important}
  .projects-stage-caption{opacity:1!important}
  .projects-quote{height:${Math.round(H * 0.7)}px!important}
  .projects-cover{display:none!important}
  .projects-intro,.projects-scene,.projects-next-card,.archive-reveal,.projects-overview{opacity:1!important;translate:none!important}
  .projects-split .projects-char{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}
  *{animation-play-state:paused!important}
\`; document.head.appendChild(s); document.querySelectorAll('.projects-split,.projects-stage-caption').forEach(e=>e.classList.add('is-typed','is-on')); window.scrollTo(0,0); return true; })()`;

async function tall(name, path, maxH, theme) {
  await go(path, theme);
  await ev(FREEZE); await sleep(800);
  const h = await ev(`Math.min(document.documentElement.scrollHeight, ${maxH})`);
  await shot(name, { x: 0, y: 0, width: W, height: h }, 78);
}

const HIDE_CHROME = `(() => { const s=document.createElement("style"); s.textContent=".projects-bar,.projects-toc,.r4-header,.r4-rail,.team-prompt{visibility:hidden!important}"; document.head.appendChild(s); return true })()`;
const ONLY_CHROME = `(() => { const s=document.createElement("style"); s.textContent="html,body{background:transparent!important} body > *:not(.r4-header):not(.r4-rail):not(.projects-bar):not(.projects-toc){visibility:hidden!important} .projects-cover{display:none!important}"; document.head.appendChild(s); window.scrollTo(0,0); return true })()`;
async function tall2(name, path, maxH) {
  await go(path, "light");
  await ev(FREEZE); await ev(HIDE_CHROME); await sleep(800);
  const h = await ev(`Math.min(document.documentElement.scrollHeight, ${maxH})`);
  await shot(name, { x: 0, y: 0, width: W, height: h }, 80);
  // 고정된 부분(상단 바·목차 / 헤더·레일)만 투명 PNG로
  await go(path, "light");
  await ev(FREEZE); await ev(ONLY_CHROME); await sleep(800);
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  const r = await send("Page.captureScreenshot", { format: "png" });
  await Bun.write(`${OUT}/${name}-chrome.png`, Buffer.from(r.data, "base64"));
  await send("Emulation.setDefaultBackgroundColorOverride", {});
  console.log("saved", name, h, "+ chrome");
}

// 1. 보드: 프로젝트 카드만 (제목·칩·줌·힌트·커서·캐릭터·질문 카드는 숨김). 커서는 글에서 따로 움직입니다.
async function board(name, theme) {
  await send("Emulation.setDeviceMetricsOverride", { width: 1680, height: 1050, deviceScaleFactor: DPR, mobile: false });
  await go("/projects/", theme);
  const rect = await ev(`(() => {
    const st = document.createElement("style");
    st.textContent = "#projects .project-head,#projects .filters,#projects .presence-info,#projects .project-prompt,#projects .anchor-results,.canvas-hint,.zoom,.presence-layer,.delivery-screen-overlay,.studio-companion,.prompt-node,.stage .cursor,.cursor{display:none!important} #world .node{opacity:1!important;visibility:visible!important}";
    document.head.appendChild(st);
    // 아직 도착 전(pending-drop)이거나 흐려진 카드도 모두 보이게
    document.querySelectorAll("#world .node").forEach(n => { n.classList.remove("pending-drop", "review-dim", "anchor-muted", "anchor-focus"); n.inert = false; });
    const world = document.getElementById("world"), canvas = document.getElementById("canvas");
    const items = [...world.querySelectorAll(".node,.projects-extra")].filter(e => e.offsetWidth);
    const L = Math.min(...items.map(e => e.offsetLeft)), T = Math.min(...items.map(e => e.offsetTop));
    const R = Math.max(...items.map(e => e.offsetLeft + e.offsetWidth)), B = Math.max(...items.map(e => e.offsetTop + e.offsetHeight));
    const cr = canvas.getBoundingClientRect(), pad = 72;
    scale = Math.min((cr.width - pad * 2) / (R - L), (cr.height - pad * 2) / (B - T));
    x = (cr.width - (R - L) * scale) / 2 - L * scale;
    y = (cr.height - (B - T) * scale) / 2 - T * scale;
    transform();
    return { x: cr.left, y: cr.top, width: cr.width, height: cr.height };
  })()`);
  await sleep(1200);
  await shot(name, rect, 88);
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: DPR, mobile: false });
}
await board("board-canvas", "light");
await board("board-canvas-dark", "dark");

// 3. 길게 스크롤되는 화면들 (본문 + 고정 부분)
await tall2("scroll-detail-13", "/projects/detail/?p=13", 3600);
await tall2("scroll-rootkit", "/rootkit/", 3200);
await tall2("scroll-about", "/about/", 2600);
await tall2("scroll-archive", "/archive/", 2400);


// 5. 상세 진입 영상용: 보드 화면(카드 09 위치 기록) + 진입한 상세 첫 화면
async function enterShots() {
  await go("/projects/", "light");
  const card = await ev(`(async () => {
    document.querySelectorAll("#world .node").forEach(n => n.classList.remove("pending-drop", "review-dim", "anchor-muted", "anchor-focus"));
    const st = document.createElement("style"); st.textContent = "#world .node{opacity:1!important}"; document.head.appendChild(st);
    try { setReviewPaused(true); } catch (e) {}
    document.getElementById("reset").click();
    await new Promise(r => setTimeout(r, 900));
    const r = document.querySelectorAll("#world .node")[8].getBoundingClientRect();
    return { l: r.left / innerWidth, t: r.top / innerHeight, w: r.width / innerWidth, h: r.height / innerHeight };
  })()`);
  await sleep(500);
  await shot("enter-board", null, 85);
  console.log("card09 (post.js enter.card 에 넣는 값)", JSON.stringify(card));
  await go("/projects/detail/?p=09", "light");
  await sleep(1500);
  await shot("enter-detail", null, 85);
}
await enterShots();

// 7. Projects 장면: 대화창에 질문을 입력해 대화에 참여 → 관련 프로젝트로 연결 → 하나를 골라 들어가기
async function promptScene() {
  await go("/projects/", "light");
  const q = "브랜드 리뉴얼 작업을 보고 싶어요";
  await ev(`(async () => {
    document.querySelectorAll("#world .node").forEach(n => n.classList.remove("pending-drop"));
    try { setReviewPaused(true); } catch (e) {}
    document.getElementById("reset").click();
    await new Promise(r => setTimeout(r, 900));
    return true;
  })()`);
  await shot("prompt-1", null, 82);
  const type = (t) => `(() => { const i = document.querySelector("#ask input"); i.focus(); i.value = ${JSON.stringify(t)}; i.dispatchEvent(new Event("input", { bubbles: true })); return true; })()`;
  await ev(type(q.slice(0, 6))); await sleep(300); await shot("prompt-2", null, 82);
  await ev(type(q)); await sleep(300); await shot("prompt-3", null, 82);
  await ev(`(() => { const f = document.getElementById("ask"); f.requestSubmit(); return true; })()`);
  await sleep(1400); await shot("prompt-4", null, 82);
  await ev(`(() => { focusReview(8); return true; })()`);
  await sleep(1600); await shot("prompt-5", null, 82);
  await ev(`(async () => { showProject(8); await new Promise(r => setTimeout(r, 30)); document.getAnimations().forEach(a => { a.pause(); a.currentTime = 470; }); return true; })()`);
  await sleep(600); await shot("prompt-6", null, 82);
}
await promptScene();


// 8. Playground 조작 영상: 커서가 슬라이더·칩을 차례로 조정하는 프레임 (도구 영역만 잘라서)
//    결과: sim-01.jpg … (콘솔에 찍히는 stage.frames 배열을 post.js에 옮깁니다: [파일, 시간ms, 단계])
async function simFrames() {
  await go("/rootkit/", "light");
  await ev(`(() => {
    ROOT4.immersive(true);
    const c = document.createElement("div");
    c.id = "sim-cursor";
    c.innerHTML = '<svg viewBox="0 0 24 30" width="22" height="28"><path d="M5 3.5C3.8 3 2.7 4 3 5.3l4.2 18c.3 1.4 2.2 1.7 2.8.3l3.2-7.2 7.6-2.7c1.4-.5 1.3-2.4-.1-2.9L5 3.5Z" fill="#303944" stroke="#fff" stroke-width="1.4"/></svg><i></i>';
    c.style.cssText = "position:absolute;z-index:9999;pointer-events:none;left:0;top:0;transform:translate(-4px,-3px)";
    const st = document.createElement("style");
    st.textContent = "#sim-cursor i{position:absolute;left:-10px;top:-10px;width:26px;height:26px;border-radius:50%;background:rgba(127,101,233,.28);opacity:0} #sim-cursor.press i{opacity:1}";
    document.head.appendChild(st); document.body.appendChild(c);
    window.__tool = document.querySelector("#rootkit-playground .rootkit-tool");
    window.scrollTo(0, __tool.getBoundingClientRect().top + scrollY - 40);
    window.__at = (x, y, press) => { c.style.left = x + "px"; c.style.top = y + "px"; c.classList.toggle("press", !!press); };
    window.__thumb = (i) => { const r = __tool.querySelectorAll("input[type=range]")[i]; const b = r.getBoundingClientRect(); const f = (r.value - r.min) / (r.max - r.min); return [b.left + 8 + f * (b.width - 16) + scrollX, b.top + b.height / 2 + scrollY]; };
    window.__setRange = (i, v) => { const r = __tool.querySelectorAll("input[type=range]")[i]; r.value = v; r.dispatchEvent(new Event("input", { bubbles: true })); r.dispatchEvent(new Event("change", { bubbles: true })); };
    window.__chip = (label, opt) => { const g = [...__tool.querySelectorAll(".rootkit-chips")].find(x => x.closest(".rootkit-ctl").querySelector(".rootkit-ctl-label").textContent.trim() === label); const b = [...g.querySelectorAll("button")].find(x => x.textContent.trim() === opt); const r = b.getBoundingClientRect(); return { b, x: r.left + r.width * 0.55 + scrollX, y: r.top + r.height * 0.6 + scrollY }; };
    return true;
  })()`);
  await sleep(700);
  const clip = await ev(`(() => { const r = __tool.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })()`);
  const steps = [];
  let n = 0;
  async function frame(step, js, ms) {
    await ev(`(() => { ${js}; return true; })()`);
    await sleep(260);
    n++;
    const name = "sim-" + String(n).padStart(2, "0");
    const r = await send("Page.captureScreenshot", { format: "jpeg", quality: 82, captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
    await Bun.write(`${OUT}/${name}.jpg`, Buffer.from(r.data, "base64"));
    steps.push([name + ".jpg", ms, step]);
  }
  // 1) 간격: 카드 Padding 끌어 올리기 → Gap 줄이기 → 버튼 Padding 키우기
  await frame(0, `const [x, y] = __thumb(0); __at(x - 60, y + 40)`, 700);
  await frame(0, `const [x, y] = __thumb(0); __at(x, y, true)`, 450);
  for (const v of [6, 7, 8]) await frame(0, `__setRange(0, ${v}); const [x, y] = __thumb(0); __at(x, y, true)`, 380);
  await frame(0, `const [x, y] = __thumb(1); __at(x, y, true)`, 450);
  for (const v of [1, 0]) await frame(0, `__setRange(1, ${v}); const [x, y] = __thumb(1); __at(x, y, true)`, 380);
  for (const v of [5, 7]) await frame(0, `__setRange(2, ${v}); const [x, y] = __thumb(2); __at(x, y, true)`, 420);
  // 2) 상태
  for (const o of ["Hover", "Active"]) await frame(1, `const c = __chip("상태", "${o}"); __at(c.x, c.y, true); c.b.click()`, 650);
  // 3) 형태 · 크기 · 모서리
  await frame(2, `const c = __chip("형태", "Outlined"); __at(c.x, c.y, true); c.b.click()`, 600);
  await frame(2, `const c = __chip("크기", "Large"); __at(c.x, c.y, true); c.b.click()`, 600);
  await frame(2, `const c = __chip("모서리", "Pill"); __at(c.x, c.y, true); c.b.click()`, 700);
  // 4) 색
  for (const o of ["Ocean", "Forest", "Ember"]) await frame(3, `const c = __chip("컬러 테마", "${o}"); __at(c.x, c.y, true); c.b.click()`, 650);
  await frame(3, `const c = __chip("컬러 테마", "Ember"); __at(c.x + 90, c.y - 120, false)`, 1400);
  console.log("stage.frames =", JSON.stringify(steps));
  console.log("sim frames", steps.length, JSON.stringify(clip));
}
await simFrames();

ws.close(); proc.kill();
