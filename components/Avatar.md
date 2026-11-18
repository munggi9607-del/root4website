# Avatar

사람을 이니셜 한 글자 원으로 보여줍니다. 여러 명은 겹쳐서 묶습니다.

## 언제 쓰는가

- 메시지 보낸 사람, 함께 보고 있는 사람, 담당자 표시

## 크기

| size | 지름 | 글자 |
|---|---|---|
| `sm` | 24 | `label-sm` |
| `md` | 32 | `label-md` |
| `lg` | 40 | `heading-sm` |

## 토큰

- 원 `--radius-round`, 바탕 `--surface-control`, 글자 `--text-primary`
- 사진이 있으면 사진으로 채웁니다.
- 묶음(AvatarStack): 겹침 -6px, 각 원에 2px `--surface-panel` 테두리, 최대 3개 + `+N`
- 온라인 표시: 오른쪽 아래 8px 점. 색은 아직 정하지 않았습니다(시안은 초록 `#8FB6A0`, 상태 색 정의 전까지 `--surface-accent`).

## 규칙

- 이니셜은 이름 첫 글자 하나입니다(`민지` → `민`).
- 묶음 옆 설명은 `label-sm` `--text-tertiary`(`함께 둘러보는 중`).

## 접근성

- 단독 아바타는 `aria-label="{이름}"`, 이름이 옆에 글로 있으면 `aria-hidden="true"`.

## 시안 출처

`.presence-avatars span`, `.room-online`. 시안 아바타 바탕은 회청 `#8A9AAA`라 강조색 통일 규칙에 따라 중립 `--surface-control`로 바꿨습니다.
