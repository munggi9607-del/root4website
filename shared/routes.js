/*
 * ROOT4 메뉴 주소표 — 사이트 전체에서 메뉴 주소는 이 파일 한 곳에만 둡니다.
 *
 * 화면에서 다른 메뉴로 가는 링크를 직접 적지 않습니다.
 * AppShell(헤더·레일·탭바)이 이 표를 읽어 링크를 만듭니다.
 * 본문에서 다른 메뉴로 보내야 하면 ROOT4.href("about") 를 씁니다.
 *
 * 필드
 *   id      메뉴 식별자. 폴더 이름과 같습니다 (/archive/ → "archive").
 *   label   레일·탭바 라벨
 *   crumb   헤더 경로(Workspace / ...)에 보일 이름
 *   icon    레일 아이콘 글자
 *   path    완성됐을 때의 주소. 사이트 루트 기준 폴더
 *   ready   true면 path로 연결, false면 temp로 연결
 *   temp    완성 전 임시 주소. null이면 path(그 폴더의 '준비 중' 화면)로 연결
 *
 * 메뉴를 합칠 때는 그 메뉴의 ready만 true로 바꿉니다. 다른 필드는 리드와 상의 후 고칩니다.
 */
window.ROOT4_ROUTES = [
  {
    id: "projects",
    label: "Projects",
    crumb: "Project Board",
    icon: "▦",
    path: "projects/",
    ready: true, // 2026-11-25: 시안 보드를 /projects/로 옮김. 사이트 첫 화면(/)도 여기로 옵니다
    temp: null,
  },
  {
    id: "about",
    label: "About",
    crumb: "About",
    icon: "◉",
    path: "about/",
    ready: false,
    temp: "https://rootfour-1.vercel.app/#team", // 시안. 재작업이 끝나면 ready: true
  },
  {
    id: "archive",
    label: "Archive",
    crumb: "Archive",
    icon: "▤",
    path: "archive/",
    ready: true, // 2026-11-25: 혜린 화면 합침
    temp: null,
  },
  {
    id: "rootkit",
    label: "RootKit",
    crumb: "RootKit",
    icon: "☷",
    path: "rootkit/",
    ready: false,
    temp: null, // 2026-11-25: Community → RootKit으로 이름 변경, Archive 아래로 이동. 완성 전에는 폴더의 '준비 중' 화면
  },
  {
    id: "contact",
    label: "Contact",
    crumb: "Contact",
    icon: "↗",
    path: "contact/",
    ready: false,
    temp: null,
  },
];

/* 첫 화면(로고, 사이트 루트)이 가는 메뉴 */
window.ROOT4_HOME = "projects";
