---
title: 모던 자바스크립트 튜토리얼 part 1.5 자료구조와 자료형 - 2
date: "2023-01-15T00:00:00Z"
description: "ko.javascript.info part 1-5 두번째"
tags: ["javascript"]
---

# 1. 맵과 셋

## 1.1. 맵

Map은 데이터를 키-값 형식으로 저장한다. 객체와 다른 점은 키에 다양한 자료형이 허용된다는 것이다. 객체도 키로 쓸 수 있다. 다음과 같은 메서드들이 있다.

- new Map()
- map.set(key, value) : 맵 스스로가 반환된다. 따라서 chaining도 가능
- map.get(key) : 키가 존재하지 않으면 undefined 반환
- map.has(key)
- map.delete(key)
- map.clear()
- map.keys()
- map.values()
- map.entries()

그리고 size 프로퍼티가 있어 맵의 크기를 알 수 있다.

이때 `map[key]`를 이용해서 값을 가져오거나 설정하는 것도 가능하다. 하지만 그렇게 하면 맵이 일반 객체처럼 취급되게 되므로 get, set을 쓰자.

그리고 맵은 삽입한 순서대로 순회를 실시한다. forEach도 지원한다.

### 1.1.1. 객체와 맵

`Object.entries(obj)`를 이용하면 객체를 맵으로 바꿀 수 있다. 이 메서드는 객체의 키-값 쌍을 배열로 반환하는데 이 배열을 맵의 생성자에 넣으면 맵이 만들어진다.

그리고 `Object.fromEntries(map)`를 이용하면 맵을 객체로 바꿀 수 있다. 이 메서드는 각 요소가 [키, 값]인 배열을 받아 객체를 만든다. 따라서 map.entries()를 Object.fromEntries에 넣으면 맵을 객체로 바꿀 수 있다.

## 1.2. 셋

셋은 중복을 허용하지 않는 값의 집합이다. 셋은 중복을 허용하지 않는다는 점에서 맵과 비슷하지만 키-값 쌍이 아니라 단순히 값만 저장한다는 점에서 다르다. 셋은 다음과 같은 메서드들을 지원한다.

이때 셋은 중복을 허용하지 않으므로 같은 값을 여러 번 삽입해도 한 개만 저장된다.

- new Set(iterable)
- set.add(value) : 셋 스스로가 반환된다. 따라서 chaining도 가능
- set.delete(value)
- set.has(value)
- set.clear()
- set.keys()
- set.values() : set.keys()와 같다. 맵과의 호환성을 위해 존재한다.
- set.entries() : 맵과의 호환성을 위해 존재한다. [value,value] 형태로 반환한다.

for..of, forEach도 지원한다.

또한 Array.from을 이용해 셋을 배열로 바꿀 수 있다.

* 이때 맵과 셋의 keys, values 메서드는 배열이 아니라 iterable 객체를 반환한다. 즉 배열 메서드를 사용할 수 없다. 따라서 배열로 바꾸려면 Array.from을 이용해야 한다.

## 1.3. 위크맵과 위크셋

위크맵과 위크셋은 맵과 셋과 비슷하지만 차이점이 있다. 위크맵과 위크셋은 객체만 저장할 수 있고, 객체가 아닌 원시값은 저장할 수 없다. 

또한 위크맵과 위크셋을 쓰면 키로 쓰인 객체가 가비지 컬렉션의 대상이 된다. 즉 위크맵, 위크셋의 키로 사용된 객체를 참조하는 것이 아무것도 없다면 해당 키 객체가 삭제된다.

위크맵과 위크셋은 다음과 같은 메서드를 지원한다. keys와 같은 메서드, size와 같은 프로퍼티를 지원하지 않는 것은 가비지 컬렉션 때문이다. 

가비지 컬렉션이 언제 수행될지 알 수 없기 때문에 현재 위크맵/위크셋이 어떤 키를 가지고 있는지 그리고 그 개수가 몇 개인지 등을 알 수 없는 것이다.

- new WeakMap()
- weakMap.set(key, value)
- weakMap.get(key)
- weakMap.delete(key)
- weakMap.has(key)

- new WeakSet()
- weakSet.add(value)
- weakSet.delete(value)
- weakSet.has(value)

이런 위크맵, 위크셋은 외부 코드에 속한 객체에 대해 어떤 속성을 부여해 줘야 할 때 쓰일 수 있다. 외부 객체가 사라질 때 자동으로 거기 연관된 속성도 사라지는 것이다.

# 2. keys, values, entries

keys(), values(), entries() 메서드는 맵, 셋, 배열 객체에 사용될 수 있다. 일반 객체를 위한 비슷한 기능은 다음과 같다.

- Object.keys(obj) : 객체의 키를 배열로 반환한다.
- Object.values(obj) : 객체의 값들을 배열로 반환한다.
- Object.entries(obj) : 객체의 [키, 값] 쌍을 배열로 반환한다.

이때 맵, 셋, 배열 객체의 keys와 같은 메서드는 배열과는 다른 이터러블 객체를 반환하지만 일반 객체의 Object.keys는 진짜 배열을 반환한다. 따라서 Object.xxx 메서드의 반환값에는 for..of를 쓸 수 있다. 여기서 위 메서드들은 객체의 프로퍼티 중 심볼형 키를 무시한다는 점에 주의하자.

