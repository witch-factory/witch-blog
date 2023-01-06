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

위와 같이 객체를 선언한 경우 `info.sayHi()`로 메서드를 사용할 수 있다.

## 1.1 메서드의 단축 구문

객체 내부에 function 키워드를 사용하여 메서드를 선언하거나 단축 구문으로 함수 이름만 적어도 된다.

```js
// function 키워드 쓰기
let info = {
  name: "김성현",
  age: 25,
  sayHi: function () {
    alert("안녕하세요");
  },
};
// 단축 구문 쓰기
let info = {
  name: "김성현",
  age: 25,
  sayHi() {
    alert("안녕하세요");
  },
};
```

위의 2가지 방식은 약간의 차이가 있다. 먼저 단축 구문으로 선언한 메서드의 경우 생성자로 사용할 수 없다. 

```js
let info = {
  name: "김성현",
  blog: "https://www.witch.work/",

  method1() {},
  method2: function () {
    console.log(this.name);
  },
};
new info.method1(); // 단축 구문으로 생성한 메서드는 생성자로 사용시 에러 발생
new info.method2(); // 일반 구문으로 생성한 메서드는 생성자로 정상 실행
```

그리고 단축 구문으로 선언한 메서드는 `메서드 정의`라고도 불린다. 그 이름답게, 메서드 정의로 선언한 메서드에서만 super 키워드에 대한 접근이 가능하다.

# 1.2 메서드와 this

메서드 내부에서 this 키워드를 사용하면 메서드를 호출한 객체를 참조할 수 있다. 이 값은 런타임에 결정되며 문맥에 따라 달라진다. 같은 함수라도 다른 객체에서 호출하거나 문맥이 달라지면 this값이 달라질 수 있다. 아래 코드를 보면 sayHi를 호출한 객체에 따라 this가 달라지는 것을 확인할 수 있다.

```js
let user = {
  name: "김성현",
};
let member = {
  name: "김기동",
};
function sayHi() {
  alert(this.name);
}

user.f = sayHi;
member.f = sayHi;

user.f(); // 김성현
member.f(); // 김기동
```

물론 sayHi에서 `alert(user.name)`을 쓰는 식으로 외부 변수 접근을 통해 특정 객체를 참조하도록 강제할 수도 있다. 하지만 이럴 경우 user의 내용이 바뀌었을 경우 문제가 생길 수 있다.

이 내용은 다른 글에서 더 자세히 다루도록 한다.







# 참고

메서드 정의로 선언한 메서드의 차이 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
