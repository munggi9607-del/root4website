# Chip

작은 둥근 사각 버튼입니다. 걸러 보기, 빠른 질문, 사람·그룹 고르기에 씁니다.

## 언제 쓰는가 / 쓰지 않는가

- 쓴다: 목록을 분류로 걸러 볼 때, 입력할 문장을 제안할 때, 대화 상대를 고를 때
- 쓰지 않는다: 화면의 핵심 동작 → [Button](Button.md), 보기 자체를 바꿀 때(Board/List) → [Tabs](Tabs.md)

## 변형

| variant | 언제 | 모양 | 시안 예 |
|---|---|---|---|
| `filter` | 목록 걸러 보기. 하나 또는 여럿 선택 | 바탕 `--surface-panel`, 1px `--border-default`, 모서리 `--radius-chip` | `All projects 20`, `Digital experience` |
| `suggestion` | 누르면 그 문장으로 질문을 보냄 | 바탕 `--surface-control`, 1px `--border-default`, 모서리 `--radius-chip`, 끝에 ` ↗` | `브랜드 리뉴얼 ↗` |
| `member` | 대화 상대·그룹 하나 고르기 | 바탕 `--surface-control`, 1px `--border-default`, 모서리 `--radius-pill` | `기획 AX기획 담당` |

공통: 높이 28, 좌우 `--space-8`~`--space-12`, 글자 `label-sm`, 글자색 `--text-tertiary`, 칩 사이 `--space-8`.

## 상태

| 상태 | 바탕 | 테두리 | 글자 |
|---|---|---|---|
| 기본 | variant 바탕 | `--border-default` | `--text-tertiary` |
| hover | `--surface-control` | `--border-default` | `--text-primary` |
| 선택됨(filter, member) | `--surface-accent-subtle` | `--border-accent` | `--text-accent` |
| focus | + `--border-focus` 2px 바깥 선 | | |

## 규칙

- 개수는 라벨 뒤에 작게 붙입니다(`All projects 20`). 개수는 `--text-tertiary`.
- `filter` 묶음의 첫 칩은 "전체"(`All projects`)이고 처음에 선택되어 있습니다.
- `suggestion`은 한 번에 3개까지 둡니다.
- 칩 글자는 한 줄입니다. 넘치면 문구를 줄입니다(말줄임 금지).
- 칩 안에 아이콘을 넣을 때는 라벨 앞, 사이 `--space-4`.

## 접근성

- `filter`, `member`는 `<button aria-pressed="true|false">`. 하나만 고르는 묶음은 `role="radiogroup"` + `role="radio"`도 됩니다.
- `suggestion`은 일반 `<button>`이고, 누르면 질문이 보내진다는 것을 묶음 위 라벨로 알립니다(`이렇게 물어볼 수 있어요`).

## 시안 출처

`.filters button`(filter), `.suggestions button`·`.project-examples button`(suggestion), `.member-chip`·`.member-chip.selected`(member). 시안 칩 글자는 7–8px라 `label-sm` 11px로 올렸고, 모서리 5·6px은 6으로 합쳤습니다.
