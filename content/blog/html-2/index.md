---
title: 프론트 지식 익히기 HTML - 2
date: "2023-03-08T01:00:00Z"
description: "MDN HTML 학습지"
tags: ["web", "study", "front", "HTML"]
---

https://developer.mozilla.org/ko/docs/Web/HTML 을 보고 공부한 내용, 그 두번째

https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/Getting_started 를 이어서 본 내용

# 1. 블럭 요소와 인라인 요소

## 1.1. 블록 레벨 요소

웹페이지 상에 블록을 만들고 공간을 차지하는 요소이다. 앞뒤 요소 사이에 새로운 줄을 만들며, 페이지의 구조적 요소를 나타낸다. 예를 들어서 p 태그, div 태그 등이 있다. 일반적으로 공간을 차지해야 한다고 생각되는 요소들이다.

블록 요소는 블록 요소 내부에 중첩될 수 있지만 인라인 요소 내부에는 중첩될 수 없다. 예를 들어서 a태그 내에 p 태그가 중첩될 수 없다.

## 1.2. 인라인 요소

항상 블록 레벨 요소 내에 포함되어 있다. 문장이나 단어와 같은 작은 부분에 적용되며 새로운 줄을 만들지 않고 단락 내에 나타난다. a태그, strong 태그 등이 있다.

# 2. 엔티티

HTML 태그에는 속성값을 쓸 수 있다. 예를 들어 다음과 같은 것이다.

```html
<a href="https://www.naver.com/" title="naver">naver</a>
```

이때 속성값은 모두 따옴표로 감싸 주는 게 권장된다. 그런데 이 따옴표로 표시된 속성값 안에 따옴표를 쓰고 싶으면 어떻게 할까?

HTML에서 미리 예약된 이런 따옴표같은 문자들이 있는데 이런 문자들을 기존 의미 그대로 표시하기 위해서 별도로 사용하는 문제 셋이 있다. 이를 엔티티라고 부른다.

이러한 엔티티들 중 대표적인 건 다음과 같다.

- `&lt;` : `<`
- `&gt;` : `>`
- `&amp;` : `&`
- `&quot;` : `"`
- `&apos;` : `'`
- `&nbsp;` : 공백
- `&copy;` : 저작권 표시

이런 방식으로 표현할 수 있는 문자들에는 발음 구별 부호, 심볼 특수문자 등이 있는데 이런 표기는 [여기](http://www.tcpschool.com/html/html_text_entities)에 정리되어 있다.

# 3. HTML의 공백

HTML 요소의 내용에서 공백을 아무리 많이 사용해도 HTML 파서가 모두 단일 공백으로 바꿔버린다. 만약 공백을 더 사용하고 싶다면 `&nbsp;` 엔티티를 사용하면 된다.

# 4. HTML 주석

주석은 다음과 같이 쓴다.

```html
<!-- 주석 내용 -->
```

https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML 를 보고 공부한 내용

# 5. HTML head 태그의 내용

head 태그 내에 있는 내용은 브라우저 페이지에 표시되지 않는다. 대신 head 내용은 페이지에 대한 메타데이터를 담는다.

## 5.1. title

title 태그는 페이지의 제목을 나타낸다. title 태그는 head 태그 내에 있어야 한다. title 태그는 HTML 문서 전체의 제목으로 브라우저 탭에 표시되며 검색 결과에도 표시된다.

그리고 사이트를 북마크할 때 추천되는 북마크 이름으로도 사용된다.

제목의 의미를 가지는 h1 태그와는 다르다.

## 5.2. meta

[여기](https://www.witch.work/html-1/#214-meta)에 써 놓았다.

## 5.3. 커스텀 아이콘

link 태그를 이용해서 페이지의 커스텀 아이콘을 만들 수 있다. 이는 브라우저 탭이나 북마크 패널에서 볼 수 있다. 

사용하는 법은 간단하다. index.html과 같은 디렉토리에 `.ico`포맷 파일(.gif나 .png도 일반적으로 가능하지만 IE6 미만 브라우저를 고려하면 ico를 써야 한다..)을 저장한 후 head에 다음과 같은 link 태그를 추가한다.

```html
<link rel="icon" href="favicon.ico">
```

`apple-touch-icon-precomposed`와 같이 아이콘을 위한 다른 rel 값도 여러 개 있다.

## 5.4. css, js

CSS는 link 태그를 통해 불러온다.

```html
<link rel="stylesheet" href="style.css">
```

JS는 script 태그를 통해 불러온다. 하지만 script는 head에 들어갈 필요는 없다. body 태그가 닫히기 바로 전, 내용의 끝 부분에 넣는 것이 좋다. 하지만 다음과 같이 쓸 수 있다.

```html
<script src="script.js"></script>
```

script 태그는 빈 태그가 아니며 닫아주는 걸 잊지 말자.



# 참고

https://developer.mozilla.org/ko/docs/Glossary/Doctype

https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode

http://www.tcpschool.com/html/html_text_entities

```
HTML 로드맵
+-- HTML 기본
+-- HTML 입문서
  +-- HTML 소개
  +-- HTML 시작하기
  +-- HTML 메타 데이터
  --- 완료
  +-- HTML text
  +-- 하이퍼링크 만들기
  +-- 고급 텍스트 포매팅
  +-- 문서와 웹사이트 구조
  +-- HTML 디버깅
  +-- Marking up a letter
  +-- 페이지 콘텐츠 구조화
+-- 멀티미디어와 임베딩
  +-- 소개
  +-- HTML의 이미지
  +-- 비디오와 오디오 컨텐츠
  +-- object에서 iframe
  +-- 벡터 그래픽 추가하기
  +-- 반응형 이미지
+-- HTML 테이블
  +-- 소개
  +-- 기초
  +-- 고급 기능과 접근성
+-- HTML 폼
+-- HTML 문제 해결하기
+-- 고급 주제들
```
