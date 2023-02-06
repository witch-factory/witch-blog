---
title: 모던 자바스크립트 튜토리얼 part 1.7 객체 프로퍼티 설정
date: "2023-02-06T00:00:00Z"
description: "ko.javascript.info part 1-7"
tags: ["javascript"]
---

# 1. 프로퍼티 플래그와 설명자

프로퍼티는 값과 함께 속성 플래그 3가지를 가진다. writable, enumerable, configurable이다. 기본적으로 셋 모두 true로 설정되어 있다. 각 속성에 대한 설명은 아래와 같다.

writable : 값을 수정할 수 있는지
enumerable : for..in 루프나 Object.keys와 같은 메서드로 프로퍼티를 나열할 수 있는지
configurable : 프로퍼티를 삭제하거나 플래그 수정할 수 있는지

프로퍼티에 대한 정보는 다음 메서드로 확인할 수 있다. 이 메서드는 프로퍼티 값과 플래그 정보가 담긴 프로퍼티 설명자 객체를 반환한다.

```
Object.getOwnPropertyDescriptor(obj, property) 
```

다음과 같이 쓸 수 있는 것이다.

```js
let me = {
  firstName: "김성현",
};
console.log(Object.getOwnPropertyDescriptor(me, "firstName"));
/*
{
  value: '김성현',
  writable: true,
  enumerable: true,
  configurable: true
}
*/
```

`Object.defindProperty` 메서드를 사용하면 프로퍼티 플래그를 수정할 수 있다.

```js
Object.defineProperty(obj, propertyName, descriptor)
```

이때 descriptor는 프로퍼티 설명자 객체인데, 플래그 정보를 전달하지 않으면 자동으로 false로 설정된다.

각 프로퍼티 플래그 설정에 따라 프로퍼티에 특성이 생긴다. writable이 false면 값을 쓸 수 없게 되고, enumerable이 false면 for..in 루프나 Object.keys와 같은 메서드로 프로퍼티를 나열할 수 없게 된다. 

configurable이 false면 프로퍼티를 삭제하거나 플래그를 수정할 수 없게 된다. 예를 들어 Math.PI는 변경할 수 없는 상수이므로 configurable이 false이다.

이렇게 configurable을 false로 설정하면 돌이킬 수 없다. defineProperty를 써도 이 플래그 수정은 불가능하다.

`Object.defineProperties`를 쓰면 프로퍼티 여러 개 설정 가능하다.

`Object.getOwnPropertyDescriptors(obj)`를 쓰면 프로퍼티 설명자를 전부 가져올 수 있다. defineProperties를 쓰면 객체 복사 시 플래그까지 복사하는 것도 가능하다.

그리고 for..in을 통한 복사는 객체의 심볼형 프로퍼티는 복사하지 않는 데에 반해 아래 방법은 심볼형 프로퍼티까지 잘 복사한다.

```js
// 설명자까지 복사한 객체 리턴
Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```