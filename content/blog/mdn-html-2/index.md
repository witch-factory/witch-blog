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

# 6. HTML 텍스트

HTML text fundamentals https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals

HTML은 텍스트를 올바르게 표시할 수 있도록 설계되었다. HTML은 텍스트를 표시하는 데 사용되는 여러 가지 요소를 제공한다. 하나하나 살펴보자.

## 6.1. 제목과 문단

많은 텍스트가 제목과 각 문단으로 구성되어 있다. 이때 이런 단락들은 각각 p 태그로 둘러싸여 있고 제목들은 h1~h6 태그로 둘러싸여 있다. h1이 가장 큰 메인 제목, h6이 가장 작은 부제목이다.

단 한 페이지에 3개 이상을 사용하는 것은 좋지 않다. 많은 단계의 목차를 가진 경우 다루기 쉽지 않다. 이런 상황에서는 컨텐츠를 여러 페이지로 나누는 것이 좋다.

```html
<h1>메인 제목</h1>
<p>김성현의 글</p>
<h2>부제목1</h2>
<p>부제목1의 내용</p>
<h2>부제목2</h2>
<p>부제목2의 내용</p>
```

이는 사용자에게 제목을 통해 페이지에 무엇이 있는지 알려주는 기능을 하며, 검색 엔진 최적화에도 도움이 된다. 또한 heading을 잘 제공할 시 스크린 리더를 사용하는 시각장애인들에게 도움이 된다.

h1~h6태그에는 기본 스타일링이 있지만, 이는 의미와는 상관이 없다. 예를 들어서 span 태그의 텍스트에 css를 적용하여 h1 태그의 기본 스타일링처럼 보이게 했다고 해도 두 태그의 근본적인 의미 차이는 바꿀 수 없다.

## 6.2. 목록

목록은 순서가 있는 목록과 순서가 없는 목록으로 나뉜다.

ul 요소는 unordered list로 순서 없는 목록을 나타내고 ol 요소는 ordered list로 순서 있는 목록을 나타낸다. 

두 태그 안에는 li 요소가 존재하는데 이는 list item으로 목록의 항목을 나타낸다.

```html
<ul>
  <li>사과</li>
  <li>배</li>
  <li>딸기</li>
</ul>

<ol>
오늘 할 일
  <li>HTML 공부</li>
  <li>CSS 공부</li>
  <li>JS 공부</li>
</ol>
```

리스트의 중첩도 가능하다. li 요소 내에 ul, ol 요소를 내포시키면 된다.

## 6.3. 강조

텍스트에서 특정 부분을 강조하기 위해 이탤릭체로 표현할 때가 있다. 이때 사용하는 태그는 em 태그이다. em 태그는 emphasis의 약자로 강조를 의미한다. 

```html
<p>HTML은 <em>텍스트</em>를 올바르게 표시할 수 있도록 설계되었다.</p>
```

강조의 의미를 담고 싶은 것이 아니라 이탤릭체 스타일링만을 원한다면 span 태그에 스타일링을 하거나 i 태그를 사용할 수 있다.

또는 굵은 텍스트로 강조를 하고 싶다면 strong 태그를 사용할 수 있다. 

```html
<p>안녕하세요. <strong>김성현</strong>입니다.</p>
```

이렇게 em, strong 태그를 사용하면 실제로 스크린 리더에서도 다른 톤의 목소리로 표현된다.

단 강조의 의미가 아니라 그냥 굵은 글씨를 쓰고 싶다면 span 태그에 스타일링을 하거나 b 태그를 사용할 수 있다.

## 6.4. 표현

b,i,u 태그는 강조의 의미는 없지만 CSS가 지원되지 않는 경우 굵은 글씨, 이탤릭체, 밑줄 글씨를 표현할 수 있도록 해준다.

단 의미론적으로는 강조의 의미가 없다. 그저 일반적으로 굵은 글씨, 이탤릭체, 밑줄 글씨로 쓰이는 표현들을 전달하기 위해서 사용된다.

# 7. 링크

하이퍼링크 만들기 https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks

링크는 다른 페이지로 이동하거나 현재 페이지의 특정 부분으로 이동할 수 있다.

이때 웹 상의 어떤 페이지로 이동할 때 쓰이는 텍스트 문자열은 URL이라 하고 Uniform Resource Locator의 약자이다. 그리고 그 내부의 특정 파일을 찾을 때 사용되는 경로 문자열이 path다.

