---
title: JS array
date: "2022-12-08T00:00:00Z"
description: "js의 배열에 대하여.."
tags: ["javascript"]
---

# 1. 시작

threejs의 공부를 시작하고 공식 문서를 보고 있었다. 그런데 다음과 같은 코드를 발견하였다.

```js
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
```

뭔가 이상하다. const로 선언된 배열에 push를 하고 있다. C++같으면 당연히 에러가 나야 하는 일이다.

```cpp
#include <iostream>

int main(){
	const int arr[3]={1,2,3};
  // const 배열 조작은 당연히 에러
	arr[1]=10;
	return 0;
}
```

하지만 생각해 보니 배열에 push 메서드 같은 게 있는 것도 말이 안된다. 자료구조에서 배운 배열은 이런 게 아니었는데..JS 배열은 C++의 vector나 파이썬의 리스트에 더 가깝게 동작하는 것처럼 보인다.

# 2. JS 배열의 구조

참고 페이지에 써놓은 Poiemaweb에서는 JS배열의 구조를 다음과 같은 코드로 까본다.

```js
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
```

개발자 도구에서 위 코드를 실행시켜 보면 배열이 인덱스를 key로 가지고 length 프로퍼티를 가지고 있다는 것을 알 수 있다.

```js
{
  0: {value: 1, writable: true, enumerable: true, configurable: true},
  1: {value: 2, writable: true, enumerable: true, configurable: true},
  2: {value: 3, writable: true, enumerable: true, configurable: true},
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
```

그 외에도 잡다한 속성들이 붙어 있는 것도 볼 수 있다. 하지만 기본적으로 JS배열은 인덱스 프로퍼티에 대하여 프로퍼티 값 객체 중 value를 대응시켜 주는 식으로 동작한다고 추측할 수 있다.

이런 식으로 정의되기 때문에 JS배열은 C같은 언어에선 상상도 할 수 없는, 서로 다른 타입으로 구성된 배열도 만들 수 있는 것이다. 그냥 value에 다른 값을 대응시켜 주면 되기 때문이다.

```js
b = [1, "me", 3, null];
```

그러나 만약 JS의 배열이 해시 테이블로 관리되는 객체와 같다면 C 등에서 사용하는 배열보다 느릴 수밖에 없다. 따라서 현대적인 자바스크립트 엔진들은 배열을 일반 객체와 구별하여 보다 배열처럼 동작하도록 최적화하여 구현한다고 한다.([출처](https://poiemaweb.com/js-array-is-not-arrray))실제 테스트를 해보면 배열이 일반 객체보다 약 2배 정도 빠르다고 한다.

# 3. JS 배열, 더 깊이

JS의 배열에는 push, pop, shift, unshift와 같은 메서드들이 있다. 이 메서드들은 어떻게 동작할까? 앞서 보았던 배열의 구조를 볼 때 push, pop은 아마 `array[length-1]`에 대한 편집을 하지 않을까 싶다. O(1)에 가능할 것이다. 그러면 shift, unshift는? 맨 앞의 원소(JS배열이 객체라는 걸 생각해 볼 때 이 단어가 적절한지는 모르겠지만 아무튼 맨 첫 인덱스의 원소)를 삽입하거나 삭제하므로 기존 원소들의 인덱스를 바꿔 줘야 할 것으로 보인다. O(n)이 될 것이다.

하지만 [나와 같이 배열 메서드의 시간복잡도를 질문한 글](https://stackoverflow.com/questions/11514308/big-o-of-javascript-arrays)에서, 현대 JS엔진들은 배열이 sparse하지 않은 한 배열을 해시테이블로 관리하지 않는다고 한다.

```
댓글 전문
Worth mentioning this answer is no longer correct. Modern engines do not store Arrays (or objects with indexed integer keys) as hashtables (but like well... arrays like in C) unless they're sparse. To get you started here is a 'classical' benchmark illustrating this –
Benjamin Gruenbaum
```

그럼 대체 어떻게 한다는 것인가! 열심히 검색해 보니 [Understanding Array Internals](https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc)라는 보석같은 글이 있었다. V8에서 배열을 어떻게 구현한지를 다룬 글이었다.

정리는 내일..

# 4. JS 상수 배열

다시 원래 이야기로 돌아와서 그러면 어떻게 배열의 각 원소를 변경 불가능하게, 즉 immutable로 만들까? 길게 돌아왔지만, 그냥 `Object.freeze()`라는 함수를 사용하면 된다..

```js
Object.freeze(arr);
```

# 참고

[JS배열은 배열이 아니다](https://poiemaweb.com/js-array-is-not-arrray)

[상수 배열 선언 실패](https://morohaji.tistory.com/55)

[상수 배열 선언하기](https://stackoverflow.com/questions/62771790/how-to-create-a-constant-array-that-is-not-modified-by-its-reference-in-javascri)

[V8의 배열 내부 구현](https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc)
