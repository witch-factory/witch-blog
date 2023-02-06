---
title: 모던 자바스크립트 튜토리얼 part 1.8 프로토타입
date: "2023-02-06T05:00:00Z"
description: "ko.javascript.info part 1-8 첫번째"
tags: ["javascript"]
---

# 1. 프로토타입 상속

다른 언어에서는 클래스로 상속을 구현하지만, JS에선 원래 프로토타입으로 상속을 구현한다. 요즘은 클래스 문법이 생겼지만 프로토타입을 알아보고 넘어가자.

## 1.1. 프로토타입 숨김 프로퍼티

JS 객체는 `[[Prototype]]`이라는 숨김 프로퍼티를 가지고 있다. 이는 null 혹은 다른 객체에 대한 참조인데, 만약 이게 다른 객체를 참조하는 경우 프로토타입이라 한다.

예를 들어 A의 `[[Prototype]]`이 B를 가리키고 있다고 하면 B가 A의 프로토타입이 된다. 이때 A에서 프로퍼티를 읽으려고 할 때 그 프로퍼티가 없다면 `[[Prototype]]`을 따라가서 찾는다. 이런 방식을 프로토타입 상속이라 한다.

이는 `__proto__`라는 프로퍼티를 통해 설정할 수 있다.

```js
let animal = {
  eats: true,
};

let dog = {
  barks: true,
};

dog.__proto__ = animal;
console.log(dog.eats); // animals의 eats를 읽어서 true
```

객체 선언시에 설정하는 것도 가능하다.

```js
let dog = {
  __proto__: animal,
  barks: true,
};
```

`Object.getPrototypeOf()`와 `Object.setPrototypeOf()`를 통해서도 프로토타입을 읽고 설정할 수 있다. 또한 하위 호환성 때문에 `__proto__`를 사용할 수는 있지만 앞의 두 메서드를 사용하는 것이 좋다.

그리고 이렇게 프로토타입을 추가할 때 제한 사항이 있다. 순환 참조가 안 되고, `__proto__`는 객체나 null만 가능하다는 것이다. 다른 자료형 설정시 무시된다.

그리고 this는 언제나 자신을 호출한 객체를 가리키도록 런타임에 결정되므로 프로토타입에 영향을 받지 않는다는 점에 주의한다.

```js
let animal = {
  walk() {
    if (this.sleeping) {
      console.log("동물이 자고 있습니다.");
    } else {
      console.log("동물이 걸어갑니다.");
    }
  },
  sleep() {
    this.sleeping = true;
  },
};

let dog = {
  name: "강아지",
  __proto__: animal,
};

dog.sleep(); //dog을 this로 하므로 dog.sleeping = true이다
animal.walk(); //animal을 this로 한다. 따라서 "동물이 걸어갑니다." 출력
```

## 1.2. 반복문

for..in 반복문은 상속받은 프로퍼티도 순회한다. 단 obj.hasOwnProperty(key)를 통해 상속받은 프로퍼티인지 확인할 수 있고 이걸 이용하면 상속 프로퍼티를 순회에서 제외할 수 있다.

obj.hasOwnProperty(key)는 key가 obj가 상속받은 게 아니라 obj에 직접 구현된 프로퍼티일 때 true를 반환한다. 그리고 Object.keys나 Object.values 또한 상속 프로퍼티를 제외하고 동작한다.

그리고 JS의 객체는 모두 Object.prototype을 상속받는데 이는 