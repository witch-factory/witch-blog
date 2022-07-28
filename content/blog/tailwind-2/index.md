---
title: 프론트 지식 익히기 tailwind - 2
date: "2022-07-28T00:00:00Z"
description: "프로젝트 tailwind 사용기 - 태그 정리"
tags: ["web", "study", "front"]
---

# 1. 두번째 글의 목적

첫번째 글에서는 tailwind 개론과 제공하는 몇 가지 기능들을 다루었다. 이 글에서는 tailwind를 본격적으로 시작하기 전에 어떤 클래스들이 존재하는지 간단히 정리해 두는 글이다. 물론 그때그때 부딪쳐 가면서 배울 수도 있겠지만 먼저 한번 정리해 두는 것이 더 효율적이라고 느낀다. 대충 뭐가 있는지 알아야 부딪치든 말든 하니까.

# 2. 기본 스타일

tailwind에서는 브라우저별로 다른 기본 CSS 설정 등을 싹 밀어 주고 어느 정도 통일된 기반에서 시작하게 해주는 preflight를 자동으로 제공한다. index.css에 들어 있는 `@tailwind base;`에서 알아서 주입해 준다. 뭐가 있는지는 공식 문서의 스타일시트를 참고하면 된다. 최대한 직관적으로 짜였다는 것 정도만 알고 넘어갔다.

만약 다른 Base style이 있는 프로젝트와 합병 등의 이유로 preflight를 아예 사용하지 않고 싶다면 역시 tailwind.config.js에서 설정 가능하다. corePlugins 항목에서 `preflight:false;`로 바꾸면 된다.