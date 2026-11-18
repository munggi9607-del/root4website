// 로컬 미리보기 서버 (Bun). 사용: bun scripts/serve.js  → http://localhost:4173
// Vercel과 같게 폴더 주소(/archive/)는 그 폴더의 index.html을 엽니다.
import { join, normalize } from "node:path";

const root = normalize(join(import.meta.dir, ".."));
const port = Number(process.env.PORT || 4173);

Bun.serve({
  port,
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname);
    if (path.endsWith("/")) path += "index.html";
    const full = normalize(join(root, path));
    if (!full.startsWith(root)) return new Response("Forbidden", { status: 403 });
    const file = Bun.file(full);
    if (await file.exists()) return new Response(file);
    // /archive 처럼 끝 슬래시가 없으면 /archive/ 로 보냅니다 (vercel.json trailingSlash와 같게)
    if (await Bun.file(join(full, "index.html")).exists()) {
      return Response.redirect(path + "/", 308);
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`ROOT4 미리보기: http://localhost:${port}`);
