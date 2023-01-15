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

