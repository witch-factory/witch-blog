---
title: JS const array
date: "2022-12-08T00:00:00Z"
description: "js의 const 배열에 대하여.."
tags: ["javascript"]
---

JS에 대한 지식이 짧아서 처음 알게 된 문제, const array

# 1. 시작

threejs의 공부를 시작하고 공식 문서를 보고 있었다. 그런데 다음과 같은 코드를 발견하였다.

```js
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
```

뭔가 이상하다. const로 선언된 배열에 push를 하고 있다.

# 참고

[같은 주제를 다룬 글](https://morohaji.tistory.com/55)
[상수 배열 선언하기](https://stackoverflow.com/questions/15292572/how-to-initialize-a-javascript-array-with-constant-values)
