---
title: CSS의 캐스케이드 레이어에 관하여
date: "2023-03-31T01:00:00Z"
description: "CSS의 캐스케이드 레이어 관리하기"
tags: ["web", "study", "front", "css"]
---

# 1. CSS cascade 알고리즘이란?

CSS는 Cascading Style Sheets의 약자이다. 여기서 Cascading이란 브라우저가 요소에 적용할 하나의 스타일을 결정하는 알고리즘이다. 같은 요소를 선택하는 선택자는 여러 개가 있을 수 있는데 이 중 어떤 선택자의 스타일을 적용할지에 관한 문제를 해결하는 것이다.

그럼 이 cascade는 어떻게 작동할까?

## 1.1. cascade의 재료

cascade에는 속성-값의 쌍인 CSS 선언만이 쓰인다. `@font-face`와 같은 at-rule들은 cascade에 영향을 주지 않는다.

# 2. cascade 알고리즘의 고려 요소

cascade 알고리즘은 다음과 같은 조건들을 고려한다. 가장 우선적으로 고려되는 조건부터 나열하였다.

## 2.1. 유래와 importance

importance는 CSS 선언에 `!important`를 붙여서 선언했는지를 뜻한다. `!important`를 붙이면 cascade 알고리즘에서 우선순위가 가장 높아진다. 이를 붙이는 게 권장되는 건 아니라서 꼭 필요할 때만 붙여야 하지만.

그럼 유래라는 것은 뭘까? cascade 알고리즘에서 고려하는 CSS 선언은 3곳에서 유래될 수 있는데 이 유래가 어느 곳인지에 따라 우선순위가 달라진다.

### 2.1.1. User agent style sheet

브라우저는 모든 요소에 대해 기본 스타일을 제공한다. 예를 들어서 `<h1>` 요소는 기본적으로 `font-size: 2em`을 가지고 있다.

몇몇 브라우저는 스타일시트를 직접 사용하기도 하고 이런 기본 스타일링을 코드로 만들어내기도 하지만 최종 결과는 같다.

이렇게 브라우저가 제공하는 기본 스타일을 User agent style sheet라고 한다.

### 2.1.2. Author style sheet

author style sheet는 페이지의 개발자가 직접 작성한 스타일이다. HTML 문서에 선언(link나 style 태그를 통해)된 CSS 스타일로써 프론트엔드 개발자가 직접 작성한 스타일을 author style sheet라고 한다.

### 2.1.3. User style sheet

브라우저의 사용자가 정의한 스타일이다. 예를 들어서 사용자가 브라우저의 설정에서 폰트 크기를 변경하면 이런 스타일이 적용된다. 브라우저의 스타일을 덮어쓰고 싶은 사용자가 작성해서 적용한 스타일을 뜻한다.

### 2.1.4. 우선순위 결정

유래와 importance를 고려하여 cascade 알고리즘은 다음과 같은 우선순위를 가진다. 가장 우선순위가 높은 것부터 낮은 것 순으로 나열하였다.

1. User-Agent && !important
2. User && !important
3. Author && !important
4. CSS 애니메이션, @keyframes (예외적인 경우로, author style sheet에 속하지만 브라우저는 일반적인 author style sheet보다 애니메이션을 더 우선적으로 처리한다)
5. Author
6. User
7. User-Agent

## 2.2. 셀렉터의 구체성(specifity)

개발자는 선언의 유래를 바꿀 수도 없고 `!important`를 붙이는 것도 그렇게 권장되지 않는다. 따라서 개발자가 cascade를 고려할 때는 대부분 이 부분에서 고려한다.

셀렉터는 더 구체적일수록 더 우선적으로 고려되어 스타일이 적용된다. 이 순서는 이런 식이다.

```
인라인 스타일 > id 셀렉터> 클래스/어트리뷰트/가상 셀렉터 > 태그/가상 요소 셀렉터 > 전체 셀렉터 > 상위 요소에 의해 상속된 속성
```

만약 CSS 선언에서 같은 우선순위 선택자가 있다면, 셀렉터 숫자까지 고려된다. 만약 다음과 같이 쓴다면 두 선언은 모두 id 셀렉터를 가지고 있으므로 우선순위가 같지만, id 셀렉터의 개수가 더 많은 선언이 더 우선순위가 높아서 title 아이디를 갖는 태그는 보라색이 된다.

```css
#title#title {
  color: purple;
}

#title {
  color: red;
}
```

그리고 이는 높은 우선순위를 갖는 셀렉터의 숫자가 같을 때도 마찬가지다. 같은 요소를 가리키는 셀렉터 2개가 하나는 `#title.myclass1` 이고 하나는 `#title2.myclass1.myclass2`라면 클래스 셀렉터 숫자가 더 많은 후자를 우선한다.

## 2.3. 선언 순서

간단하다. 나중에 선언된 스타일이 더 우선순위가 높다.

이는 link 태그를 통해 css 파일을 로드할 때도 적용된다. 나중에 쓰인 link 태그가 로드하는 css 파일이 더 우선적으로 적용된다.

## 2.4. 기본/상속 속성

요소에 해당하는 CSS 선언이 없을 경우에 영향을 미친다. color 등의 속성들은 부모 요소에서 기본적으로 상속되기 때문이다. 그리고 상속되지 않는 속성들에 대해서는 보통 기본값이 있다. 이를테면 `background-color`는 기본값이 `transparent`이다.

# 3. cascade layer

cascade 알고리즘에서 사실 고려하는 게 하나 더 있다. 바로 cascade layer이다. importance와 origin을 고려한 후, 셀렉터의 구체성을 고려하기 전에 cascade layer를 고려한다.

즉 cascade 알고리즘은 다음과 같은 순서로 CSS 선언들을 고려하는 것이다.

1. 유래와 importance
2. cascade layer
3. 셀렉터의 구체성
4. 선언 순서
5. 기본/상속 속성



# 참고

https://developer.mozilla.org/ko/docs/Web/CSS/Cascade

CSS cascade에 관하여 https://blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8/