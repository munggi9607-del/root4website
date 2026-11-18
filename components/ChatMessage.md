# ChatMessage

대화 한 줄입니다. 누가·언제(메타)와 본문으로 이루어집니다.

## 언제 쓰는가

- 팀 대화, 담당자 소개, 질문에 대한 답처럼 "사람이 한 말"을 보여줄 때
- 쓰지 않는다: 공지·안내문 → [PageHead](PageHead.md) 설명이나 [Card](Card.md)

## 변형

| variant | 모양 | 언제 | 시안 예 |
|---|---|---|---|
| `plain` | 배경 없음. 메타 한 줄 + 본문 | 넓은 패널 안의 흐르는 대화 | Projects 팀 대화 |
| `bubble` | 바탕 `--surface-control`, 1px `--border-default`, 모서리 `0 12px 12px`(왼쪽 위만 각짐), 안쪽 `--space-12` `--space-16` | 담당자와 1:1 대화 | About 팀 채팅방 |

## 구조

```
Meta   [Avatar] 기획팀 · 준   오후 03:21     ← label-sm. 이름 --text-primary, 시간 --text-tertiary
Body   Material & texture 쪽으로 아이디어를…  ← plain: body-lg / bubble: body-md, --text-secondary
```

메타와 본문 사이 `--space-8`, 메시지 사이 `--space-20`.

## 규칙

- 이름 형식은 `{팀} · {이름}`입니다(`디자인팀 · 민지`).
- 시간은 `오후 03:21`처럼 12시간제, 두 자리로 씁니다.
- 내 메시지(사용자)는 `bubble`을 오른쪽 정렬하고 모서리를 `12px 0 12px 12px`(오른쪽 위만 각짐)으로 뒤집습니다.
- 입력 중 표시는 메타 자리에 `{이름} 입력 중` + 점 세 개.
- 자동으로 흐르는 대화에는 멈춤·다시 보기 버튼을 둡니다(시안 `투어 일시정지`, `팀 대화 다시 보기`).

## 접근성

- 대화 목록은 `role="log"` + `aria-live="polite"`.
- 시간은 `<time datetime="…">`.

## 시안 출처

`.unified-message`, `.review-meta`, `.chat-feed`, `.typing`(plain), `.team-bubble`(bubble).
