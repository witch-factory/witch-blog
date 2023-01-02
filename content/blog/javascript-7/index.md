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

물론 새로운 프로퍼티를 추가할 수도 있다. 그리고 `delete`연산자를 쓰면 프로퍼티 삭제도 가능하다.

```js
let user={
  name:"김성현",
  nickname:"witch",
  age:25,
}

user.gender="Male";
delete user.age;
console.log(user); // {name: '김성현', nickname: 'witch', gender: 'Male'}
```

만약 key 문자열이 띄어쓰기가 들어간 상태로 구성되어 있다면 따옴표로 묶어 줘야 한다.

```js
let user={
  name:"김성현",
  nickname:"witch",
  age:25,
  "now in":'서울',
}
```

또한 주의할 점은 객체가 상수로 선언되었더라도 프로퍼티를 수정할 수 있다는 점이다. 객체를 const로 선언하는 건 객체 내용을 고정하는 게 아니라 객체에 대한 참조를 고정하는 것이기 때문이다.

## 1.2. 대괄호 표기법

만약 key가 여러 단어로 이루어진 경우 `.`을 통해 객체 프로퍼티를 참고할 수 없다. `.`으로 객체 키를 참조할 수 있는 건 대부분 키가 유효한 변수명일 때이다.

단 다른 점이 있는데 객체 key는 for, let과 같은 JS의 예약어를 사용해도 된다.

key가 유효한 변수명이 아닐 경우 대괄호를 이용해 key 조회가 가능하다. 대괄호를 이용할 경우 모든 표현식의 평가 결과를 key로 조회 가능하다.

```js
let user={
  name:"김성현",
  nickname:"witch",
  age:25,
  "now in":'서울',
}

console.log(user["now in"]); // 서울
```

## 1.3. 계산된 프로퍼티

객체 리터럴을 만들 때 key를 대괄호로 둘러싼 경우 computed property라 하여 표현식의 평가 결과를 key로 쓸 수 있다. 예를 들어 prompt 창의 리턴값 같은 것들을 객체 키로 사용하게 된다.

```js
let name=prompt("당신의 이름을 입력해 주세요", "");

let info={
  [name]:"me",
}
console.log(info);
```

혹은 변수의 복잡한 연산 결과와 같은 걸 키로 사용할 수도 있다.

## 1.4. 프로퍼티 이름 제약

객체의 key는 변수명과 달리 for, let 같은 예약어를 사용할 수도 있다. 또한 어떤 문자형이나 심볼형 값을 사용할 수도 있다. 만약 다른 타입 값을 키로 사용하면 문자열로 자동 변환된다.

단 `__proto__`만은 역사적인 이유로 객체의 키로 사용할 수 없다. 여기에 대해서는 추후에 다시 다룰 것이다.

## 1.5. 프로퍼티 존재 여부 확인

만약 객체에 존재하지 않는 프로퍼티 키에 접근하려고 시도한다면 JS에서는 에러를 발생시키는 대신 undefined를 반환하도록 한다. 따라서 객체 키 조회 결과를 undefined와 비교하는 식으로 객체에 특정 키가 존재하는지 확인할 수 있다.

이와 같은 기능을 지원하는 걸로 `in`연산자가 있다. key 조회 후 undefined와 대조하는 것과의 차이는, `in`을 사용하면 value가 undefined인 경우를 가려낼 수 있다는 점이다. 물론 value를 굳이 undefined로 설정할 일이 별로 없긴 하다.

```js
let info={
  name:"김성현",
  nickname:"마녀",
}
console.log("name" in info); //name은 있으므로 true
console.log("age" in info); //age는 없으므로 false
```

## 1.6. 객체 순회

`for..in`을 사용하면 객체의 모든 키를 순회할 수 있다.

```js
let info={
  name:"김성현",
  nickname:"마녀",
}

for(let key in info){
  console.log(key);
}
```

## 1.7. 객체 정렬 방식

프로퍼티에도 순서가 있다. 이 순서는 `for..in`으로 객체를 순회할 때 확인 가능하다.

정수 형태의 프로퍼티(변형 없이 정수로 변환될 수 있어야 한다. 예를 들어 `+49`는 변형이 있어야 정수로 변할 수 있으므로 정수형태 프로퍼티가 아니다)는 자동으로 정렬되고 나머지는 추가한 순서대로 정렬된다.

# 2. 객체 복사

원시 타입은 값 그대로가 저장된다. 예를 들어서 `let a=1`이라 할당하면 a에는 실제로 1이라는 값이 담긴다. 그러나 객체는 참조에 의해서 저장되고 복사된다. 따라서 다른 변수에 객체를 할당하면 그 객체에 대한 참조가 전달된다.

예를 들어 다음과 같이 정수값 1을 a에 담고 b에 할당시 b에도 값 1이 저장된다. 값이 저장된 것이므로 b를 변경해도 a는 똑같다.

```js
let a=1;
let b=a;
b=2;
console.log(a,b); // 1 2
```

하지만 객체를 다른 변수에 할당한 후 그 변수를 조작하면 원래 변수도 바뀐다. 참조를 할당하기 때문이다.

```js
let info={
  name:"김성현",
  nickname:"마녀",
}

let info2=info;
info2.name="김상준";
console.log(info, info2); //info, info2 모두 변경되었다.
```

## 2.1. 객체 비교

객체를 비교할 때 

