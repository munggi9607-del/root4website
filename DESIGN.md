---
version: alpha
name: ROOT4 디자인시스템
description: ROOT4 Connected Studio 시안(Projects, About, Contact, Community·Archive 팝업)에서 공통으로 쓰는 값과 규칙. 값의 원본은 tokens.css입니다.
source: https://rootfour-1.vercel.app/ (2026-11-17 측정. 시안은 참고용이고 값은 이 문서가 기준)
colors:
  # Semantic (light / dark)
  surface-page: ["#eceeef", "#272b31"]
  surface-panel: ["#ffffff", "#343941"]
  surface-rail: ["#f9fafb", "#2c3138"]
  surface-control: ["#f0f2f4", "#373e47"]
  surface-accent: ["#7f65e9", "#7f65e9"]
  surface-action-primary: ["#7c64cb", "#7c64cb"]
  surface-accent-subtle: ["#f0eaf7", "rgb(127 101 233 / 0.18)"]
  surface-scrim: ["rgb(19 16 25 / 0.66)", "rgb(19 16 25 / 0.66)"]
  border-default: ["#dfe3e7", "#454d58"]
  border-accent: ["#bfadd2", "rgb(164 142 240 / 0.5)"]
  border-focus: ["#7f65e9", "#a48ef0"]
  text-primary: ["#303944", "#e1e6ec"]
  text-secondary: ["#6b7280", "#c3ccd6"]
  text-tertiary: ["#89929c", "#9ba7b5"]
  text-accent: ["#695181", "#a48ef0"]
  text-eyebrow: ["#8b779f", "#a48ef0"]
  text-inverse: ["#ffffff", "#ffffff"]
typography:
  font: '"DM Sans", "Noto Sans KR", sans-serif'
  display-lg: 50px / 500 / 1.35 / -2.5px
  display-md: 40px / 500 / 1.25 / -2px
  heading-lg: 30px / 500 / 1.3 / -1.5px
  heading-md: 16px / 500 / 1.4 / 0
  heading-sm: 14px / 500 / 1.4 / 0
  body-lg: 14px / 400 / 1.95 / -0.35px
  body-md: 13px / 400 / 1.85 / 0
  body-sm: 12px / 400 / 1.9 / 0
  label-md: 12px / 500 / 1.3 / 0
  label-sm: 11px / 400 / 1.3 / 0.1px
  eyebrow: 11px / 400 / 1.3 / 2px / uppercase
spacing: [4, 8, 12, 16, 20, 24, 32, 40, 56]
rounded:
  chip: 6px
  control: 8px
  card: 12px
  dialog: 16px
  pill: 999px
  round: 50%
elevation:
  sm: 0 2px 8px rgb(40 49 61 / 0.07)
  card: 0 3px 9px rgb(34 50 72 / 0.07)
  md: 0 5px 18px rgb(40 49 61 / 0.07)
  lg: 0 10px 55px rgb(52 66 93 / 0.10)
  dialog: 0 30px 100px rgb(0 0 0 / 0.27)
layout:
  header: 68px (mobile 56px)
  rail: 82px (mobile → 하단 탭바 62px)
  panel: 316px
  content-max: 1140px
  touch-min: 40px
  breakpoints: { mobile: "≤760px", tablet: "761–1050px", desktop: "≥1051px" }
---

# ROOT4 디자인시스템

## Overview

ROOT4는 기획·디자인·개발 팀이 **한 화면에서 같이 보고 이야기하는 스튜디오**처럼 보이는 것이 목표입니다. 시안에서 반복되는 인상은 세 가지입니다.

- **조용한 작업 공간**: 회색 바탕 위에 흰 면을 얹고, 선은 가늘게 한 가지 회색만 씁니다. 색은 거의 쓰지 않습니다.
- **대화가 중심**: 화면 어딘가에 팀 대화, 질문 입력, 제안 칩이 있습니다. 사용자가 "물어보는" 흐름을 계속 열어 둡니다.
- **보라 한 점**: 강조는 보라 하나뿐이고, 점·선택 상태·주 버튼처럼 작게만 씁니다.

이 문서의 원칙은 세 가지입니다.

