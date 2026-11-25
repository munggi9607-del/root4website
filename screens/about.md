# About 화면 (재작업)

담당: 병하
상태: 0차 — 시안 회사소개를 /about/로 그대로 옮겨 배포함 (2026-11-25, 리드). 디자인시스템 맞춤 재작업은 병하가 이어서

> **지금 구현 방식:** `about/index.html`은 시안(rootfour-1) HTML을 통째로 옮긴 것입니다(Projects와 같은 파일). 주소 끝을 `#team`으로 맞춰 시안의 회사소개 화면이 뜨게 합니다. 시안 헤더·레일은 `about.css`에서 숨기고, 다크 모드와 'Projects로 가기'는 `about.js`가 처리합니다. **5번 표(디자인시스템 맞춤)는 아직 하나도 적용하지 않았습니다.** 재작업할 때는 이 통째 파일을 계속 고치기보다, 브리프 4번 표대로 `<main>`을 새로 만드는 것을 권합니다(파일이 5.5MB이고 Projects 코드가 같이 들어 있음).
레일 라벨: About / 헤더 메뉴 이름: 회사소개

## 1. 이 화면은 무엇인가

ROOT4가 어떻게 일하는 팀인지 소개하고, 그룹별 담당자와 대화를 시작하게 하는 화면입니다.

## 2. 핵심 행동

그룹(AX / 마케팅 / 경영) 담당자에게 질문을 보낸다.

## 3. 본문 배치

B. 읽는 페이지.

## 4. 섹션 구성 (시안 그대로)

| 순서 | 섹션 | 컴포넌트 | 내용 |
|---|---|---|---|
| 1 | 머리 | PageHead hero (제목 왼쪽 / 설명 오른쪽) | `● ONE STUDIO. MANY PERSPECTIVES.` / `다른 시선이 모여,<br>하나의 경험이 됩니다.` / 루트포 소개 4줄 |
| 2 | 일하는 방식 3단계 | 3열 (번호 아이브로우 + heading-md + body-sm) | `01 / THINK TOGETHER` 질문으로 시작합니다. · `02 / MAKE IT REAL` 경험으로 구체화합니다. · `03 / KEEP EVOLVING` 운영하며 더 나아갑니다. |
| 3 | 팀 대화 | PageHead section + Tabs segmented + Card panel | `MEET THE PEOPLE BEHIND THE EXPERIENCE` / `팀의 대화에 들어와 보세요.` / `그룹 탭과 팀원을 선택해 대화에 들어와 보세요.` / 탭 AX 그룹 · 마케팅그룹 · 경영그룹 |
| 3-1 | 채팅방 | Card panel 안에 Chip member + ChatMessage bubble | 담당자 칩(`기획 AX기획 담당` 등), 인사 말풍선 |
| 3-2 | 질문 | Composer | `AX기획 담당 님에게 질문하기` + 제안 칩 |
| 4 | 끝 | 링크 | `MEET OUR WORK ↗` → Projects |

## 5. 재작업 때 바꿀 것

| 시안 | 바꿀 값 | 근거 |
|---|---|---|
| 아이브로우·칩·작은 글자 6–9px | `eyebrow`·`label-sm` 11px | 최소 11px |
| 다크 테마에서 채팅방·탭이 흰색 그대로 | `--surface-panel` 등 Semantic으로 | 다크에서 깨지면 안 됨 |
| 보라 계열 값이 여러 개(`#7C64CB`, `#7F65E9`, `#927BA6`, `#9B83AD` …) | `--surface-accent`, `--surface-action-primary`, `--text-eyebrow`, `--text-accent` 네 개로 | 토큰만 씀 |
| 채팅방 모서리 16, 탭 트랙 13 | `--radius-dialog` 16, `--radius-card` 12 | 모서리 통합 |

## 6. 모바일

- hero 2열 → 1열.
- 3단계 3열 → 1열 쌓기.
- 그룹 탭은 가로 스크롤 없이 3칸 고정(글자 줄이기).

## 7. 완료 기준

- [ ] README "완료 전 확인" 통과
- [ ] 다크 테마에서 채팅방·탭이 어두운 면이다
- [ ] 그룹 탭을 바꾸면 채팅방 내용과 Composer 받는 사람이 같이 바뀐다
