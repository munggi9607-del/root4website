# AppShell

모든 화면을 감싸는 틀입니다. 헤더와 메뉴 레일(모바일에서는 하단 탭바)로 이루어집니다.

## 언제 쓰는가

- **모든 화면**에 씁니다. 새 메뉴 화면도 이 틀 안의 본문만 만듭니다.
- 쓰지 않는 경우는 없습니다. 다이얼로그는 AppShell 위에 뜹니다.

## 구현 파일 — 직접 그리지 않고 불러옵니다

AppShell은 이미 코드로 만들어져 있습니다. **헤더·레일·탭바·다크 모드 버튼을 화면에서 다시 만들지 않습니다.**

| 파일 | 하는 일 |
|---|---|
| [shared/appshell.css](../shared/appshell.css) | 아래 표의 모양 전부 |
| [shared/appshell.js](../shared/appshell.js) | 헤더·레일 그리기, 현재 메뉴 표시, 테마 저장, 본문 `data-route` 링크 채우기 |
| [shared/routes.js](../shared/routes.js) | 메뉴 이름·아이콘·주소 |

```html
<head>
  <link rel="stylesheet" href="../tokens.css">
  <link rel="stylesheet" href="../shared/appshell.css">
  <script src="../shared/routes.js"></script>
  <script src="../shared/appshell.js"></script>
</head>
<body data-menu="archive">   <!-- routes.js의 id -->
  <main> 본문 </main>
</body>
```

- 각 메뉴 폴더의 `index.html`에 이 블록이 이미 들어 있습니다.
- 본문은 `<main>` 하나에 넣습니다. AppShell이 그 앞에 헤더·레일을 넣고 여백을 잡습니다.
- 현재 테마는 `<html data-theme="dark">`로 표시되고 `localStorage`의 `root4-theme`에 저장됩니다. 화면 스크립트에서 테마가 필요하면 `ROOT4.theme()`.
- 모양이나 동작을 바꿔야 하면 `shared/`를 직접 고치지 말고 리드에게 제안합니다([합치기-규칙.md](../합치기-규칙.md)).

## 구조

```
Header
├─ Logo          Root4®  (26 / 800 / -1.4px, ® 는 12px 위첨자)
├─ Breadcrumb    Workspace / {화면명}   (label-sm, Workspace는 text-tertiary)
└─ Actions       Contact Us ↗ (Button outline)   + 모바일에서는 테마 토글 ☾

Rail (데스크톱 세로 / 모바일 하단 가로)
├─ RailItem ×5   아이콘 + 라벨: Projects · About · Archive · RootKit · Contact
└─ ThemeSwitch   ☾ Dark mode  (데스크톱은 레일 맨 아래, 모바일은 헤더 오른쪽)
```

## 크기와 토큰

| 부분 | 데스크톱 | 모바일 (≤760) |
|---|---|---|
| Header 높이 | `--layout-header-h` 68 | `--layout-header-h-mobile` 56, 위에 고정 |
| Header 좌우 여백 | `--space-24` | `--space-16` |
| Header 바탕 / 아래 선 | `--surface-panel` / 1px `--border-default` | 같음 |
| Rail | 왼쪽 세로, 폭 `--layout-rail-w` 82, 바탕 `--surface-rail`, 오른쪽 선 | 아래 고정 가로, 높이 `--layout-tabbar-h` 62, 바탕 `--surface-panel`, 위 선 |
| RailItem | 65×60, 아이콘 위·라벨 아래, 사이 6 | 72×48 |
| RailItem 라벨 | `label-sm` | `label-sm` |
| RailItem 모서리 | `--radius-control` | `--radius-control` |

## 상태

| 상태 | 바탕 | 글자 |
|---|---|---|
| 기본 | 없음 | `--text-tertiary` |
| 현재 화면(active) | `--surface-control` | `--text-primary` |
| hover | `--surface-control` | `--text-primary` |
| focus | 기본 + `--border-focus` 2px 바깥 선 | |

## 규칙

- 메뉴 순서와 이름은 **Projects · About · Archive · RootKit · Contact** 고정입니다. 화면에서 바꾸지 않습니다.
- 현재 화면의 RailItem 하나만 active입니다.
- Contact는 모바일 탭바에서 Contact 화면으로 이동합니다. 데스크톱 헤더의 `Contact Us ↗`도 같은 곳으로 갑니다.
- Breadcrumb의 화면명은 레일 라벨과 같은 말을 씁니다(예: `Workspace / RootKit`). 시안의 Projects는 `Project Board`입니다.
- 화면별로 헤더에 버튼을 더 넣지 않습니다. 화면 동작은 본문 PageHead 옆에 둡니다.

## 접근성

- 레일은 `<nav aria-label="주 메뉴">`, active 아이템에 `aria-current="page"`.
- 아이콘(▦ ◉ ☷ ▤ ↗)은 `aria-hidden="true"`, 라벨 글자가 이름입니다.
- 테마 토글은 `aria-label="다크 모드로 전환"` / `"라이트 모드로 전환"`, `aria-pressed`.

## 시안 출처

`header`, `.workspace-rail`, `.rail-item`, `.rail-item.active`, `#studio-theme`. 시안 레일 라벨은 9px이라 `label-sm` 11px로 올렸습니다.
