# Card

관련 내용을 흰 면 하나로 묶습니다.

## 언제 쓰는가 / 쓰지 않는가

- 쓴다: 프로젝트 하나, 팀 하나, 글 하나처럼 "한 덩어리"를 목록으로 보여줄 때
- 쓰지 않는다: 화면 전체를 감싸는 배경 → 그냥 `--surface-panel` 영역, 화면 위에 뜨는 것 → [Dialog](Dialog.md)

## 변형

| variant | 모양 | 언제 | 시안 예 |
|---|---|---|---|
| `panel` | `--surface-panel`, 1px `--border-default`, 모서리 `--radius-card`, 그림자 없음, 안쪽 `--space-24` | 일반 목록·소개 카드 | About 팀 채팅방(`.team-room`) |
| `board` | `--surface-panel`, 테두리 없음, 모서리 0, `--shadow-card` | 보드·갤러리 위 사진 카드 | 보드 프로젝트 카드(`.node`) |
| `list` | `--surface-panel`, 1px `--border-default`, 모서리 `--radius-control`, 가로 배치(썸네일 + 글) | 좁은 화면·목록 보기 | 모바일 프로젝트 카드 |

## 구조

```
[Media]      사진·일러스트 (선택)          board/list에서 주로 씀
Meta         분류 / 번호   Brand / 01      label-sm, --text-tertiary
Title        Project brief                heading-md (list는 heading-sm)
Description  A clear direction, ...        body-sm, --text-secondary, 최대 2줄
Footer       링크·버튼·아바타 (선택)          Button ghost 또는 Avatar
```

요소 사이 `--space-8`, 미디어와 글 사이 `--space-12`.

## 상태

- 카드를 누를 수 있으면 카드 전체가 하나의 링크(`<a>`)입니다. 안에 다른 버튼을 넣지 않습니다.
- 누를 수 있는 카드의 hover: `board`는 위로 4px + `--shadow-md`, `panel`·`list`는 테두리 `--border-accent`. 전환 `--motion-slow`.
- focus: `--border-focus` 2px 바깥 선.

## 규칙

- 한 목록에서 variant를 섞지 않습니다.
- 카드 사이 간격 `--space-16`(모바일 `--space-12`).
- 카드 안에 카드를 넣지 않습니다.
- `panel`에 그림자를, `board`에 테두리를 더하지 않습니다.
- 메타는 `{분류} / {두 자리 번호}` 형식입니다(`Brand / 01`).

## 접근성

- 제목은 목록 구조에 맞는 제목 수준(`<h3>` 등)을 씁니다.
- 사진에는 내용을 말하는 `alt`를, 장식이면 `alt=""`.

## 시안 출처

`.node.project-cover`, `.minimal-caption`(board), `.team-room`(panel), `.mobile-project-card`(list).
