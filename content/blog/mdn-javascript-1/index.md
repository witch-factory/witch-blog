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
  <figcaption>async와 defer의 차이. 출처 [MDN 문서](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript#%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EB%A1%9C%EB%94%A9_%EC%A0%84%EB%9E%B5)</figcaption>
</figure>

# 2. JS 구성 요소

예전에 봤다시피 함수 표현식을 통해 함수를 선언할 수도 있다. 이는 주로 이벤트 핸들러에 대입된다.

```js
let myButton=document.querySelector('button');

myButton.onclick=function(){
  alert('button clicked');
}
```

## 2.1. 이벤트

이벤트는 프로그램에서 일어나는 사건들을 일반적으로 칭하는 말이다. 이 이벤트들은 발생 시 몇몇 신호들을 만드는데 여기에는 이벤트 핸들러가 있어서 이벤트 발생 시 실행할 코드를 지정할 수 있다.

이벤트 발생 -> 이벤트 리스너가 이벤트 발생 신호 수신 -> 이벤트 핸들러 실행의 순서다. 단 주의할 점은 웹 이벤트는 JS 표준에서 정의된 부분은 아니라는 것이다. 이는 WebAPI의 일부다.

`onclick`, `onfocus`, `onblur`, `onkeydown`등의 다양한 것이 있다. 이는 `button.onclick=~`과 같이 요소의 프로퍼티로 지정될 수 있다.

`<button onclick="handleClick()">`과 같이 인라인 이벤트 핸들러를 쓸 수도 있지만 이는 권장되지 않는다. HTML과 JS를 분리하는 것이 권장되기 때문이다.

`addEventListener` 메서드를 쓰는 것이 가장 좋다. [문서 링크](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)

```js
btn. addEventListener('click', handleClick);
```

이에 반대되는 메서드는 `removeEventListener`다. 제거할 핸들러와 같은 단계에 있어야 함을 기억하자.

이런 메서드를 쓰면 하나의 요소에 2개 이상의 이벤트도 등록 가능하다.

이벤트 함수를 `func(e){}`처럼 이벤트 객체 매개변수 e(이름이 그다지 중요하진 않다)를 전달하는 식으로 선언 가능한데 이는 이벤트 핸들러에 자동으로 전달된다. 이때 e.target은 항상 이벤트가 발생된 요소에 대한 참조다. 같은 이벤트 핸들러를 여러 다른 요소에 적용하고 싶을 때 유용하다.

React에서 많이 본 `preventDefault`는 사용자 에이전트가 이벤트에 대해 정의한 기본 동작을 실행하지 않도록 한다.

## 2.2. 이벤트 버블링과 캡처링

이는 같은 이벤트 타입의 두 이벤트 핸들러가 한 요소에서 작동되었을 때 발생하는 일을 기술한다.

예를 들어 다음과 같은 코드를 보자.

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <title>나의 테스트</title>
    <style>
      .parent{
        width:300px;
        height:300px;
        background-color: red;
      }
      .child{
        width:100px;
        height:100px;
        background-color: blue;
      }
    </style>
  </head>

  <body>
    <div class="parent">
      <div class="child"></div>
    </div>
    <script>
      const parent = document.querySelector('.parent');
      const child = document.querySelector('.child');
      parent.addEventListener('click', function(){
        parent.style.backgroundColor = 'green';
        console.log('parent');
      });
      child.addEventListener('click', function(){
        child.style.backgroundColor = 'yellow';
        console.log('child');
      });
    </script>
  </body>
</html>
```

이 HTML을 브라우저에서 연 뒤 child의 파란색 네모를 클릭하면 parent 박스의 색까지 모두 바뀐다. child가 parent에 포함되어 있기 때문이다.

부모 요소를 가지고 있는 요소에서 이벤트 발생시 브라우저는 캡처링과 버블링을 실행한다.

캡처링은 요소의 가장 최상위 조상에서 시작해서 캡처링 이벤트를 검사하고 그것을 실행하는 것을 말한다. 그리고 내부 요소로 이동하면서 선택된 요소에 닿을 때까지 해당 동작을 반복하는 것이다.

캡처링 단계를 이용하는 경우는 흔치 않다. 캡처링 단계에서 이벤트를 처리하려면 `addEventListener`의 세 번째 인자 객체에 capture 옵션 `true`를 전달하면 된다. 혹은 3번째 인자로 true를 전달해도 된다.

```js
// 이 이벤트가 캡처링 단계에서 처리되도록 한다
elem.addEventListener(..., ..., true);
elem.addEventListener(..., ..., {capture: true});
```

버블링은 캡처링과 반대의 경우다. 이벤트가 발생한 요소에서 시작해서 가장 최상위 조상까지 올라가면서 버블링 이벤트를 검사하고 실행하는 것을 말한다. 제일 깊은 곳에서 최상위 조상까지 올라가는 게 거품이 떠오르는 것 같다고 해서 버블링이라 한다. 이때 버블링이 진행되면서 `event.target`은 변치 않는다.

현대 브라우저에서 모든 이벤트 핸들러는 버블링 단계에 등록되어 있다. 따라서 자식 요소에서 시작해서 최상위 조상 요소까지 올라가며 이벤트를 실행하게 된다.

위 코드에서도 순서를 따진다면 child의 이벤트 핸들러가 먼저 실행되고 그 후 parent의 이벤트 핸들러가 실행된다.

이런 동작을 막기 위해선 이벤트 객체 e에 `e.stopPropagation()`을 사용하면 된다. 이는 이벤트가 조상 요소로 전파되는 것을 막는다. 즉 이벤트가 발생한 요소에서 이벤트가 끝나게 된다. 위 코드 같은 경우 child의 이벤트리스너를 변경하면 된다.

```js
child.addEventListener('click', function(e){
  e.stopPropagation();
  child.style.backgroundColor = 'yellow';
  console.log('child');
});
```

`e.stopImmediatePropagation`은 요소의 같은 이벤트에 할당된 다른 모든 핸들러의 동작도 막는다. 단 이렇게 버블링을 막아야 할 일들은 거의 없다.

버블링은 이점도 있다. 이벤트 위임을 가능하게 하는 것이다. 많은 자식 요소가 있고 그 중 하나를 선택했을 때의 코드를 실행하길 원한다면 모든 자식에 이벤트 리스너를 설정하는 대신 부모 요소에 이벤트 리스너를 설정하면 된다. 그러면 자식 요소의 이벤트가 부모로 버블링되어 올라갈 것이다.

# 참고

https://ko.javascript.info/bubbling-and-capturing