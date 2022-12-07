---
title: 모던 자바스크립트 튜토리얼 part 1.2 자바스크립트 기본 - 1
date: "2022-12-07T00:00:00Z"
description: "ko.javascript.info part 1-2 첫번째"
tags: ["javascript"]
---

# 1. 세팅하기

본격적으로 JS 문법을 배운다. 하지만 먼저 JS를 사용하기 위한 세팅을 해야한다. 물론 브라우저에서 실행할 수도 있겠지만 나는 HTML 파일을 사용하겠다.

script 태그를 사용하면 JS 코드를 HTML 문서에 삽입할 수 있는데, 이 기초가 되는 파일을 먼저 만들자. JS-study 폴더를 만들고 index.html 파일을 만들자.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Study Page</title>
  </head>
  <body>
    <h1>마녀</h1>
  </body>
</html>
```

vscode의 Open in browser 익스텐션을 사용하면 html파일을 vscode를 통해서 바로 열 수 있다. index.html을 vscode 상에서 우클릭하고 Open in Default browser를 선택하면 브라우저에서 열린다.

다음과 같이 js를 삽입하여 사용할 것이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Study Page</title>
  </head>
  <body>
    <script>
      alert("Hello World");
    </script>
  </body>
</html>
```

## 1.1 script 태그 속성

오래된 코드에선 가끔 script 태그에 속성이 붙어 있을 때가 있다.

### 1.1.1 language 속성

현재 사용하고 있는 스크립트 언어를 나타낸다. 하지만 지금은 deprecated되었고 대신 type속성을 사용한다.

### 1.1.2 type 속성

HTML4에서는 이 속성을 꼭 명시해야 했다. 또한 이전에는 이 파일이 어떤 스크립팅 언어를 사용하는지를 명시하는 역할을 했다. 하지만 HTML5에서는 이 속성을 생략해도 된다. 기본값은 JS MIME타입이다. 오히려 이를 생략함으로써 JS MIME 타입을 굳이 명시하지 않는 것을 권장한다.

이 속성은 JS 모듈을 명시하는 데에도 사용된다. type="module"로 설정하면 이 태그 안의 코드가 JS 모듈이라는 것을 의미한다.

## 1.3 외부 스크립트 사용하기

script의 src 속성을 사용하면 외부 스크립트(파일, URL등)를 사용할 수 있다. JS코드가 길어질 경우 이런 식으로 .js파일로 분리하고 불러오는 방식으로 사용하는 것이 좋다.

```html
<script src="./script.js"></script>
```

만약 script 태그가 src 속성을 가지고 있다면 태그 내부의 코드는 무시된다.

다음과 같이 `script.js`를 작성한다.

```js
alert("안녕");
```

그리고 같은 위치에 index.html을 이렇게 작성한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Study Page</title>
  </head>
  <body>
    <script src="./script.js">
      alert("Hello World");
    </script>
  </body>
</html>
```

그리고 index.html을 실행하면 `안녕`이라고 쓰인 alert창만 뜨는 것을 확인할 수 있다.

# 참고

[MDN의 script 태그의 type 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type)
