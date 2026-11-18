# Button

누르면 동작을 실행하는 버튼입니다. 다른 화면으로 가는 것도 버튼 모양이면 이 계약을 따릅니다.

## 언제 쓰는가 / 쓰지 않는가

- 쓴다: 보내기, 저장, 열기, 다음으로 가기, 닫기
- 쓰지 않는다: 걸러 보기·빠른 질문 → [Chip](Chip.md), 보기 전환 → [Tabs](Tabs.md), 메뉴 이동 → [AppShell](AppShell.md)

## 변형

| variant | 모양 | 언제 | 시안 예 |
|---|---|---|---|
| `primary` | 바탕 `--surface-action-primary`, 글자 `--text-inverse` | 화면의 핵심 동작. **화면당 하나** | 팀 질문 보내기 |
| `outline` | 바탕 없음, 1px `--border-default`, 글자 `--text-primary` | 보조 동작 | `Contact Us ↗` |
| `ghost` | 바탕·선 없음, 글자 `--text-primary`, 아래 1px 밑줄 | 글 사이·끝의 이동 | `다음 프로젝트 ↗`, `프로젝트 메모 저장 ↓` |
| `icon` | 정사각, 글자 없이 기호 하나 | 보내기 ↗, 닫기 ×, 확대 + − | 컴포저 보내기, 다이얼로그 닫기 |

## 크기

| size | 높이 | 좌우 여백 | 글자 | 모서리 |
|---|---|---|---|---|
| `md` | 38 | `--space-16` | `label-md` | `--radius-control` |
| `sm` | 30 | `--space-12` | `label-sm` | `--radius-control` |
| icon `md` | 30×30 | – | 16px 기호 | `--radius-chip` |
| icon `round` | 36×36 | – | 20px 기호 | `--radius-round` (닫기) |

누르는 영역은 보이는 크기와 상관없이 40×40 이상(`--touch-min`)입니다.

## 상태

| 상태 | primary | outline | ghost |
|---|---|---|---|
| hover | 바탕 10% 어둡게(`filter: brightness(0.92)`) | 바탕 `--surface-control` | 글자 `--text-accent` |
| pressed | 바탕 15% 어둡게 | 바탕 `--surface-control` | 같음 |
| disabled | 투명도 0.4, 누를 수 없음 | 같음 | 같음 |
| focus | `--border-focus` 2px 바깥 선, 2px 띄움 | 같음 | 같음 |

전환은 `background, color var(--motion-fast)`입니다.

## 규칙

- 글자는 동작을 말합니다(`보내기`, `저장`, `다음 프로젝트`). `확인`, `클릭` 같은 말은 쓰지 않습니다.
- 앞으로 가는 버튼은 끝에 ` ↗`, 내려받기는 ` ↓`를 붙입니다. 기호 앞은 한 칸 띄웁니다.
- 한 줄에 버튼을 3개 넘게 두지 않습니다.
- `primary`를 한 화면에 두 개 이상 두지 않습니다.
- 버튼 폭을 숫자로 고정하지 않습니다. 글자 길이에 맞추거나 부모 레이아웃(`flex`)으로 나눕니다.

## 접근성

- `<button>`을 씁니다. 다른 페이지로 가면 `<a>`에 같은 모양을 씁니다.
- `icon` 버튼에는 `aria-label`이 필수입니다(`질문 보내기`, `닫기`, `확대`).
- 기호(↗ ↓ ×)는 `aria-hidden="true"`로 감쌉니다.

## 시안 출처

`#contact`(outline), `#team-ask button`(primary, 보라), `#ask button`(icon, 시안은 회청 → 보라로 통일), `#next`·`#save-brief`(ghost), `.close`(icon round).
