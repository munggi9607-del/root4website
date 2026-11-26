# Projects 화면 (재작업)

담당: 명지
상태: 1차 — 시안 보드를 /projects/로 옮김 (2026-11-25). 사이트 첫 화면(/)도 이 화면

> **지금 구현 방식:** `projects/index.html`은 시안(rootfour-1) HTML을 통째로 옮긴 것입니다. 시안 자체의 헤더·레일은 `projects.css`에서 숨기고 공통 AppShell을 씁니다. 시안의 다크 모드는 `projects.js`가 AppShell 테마에 맞춥니다. 시안 안의 숨겨진 About·팀 화면 코드는 파일에 남아 있지만 보이지 않습니다.
>
> **5번 표 진행:** 보내기 버튼 보라, 제목 DM Sans, 아바타 중립색, 칩 모서리 6 → 적용함. **최소 11px → 아직**(보드의 작은 글자를 키우면 카드·칩 배치가 바뀌어 다음 단계로 미룸).

## 1. 이 화면은 무엇인가

ROOT4가 진행한 프로젝트 20개를 팀 대화와 함께 둘러보는 작업 공간입니다. 사용자는 "팀이 실제로 같은 보드를 보며 이야기하는 장면" 안에 들어온 느낌을 받습니다.

## 2. 핵심 행동

프로젝트 하나를 골라 상세를 연다. 보조 행동은 팀(루트포)에게 질문 보내기입니다.

## 3. 본문 배치

A. 작업 공간 — 왼쪽 대화 패널 316 + 오른쪽 보드 캔버스.

## 4. 섹션 구성 (시안 그대로)

| 위치 | 섹션 | 컴포넌트 | 내용 |
|---|---|---|---|
| 왼쪽 패널 위 | 패널 머리 | 아이브로우 + Button icon | `● ROOT4 / TEAM ROOM`, `투어 일시정지`, `팀 대화 다시 보기` |
| 왼쪽 패널 | 팀 대화 | ChatMessage plain | `{팀} · {이름}` + 시간 + 본문, 입력 중 표시 |
| 왼쪽 패널 아래 | 질문 | Composer | `✳ 루트포에게 물어보세요` / `어떤 경험을 함께 만들어볼까요?` / 제안 칩 3개 |
| 캔버스 위 | 머리 | PageHead page | `ROOT4 / A SHARED CREATIVE SPACE` / `Project Board` / `A place for ideas, references, and work in progress` |
| 캔버스 위 | 걸러 보기 | Chip filter | `All projects 20` · `Digital experience` · `Brand experience` · `Service design` · `↻ Replay arrivals` |
| 캔버스 | 보드 | Card board (+ 계약 없는 캔버스 요소) | 프로젝트 카드, 노트, 체크리스트, 파일 |
| 캔버스 아래 | 컨트롤 | (계약 없음) | 줌 −/+/⌖, `DRAG TO EXPLORE` 힌트, 함께 보는 사람 |
| 모바일 | 보기 전환 | Tabs compact | `Board` / `List` → List는 Card list |

## 5. 재작업 때 바꿀 것 (시안 → 규칙)

| 시안 | 바꿀 값 | 근거 |
|---|---|---|
| 보내기 버튼 회청 `#7289A4` | `--surface-action-primary` 보라 | 강조색은 보라 하나 |
| 제목 `Project Board` Georgia 29/600 | `heading-lg` DM Sans 30/500 | 세리프 제목 안 씀 |
| 칩·시간·아이브로우 7–9px | `label-sm`·`eyebrow` 11px | 최소 11px |
| 아바타 바탕 회청 `#8A9AAA` | `--surface-control` | 강조색 통일 |
| 칩 모서리 5px | `--radius-chip` 6 | 모서리 통합 |

## 6. 규칙에 없어서 정해야 하는 것

- 캔버스·줌·커서·캐릭터 말풍선은 Projects 전용입니다. 다른 화면에 가져가려면 보고합니다.
- 필터 칩의 "전체" 개수(20)는 데이터에서 셉니다.

## 7. 모바일