js에선 복잡한 구조들이 모두 객체에 기반하다 보니 객체에 따로 keys, values, entries 메서드들이 만들어질 수 있다. 따라서 일반 객체를 위한 방법으로 Object.keys, Object.values, Object.entries를 만든 것이다.

## 2.1. 객체에 배열 메서드 쓰기

배열 전용인 map, filter와 같은 메서드는 객체에 사용할 수 없다. 사용하기 위해서는 다음과 같이 한다.

```js
let prices = {
  apple: 0.67,
  orange: 1.49,
  banana: 0.39,
  grape: 2.79,
  pear: 1.29,
};

// Object.entries를 써서 키-값을 요소로 갖는 배열을 만들고 filter 적용
let overOneBill = Object.entries(prices).filter(
  ([key, value]) => value > 1.0
);
// Object.fromEntries를 써서 키-값을 요소로 갖는 배열을 다시 객체로 만듦
overOneBill = Object.fromEntries(overOneBill);
console.log(overOneBill);
```

# 3. 구조 분해 할당

## 3.1. 배열 구조 분해 할당

구조 분해 할당은 객체 혹은 배열을 변수로 분해해서 할당하거나 함수에 전달하게 해 준다. `[]`를 쓰면 된다.

```js
let blog = ["witch", "work"];
let [first, second] = blog;
console.log(first, second); //witch work
```

이때 필요 없는 요소를 버리기 위해서 쉼표를 사용해 요소를 무시할 수 있다.

```js
let myName = ["김", "성", "현"];
let [first, , third] = myName; //2번째 원소는 생략되었다
console.log(first, third);
```

또한 할당 연산자 우측에는 for..of로 반복 가능한 모든 객체가 올 수 있다. 그리고 좌측에는 할당할 수 있는 거라면 뭐든지 올 수 있다. 객체 프로퍼티도 가능하다.

예를 들어서 문자열도 반복 가능한 객체이므로 구조 분해 할당 가능하다.

```js
let [first, second] = "hi";
console.log(first, second); //h i
```

구조 분해 할당은 반복에서도 사용할 수 있다.

```js
let me = {
  name: "김성현",
  age: 26,
  hobby: "코딩",
};

// me의 프로퍼티들이 [키, 값] 형태로 담긴 배열이 반환됨
console.log(Object.entries(me));
// Object.entries(me)의 결과를 순회하며 각각의 키와 값을 출력함
for (let [k, v] of Object.entries(me)) {
  console.log(k, v);
}
```

이때 만약 할당하려는 변수 개수가 배열의 길이보다 크더라도 에러는 발생하지 않는다. 단 넘치는 변수에는 undefined가 할당된다. 다만 이를 방지하기 위해 `=`를 이용해 기본값을 설정해 줄 수 있다. 

구조 분해 할당에서 변수에 할당해줄 값이 없는 경우 기본값이 할당된다. 할당해줄 값이 있으면 기본값은 할당되지 않는다.

```js
let arr = ["김성현"];

let [first = "1", second = "2"] = arr;
// 김성현 2
console.log(first, second);
```

## 3.2. 객체 구조 분해 할당

객체를 구조 분해 할당할 땐 `{}`를 쓴다. 우측엔 분해하려는 객체를, 좌측엔 해당하는 객체 프로퍼티의 패턴을 넣는다. 다음과 같이 쓰는 것이다.

```js
let me = {
  name: "김성현",
  age: 26,
  hobby: "코딩",
};
/* 해당하는 이름의 키를 갖는 프로퍼티가 할당되므로 순서는 상관없다.
let {age, name, hobby} 로 써도 결과는 같음 */
let { name, age, hobby } = me;
// 김성현 26 코딩
console.log(name, age, hobby);
```

그런데 객체의 프로퍼티 값을 저장하고자 하는 변수 이름이 프로퍼티 키와 다를 수도 있다. 그럴 경우 `:`를 쓰면 된다. `프로퍼티 키: 변수 이름` 형태로 쓰면 된다.

```js
let me = {
  name: "김성현",
  age: 26,
  hobby: "코딩",
};

let { age: myAge, name: myName, hobby: myHobby } = me;
// 김성현 26 코딩
console.log(myName, myAge, myHobby);
```

`=`를 쓰면 기본값을 설정할 수 있는 것은 배열 구조 분해 할당과 같다. 그리고 rest 연산자도 마찬가지로 사용할 수 있다.

```js
let me = {
  name: "김성현",
  age: 26,
  hobby: "코딩",
};

let { age: myAge, ...rest } = me;
// 26, {name: "김성현", hobby: "코딩"}
console.log(myAge, rest);
```

구조 분해 할당은 기존 변수에도 할 수 있다. 그러나 `{}`를 표현식 안에서 쓰지 않고 주요 코드 흐름상에 배치하면 코드 블록으로 인식된다. 따라서 기존 변수에 구조 분해 할당을 하려면 할당문을 괄호로 감싸 주어야 한다.

```js
let me = {
  name: "김성현",
  age: 26,
  hobby: "코딩",
};

let age, name, hobby;
// 괄호로 할당문을 감싸서 코드블록이 아닌 것을 표현
({ age: myAge, ...rest } = me);
// 26, {name: "김성현", hobby: "코딩"}
console.log(myAge, rest);
```

좀 더 복잡한 객체도 구조만 맞춰 준다면 구조 분해 할당을 할 수 있다.

# 4. Date 객체