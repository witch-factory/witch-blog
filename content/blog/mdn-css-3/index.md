---
title: 프론트 지식 익히기 CSS-3
date: "2023-04-04T00:00:00Z"
description: "MDN CSS 튜토리얼 - 3"
tags: ["web", "study", "front", "css"]
---

# 1. 배경 및 테두리

CSS의 배경(background)와 테두리(border)로 무엇을 할 수 있는가?

## 1.1. 배경

CSS background 속성은 여러 배경 속성의 shorthand이다. 여기 포함된 속성은 다음과 같다.

- background-attachment
- background-clip
- background-color
- background-image
- background-origin
- background-position
- background-repeat
- background-size

이를 하나하나 알아보자.

### 1.1.1. background-color

요소의 배경색을 설정한다. red, blue 등의 키워드, hex표기, rgb()/rgba() 의 함수 표기 등 유효한 색 표현을 사용할 수 있다.

### 1.1.2. background-image

요소의 배경 이미지를 설정한다. url() 함수를 사용하여 이미지의 경로를 지정할 수 있다. 박스보다 작은 이미지를 설정할 경우 이미지가 반복되어 배경으로 설정된다.(background-repeat가 기본값일 경우)

그리고 이미지 외에 배경색을 지정할 시 이미지가 색상 위로 표시된다.

이 속성에 그라디언트를 사용하면 요소의 배경을 그라데이션으로 설정할 수 있다. 예를 들어 linear-gradient() 함수를 사용하면 선형 그라데이션을 설정할 수 있다.

```css
{
  background-image: linear-gradient(to right, red, blue);
}
```

radial-gradient, repeating-linear-gradient, repeating-radial-gradient, conic-gradient 등 다른 종류의 그라데이션 함수들도 있다.

그리고 여러 배경 이미지를 설정할 수도 있다. 쉼표로 구분하면 된다.

```css
background-image: url("image1.png"), url("image2.png");
```

이러면 이미지는 앞에 온 게 우선적으로 고려되어, image1이 image2보다 위에 표시된다.

### 1.1.3. background-repeat

앞서서 background-image를 통해 설정한 이미지가 박스보다 작으면 반복해서 표시된다고 했다. 하지만 이 repeat 속성을 이용하면 그 반복을 막거나 특정 축으로만 반복할 수 있다.

### 1.1.4 background-size

배경 이미지를 지정할 경우 이미지가 요소보다 커서 이미지가 잘릴 수 있다. 이 경우 background-size 속성을 이용하여 이미지 크기를 맞출 수 있다. 이때 배경 이미지로 덮이지 않은 공간은 background-color로 지정한 색상으로 채워진다.

contain, cover 키워드를 사용하면 이미지가 잘리거나 찌그러지지 않는 한도 내에서 크기가 제일 크게 설정된다. cover의 경우 요소에 빈 공간이 생기지 않도록 이미지를 확대 후 잘라내기도 한다.

또한 명시적으로 size를 줄 수도 있는데 하나만 줄 경우 그 사이즈가 이미지 너비가 되고 높이는 자동으로 설정된다. 두 개를 줄 경우 각각 이미지 너비와 높이가 설정된다.

```css
{
  background-size: contain;
  // 너비 설정
  background-size: 100px;
  // 높이 설정
  background-size: 100px 50%;
}
```

### 1.1.5. background-position

배경이 들어갈 박스에서 이미지가 나타나는 위치를 선택할 수 있다. 왼쪽 상단 꼭짓점이 `(0,0)`이다. 각각 x축, y축의 시작 위치를 설정할 수 있다.

top, right등의 키워드를 사용하거나 20px, 50%등의 수치를 사용할 수 있다.

4개의 값을 사용할 수도 있는데 이때 길이 단위는 앞의 키워드 방향과의 간격이다.

```css
{
  // 오른쪽 위에 배치
  background-position: top right;
  // 왼쪽 위 꼭짓점 기준으로 x축은 20px, y축은 50% offset
  background-position: 20px 50%;
  // 아래에서 30% 오른쪽에서 30% offset
  background-position: bottom 30% right 30%;
}
```

### 1.1.6. background-atatchment

내용이 스크롤될 때 스크롤하는 방법을 지정한다.

scroll로 지정하면 페이지 스크롤시 배경도 같이 스크롤되게 한다. 요소 스크롤과는 상관없다. fixed로 설정 시 배경이 고정되어 스크롤되지 않는다. local은 배경을 설정된 요소로 고정하므로 요소가 스크롤되면 배경도 같이 스크롤된다. 페이지 스크롤에도 반응한다.

[각 요소의 스크롤 예시](https://mdn.github.io/learning-area/css/styling-boxes/backgrounds/background-attachment.html)

## 1.2. 테두리

border CSS는 border-width, border-style, border-color의 shorthand이다.

```css
border: 1px solid red;
```

만약 상하좌우 border를 다르게 설정하고 싶다면 border-top 등을 사용할 수 있다.

### 1.2.1. 둥근 테두리

border-radius 속성을 통해 모서리 둥글기를 설정할 수 있다. 각각의 모서리를 설정할 수도 있고, 모든 모서리를 한 번에 설정할 수도 있다.

```css
{
  border-radius: 10px;
  // 모서리 가로반경 10px, 세로반경 20px
  border-radius: 10px 20px;
  border-top-left-radius: 1px;
  border-top-right-radius: 2px;
}
```

