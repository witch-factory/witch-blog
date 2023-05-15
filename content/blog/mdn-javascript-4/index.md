---
title: 프론트 지식 익히기 Javascript - 4
date: "2023-05-14T00:00:00Z"
description: "MDN Javascript 튜토리얼 - 4"
tags: ["web", "study", "front", "js"]
---

클라이언트 사이드 웹 API에 대해 다뤄본다.

# 1. 소개

클라이언트의 JS는 개발자들이 사용할 수 있는 많은 API를 제공한다. 이는 JS 언어에 규정된 건 아니지만 클라이언트사이드 JS 상에서 구현되어 있다. 브라우저 API와 서드파티 API로 나뉜다.

일반적인 브라우저 API에는 DOM을 조작하는 `getElementById`등의 API, 그리고 `fetch`와 같은 네트워크 통신 API, `requestAnimationFrame`과 같은 애니메이션 API 등이 있다. 세션 스토리지 등의 웹 스토리지도 브라우저 API가 제공하는 기능에 해당한다.

## 1.1. JS API들의 특징

JS API들은 각각 조금씩 다른 원리로 작동하지만 일반적으로 공유하는 특징들이 있다.

API들은 대부분 JS 객체로 이루어져 있다. API가 사용하는 데이터와 함수들을 담는 컨테이너로 객체를 쓰는 것이다. 

예를 들어 DOM API들은 `document` 객체에 담겨있다. `document.getElementById`와 같은 API를 호출하면 `document` 객체의 `getElementById` 함수를 호출하는 것이다.

그리고 API들은 일반적으로 진입점을 가지고 있다. 예를 들어서 DOM API는 document 객체 혹은 HTML 요소의 인스턴스들을 진입점으로 사용할 수 있다.

상태 변화를 위해서 일반적으로 이벤트를 이용한다는 것도 특징 중 하나이다. 또 다른 웹 기술들과 같이 보안 메커니즘을 가지고 있는 경우가 있다. 예를 들어서 HTTPS로 서빙하는 페이지에서만 작동하는 API도 있다.

# 2. DOM 조작

웹페이지를 만들 때 페이지의 문서 구조를 바꾸고 싶을 때가 많다. 이럴 때 DOM API를 사용하면 된다.

## 2.1. 기타 웹 API

[여기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#the_important_parts_of_a_web_browser)참고해서 새 글을 쓰자.

보안상의 이유로 개발자가 조작할 수 없는 브라우저의 부분들도 많다. 그러나 여전히 굉장히 많은 걸 할 수 있는데, 브라우저에서 웹페이지를 띄울 때 일반적으로 쓰이는 부분들은 다음과 같다.

window는 웹페이지가 뜨는 브라우저 탭을 뜻한다. 이는 JS에서 `Window` 객체로 표현되며 `innerWidth` 등의 프로퍼티를 사용할 수 있고 해당 윈도우에 로딩되는 document를 조작하는 등의 동작을 할 수 있다.

navigator는 브라우저의 상태와 정보를 담고 있다. `Navigator`객체로 표현된다. 

그리고 document는 윈도우에 띄워지는 실제 페이지이다. `Document`객체로 표현되며 `getElementById`와 같은 DOM API를 사용해서 페이지를 구성하는 HTML, CSS 정보를 조작하고 변경할 수 있다. 여기서는 document 객체에 대해 자세히 다룰 것이다.

## 2.2. DOM(Document Object Model) 조작

브라우저에 로딩되는 문서는 DOM으로 표현된다. DOM은 트리 구조이고 프로그래밍 언어에 의해 접근될 수 있도록 브라우저에 의해 만들어진다. 이렇게 만들어진 DOM은 브라우저가 스타일링을 적용할 때도 쓰이고 개발자들이 DOM을 조작할 때도 사용할 수 있다.

예를 들어서 다음과 같은 JS 코드를 쓸 수 있다. `querySelector`는 CSS 선택자를 통해 DOM에서 요소를 찾는다.

```js
const linkComponent = document.querySelector('a');
```

그러면 해당 변수는 HTML a 태그 요소에 대한 참조를 가지게 되고 그 요소에 정의된 프로퍼티와 메서드를 사용할 수 있게 된다. 이는 HTMLAnchorElement 혹은 더 일반적인 HTMLElement나 Node(아예 DOM의 모든 일반적인 노드를 뜻함)에 정의된 것들이다. `Node.textContent`등을 사용할 수 있다.

```js
linkComponent.textContent = 'Click me!';
```

`document.createElement`나 `Node.appendChild` 등의 메서드를 이용해 아예 새 요소를 만들고 문서에 추가할 수도 있다.

요소들을 DOM에서 이동하거나 삭제하는 것도 가능한데 주의할 점은 우리가 요소의 참조를 가지고 있다는 것이다. 다음과 같은 HTML을 실행해 보면, p태그가 section 태그의 자식으로 옮겨진 것을 볼 수 있다. 기존 p태그는 그대로 있고 새로운 p태그가 section의 자식으로 추가되는 것이 **아니다!** 만약 새 자식을 추가하고 싶다면 `Node.cloneNode`를 사용해야 한다.

```html
<body>
  <p>예제 문단</p>
  <section>
    이건 섹션입니다.
  </section>
  <script>
    const para=document.querySelector("p");
    const sect=document.querySelector("section");

    para.textContent="예시 문단의 변경된 텍스트";
    sect.appendChild(para);
  </script>
</body>
```

그리고 DOM의 인라인 스타일도 이를 통해 조작할 수 있다. `HTMLElement.style`의 프로퍼티들을 변경하면 된다.

혹은 미리 클래스를 정의해둔 뒤 `Element.setAttribute`를 이용해서 클래스를 추가할 수도 있다. 이렇게 하면 인라인 CSS 스타일이 아니라 클래스를 통한 CSS를 추가할 수 있다.

```js
elem.setAttribute("class", "newClass");
```

이렇게 클래스를 동적으로 설정하는 방법은 사전에 스타일 클래스를 정의해야 한다는 단점이 있지만 CSS와 JS 분리가 더 잘 이루어진다는 장점이 있다. 프로젝트가 커지면 이쪽 방법이 더 많이 쓰인다.