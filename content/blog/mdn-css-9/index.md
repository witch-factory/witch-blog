---
title: 프론트 지식 익히기 CSS-9
date: "2023-04-22T00:00:00Z"
description: "MDN CSS 튜토리얼 - 9"
tags: ["web", "study", "front", "css"]
---

# 1. floats

floats는 원래 페이지의 레이아웃을 잡는 데에 가장 널리 사용되는 도구 중 하나였다. 하지만 flex, grid가 나오면서 원래 floats의 목적인 텍스트 블록 내의 부유하는 이미지를 위해 쓰이게 되었다.

float는 원래 신문 기사에 삽입된 사진처럼, 텍스트 문단 내부에 부유하는 이미지를 포함하고 텍스트가 그 이미지를 둘러싸게 하는 레이아웃을 구현하기 위해 도입되었다. 이러한 float의 원래 용도에 대해 알아보자.

```css
float:left;
```

위와 같이 요소를 설정하면 해당 요소는 기존의 컴포넌트 배치 흐름에서 벗어나서 부모 컨테이너의 왼쪽에 고정되게 된다. 그리고 부모 컨테이너 내의 HTML 상에서 그 아래에 오는 모든 내용은 float한 요소 주변을 감싸게 된다.

그런데 float된 요소 주변에 특정 요소까지만 감싸게 하고 싶다면 어떻게 해야 할까? 그럴 때는 clear를 사용하면 된다.

```css
clear: left;
```

위와 같은 CSS 속성을 설정하면 왼쪽에 float된 요소들을 더 이상 감싸지 않고 새 줄에서 시작하게 된다. 비슷한 원리로 right, both를 사용하면 각각 오른쪽, 양쪽에 float된 요소들을 더 이상 감싸지 않게 된다.

## 1.1. float의 문제 해결

다음과 같은 상황을 생각해 보자. 하나의 wrapper 박스 안에 커다란 박스가 있고 이것이 float처리되어 일반 대열에서 벗어나 있다. 그리고 wrapper 박스 안에는 작은 문단이 들어가 있다. 그리고 wrapper 박스에 배경색을 넣는다고 생각해 보자.

이때 wrapper 박스는 내부에 있는 컨텐츠 크기만큼 늘어나게 되는데 문제는 float 처리된 박스가 일반 흐름에서 벗어나기 때문에 wrapper 박스가 float 처리된 박스를 감싸지 않는다는 것이다. 그래서 wrapper 박스의 배경색이 float 처리된 박스 아래로 내려가지 않는다.

![wrapper-and-float](./wrapper-and-float.png)

wrapper 박스가 float 박스의 크기를 고려하지 않는 이런 문제를 어떻게 해결할 수 있을까?

이를 해결하는 방법 하나는 wrapper 박스 이후에 div 클래스를 하나 추가하고 clear: both; 속성을 추가해 주는 것이다. `::after` 선택자를 사용해서 이를 구현할 수 있다.

```css
.wrapper::after {
  content: "";
  display: block;
  clear: both;
}
```

이 방식을 clearfix hack이라고 한다. 항목 아래에 빈 블록 요소를 추가한 후 해당 요소 이후로 float가 적용되지 않도록 하는 것이다. 이렇게 하면 wrapper 박스가 float 요소까지 고려해서 늘어나게 된다.

wrapper 클래스에 `overflow:auto`를 설정하는 것도 방법이다. 이러면 wrapper 박스 내부에 작은 레이아웃이 생기고 여기에는 float 요소까지 포함되어 있게 된다. 따라서 wrapper 박스가 float 요소까지 고려해서 늘어나게 된다.

현대적인 방식도 있는데 이는 `display:flow-root`를 wrapper 박스에 설정하는 것이다. 이러면 wrapper 박스를 요소 흐름의 루트로 만들어서, wrapper 내부에 작은 레이아웃(블록 서식)을 생성하게 된다. 

`overflow:auto`를 한 것과 같은 효과로 인해 wrapper 박스가 float요소까지 고려해서 늘어나게 된다.

# 2. position 속성

