# Dialog

화면 위에 뜨는 창입니다. 뒤 화면을 막고 한 가지 일에 집중시킵니다.

## 언제 쓰는가 / 쓰지 않는가

- 쓴다: 빠른 문의, 준비 중인 메뉴 안내
- 프로젝트 상세는 2026-11-25부터 다이얼로그가 아니라 **페이지**입니다(`/projects/detail/?p=02`, 화면 틀 D). 시안의 `#detail` 팝업은 쓰지 않습니다.
- 쓰지 않는다: 오래 머무는 화면(목록, 긴 글) → 독립 화면, 짧은 알림 → 아직 컴포넌트 없음(보고)

## 변형

| variant | 구조 | 시안 예 |
|---|---|---|
| `media` | 왼쪽 그림 영역 + 오른쪽 글 영역(2단). 모바일은 위아래 | 프로젝트 상세(`#detail`) |
| `form` | 한 단. PageHead + TextField + 버튼 | 문의(`#contact-modal`) |

## 구조와 토큰

```
Scrim       --surface-scrim + backdrop blur(--blur-scrim)
Dialog      폭 850 (모바일: 좌우 16 남기고 꽉), --surface-panel, --radius-dialog, --shadow-dialog
├─ Close    오른쪽 위, Button icon round ×, 바탕 흰색 70%
├─ Head     PageHead level="dialog" (아이브로우 + display-md 제목 + 설명)
├─ Body     내용
└─ Footer   Button ghost (예: 다음 프로젝트 ↗)  + 도움말 label-sm --text-tertiary
```

안쪽 여백 `--space-40`(모바일 `--space-24`).

## 준비 중 안내 (placeholder)

아직 만들지 않은 메뉴는 시안처럼 `media` 다이얼로그로 안내합니다.

- 아이브로우 `ROOT4 / {MENU}`, 제목은 메뉴 한국어 이름
- 설명 `IA에 맞춰 준비 중인 공간입니다. 상세 콘텐츠는 추후 반영됩니다.`

새 메뉴 화면을 만들면 이 안내를 없애고 레일이 그 화면으로 이동하게 바꿉니다.

## 규칙

- 다이얼로그 위에 다이얼로그를 띄우지 않습니다.
- 닫기는 × 버튼, Esc, 바깥(scrim) 누르기 세 가지 모두 됩니다.
- 주 버튼은 하나입니다.
- 열릴 때 투명도 + 위로 8px, `--motion-base`.

## 접근성

- `<dialog>`를 `showModal()`로 엽니다. `aria-labelledby`는 제목.
- 열리면 첫 입력칸이나 닫기 버튼으로 포커스, 닫히면 연 버튼으로 돌아갑니다.

## 시안 출처

`#detail`, `#contact-modal`, `.close`, `::backdrop`. 시안 모서리 15px은 `--radius-dialog` 16으로 맞췄습니다.
