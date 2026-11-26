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

// 2. 색 전환 순간 (09 짙은 색)
await go("/projects/", "light");
await ev(`(async()=>{document.querySelectorAll('#projects .node')[8].click(); await new Promise(r=>setTimeout(r,30)); document.getAnimations().forEach(a=>{a.pause(); a.currentTime=430}); return true})()`);
await sleep(700);
await shot("transition", null, 85);

// 4. Visual 확대 장면 (09) — 한 화면
await go("/projects/detail/?p=09", "light");
await ev(`(()=>{const t=document.querySelector('.projects-stage-track'); window.scrollTo(0, t.getBoundingClientRect().top+scrollY-56+t.offsetHeight*0.55); return true})()`);
await sleep(2200);
await shot("detail-stage", null, 85);

// 3. 길게 스크롤되는 화면들 (본문 + 고정 부분)
await tall2("scroll-detail-09", "/projects/detail/?p=09", 3600);
await tall2("scroll-detail-13", "/projects/detail/?p=13", 3600);
await tall2("scroll-rootkit", "/rootkit/", 3200);
await tall2("scroll-about", "/about/", 2600);
await tall2("scroll-archive", "/archive/", 2400);

ws.close(); proc.kill();
