---
title: 모던 자바스크립트 튜토리얼 part 1.4 객체 기본 - 1
date: "2023-01-01T00:00:00Z"
description: "ko.javascript.info part 1-4 첫번째"
tags: ["javascript"]
---

2023년 새해가 밝았다. 그리고 나는 JS를 정리하고 있다. 아아..

# 1. 객체의 개념

객체는 원시 타입과 달리 다양한 데이터를 저장할 수 있다. key-value 쌍으로 이루어진 프로퍼티를 여러 개 넣을 수 있는 것이다. 이때 key는 문자열, value는 아무 타입이나 가능하다. 해시로 관리되기에 key의 타입은 제한이 있다.

중괄호 `{}`나 생성자 `new Object()`로 객체를 만들 수 있다. 하지만 보통 중괄호를 쓴다.

## 1.1. 프로퍼티 다루기

객체의 key-value 쌍을 프로퍼티라고 한다. 이는 `.`을 통해 조회할 수 있다.

```js
let user={
  name:"김성현",
  nickname:"witch",
  age:25,
}

console.log(user.name); // "김성현" 을 출력한다.
```