1. 토큰 이름은 `{용도}-{역할}`입니다(`--surface-panel`, `--text-tertiary`). 화면과 컴포넌트는 Semantic 토큰만 씁니다. `--palette-*`는 tokens.css 안에서만 참조합니다.
2. 라이트·다크는 Semantic 값만 바뀝니다. 화면 코드에서 테마별로 색을 따로 쓰지 않습니다.
3. 버튼, 칩, 탭, 카드, 다이얼로그가 필요하면 [components/index.md](components/index.md)의 계약대로 씁니다. 계약에 없는 것이 필요하면 직접 만들지 말고 **보고 후 추가**합니다.

값의 원본은 [tokens.css](tokens.css)이고, 시안에서 잰 원래 값은 [기록/측정값.md](기록/측정값.md), 왜 이렇게 정했는지는 [기록/결정-기록.md](기록/결정-기록.md)에 있습니다.

## Colors

색은 Atomic(`--palette-*`)과 Semantic 두 층입니다. 화면에서는 Semantic만 고릅니다.

### surface: 면

| 토큰 | 언제 | 라이트 | 다크 |
|---|---|---|---|
| `--surface-page` | 본문·캔버스 바탕. 흰 면이 올라가는 바닥 | `#ECEEEF` | `#272B31` |
| `--surface-panel` | 헤더, 대화 패널, 카드, 다이얼로그 | `#FFFFFF` | `#343941` |
| `--surface-rail` | 왼쪽 레일 | `#F9FAFB` | `#2C3138` |
| `--surface-control` | 칩, 선택된 레일 아이템, 입력칸 바탕 | `#F0F2F4` | `#373E47` |
| `--surface-accent` | 상태 점, 작은 표시 마크. **글자를 올리지 않음** | `#7F65E9` | `#7F65E9` |
| `--surface-action-primary` | 주 버튼, 보내기 버튼(흰 글자) | `#7C64CB` | `#7C64CB` |
| `--surface-accent-subtle` | 선택된 칩·멤버 칩의 바탕 | `#F0EAF7` | 보라 18% |
| `--surface-scrim` | 다이얼로그 뒤를 덮는 막 | 보랏빛 검정 66% | 같음 |

### border: 선

- `--border-default` 하나로 거의 모든 선을 그립니다(헤더 아래, 패널 사이, 버튼·칩·입력칸 테두리, 카드 구분).
- `--border-accent`는 선택된 칩에만 씁니다.
- `--border-focus`는 키보드 포커스에만 씁니다.

### text: 글자

| 토큰 | 언제 |
|---|---|
| `--text-primary` | 제목, 본문, 버튼 글자 |
| `--text-secondary` | 설명 문단, 채팅 말풍선 본문 |
| `--text-tertiary` | 시간, 개수, 상태, 보조 라벨. **대비가 3.2:1이라** 읽어야만 하는 문장에는 쓰지 않습니다 |
| `--text-accent` | 선택된 칩·탭 글자 |
| `--text-eyebrow` | 아이브로우(작은 대문자 머리말) |
| `--text-inverse` | `--surface-action-primary` 위 글자 |

### 색 규칙

- **강조색은 보라 하나입니다.** 시안 Projects 화면의 회청색 보내기 버튼(`#7289A4`)은 쓰지 않고 `--surface-action-primary`로 바꿉니다.
- 한 화면에서 `--surface-action-primary`로 칠한 버튼은 **한 개만** 둡니다. 나머지는 outline이나 ghost입니다.
- 사진과 일러스트 말고 화면 UI에 다른 색(빨강, 초록 등)을 새로 넣지 않습니다. 상태 색(오류, 성공)이 필요하면 보고합니다. 아직 정의하지 않았습니다.

## Typography

글꼴은 `DM Sans`(영문·숫자)와 `Noto Sans KR`(한글)을 한 스택으로 씁니다. **최소 글자 크기는 11px입니다.**

