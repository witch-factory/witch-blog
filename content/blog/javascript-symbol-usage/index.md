---
title: JS의 심볼, 대체 왜 있지?
date: "2022-01-08T00:00:00Z"
description: "JS의 심볼, 어디에 쓰이는 걸까?"
tags: ["javascript"]
---

JS의 심볼, ES2015에 도입되었지만 대체 어디에 쓰이는 걸까?

# 1. 심볼의 개념

심볼은 원시형 중에 하나로 ES2015에 도입되었다. `Symbol()` 생성자 함수를 사용해서 심볼을 생성할 수 있고 이는 유일한 값이다. new 연산자는 지원하지 않는다.

```js
let id1 = Symbol();
let id2 = Symbol();
// 심볼 각각은 유일하기에 false가 반환된다.
console.log(id1 == id2);
```

심볼을 만들 때 생성자 인수로 설명을 붙일 수 있다. 디버깅 시 유용하게 쓰일 수 있다. 단 설명이 동일한 심볼을 여러 개 만들어도 심볼 각각은 유일하기에 이 설명은 그저 우리가 식별할 수 있는 이름표 역할 뿐이다.

```js
let id1 = Symbol("id");
console.log(id1);
```

또한 심볼은 문자열으로 자동 형변환될 수 없다. alert의 인수로 심볼을 넘기면 다음과 같은 에러가 발생한다.

```
Uncaught TypeError: Cannot convert a Symbol value to a string
```

만약 꼭 심볼을 출력해 줘야 한다면 `.toString()` 메서드를 사용해야 한다. 그리고 `description` 프로퍼티를 사용하면 설명을 가져올 수 있다.

```js
let id1 = Symbol("id");
alert(id1.toString()); //Symbol(id)
alert(id1.description); //id
```

그런데 이런 값이 대체 어떻게 쓰일 수 있을까?

# 2. 심볼형으로 숨김 프로퍼티 만들기

심볼은 문자열과 함께 객체의 프로퍼티 키로 사용할 수 있다. 이 특성을 사용하면 객체의 숨김 프로퍼티를 만들 수 있다.

## 2.1. 숨김 프로퍼티 만들기

심볼을 이용하면 외부 코드에서 접근할 수 없고 값도 덮어쓸 수 없는 숨김 프로퍼티를 만들 수 있다.

외부 라이브러리 코드에서 가져온 user 객체가 여러 개 있고 이를 이용해 어떤 작업을 해야 한다고 하자. 심볼을 이용해 user에 식별자 혹은 다른 어떤 특성을 추가적으로 붙여 줄 수 있다.

```js
let user1 = {
  name: "김성현",
};

let user2 = {
  name: "김기동",
};

let id1 = Symbol("id");
let id2 = Symbol("id");

user1[id1] = 1;
user2[id2] = 2;

console.log(user1[id1], user2[id2]);
```

이렇게 하면 user1, user2에 식별자가 추가되는데 이 프로퍼티의 키는 유일한 값인 심볼이므로 외부 코드에서 접근할 수 없다. 라이브러리 코드 모르게 프로퍼티를 추가한 것이다.

만약 문자열 "id"와 같은 것을 통해 식별자를 만들면 외부 코드에서 접근하여 덮어써질 가능성이 있다. 외부 라이브러리에서 `user.id`를 사용하고 있다면 이를 덮어쓰면서 문제가 발생할 수 있다. 

하지만 심볼을 이용하면 코드 전체에서 유일한 값이 키로 쓰이므로 이런 문제를 막을 수 있다.

다음과 같이 대괄호를 사용해서 객체 리터럴에 심볼 키를 쓸 수도 있다. `id1:1`로 쓰면 문자열 `"id1"`이 키가 됨에 주의한다.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

let user1 = {
  name: "김성현",
  [id1]: 1,
};