예를 들어 `https://www.naver.com/index.html`에서 `https://www.naver.com`은 URL이고 `/index.html`은 path다.

그리고 블록 요소들도 링크로 바꿀 수 있다. `<a>`태그 사이에 그 블록 요소를 넣으면 된다.

## 7.1. 문서 특정 부분으로 링크

문서 상단이 아니라 문서 내부의 특정 부분으로 이동하고 싶을 수 있다. 그러려면 링크를 시키고 싶은 태그에 id 속성을 넣어 주고 링크를 걸 때는 `문서URL과 경로#id`를 사용하면 된다.

```html
<!-- index.html -->
<p id="top">문서 상단</p>
<p id="middle">문서 중간</p>
<p id="bottom">문서 하단</p>
```
그리고 이를 링크로 연결하면 다음과 같다.

```html
<!-- link.html -->
<a href="index.html#middle">문서 중간으로</a>
```

만약 `href="#id"`와 같이 사용하면 같은 문서의 해당 id 태그로 이동한다.

## 7.2. 링크 텍스트 작성

링크 텍스트를 작성할 때는 링크 텍스트 자체에 키워드를 포함하는 것이 좋다. `[여기]를 클릭하여 링크로` 가 아니라 `[링크 키워드]`와 같이 작성하는 게 좋다는 것이다. 스크린 리더를 생각하거나 검색 엔진 최적화를 생각하거나 마찬가지다.

## 7.3. 상대 링크 사용하기

절대 링크를 사용하는 것이 항상 같은 장소를 가리키기 때문에 좋다고 생각할 수 있다. 상대 링크를 사용하면 링크 목적지가 제대로 작동하지 않을 가능성이 있기 때문이다.

그러나 동일 웹 사이트 내에서는 상대 링크를 사용하는 것이 좋은데 이는 다음과 같은 이유 때문이다.

1. 상대 링크가 일반적으로 훨씬 짧아서 코드를 읽기 좋다.
2. 절대 URL을 사용하면 브라우저는 도메인 네임 서버(DNS)를 통해서 서버의 실제 위치를 조회하고, 서버로 가서 파일을 찾아야 한다. 그러나 상대 URL을 사용하면 브라우저는 현재 서버의 위치를 기준으로 바로 파일을 찾기 때문에 더 빠르다. 절대 URL을 사용하면 브라우저가 계속해서 추가 작업을 하게 되는 것이다.

## 7.4. 링크의 동작에 대한 명확한 표시

만약 pdf 문서가 열린다거나 비디오가 재생되는 등의 동작을 하는 링크의 경우 링크 텍스트에 명확한 표현을 추가해야 한다.

```html
<a href="https://www.youtube.com/watch?v=QH2-TGUlwu4">노래 듣기(동영상 재생)</a>
```

## 7.5. download 속성

download 속성을 사용하면 링크를 클릭할 시 다운로드되는 파일의 이름을 지정할 수 있다.

```html
<a href="다운로드 링크" download="다운로드될 파일 제목">파일 다운로드</a>
```

## 7.6. 이메일 링크

클릭 시 새로운 이메일을 작성하는 링크를 만들 수 있다. 이는 `mailto:`를 사용하면 된다. mailto: 뒤에 이메일을 보낼 대상의 이메일 주소를 적어주면 된다.

```html
<a href="mailto:soakdma37@gmail.com">이 블로그 주인에게 메일 쓰기</a>
```

만약 이메일 주소를 작성하지 않으면 새로운 이메일 발신 창이 열린다. 이때 이메일 주소를 작성하면 이메일 발신 창에 이메일 주소가 자동으로 입력된다.

이메일 주소 외에 다른 정보를 입력하고 싶다면 `?`를 사용하고 `&`로 구분하여 입력하면 된다. 쿼리스트링을 전달하는 방식과 같다.

subject는 이메일 제목을, body는 이메일 본문을 의미한다. cc는 참조자를, bcc는 숨은 참조자를 의미한다.

```html
<a href="mailto:soakdma37@gmail.com?cc=참조자&bcc=숨은참조자&subject=이메일 제목&body=이메일 본문">참조,숨은참조,제목,본문 있는 메일 쓰기</a>
```

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
  +-- HTML text
  +-- 하이퍼링크 만들기
  -- 완료
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