- 대화 패널은 아래에서 올라오는 시트(손잡이 `.mobile-chat-handle`).
- 보드 대신 Tabs `Board`/`List`, List는 Card list 1열.

## 8. 완료 기준

- [ ] README "완료 전 확인" 통과
- [ ] 위 5번 표의 다섯 가지가 모두 바뀌었다
- [ ] 자동 대화에 멈춤 버튼이 있고 reduced-motion이면 자동 재생하지 않는다

## 9. 프로젝트 상세페이지 (2026-11-25 임시)

카드를 누르면 팝업 대신 **상세페이지**로 이동합니다. 배치와 규칙은 [화면 틀 D. 쇼케이스](00-화면-틀.md)(예외 화면: GNB 없음, 프로젝트 고유색).

- 주소: `/projects/detail/?p=02`. 번호는 보드 카드 순서(01–20). 파일 하나(`projects/detail/`)로 20개를 모두 그립니다.
- 데이터: `projects/projects-data.js` (보드 `boardItems`에서 꺼냄). `color`·`text`는 사진 대표색에서 자동으로 뽑았고 직접 고쳐도 됩니다.
- 사진: `projects/assets/` (보드 안에 글자로 들어 있던 사진을 파일로 꺼냄).
- 색 확대 전환은 `projects/projects.js`(`openDetail`), 모양은 `projects.css` 3번. 보드 `index.html` 끝에 `projects-data.js`를 불러오는 줄을 직접 넣었습니다(시안을 다시 옮길 때 같이 넣어야 함).
- 문구는 **임시**입니다(보드의 한 줄 설명으로 만든 문장, 기간 '예시'). `CONCEPT DEMO` 표시를 남겨 둡니다.
- 보드 사진이 작아서(가로 약 200–590px) 큰 화면에서는 흐릿할 수 있습니다. 실제 사진이 오면 바꿉니다.

**실제 프로젝트를 넣는 방법:** [projects-detail.md](projects-detail.md) — 받은 비주얼·설명글로 프로젝트마다 목차(4–7개, 처음 OVERVIEW·끝 NEXT)를 정하고, 비주얼 최대화 패럴렉스 영역은 한 페이지에 1–2곳 둡니다. 지금 20개는 같은 임시 목차 5개입니다.

## 10. 보드 사이사이의 다른 메뉴 카드 (2026-11-26)

프로젝트 카드 사이에 다른 메뉴로 들어가는 카드를 섞어 둡니다. 프로젝트 카드(`.node`)가 아니라서 번호(01–20)와 필터 개수에 들어가지 않습니다.

| 카드 | 모양 | 누르면 | 위치 |
|---|---|---|---|
| RootKit 썸네일 1개 | 사진 대신 **살아 있는 키트 미리보기**: 점선 격자 위 견본(모서리·간격이 6초마다 바뀜) + 색·글자 견본, `Build Faster, Create Freely.` / `Try the kit ↗`, 테두리 `--border-accent` | RootKit 메뉴 | 보드 오른쪽 위(1520, 400) |
| Archive 최근 글 최대 5개 | **글 위주 카드**: `INSIGHT / 01` + 제목 2줄 + 요약 2줄 + `Archive ↗` | 그 글 상세 `archive/post/?id=…` | 프로젝트 사이 빈자리 5곳 |

- Archive 글은 Archive 목록 페이지를 읽어 위에서부터 5개를 씁니다(목록 순서 = 최신). 파일 더블클릭(`file://`)으로 열면 보이지 않습니다.
- 필터가 All일 때만 보이고, 분류로 거르면 흐려지고 눌리지 않습니다.
- 보드는 끌어서 둘러보기라, 끌지 않고 뗐을 때만 이동합니다.
- 모바일 List: RootKit은 3번째, Archive 글은 프로젝트 4개마다 하나씩, 한 줄 전체 폭.
- 동작 줄이기면 견본 움직임을 끕니다.
- 코드: `projects.js` 아래쪽, `projects.css` 4번. 자리 좌표는 `SPOT_ROOTKIT`, `SPOTS_ARCHIVE`.
