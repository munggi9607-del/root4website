# 컴포넌트 목차

ROOT4 화면에서 쓰는 컴포넌트를 찾는 목차입니다. 이 목차를 먼저 읽고, **이번 화면에 쓸 컴포넌트의 계약만** 추가로 읽습니다.

각 계약에는 같은 순서로 이렇게 적혀 있습니다.

1. **언제 쓰는가 / 쓰지 않는가**
2. **구조**: 어떤 조각으로 이루어지는가
3. **변형과 상태**: 고를 수 있는 것과 그때 바뀌는 토큰
4. **규칙**: 해야 할 것, 하면 안 되는 것
5. **접근성**
6. **시안 출처**: 시안 어디에서 가져왔는가

| 컴포넌트 | 한 줄 설명 | 계약 |
|---|---|---|
| AppShell | 헤더 + 레일(모바일 하단 탭바). 모든 화면의 틀 | [AppShell.md](AppShell.md) |
| Button | 누르면 동작을 실행. primary / outline / ghost / icon | [Button.md](Button.md) |
| Chip | 걸러 보기(filter), 빠른 질문(suggestion), 사람·그룹 선택(member) | [Chip.md](Chip.md) |
| Tabs | 같은 화면 안에서 보기를 바꾸는 탭 | [Tabs.md](Tabs.md) |
| PageHead | 아이브로우 + 제목 + 설명. 화면과 섹션의 머리 | [PageHead.md](PageHead.md) |
| Card | 관련 내용을 흰 면 하나로 묶음. panel / board / list | [Card.md](Card.md) |
| Composer | 질문 입력칸 + 보내기 + 제안 칩. TextField 포함 | [Composer.md](Composer.md) |
| ChatMessage | 대화 한 줄. 메타(누가·언제) + 본문 | [ChatMessage.md](ChatMessage.md) |
| Dialog | 화면 위에 뜨는 상세·문의·준비 중 안내 | [Dialog.md](Dialog.md) |
| Avatar | 사람 이니셜 원, 여러 명 묶음 | [Avatar.md](Avatar.md) |

## 목차에 없는 것이 필요할 때

직접 만들지 않습니다. 구현 전에 아래를 보고하고 확인을 받습니다.

- 무엇이 필요한가, 기존 컴포넌트로 왜 안 되는가
- 시안에 비슷한 것이 있는가
- 쓸 토큰. 새 토큰이 필요하면 이름과 값

확인을 받으면 계약 파일을 먼저 추가하고, 이 목차에 한 줄을 넣은 뒤 구현합니다.

## 아직 계약이 없는 시안 요소

시안에는 있지만 한 화면(Projects 보드)에서만 쓰여 공통 컴포넌트로 만들지 않은 것입니다. 다른 화면에서 쓰려면 위 절차로 보고합니다.

- 무한 캔버스(`#canvas`, `#world`), 줌 컨트롤, 캔버스 힌트
- 함께 보는 사람 커서(`.cursor-name`)
- 기획·디자인·개발 캐릭터와 말풍선(`.companion-*`)
- 질문 카드(`.prompt-node`, 어두운 카드)
