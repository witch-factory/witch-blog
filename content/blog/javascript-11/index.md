---
title: 모던 자바스크립트 튜토리얼 part 1.6 함수 심화학습
date: "2023-01-20T00:00:00Z"
description: "ko.javascript.info part 1-6 첫번째"
tags: ["javascript"]
---

# 1. 재귀와 스택

재귀 함수는 자기 반복적인 구조를 가진 함수를 작성할 때 아주 좋다. 예를 들어서 팩토리얼 함수를 작성할 때 재귀 함수를 사용하면 아래와 같이 작성할 수 있다.

```js
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}
```

그럼 이런 재귀 함수는 실제 js에서 어떻게 작동하는 걸까? 실행 컨텍스트가 이용된다. 그럼 실행 컨텍스트란 무엇인가?

## 1.1. 실행 컨텍스트