| 스타일 | 값 (size/weight/line/tracking) | 언제 |
|---|---|---|
| `display-lg` | 50 / 500 / 1.35 / -2.5px | 페이지 대표 문장(About 첫 제목). 한 화면에 하나 |
| `display-md` | 40 / 500 / 1.25 / -2px | 다이얼로그·독립 페이지의 대표 제목(Contact) |
| `heading-lg` | 30 / 500 / 1.3 / -1.5px | 섹션 제목, 페이지 헤드 제목(Project Board) |
| `heading-md` | 16 / 500 / 1.4 | 카드 제목, 단계 제목 |
| `heading-sm` | 14 / 500 / 1.4 | 탭 안 그룹 이름, 작은 카드 제목 |
| `body-lg` | 14 / 400 / 1.95 / -0.35px | 대화 본문 |
| `body-md` | 13 / 400 / 1.85 | 설명 문단, 말풍선 |
| `body-sm` | 12 / 400 / 1.9 | 짧은 보조 설명 |
| `label-md` | 12 / 500 / 1.3 | 버튼, 탭 글자 |
| `label-sm` | 11 / 400 / 1.3 / 0.1px | 칩, 필터, 레일 라벨, 시간 |
| `eyebrow` | 11 / 400 / 1.3 / 2px, 대문자 | 섹션 위 머리말(`ROOT4 / ARCHIVE`) |

- 로고(`Root4®`)만 26px / 800 / -1.4px입니다. 로고 말고는 700 이상을 쓰지 않습니다.
- 제목은 모두 sans입니다. 시안의 Georgia 세리프 제목(`Project Board`)은 재작업 때 `heading-lg`로 바꿉니다.
- 큰 제목일수록 자간을 좁힙니다(위 표의 tracking 그대로). 본문은 자간을 건드리지 않습니다.
- 한국어 제목은 의미 단위로 직접 줄을 바꿉니다(`다른 시선이 모여,<br>하나의 경험이 됩니다.`).

## Layout & Spacing

### 화면 틀 (모든 화면 공통)

```
데스크톱 (≥761px)
┌──────────────────────────────────────────────────────────┐
│ Header 68 : 로고 · 경로(Workspace / 화면명) ········ Contact Us │
├──────┬───────────────────────────────────────────────────┤
│ Rail │ 본문 (화면마다 다름)                               │
│  82  │  - 2단: 패널 316 + 캔버스 (Projects)               │
│      │  - 1단: 최대 폭 1140 가운데 정렬 (About, 새 화면)  │
└──────┴───────────────────────────────────────────────────┘

모바일 (≤760px)
┌──────────────────────┐
│ Header 56 (고정)  ☾  │
├──────────────────────┤
│ 본문 1단             │
├──────────────────────┤
│ 하단 탭바 62 (고정)   │  ← 레일이 내려옴. 5칸: Projects About Archive RootKit Contact
└──────────────────────┘
```

자세한 틀은 [screens/00-화면-틀.md](screens/00-화면-틀.md)에 있습니다.

### 간격

간격은 4의 배수(`--space-4` ~ `--space-56`)만 씁니다. 크기보다 관계로 고릅니다.

| 관계 | 값 |
|---|---|
| 아이콘과 글자, 칩 안쪽 | 4–8 |
| 같은 묶음 안 요소 사이(칩과 칩, 메타와 본문) | 8–12 |
| 컴포넌트 안쪽 여백(카드, 컴포저, 패널) | 12–24 |
| 섹션 안 블록 사이 | 24–32 |
| 섹션과 섹션 사이 | 40–56 |
| 본문 좌우 여백 | 데스크톱 32, 모바일 16 |

- 누를 수 있는 요소는 보이는 크기가 작아도 누르는 영역을 40×40 이상으로 둡니다(`--touch-min`).

## Elevation & Depth

면의 높이는 "바닥(`surface-page`) → 흰 면(`surface-panel`) → 떠 있는 것" 세 층입니다.

| 그림자 | 언제 |
|---|---|
| 없음 | 헤더, 레일, 대화 패널처럼 바닥에 붙은 흰 면. 경계는 `border-default` 선으로 |
| `--shadow-card` | 보드 위 카드 |
| `--shadow-sm` | 바닥 위에 떠 있는 작은 컨트롤(줌, 힌트) |
| `--shadow-md` | 컴포저처럼 떠 있는 입력 |
| `--shadow-lg` | 큰 떠 있는 패널(팀 질문 입력) |
| `--shadow-dialog` | 다이얼로그. 뒤를 `--surface-scrim` + 블러 10px로 덮음 |

## Shapes

