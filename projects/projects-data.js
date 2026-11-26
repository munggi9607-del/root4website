/*
 * Projects 보드 데이터 — 상세페이지(projects/detail/)가 읽습니다.
 * 시안 보드(projects/index.html)의 boardItems·사진에서 꺼냈습니다 (2026-11-25).
 * 순서 = 보드 카드 순서. no는 주소 ?p=02 의 번호입니다.
 * color·text는 상세페이지의 바탕색·글자색입니다(사진 대표색에서 자동으로 뽑고, 원색은 채도 42% 이하·밝기 34–44%로 눌렀습니다. 직접 고쳐도 됩니다).
 * image는 projects/assets/ 안의 파일 이름, note는 사진 대신 보드에 적힌 메모입니다.
 * archive가 있으면 그 카드는 프로젝트 상세 대신 Archive 글(archive/post/?id=…)로 갑니다.
 */
window.ROOT4_PROJECTS = [
  {
    "no": "01",
    "label": "Project brief",
    "archive": "project-story-04",
    "type": "Brand",
    "caption": "A clear direction, shared by the team",
    "image": null,
    "width": null,
    "height": null,
    "note": "<h3>About the project</h3><p>A modern fashion identity shaped by <em>understated elegance</em>, thoughtful craft, and a lasting point of view.</p><div class=\"board-file\"><b>PDF</b><span>Creative-brief.pdf<small>Project reference · 22 KB</small></span></div>",
    "color": "#ede8de",
    "text": "#141414"
  },
  {
    "no": "02",
    "label": "Profile study",
    "type": "Brand",
    "caption": "Photography / visual direction",
    "image": "profile.png",
    "width": 452,
    "height": 705,
    "note": null,
    "color": "#e8e3e4",
    "text": "#141414"
  },
  {
    "no": "03",
    "label": "Typeface exploration",
    "type": "Brand",
    "caption": "Website typeface",
    "image": "typeface.png",
    "width": 476,
    "height": 269,
    "note": null,
    "color": "#327b50",
    "text": "#ffffff"
  },
  {
    "no": "04",
    "label": "Material & texture",
    "type": "Digital",
    "caption": "Sculptural, geometric, precise",
    "image": "texture.png",
    "width": 434,
    "height": 652,
    "note": null,
    "color": "#e3e6e8",
    "text": "#141414"
  },
  {
    "no": "05",
    "label": "Silhouette",
    "type": "Brand",
    "caption": "Form, proportion & material",
    "image": "fashion.png",
    "width": 387,
    "height": 403,
    "note": null,
    "color": "#e8e6e3",
    "text": "#141414"
  },
  {
    "no": "06",
    "label": "Identity direction",
    "type": "Brand",
    "caption": "A confident, minimal wordmark",
    "image": "inzen.png",
    "width": 544,
    "height": 343,
    "note": null,
    "color": "#e3e6e8",
    "text": "#141414"
  },
  {
    "no": "07",
    "label": "Sound & culture",
    "type": "Service",
    "caption": "A new perspective on music",
    "image": "headphones.png",
    "width": 478,
    "height": 596,
    "note": null,
    "color": "#32647b",
    "text": "#ffffff"
  },
  {
    "no": "08",
    "label": "Cropped perspectives",
    "type": "Digital",
    "caption": "Bold forms / human details",
    "image": "portrait.png",
    "width": 542,
    "height": 537,
    "note": null,
    "color": "#e8e3e4",
    "text": "#141414"
  },
  {
    "no": "09",
    "label": "Mood & expression",
    "type": "Brand",
    "caption": "A quieter kind of impact",
    "image": "face.png",
    "width": 523,
    "height": 1114,
    "note": null,
    "color": "#282120",
    "text": "#ffffff"
  },
  {
    "no": "10",
    "label": "Motion state",
    "type": "Service",
    "caption": "Typography in motion",
    "image": "poster.png",
    "width": 586,
    "height": 432,
    "note": null,
    "color": "#827235",
    "text": "#ffffff"
  },
  {
    "no": "11",
    "label": "Spatial experiments",
    "type": "Digital",
    "caption": "Futuristic bubble animation",
    "image": "bubbles.png",
    "width": 509,
    "height": 371,
    "note": null,
    "color": "#e3e4e8",
    "text": "#141414"
  },
  {
    "no": "12",
    "label": "Light & objects",
    "type": "Digital",
    "caption": "Layout concept / product story",
    "image": "lamp.png",
    "width": 241,
    "height": 215,
    "note": null,
    "color": "#ece3df",
    "text": "#141414"
  },
  {
    "no": "13",
    "label": "Hausa",
    "type": "Brand",
    "caption": "A celebration of light",
    "image": "hausa.png",
    "width": 217,
    "height": 168,
    "note": null,
    "color": "#2a201d",
    "text": "#ffffff"
  },
  {
    "no": "14",
    "label": "People behind ideas",
    "type": "Service",
    "caption": "Industrial design / profile",
    "image": "designer.png",
    "width": 178,
    "height": 232,
    "note": null,
    "color": "#e3e3e8",
    "text": "#141414"
  },
  {
    "no": "15",
    "label": "Morning",
    "type": "Brand",
    "caption": "Colour study / #FFBF00",
    "image": "morning.png",
    "width": 298,
    "height": 240,
    "note": null,
    "color": "#947e3d",
    "text": "#141414"
  },
  {
    "no": "16",
    "label": "Hollywood",
    "type": "Brand",
    "caption": "Colour study / #D42511",
    "image": "hollywood.png",
    "width": 298,
    "height": 236,
    "note": null,
    "color": "#894138",
    "text": "#ffffff"
  },
  {
    "no": "17",
    "label": "Dodger Blue",
    "type": "Digital",
    "caption": "Colour study / #257EF4",
    "image": "blue.png",
    "width": 298,
    "height": 252,
    "note": null,
    "color": "#41699f",
    "text": "#ffffff"
  },
  {
    "no": "18",
    "label": "Creative notes",
    "type": "Service",
    "caption": "A shared starting point",
    "image": null,
    "width": null,
    "height": null,
    "note": "<h3>What we are exploring</h3><p>Cropped faces.<br>Geometric shapes.<br>Moody, bold, minimal.<br>A little futuristic.</p><small class=\"note-author\">Planning × Design × Development</small>",
    "color": "#ede8de",
    "text": "#141414"
  },
  {
    "no": "19",
    "label": "This week",
    "type": "Service",
    "caption": "Small steps, shared progress",
    "image": null,
    "width": null,
    "height": null,
    "note": "<h3>Things to do</h3><ul class=\"board-checklist\"><li>✓ Develop moodboards</li><li>✓ Share the visual direction</li><li>□ Create website wireframes</li><li>□ Review interactions together</li></ul>",
    "color": "#ede8de",
    "text": "#141414"
  },
  {
    "no": "20",
    "label": "Graphic explorations",
    "type": "Brand",
    "caption": "A bold and flexible visual language",
    "image": "mark.png",
    "width": 374,
    "height": 192,
    "note": null,
    "color": "#8f423a",
    "text": "#ffffff"
  }
];
