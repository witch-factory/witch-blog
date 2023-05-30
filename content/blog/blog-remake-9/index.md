---
title: 블로그 한땀한땀 만들기 - 9. 글 썸네일 만들기
date: "2023-05-30T01:00:00Z"
description: "글을 소개하는 썸네일 사진을 만들자"
tags: ["blog", "web"]
---

드디어 다시 Card 컴포넌트에 들어갈 글 썸네일을 만들어 주는 작업으로 돌아왔다. 다른 페이지들을 대강이나마 꾸며주는 데에 글 하나가 쓰였다. 

# 1. 설계

이 글에서 하기로 생각하는 건 하나뿐이다. `Card` 컴포넌트는 현재 글의 프리뷰 같은 느낌으로 작동하므로 여기에 글의 썸네일을 넣을 수 있도록 하는 것이다. 이는 글의 이해에도 도움을 주고 카드 내의 텍스트 한 줄의 너비도 줄여서 사용자의 집중도를 높일 수 있을 것이다.

이때 썸네일을 넣으면 카드 내의 텍스트 한 줄 너비가 줄어든다고 한 이유는 다음과 같은 레이아웃을 생각하고 있기 때문이다.

![card-layout](./card-layout.png)

하지만 이를 위해 해야 하는 일이 많다. 과연 썸네일에는 어떤 이미지가 들어가야 할까?

만약 글 내에 쓰인 이미지가 있다면, 그게 썸네일이 되는 게 마땅하다고 생각한다. 물론 그게 꼭 글의 내용을 간략하게 정리하는 이미지일 거라고 생각하지는 않지만 일단 그렇게 해보자. 나중에 이상하면 바꾸면 되니까.

더 큰 문제는 글에 쓰인 이미지가 없을 때이다. 이때는 무엇이 썸네일이 되어야 할까? 글의 요약이라고도 할 수 있는 TOC(Table Of Content)가 되어야 하지 않을까 한다. 이를 동적으로 만들어볼까.



# 참고

동적 썸네일 만들기 https://dev.to/xaconi_94/how-to-create-dynamic-nextjs-post-thumbnails-like-dev-to-3ika

https://articles.wesionary.team/customize-social-media-preview-of-your-nextjs-website-links-82f6bce035b

img 태그 src 파싱 https://stackoverflow.com/questions/14939296/extract-image-src-from-a-string

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match

https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js