let user2 = {
  name: "김기동",
  [id2]: 2,
};
```

## 2.2. 숨김 프로퍼티 특성

심볼 키는 `for..in`반복문과 `Object.keys()`같은 메서드에서 제외된다. 이런 메서드는 심볼 키를 가진 프로퍼티를 무시한다. 이런 특성을 hiding symbol properties(심볼형 프로퍼티 숨기기)라고 한다.

이 특성 덕분에 외부 스크립트는 심볼 키를 가진 프로퍼티에 접근하지 못한다.

단 `Object.assign`은 심볼 키를 무시하지 않고 객체 내 모든 프로퍼티를 복사한다.

## 2.3. 다른 방법과의 비교

이런 숨김 프로퍼티는 다른 코드에서 관여할 수 없는 프로퍼티를 만들거나 마치 팝업창이나 알림창과 같이 각각을 식별할 수 있는 값을 만들어 줘야 할 때 사용할 수 있다. 다음처럼 user1, user2에 새로운 프로퍼티를 만들어 준 것과 같다.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

let user1 = {
  name: "김성현",
  [id1]: 1,
};

let user2 = {
  name: "김기동",
  [id2]: 2,
};
```

이를 좀더 발전시키면 어떤 객체에 특정 속성을 붙여 주는 코드를 짤 수도 있다. 다음 코드의 `addPropertyBySymbol`함수는 객체에 고유한 심볼 키를 가진 프로퍼티를 추가해 준다. id 심볼이 객체에 들어 있는지에 따라서 객체에 대한 어떤 판단을 할 수 있을 것이다.

```js
const id = Symbol("id");

function addPropertyBySymbol(obj) {
  obj[id] = 1;
}

let user = {
  name: "John",
};

addPropertyBySymbol(user);
// user 객체가 id 심볼을 가지고 있는지에 따라 판단
if (user[id]) {
  console.log("id exists");
}
```

물론 uuid와 같은 라이브러리들이 이미 잘 나와 있다. 따라서 이는 다음과 같이도 쓸 수 있을 것이다. 간단하게 uuid 라이브러리를 설치하고 node 환경에서 다음 코드를 실행하였다.

```js
const { v4: uuidv4 } = require("uuid");

const id = uuidv4();

function addPropertyBySymbol(obj) {
  obj[id] = 1;
}

let user = {
  name: "John",
};

addPropertyBySymbol(user);

if (user[id]) {
  console.log("id exists");
}
```

물론 이는 거의 똑같이 동작한다. uuid 라이브러리는 그렇게 무거운 라이브러리도 아니라서 큰 문제도 없을 것이다. 하지만 다른 차이가 있다. 


# 3. 전역 심볼

심볼은 이름이 같아도 모두 고유한 값으로 취급된다. 하지만 전역 심볼 레지스트리를 사용하면 이름이 같은 심볼이 같은 개체를 가리키도록 할 수 있다.

## 3.1 Symbol.for(key)

전역 심볼 레지스트리 안에 심볼을 만들고 해당 심볼에 접근하면 이름이 같은 경우 항상 같은 심볼을 반환해 준다. 이 레지스트리 안의 심볼을 읽거나 새 심볼을 생성하려면 `Symbol.for(key)`를 쓰면 된다.

```js
// 전역 심볼 레지스트리에 id 심볼 등록됨
let id = Symbol.for("id");
// 이미 등록된 심볼을 반환함
let id2 = Symbol.for("id");
// true
alert(id === id2);
```

## 3.2 Symbol.keyFor(sym)

`Symbol.for(key)`를 사용해 만든 심볼은 `Symbol.keyFor(sym)`를 사용해 이름을 얻을 수 있다.

```js
let id = Symbol.for("id");
let witch = Symbol.for("witch");
// id
console.log(Symbol.keyFor(id));
// witch
console.log(Symbol.keyFor(witch));
```

이 함수는 전역 심볼 레지스트리를 뒤져 심볼의 이름을 얻어낸다. 전역 심볼 레지스트리에 등록되지 않은 심볼은 `undefined`를 반환한다.

만약 전역 심볼이 아닌 심볼의 이름을 얻고 싶다면 `description` 프로퍼티를 사용하면 된다.



# 참고

모던 자바스크립트 튜토리얼의 심볼형 https://ko.javascript.info/symbol

nhn cloud의 심볼형 https://meetup.nhncloud.com/posts/312

symbol의 쓰임에 관한 글 https://medium.com/intrinsic-blog/javascript-symbols-but-why-6b02768f4a5c