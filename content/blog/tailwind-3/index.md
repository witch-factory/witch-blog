---
title: 프론트 지식 익히기 tailwind - 3
date: "2022-07-29T00:00:00Z"
description: "프로젝트 tailwind 사용기 - 태그 정리 2"
tags: ["web", "study", "front"]
---

# 1. 두번째 태그 정리
이전 글에 이어서 tailwind의 태그들을 간단히 정리해 올려 놓는다. 어떤 태그가 있는지 쭉 훑어보면서 알아 두고 나중에 더 제대로 쓸 때는 공식 문서를 찾아보면서 프로젝트를 진행할 예정이다.

# 2. Backgrounds
 
배경과 관련한 속성들이다.

- Background Attachment
배경 이미지가 뷰포트의 스크롤과 함께 움직일지를 결정하는 속성이다. 
bg-fixed : 배경을 뷰포트에 대해 고정한다. 요소에 스크롤이 존재해도 배경은 함께 스크롤되지 않는다. 
bg-local : 배경을 요소 콘텐츠에 대해 고정한다. 요소에 스크롤이 존재하면 배경은 콘텐츠와 함께 스크롤된다.
bg-scroll : 배경을 요소 자체에 대해 고정한다. 요소에 스크롤이 존재해도 배경은 함께 스크롤되지 않는다. 즉 요소의 테두리에 배경 이미지를 부착한 것과 같은 효과를 낸다.


# 참고
background attachment from MDN https://developer.mozilla.org/ko/docs/Web/CSS/background-attachment