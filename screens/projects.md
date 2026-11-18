# Projects 화면 (재작업)

담당: 명지
상태: 시안 있음 → 디자인시스템 맞춤 재작업 대상

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
