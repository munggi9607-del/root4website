# Tabs

같은 화면 안에서 보이는 내용을 바꾸는 탭입니다. 페이지를 옮기지 않습니다.

## 언제 쓰는가 / 쓰지 않는가

- 쓴다: 같은 종류의 내용을 그룹별로 바꿔 볼 때(AX 그룹 / 마케팅그룹 / 경영그룹), 같은 목록을 다른 모양으로 볼 때(Board / List)
- 쓰지 않는다: 목록을 걸러 볼 때 → [Chip](Chip.md) filter, 다른 메뉴로 갈 때 → [AppShell](AppShell.md)

## 변형

| variant | 모양 | 언제 | 시안 예 |
|---|---|---|---|
| `segmented` | 바탕 `--surface-control` 트랙(모서리 `--radius-card`, 안쪽 4) 위에 선택된 탭만 흰 면(`--surface-panel`, `--shadow-sm`, 모서리 `--radius-control`) | 2–4개, 같은 무게의 그룹 | `#group-tabs` AX / 마케팅 / 경영 |
| `compact` | 트랙 없이 선택된 탭만 `--surface-control` 바탕 | 2개, 작은 보기 전환 | `Board` / `List` |

## 탭 안 구성

- 이름(`label-md`, `--text-primary`) + 선택적 보조 표시(`label-sm`, `--text-tertiary`, 예: `02 ROLES`)
- 높이 `segmented` 40, `compact` 32

## 상태

| 상태 | 이름 글자 | 보조 표시 |
|---|---|---|
| 선택 안 됨 | `--text-tertiary` | `--text-tertiary` |
| 선택됨 | `--text-primary` | `--text-accent` |
| hover | `--text-primary` | |
| focus | `--border-focus` 2px 바깥 선 | |

## 규칙

- 탭은 2–4개입니다. 5개 이상이면 Chip filter로 바꿉니다.
- 탭 이름은 짧은 명사입니다.
- 처음에 첫 탭이 선택되어 있습니다.
- 탭을 바꿔도 탭 묶음의 위치와 폭은 그대로입니다.

## 접근성

- `role="tablist"`, 각 탭 `role="tab"` + `aria-selected` + `aria-controls`, 내용 `role="tabpanel"`.
- 좌우 화살표로 탭 사이를 옮깁니다.

## 시안 출처

`.group-tabs`, `#group-tab-ax`(About), `.mobile-board-tabs`(Projects 모바일).