| 모서리 | 언제 |
|---|---|
| `--radius-chip` 6 | 칩, 필터, 30×30 아이콘 버튼 |
| `--radius-control` 8 | 버튼, 레일 아이템, 입력칸, 탭, 모바일 카드 |
| `--radius-card` 12 | 카드, 컴포저 |
| `--radius-dialog` 16 | 다이얼로그, 큰 패널(팀 채팅방) |
| `--radius-pill` | 줌 컨트롤, 캔버스 힌트, 멤버 칩 |
| `--radius-round` | 아바타, 닫기 버튼, 상태 점 |

보드 위 프로젝트 카드(사진 카드)는 모서리가 0입니다. 사진을 액자처럼 보이게 하는 예외라 보드 카드에만 씁니다.

## Motion

- 색 바뀜 `--motion-fast`(0.2s), 나타남 `--motion-base`(0.3s), 이동·그림자 `--motion-slow`(0.4s)입니다.
- 들어오는 움직임은 `--ease-out`을 씁니다.
- `prefers-reduced-motion`이면 모든 움직임을 끕니다(tokens.css가 처리). 자동으로 흐르는 대화·투어는 멈춤 버튼을 반드시 둡니다.

## Voice & Copy

- 영문은 **아이브로우와 작은 라벨**에만 씁니다(`LET'S START A CONVERSATION`, `All projects`). 제목과 설명은 한국어입니다.
- 제목은 "~합니다 / ~해요"로 끝나는 짧은 두 줄 문장입니다. 사용자에게 말을 거는 말투입니다(`팀의 대화에 들어와 보세요.`).
- 앞으로 가는 링크·버튼 끝에는 `↗`, 아래로 내려받는 것에는 `↓`를 붙입니다.
- 준비 중인 공간은 "IA에 맞춰 준비 중인 공간입니다."처럼 숨기지 않고 말합니다.

## Components

정확한 구조, 변형, 상태는 각 계약에 있습니다. 목차는 [components/index.md](components/index.md)입니다.

| 컴포넌트 | 언제 |
|---|---|
| AppShell | 모든 화면의 헤더 + 레일(모바일 하단 탭바) |
| Button | 동작 실행. primary / outline / ghost / icon |
| Chip | 걸러 보기(필터), 빠른 질문(제안) |
| Tabs | 같은 화면 안에서 보기 전환(그룹 탭, Board/List) |
| PageHead | 아이브로우 + 제목 + 설명 |
| Card | 관련 내용을 흰 면 하나로 묶기 |
| Composer | 질문 입력 + 보내기 + 제안 칩 |
| ChatMessage | 대화 한 줄(메타 + 본문) |
| Dialog | 상세, 문의, 준비 중 안내 |
| Avatar | 사람 표시, 함께 보는 사람 묶음 |

## Do's and Don'ts

**Do**

- Semantic 토큰만 씁니다. 다크 테마에서 깨지지 않는지 `data-theme="dark"`로 꼭 확인합니다.
- 화면마다 AppShell을 그대로 쓰고, 레일의 현재 메뉴를 `active`로 표시합니다.
- 페이지 맨 위는 PageHead(아이브로우 + 제목 + 설명)로 시작합니다.
- 주 버튼은 화면당 하나, 나머지는 outline·ghost로 둡니다.
- 칩과 레일 라벨도 11px 이상으로 씁니다.
- 아이콘만 있는 버튼에는 `aria-label`을 넣습니다(시안: `질문 보내기`, `닫기`).
- 키보드 포커스는 `--border-focus` 2px 선으로 보입니다.

**Don't**

- 색, 간격, 모서리, 그림자, 글자 크기 값을 직접 쓰지 않습니다.
- 보라 말고 다른 강조색(회청 `#7289A4` 포함)을 쓰지 않습니다.
- 11px보다 작은 글자를 쓰지 않습니다.
- `--text-tertiary`로 꼭 읽어야 하는 문장을 쓰지 않습니다.
- 700 이상 굵기, 세리프 제목을 쓰지 않습니다(로고 제외).
- 헤더·레일·탭바를 화면마다 다르게 만들지 않습니다.
- 흰 면에 그림자와 진한 테두리를 같이 쓰지 않습니다. 둘 중 하나만 씁니다.
- 포커스 선을 지우지 않습니다.
