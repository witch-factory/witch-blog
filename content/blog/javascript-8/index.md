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

# 2. new와 생성자

생성자 함수, new를 쓰면 유사한 객체를 쉽게 만들 수 있다. 생성자 함수는 일반 함수와 구분하기 위해 관례적으로 첫 글자를 대문자로 쓴다. 

또한 생성자 함수는 new를 붙여 호출하며, new를 붙이지 않고 호출하면 일반 함수로 동작한다. 다음은 Person이라는 생성자 함수를 만들고 사용한 예시이다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = new Person("John", 30);
console.log(person.name);
```

`new Person`을 호출하면 다음과 같은 일이 일어난다. 먼저 빈 객체를 만들어 this에 할당하고 함수 본문을 실행한다. 그리고 this를 반환한다. 다음과 같은 코드를 통해서, 함수의 시작시 this가 빈 객체를 참조하고, 함수가 종료되면 만들어진 this가 반환되는 것을 확인할 수 있다.

```js
function Person(name, age) {
  console.log(this);
  this.name = name;
  this.age = age;
  console.log(this);
}

let person = new Person("John", 30);
```

new를 붙여 주면 어떤 함수든 생성자 함수로 실행된다. 생성자 함수의 첫 글자가 대문자인 건 관례이다.

## 2.1. new.target

new를 붙여 호출했는지 확인할 수 있는 함수 내의 특별한 프로퍼티이다. new를 붙여 호출했으면 new.target은 함수 자신을 참조하고, 그렇지 않으면 undefined를 참조한다.

## 2.2. 생성자의 return

생성자 함수에는 보통 return을 쓰지 않지만 쓰지 못하는 건 아니다. return을 쓰면 어떤 일이 일어날까?

객체를 리턴하면 this대신 객체가 반환된다. 만약 원시형을 리턴하면 this가 무시되고, 리턴된 값이 반환된다. 아무것도 리턴하지 않고 `return;`만 쓰는 경우에도 this가 반환된다.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  return 3;
}
//person은 3이 아니라 생성자에서 반환한 this가 된다
let person = new Person("John", 30);
console.log(person);
```

또한 인수가 없는 생성자 함수의 경우 괄호를 생략하고 호출할 수도 있다. 그러나 좋은 코드 스타일은 아니다.

그리고 생성자 내에서 this에 메서드를 추가하는 것도 물론 가능하다.

# 3. 옵셔널 체이닝

우리가 객체의 속성에 접근할 때 만약 객체에 없는 속성에 접근 시도를 한다면 undefined가 반환된다. 그런데 `user.address.city`와 같이 객체의 속성에 중첩해서 접근할 경우, 중간에 존재하지 않는 속성이 있다면 에러가 발생한다. 옵셔널 체이닝은 이런 문제를 다룰 수 있게 해준다.

`?.`는 `?.`앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다. 다음과 같이 쓸 수 있다.

```js
let user = null;
console.log(user?.address);
```

user가 널이므로 user?.address는 undefined가 된다. 만약 `user.address`를 썼다면 에러가 발생했을 것이다.

그러나 `?.`는 그 바로 앞의 평가 대상에 대해서만 작동한다. 만약 ?.의 결과로 undefined가 반환되었고 그 다음에 .을 통한 객체 접근 시도가 있다면 에러가 반환된다.

```js
let user = {
  name: "김성현",
  age: 25,
};
// user.address가 없으므로 undefined.city와 같고 따라서 에러 발생
console.log(user?.address.city);
```

그리고 ?.도 평가 대상이 없으면 에러가 발생한다.

```js
// user변수 자체가 없으므로 에러 발생
console.log(user?.address);
```

## 3.1. 메서드와 함께 쓰기

?.는 연산자가 아니고 함수 혹은 대괄호와 함께 쓰이는 특별한 문법 구조체이다. 따라서 메서드 호출과 함께도 쓸 수 있다. 예를 들어서 존재 여부가 확실치 않은 함수를 호출할 때.

다음과 같이 쓰인 경우, test 객체에 method2는 없다. 하지만 ?.를 통해 호출했으므로 에러는 발생하지 않고 그냥 평가가 멈춘다. 

test.method2는 undefined가 되는데 ?.가 undefined를 감지하므로 평가를 멈추는 것이다.

```js
let test = {
  method() {
    console.log("method");
  },
};

test.method();
test.method2?.();
```

비슷하게 `undefined?.()`도 에러를 발생시키지 않는다.

## 3.2. 대괄호와 함께 쓰기

. 대신 대괄호를 사용해 객체 프로퍼티에 접근하는 경우 `?.[]`를 사용할 수 있다. 해당 키의 존재가 확실하지 않아도 안전하게 프로퍼티를 읽는 것이다.

```js
let user = {
  name: "김성현",
  age: 25,
};
// undefined를 출력
console.log(user?.["house address"]);
```

?.는 할당 연산자 왼쪽에서 사용될 수 없다는 점에 주의하자. 쓰기에는 사용할 수 없다. 단 delete와 조합하여 '이 객체가 있을 경우 이 속성을 삭제'하는 용도로 사용할 수 있다.

# 참고

메서드 정의로 선언한 메서드의 차이 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
