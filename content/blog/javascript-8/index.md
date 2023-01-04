---
title: 모던 자바스크립트 튜토리얼 part 1.4 객체 기본 - 2
date: "2023-01-02T00:00:00Z"
description: "ko.javascript.info part 1-4 두번째"
tags: ["javascript"]
---

# 1. 메서드와 this

객체에도 메서드가 존재할 수 있다. 객체 프로퍼티에 값을 할당할 때 함수를 값으로 할당하면 메서드가 된다.

```js
let info = {
  name: "김성현",
  age: 25,
};

info.sayHi = function () {
  alert("안녕하세요");
};
```