# ROOT4 디자인 하네스

ROOT4 Connected Studio 시안에서 뽑은 **공통 디자인시스템**과, 팀원이 메뉴 화면을 하나씩 나눠 만들 때 쓰는 **작업 하네스**입니다.

사이트(합쳐진 결과, `main`): https://root4website.vercel.app/
저장소: https://github.com/munggi9607-del/root4website
시안: https://rootfour-1.vercel.app/

> **시안은 구성·문구·분위기 참고용입니다. 값은 이 폴더의 문서를 따릅니다.**
> 시안에는 디자인시스템에서 바꾸기로 한 값이 그대로 남아 있습니다(회청색 보내기 버튼, 7–9px 글자, Georgia 제목 등). 색·크기·간격을 시안에서 재서 쓰지 말고 [DESIGN.md](DESIGN.md)와 [tokens.css](tokens.css)를 씁니다. 무엇을 바꿨는지는 [기록/측정값.md](기록/측정값.md)와 각 화면 브리프의 "재작업 때 바꿀 것"에 있습니다.

## 폴더 구성

```
design-system/          ← 이 폴더가 그대로 사이트(저장소)입니다
├─ README.md            ← 지금 이 파일. 사람용 시작점
├─ CLAUDE.md            ← AI(Claude 등)가 지킬 작업 규칙
├─ 합치기-규칙.md        ← 폴더 담당, 주소 규칙, Git 브랜치, 합치기 전 확인
├─ DESIGN.md            ← 토큰과 전체 규칙
├─ tokens.css           ← 토큰 값의 원본 (CSS 변수, 라이트·다크)
├─ shared/              ← 공통 코드: AppShell(헤더·레일·탭바), 메뉴 주소표 routes.js
├─ projects/ about/ community/ archive/ contact/
│                       ← 메뉴별 화면 폴더. 각자 자기 폴더만 고칩니다
├─ components/          ← 컴포넌트 목차와 계약 10개
├─ screens/             ← 화면 틀, 브리프 템플릿, 메뉴별 브리프 5개
└─ 기록/                ← 시안 측정값, 결정 기록
```

**합칠 때 문제가 생기지 않도록 두 가지를 미리 정해 두었습니다.** 자세한 내용은 [합치기-규칙.md](합치기-규칙.md)에 있습니다.
- **헤더·레일은 불러오기만 합니다.** 각 메뉴의 `index.html`에는 공통 AppShell이 이미 연결되어 있습니다. `<main>` 안만 만듭니다.
- **메뉴 주소는 [shared/routes.js](shared/routes.js) 한 곳에만 둡니다.** 화면에 다른 메뉴 주소를 직접 적지 않습니다.

## 메뉴 나누기

| 메뉴 | 브리프 | 종류 | 담당 |
|---|---|---|---|
| Projects (포트폴리오) | [screens/projects.md](screens/projects.md) | 재작업 | 명지 |
| About (회사소개) | [screens/about.md](screens/about.md) | 재작업 | 병하 |
| Community (커뮤니티·게시판) | [screens/community.md](screens/community.md) | 신규 · **임시 메뉴, 없어질 수 있음** | 병하 |
| Archive (아카이브·디자인시스템) | [screens/archive.md](screens/archive.md) | 신규 | 혜린 |
| Contact (Contact Us) | [screens/contact.md](screens/contact.md) | 신규(모달 → 페이지) | 병하 |

- Community는 필요한지 판단이 남아 있습니다. 메뉴가 빠지면 `shared/routes.js`에서 그 줄을 지웁니다. 레일·탭바는 자동으로 4칸이 됩니다. 이 표와 AppShell 계약도 같이 고칩니다.
- 담당이 바뀌면 이 표와 브리프 맨 위 `담당`을 같이 고칩니다. 작업 상태는 브리프 맨 위 `상태`에 적습니다.

## 작업 순서

1. **읽기**: DESIGN.md → screens/00-화면-틀.md → 내 메뉴 브리프 → components/index.md → 브리프에 나온 컴포넌트 계약
2. **브리프 채우기**: 내 브리프의 `제안` 부분을 정하고, 6번(임의로 정한 것)·7번(부딪히는 것) 칸을 채웁니다.
3. **확인받기**: 리드에게 아래 네 가지를 보고하고 확인받습니다. 확인 전에는 만들지 않습니다.
   - 핵심 행동 / 적용할 규칙 / 임의로 정한 것 / 부딪히는 것
4. **만들기**: 내 메뉴 폴더(예: `archive/`)의 `index.html`에서 '준비 중' 블록을 지우고 `<main>` 안을 만듭니다. 스타일은 `archive.css`에 씁니다. Git을 쓰면 `menu/archive` 브랜치에서 작업합니다.
5. **보기**: `archive/index.html`을 브라우저로 열거나, `bun scripts/serve.js` 실행 후 http://localhost:4173/archive/
6. **완료 전 확인**: 아래 목록을 확인하고 결과를 브리프 10번 칸에 체크합니다. 그다음 리드에게 합치기를 요청합니다.

AI와 같이 만들 때는 이 폴더를 작업 폴더에 두면 AI가 [CLAUDE.md](CLAUDE.md)를 읽고 같은 순서를 따릅니다. AI에게는 "screens/community.md 화면을 만들어줘"처럼 브리프 파일을 짚어 주면 됩니다.

## 완료 전 확인

**토큰**
- [ ] 색·간격·모서리·그림자·글자 값을 직접 쓰지 않았다 (`#`, `rgb(`, 토큰 없는 `px`를 검색해 본다)
- [ ] `--palette-*`를 화면에서 쓰지 않았다
- [ ] 11px보다 작은 글자가 없다
- [ ] 강조색은 보라 하나다. 회청(`#7289A4`) 등 다른 강조색이 없다

**틀과 컴포넌트**
- [ ] 헤더·레일·탭바를 직접 만들지 않았다. `index.html`의 공통 블록과 `<body data-menu>`가 그대로다
- [ ] 레일의 내 메뉴가 active로 보인다
- [ ] 다른 메뉴 링크는 `data-route`로 걸었다. 주소(시안 주소 포함)를 직접 쓰지 않았다
- [ ] 바꾼 파일이 내 메뉴 폴더 안에만 있다
- [ ] 화면 맨 위가 PageHead다
- [ ] 주 버튼(primary)이 하나다
- [ ] 계약에 없는 컴포넌트·변형을 만들지 않았다 (만들었다면 확인받은 기록이 있다)

**테마와 크기**
- [ ] `<html data-theme="dark">`에서 흰 면이 남지 않고 글자가 읽힌다
- [ ] 375px 폭에서 가로 스크롤이 없고 하단 탭바에 내용이 가리지 않는다
- [ ] 1440px 폭에서 본문이 최대 폭 안에 있다

**접근성**
- [ ] 키보드 Tab으로 모든 버튼에 갈 수 있고 포커스 선이 보인다
- [ ] 아이콘만 있는 버튼에 `aria-label`이 있다
- [ ] `--text-tertiary`로 꼭 읽어야 하는 문장을 쓰지 않았다
- [ ] 움직임이 있으면 reduced-motion에서 멈춘다

## 디자인시스템을 바꾸고 싶을 때

토큰·규칙·컴포넌트가 내 화면에 맞지 않으면 우회하지 말고 리드에게 제안합니다. 정해지면 tokens.css, DESIGN.md, 해당 계약을 같이 고치고 [기록/결정-기록.md](기록/결정-기록.md)에 남깁니다.
