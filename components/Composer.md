# Composer

사용자가 질문이나 메모를 쓰는 입력 덩어리입니다. ROOT4 화면은 대부분 "물어보기"로 끝나서 자주 씁니다. 여러 줄 입력칸 하나만 필요할 때 쓰는 TextField도 여기 같이 적습니다.

## Composer

### 언제 쓰는가

- 팀·루트포에게 질문을 보낼 때(Projects 왼쪽 패널, About 팀 채팅방)

### 구조

```
┌ Composer ─────────────────────────────────────────┐
│ ✳ 루트포에게 물어보세요        LET'S MAKE SOMETHING │ ← Top: label-sm, --text-tertiary
│ 어떤 경험을 함께 만들어볼까요?                 [↗]  │ ← 입력칸 + Button icon primary
│ [브랜드 리뉴얼 ↗] [앱 · 플랫폼 구축 ↗] [AI 서비스…] │ ← Chip suggestion ×3
└───────────────────────────────────────────────────┘
```

| 부분 | 토큰 |
|---|---|
| 바깥 | `--surface-panel`, 1px `--border-default`, `--radius-card`, `--shadow-md`, 안쪽 `--space-12` |
| 입력칸 | 바탕·선 없음, 글자 `body-md` `--text-primary`, placeholder `--text-tertiary` |
| 보내기 | [Button](Button.md) `icon` + primary 색, `aria-label="질문 보내기"` |
| 제안 | [Chip](Chip.md) `suggestion`, 사이 `--space-8` |

### 상태

- 입력칸이 비어 있으면 보내기 버튼 disabled.
- 포커스가 입력칸에 있으면 바깥 테두리 `--border-focus` 1px.
- 보내는 중: 보내기 버튼 자리에 점 세 개(…) 표시, 입력칸 읽기 전용.

## TextField

### 언제 쓰는가

- 긴 글 하나를 받을 때(Contact 프로젝트 메모)

| 부분 | 토큰 |
|---|---|
| 입력칸 | `--surface-control`, 1px `--border-default`, `--radius-control`, 안쪽 `--space-16`, 글자 `body-md` |
| 라벨 | 입력칸 위, `label-md` `--text-primary`, 사이 `--space-8` |
| 도움말 | 입력칸 아래, `label-sm` `--text-tertiary` |
| focus | 테두리 `--border-focus` |

## 규칙

- placeholder는 질문 문장으로 씁니다(`어떤 경험을 함께 만들어볼까요?`). placeholder를 라벨 대신 쓰지 않습니다. 화면에 라벨이 없으면 `aria-label`을 넣습니다.
- 입력 내용이 어디로 가는지 아래 도움말로 말합니다(`작성한 내용은 텍스트 파일로 저장됩니다. 외부로 전송되지 않습니다.`).
- Enter는 보내기, Shift+Enter는 줄바꿈입니다.

## 접근성

- `<form>` 안에 `<textarea>` 또는 `<input>`. 보내기는 `type="submit"`.
- 답이 생기는 영역(`#answer`)은 `aria-live="polite"`.

## 시안 출처

`.composer`, `.composer-top`, `#ask`, `.suggestions`(Projects), `.team-prompt`, `#team-ask`(About), `#contact-modal textarea`(TextField).
