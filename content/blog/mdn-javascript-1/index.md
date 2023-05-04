---
title: 프론트 지식 익히기 Javascript - 1
date: "2023-05-03T00:00:00Z"
description: "MDN Javascript 튜토리얼 - 1"
tags: ["web", "study", "front", "js"]
---

땔감짓이 대부분이었긴 해도 이미 많은 JS와의 사투를 겪어 왔기에, 튜토리얼을 훑어보며 익숙치 않았던 것만 간단히 정리한다.

# 1. JS 첫걸음

HTML이 웹 콘텐츠의 구조를 짜고 의미를 부여하며, CSS가 콘텐츠에 스타일을 적용할 수 있게 한다면 JS는 콘텐츠를 동적으로 만들어준다. 

예를 들어서 페이지의 모든 요소에는 style 속성이 존재하며 해당 요소의 인라인 CSS 스타일을 모두 담고 있는데, JS를 이용하면 이를 변경하여 스타일을 동적으로 제어할 수 있다.

## 1.1. 스크립트 로딩

HTML 문서의 `<head>` 태그 안에 `<script>` 태그를 넣어 스크립트를 실행할 수 있다. 이 때, `src` 속성을 이용해 외부 스크립트 파일을 로딩할 수도 있다.

그런데 문제는 모든 HTML이 순서 그대로 불려온다는 것이다. 다음과 같은 경우를 생각해 보자.

```js
const buttons = document.querySelectorAll('button');

for (const button of buttons) {
  button.addEventListener('click', createParagraph);
}
```

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>My test page</title>
    <script src="test.js"></script>
  </head>
  <body>
    <button>문단 추가 버튼</button>
  </body>
</html>
```

위 코드가 정상적으로 작동한다면, 버튼을 누를 때마다 문단이 추가되어야 한다. 그러나 코드를 실행해 보면 그렇지 못하다는 것을 알 수 있다.

body의 button 태그가 로딩되기 전에 head태그의 script 태그가 먼저 불려와서 JS의 `addEventListener`를 실행해 버리기 때문이다. HTML이 순서대로 로딩되는 건 이런 문제를 낳는다. 이를 해결하는 방식은 3가지 있다.

가장 고전적인 방법은 `<script>`태그를 본문의 맨 마지막 줄, body의 닫는 태그 바로 앞에 쓰는 것이다. 그러면 모든 HTML이 로딩된 후에 스크립트가 로딩된다. 이렇게 하면 HTML을 모두 불러오기 전에는 스크립트를 전혀 실행할 수 없다는 문제가 있다.

다른 하나는 `DOMContentLoaded`를 쓰는 방법이다. 이는 브라우저가 HTML 문서를 다 읽었다는 것을 나타내는 이벤트를 수신한 시점에 스크립트를 실행한다.

```html
<script>
  document.addEventListener("DOMContentLoaded", (event)=>{
    // 실행할 JS 코드
  });
</script>
```

다른 하나는 `defer` 속성을 이용하는 방법이다. 이는 HTML 문서가 다 읽힌 후에 스크립트를 실행하도록 한다. 즉 HTML 분석이 끝난 이후, `DOMContentLoaded` 이벤트가 발생하기 전에 실행된다. 그리고 HTML 분석 동안에도 별도 스레드에서 스크립트를 로딩하게 하여 로딩 시간을 줄여 준다.

그러나 외부 스크립트를 불러올 때만 사용할 수 있다.

```html
<script src="script.js" defer></script>
```

script에 `async`속성을 지정할 수도 있다. 이 경우 스크립트가 로딩되는 동안 HTML 문서의 로딩을 멈추지 않고 계속 진행한다. 또한 스크립트 로딩이 끝나면 페이지 렌더링을 잠시 중단하고 즉시 실행한다. HTML 구문 분석 중에도 스크립트를 실행할 수 있게 된다. 

기존 script 태그같은 경우 HTML 분석 중 script를 만나게 되면 HTML 분석을 멈추고 로딩+실행을 하고 나서 다시 HTML 분석을 시작한다. 

하지만 async를 쓰면 HTML 분석 동안에도 스크립트 로딩을 할 수 있다. JS 실행 시간만큼만 HTML 분석을 멈추게 된다. 단 단점은 HTML 분석 동안 스크립트들을 병렬로 로딩하기 때문에 스크립트들의 실행 순서가 보장되지 않는다는 것이다. 따라서 독립적인 스크립트에만 사용하자.

<figure>
  <img src="./async-defer.jpg" alt="async-defer" width="100%" />
  <figcaption>async와 defer의 차이. 출처 MDN 문서</figcaption>
</figure>

