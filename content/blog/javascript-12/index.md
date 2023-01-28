---
title: 모던 자바스크립트 튜토리얼 part 1.6 함수 심화학습 두번째
date: "2023-01-28T00:00:00Z"
description: "ko.javascript.info part 1-6 2번째"
tags: ["javascript"]
---

모던 자바스크립트 Part1.6을 정리하는 두번째 글이다.

# 1. 오래된 var

지금까지 했던 let, const 외에 var로도 변수를 선언할 수 있다. 이게 원래 JS에서 쓰이던 방식이다.

let을 var로 바꿔도 유사하게 작동할 때가 많다. 하지만 몇몇 중요한 부분에서 다른 점이 있다.

## 1.1. 스코프

블록 기준으로 스코프를 나누는 let과 달리 var는 함수 스코프와 전역 스코프뿐이다. 따라서 함수 스코프가 아닌 블록은 스코프를 분리하지 않는다.

```js
if (1) {
  var a = 1;
  console.log(a);
}

console.log(a);
// if블록은 함수 스코프가 아니라서
// var는 스코프를 나누지 않기에 여기서도 a에 접근 가능
```

반면 함수를 기준으로는 스코프를 나눈다.

```js
function foo() {
  var bar = 1;
}

foo();
console.log(bar); 
// 함수 밖에서 bar를 참조하면 ReferenceError 발생
```

## 1.2. 변수 중복 선언

var는 같은 스코프 내에서 중복 선언이 가능하다. 그러나 이미 선언된 변수를 var로 다시 선언시 변수에 값은 대입되지만, 새로 메모리를 할당하거나 하지는 않는다.

```js
var a = 1; // 이 시점에 이미 a는 선언되었다
var a = 2;
var a = 3;
console.log(a); // 3이 출력된다
```

## 1.3. 선언 전 사용

var의 선언은 함수의 어느 부분에서 선언되었든 함수가 시작하는 시점에 처리된다. 따라서 선언 위치와 상관없이 함수 본문 내 어디서든, var를 만나기 이전에도 사용할 수 있다. 단 선언만 처리되고 값의 할당은 스크립트 시작 시점엔 처리되지 않는다.

```js
function foo() {
  // a의 선언은 처리되었지만 값은 대입되지 않아 undefined가 출력된다
  console.log(a);
  var a = 1;
}

foo();
```

값을 미리 대입해 주면 그 값으로 처리된다.

```js
function foo() {
  a = 2;
  console.log(a); // 2
  var a = 1;
  console.log(a); // 1
}

foo();
```

물론 함수 밖에서는 사용할 수 없다.

```js
function foo() {
  var a = 1;
  console.log(a);
}
console.log(a); // 에러
foo();
```

## 1.4. IIFE

IIFE는 Immediately Invoked Function Expression의 약자로, 함수를 선언함과 동시에 즉시 실행하는 것이다. 이는 var도 블록 레벨 스코프로 사용할 수 있도록 한 대안 중 하나이다.

즉시 실행 함수 표현식은 함수 표현식을 만들고 괄호로 감싸는 방식으로 만들어진다.

```js
(function () {
  let msg = "Hello World";
  console.log(msg);
})();
// hello world
```

이런 걸 이용해서 private 멤버를 흉내낼 수 있다.

# 참고

https://coderwall.com/p/ta4caw/using-iife-to-create-private-members-in-javascript