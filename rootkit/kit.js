/*
 * ROOTKIT 키트 견본 목록 — 담당 혜린
 *
 * ⚠ 임시 값입니다. 이 웹사이트의 디자인시스템이 아니라, ROOTKIT 페이지가 소개하는
 *   ROOT4 자체 디자인시스템의 견본 목록입니다. 디자인시스템이 확정되면 kit.css와 이 파일만 바꿉니다.
 *
 * - 색 값은 여기 적지 않습니다. 변수 이름만 적고, 실제 값은 kit.css에서 읽어 보여 줍니다.
 * - 숫자(간격, 버튼 크기)는 kit.css와 같아야 합니다.
 */
window.ROOTKIT_KIT = {
  name: "ROOTKIT",
  version: "v0.1 · 임시 견본",

  /* Playground 선택지 */
  themes: [
    { id: "violet", label: "Violet" },
    { id: "ocean", label: "Ocean" },
    { id: "forest", label: "Forest" },
    { id: "ember", label: "Ember" }
  ],
  types: [
    { id: "filled", label: "Filled" },
    { id: "outlined", label: "Outlined" },
    { id: "text", label: "Text" }
  ],
  sizes: [
    { id: "s", label: "Small", height: 32, paddingX: 12 },
    { id: "m", label: "Medium", height: 40, paddingX: 16 },
    { id: "l", label: "Large", height: 48, paddingX: 24 }
  ],
  radii: [
    { id: "sharp", label: "Sharp", value: 0 },
    { id: "rounded", label: "Rounded", value: 8 },
    { id: "pill", label: "Pill", value: 999 }
  ],
  states: [
    { id: "default", label: "Default" },
    { id: "hover", label: "Hover" },
    { id: "active", label: "Active" },
    { id: "disabled", label: "Disabled" }
  ],
  /* 간격 단계: 슬라이더는 이 값에만 멈춥니다 */
  spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48],

  defaults: {
    type: "filled",
    size: "m",
    radius: "rounded",
    theme: "violet",
    state: "default",
    cardPadding: 24,
    gap: 12,
    buttonPadding: 16
  },

  /* Library: 색 */
  colors: [
    {
      group: "Primary",
      note: "테마에 따라 바뀌는 주 색",
      themed: true,
      items: [
        { name: "primary-50", v: "--kit-primary-50" },
        { name: "primary-100", v: "--kit-primary-100" },
        { name: "primary-300", v: "--kit-primary-300" },
        { name: "primary-500", v: "--kit-primary-500" },
        { name: "primary-700", v: "--kit-primary-700" },
        { name: "primary-900", v: "--kit-primary-900" }
      ]
    },
    {
      group: "Secondary",
      note: "보조 강조, 하이라이트",
      items: [
        { name: "secondary-100", v: "--kit-secondary-100" },
        { name: "secondary-500", v: "--kit-secondary-500" },
        { name: "secondary-700", v: "--kit-secondary-700" }
      ]
    },
    {
      group: "Neutral",
      note: "바탕, 선, 글자",
      items: [
        { name: "neutral-0", v: "--kit-neutral-0" },
        { name: "neutral-100", v: "--kit-neutral-100" },
        { name: "neutral-200", v: "--kit-neutral-200" },
        { name: "neutral-300", v: "--kit-neutral-300" },
        { name: "neutral-500", v: "--kit-neutral-500" },
        { name: "neutral-700", v: "--kit-neutral-700" },
        { name: "neutral-900", v: "--kit-neutral-900" }
      ]
    },
    {
      group: "Semantic",
      note: "상태를 알리는 색",
      items: [
        { name: "success", v: "--kit-success" },
        { name: "warning", v: "--kit-warning" },
        { name: "danger", v: "--kit-danger" },
        { name: "info", v: "--kit-info" }
      ]
    }
  ],

  /* Library: 글자 */
  type: [
    { role: "Display", cls: "kit-t-display", spec: "40 / Bold / 1.2", sample: "Build Faster" },
    { role: "Heading 1", cls: "kit-t-h1", spec: "28 / Bold / 1.3", sample: "같은 규칙, 다른 결과" },
    { role: "Heading 2", cls: "kit-t-h2", spec: "22 / SemiBold / 1.35", sample: "기본 요소를 조합합니다" },
    { role: "Heading 3", cls: "kit-t-h3", spec: "18 / SemiBold / 1.4", sample: "카드 제목과 섹션 제목" },
    { role: "Body L", cls: "kit-t-body-l", spec: "16 / Regular / 1.6", sample: "읽는 본문에 씁니다. 긴 문장도 편하게 읽힙니다." },
    { role: "Body M", cls: "kit-t-body-m", spec: "14 / Regular / 1.6", sample: "화면 안의 설명, 입력칸, 목록에 씁니다." },
    { role: "Caption", cls: "kit-t-caption", spec: "12 / Regular / 1.5", sample: "시간, 도움말, 보조 정보" }
  ],
  weights: [
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "SemiBold", value: 600 },
    { label: "Bold", value: 700 }
  ],

  /* Library: 모서리 · 그림자 */
  radiusScale: [
    { name: "none", v: "--kit-radius-none", label: "0" },
    { name: "sm", v: "--kit-radius-sm", label: "4" },
    { name: "md", v: "--kit-radius-md", label: "8" },
    { name: "lg", v: "--kit-radius-lg", label: "16" },
    { name: "pill", v: "--kit-radius-pill", label: "999" }
  ],
  shadows: [
    { name: "shadow-sm", v: "--kit-shadow-sm", use: "작은 컨트롤" },
    { name: "shadow-md", v: "--kit-shadow-md", use: "카드" },
    { name: "shadow-lg", v: "--kit-shadow-lg", use: "떠 있는 패널" }
  ]
};
