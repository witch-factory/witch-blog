---
title: 모던 자바스크립트 튜토리얼 part 1.2 자바스크립트 기본 - 2
date: "2022-12-17T00:00:00Z"
description: "ko.javascript.info part 1-2 두번째"
tags: ["javascript"]
---

[모던 자바스크립트 튜토리얼](https://ko.javascript.info/)을 정리한다.

# 1. 변수와 상수

변수는 데이터를 저장하는 공간이다. `let`키워드를 이용하여 생성한다.

```js
let a;
```

`=`로 할당할 수 있고 이렇게 할당한 데이터에는 변수명을 통해 접근 가능하다.

이전에는 `var`키워드를 사용해서 변수를 선언했지만 `let`키워드를 사용하는 것이 좋다. `var`의 차이는 나중에 따로 설명한다.

단 엄격 모드가 적용중이지 않다면 `let`없이도 값 할당을 통해 변수를 생성할 수 있다.

```js
a = 5;
```
단 위 코드는 엄격 모드에선 에러를 발생시키므로 주의한다.

## 1.1 변수명

변수명은 문자, 숫자, `$`, `_`로 구성할 수 있다. 그리고 숫자로 시작할 수 없다. 특이한 점으로 `$` 기호를 쓸 수 있다는 것을 기억해 두자. 이 `$`기호는 인터프리터에게 어떤 의미를 갖는 것은 아니지만 흔히 제이쿼리 객체나 앵귤러 프레임워크 변수 등 특별한 의미를 갖는 변수명에 사용될 때가 있다.

## 1.2 상수

상수는 한번 할당하면 값을 변경할 수 없는 변수이다. `const`키워드를 사용하여 생성한다.

단 이는 절대로 거기 담긴 값을 변경할 수 없다는 게 아니라 변수가 가리키고 있는 참조를 변경할 수 없다는 의미임에 주의한다.

이때 매직 넘버를 지정해 주는 상수 변수의 경우 대문자로 변수명을 쓰는 컨벤션이 있다. 다음과 같이.

```js
const MAX_COUNT = 5;
```

# 2. 자료형

JS는 동적 타이핑 언어이다. 즉 변수에 할당된 값에 따라 변수의 자료형이 결정된다. 하지만 그렇다고 자료형이 존재하지 않는 건 아니다. JS는 총 8가지의 기본 자료형이 있다.

## 2.1. 숫자형

정수 및 부동소수점을 나타낸다. 또한 `Infinity`, `-Infinity`, `NaN`과 같은 특수 숫자값도 존재한다.

이 숫자형은 $2^53 -1$ 범위를 가진 정수까지 나타낼 수 있다. 그리고 그 이상의 큰 숫자를 표현하기 위한 BigInt형이 있는데 이건 정수 리터럴 끝에 `n`을 붙여 표현한다.

```js
const bigInt = 1234567890123456789012345678901234567890n;
```

## 2.2. 문자형

문자열을 나타낸다. 큰따옴표나 작은따옴표로 감싸서 표현한다.

또 다른 방식으로는 백틱을 쓰는 것이 있다. 이 백틱으로 싸인 문자열은 템플릿 리터럴이라고 하며 여러 줄 문자열과 문자 보간을 사용할 수 있다.

변수나 표현식을 `${}`로 감싸서 문자열 안에 넣으면 된다.

```js
alert(`my number is ${5 + 10}`);
```

이 템플릿 리터럴에 관한 더 많은 내용은 [여기](https://www.witch.work/javascript-template-literal/)에 정리하였다.

char타입은 js에 없다. 문자열 뿐이다.

## 2.3. 부울형

boolean 타입은 true, false 두 가지 값만을 가진다.

## 2.4. null

null 타입은 값이 없음을 나타내며 앞의 어떤 자료형에도 속하지 않는다. null 타입의 변수는 null 값만을 가질 수 있다.

또한 다른 언어에서는 null을 0이나 빈 문자열로 취급하지만 js에서의 null은 존재하지 않거나 비어 있는 값, 알 수 없는(unknown) 값을 나타낸다.

## 2.5. undefined

undefined 타입의 변수는 undefined 값만을 가질 수 있다. 이는 값이 아직 할당되지 않은 상태를 나타낸다. 예를 들어 변수를 선언하고 할당하지 않으면 undefined가 할당된다.

```js
let a;
console.log(a); // undefined 출력
```

## 2.6 객체, 심볼

객체는 여러 값을 하나의 단위로 구성한 복합적인 자료구조이다. 객체를 사용하여 좀더 복잡한 데이터 구조를 표현할 수 있다. 

심볼은 객체의 고유한 식별자를 만들 때 사용한다. 이 둘은 이후에 자세히 다룰 것이다.

## 2.7 typeof

typeof 연산자는 피연산자의 자료형을 반환한다. `typeof x`와 같이 연산자 형태로 쓰거나 `typeof(x)`와 같이 함수 형태로 쓸 수 있다. 여기서는 기억해 두어야 할 부분만 알아보겠다.

```js
typeof(null); // object

function add(a, b) {
  return a + b;
}
console.log(typeof add); // function
```

먼저 null은 object 형으로 출력된다. 이는 ECMA 문서에도 그렇게 하라고 나와 있다. 이는 JS의 버그로 여겨지고 있지만 이를 고치는 것은 호환성을 해칠 수 있기 때문에 고치지 않는다. 그 이유에 대해서는 다음 문단에서 간단히 설명하겠다.

그리고 js에서 함수는 일급 객체이지만 typeof를 함수에 적용하면 function이라는 문자열을 반환한다. 함수 타입이라는 건 js에 존재하지 않으므로 이상한 방식이지만 오래전의 규칙이기 때문에 이렇게 동작한다. 이때 함수도 객체인데 어떻게 구분해서 function 타입으로 알려주는지에 대해서는 [여기](https://www.howdy-mj.me/javascript/why-does-typeof-function-return-function)에 잘 정리되어 있었다.

## 2.8. typeof(null)의 이유

아주 오래 전 js의 첫 버전이 나올 때, 값은 32비트 워드에 저장되었다. 그런데 이 32비트를 온전히 값 저장에만 쓰지 않았다. 하위의 몇 비트를 타입을 나타내는 type tag에 할애하였고 나머지를 진짜 값을 저장하는 데에 사용했다. 다음과 같은 타입 태그가 있었다.

| 타입 | 태그 |
| --- | --- |
| object | 000 |
| integer | 1 |
| double | 010 |
| string | 100 |
| boolean | 110 |

typeof 연산자는 위와 같이 하위 태그를 통해 각 값의 타입을 구분하였다.

그런데 특별한 2가지 값이 있었다. 그게 바로 null과 undefined였다. 이때 undefined는 $-2^30$ 값을 갖는 `JSVAL_VOID`로 정의하였고 null은 널 포인터를 나타내는 값 `JSVAL_NULL`로 정의하였다.

그런데 널 포인터 값은 0이므로 당연히 하위 비트가 000이 되었고 따라서 typeof연산자는 null을 object로 판단하게 되었다.

# 참고

[js에서 변수명에 쓰이는 달러 표시의 의미](https://stackoverflow.com/questions/846585/what-is-the-purpose-of-the-dollar-sign-in-javascript)

[MDN 템플릿 리터럴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

[왜 js에서 null은 object인가?](https://stackoverflow.com/questions/18808226/why-is-typeof-null-object)와 [그 원본 글](https://2ality.com/2013/10/typeof-null.html)