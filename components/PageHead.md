# PageHead

화면과 섹션의 머리입니다. 아이브로우 + 제목 + 설명 세 줄로 "여기가 어디이고 무엇을 하는 곳인지" 말합니다.

## 언제 쓰는가

- **모든 화면 본문 맨 위**에 하나 씁니다(`level="page"`).
- 화면 안의 큰 섹션 머리에 씁니다(`level="section"`).

## 구조

```
Eyebrow      ● ROOT4 / ROOTKIT              ← 점은 선택
Title        RootKit
Description  IA에 맞춰 준비 중인 공간입니다.   ← 선택
Actions      (오른쪽, 선택) Button · Tabs
```

## level

| level | 아이브로우 | 제목 | 설명 | 아래 여백 |
|---|---|---|---|---|
| `hero` | `eyebrow` | `display-lg` | `body-sm`, 최대 폭 420 | `--space-40` |
| `page` | `eyebrow` | `heading-lg` | `body-sm` | `--space-32` |
| `section` | `eyebrow` | `heading-lg` | `body-md` | `--space-24` |
| `dialog` | `eyebrow` | `display-md` | `body-md` | `--space-24` |

아이브로우 → 제목 사이 `--space-12`, 제목 → 설명 사이 `--space-12`.

## 토큰

- 아이브로우 글자 `--text-eyebrow`, 대문자, 자간 2px. 앞의 점은 6×6 `--surface-accent` 원, 사이 `--space-8`
- 제목 `--text-primary`
- 설명 `--text-secondary`

## 규칙

- 아이브로우는 영문 대문자이고 형식은 `ROOT4 / {메뉴}` 또는 짧은 영문 구절입니다(`MEET THE PEOPLE BEHIND THE EXPERIENCE`).
- 제목은 한국어 한두 줄입니다. 두 줄이면 의미 단위로 직접 줄을 바꿉니다.
- `hero`는 한 화면에 하나만, 화면 맨 위에만 씁니다.
- 데스크톱에서 `hero`와 `page`는 설명을 제목 오른쪽 열에 둘 수 있습니다(About 첫 섹션). 모바일에서는 항상 아래로 쌓습니다.

## 접근성

- `hero`·`page` 제목은 `<h1>`, `section`은 `<h2>`, `dialog`는 다이얼로그 제목(`aria-labelledby`)입니다.
- 아이브로우는 제목보다 먼저 읽혀도 되도록 짧게 씁니다. 장식이면 `aria-hidden`.

## 시안 출처

`.project-head`(page), `#team .about-intro`(hero), `#team .team-section`(section), `#detail`·`#contact-modal`(dialog), `.eyebrow`, `.dot`. 시안 아이브로우는 7–9px라 `eyebrow` 11px로 올렸습니다.
