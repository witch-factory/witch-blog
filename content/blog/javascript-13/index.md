---
title: 모던 자바스크립트 튜토리얼 part 1.6 함수 심화학습 세번째
date: "2023-01-30T00:00:00Z"
description: "ko.javascript.info part 1-6 3번째"
tags: ["javascript"]
---

# 1. new Function

앞에서 다룬 방법 외에도 new Function으로 함수를 만들 수 있다.

```js
let 함수명= new Function(인자1, 인자2, ... , 함수의 본문);
let sum = new Function('a', 'b', 'return a + b');
```

이 방식을 사용하면 런타임에 받은 문자열을 사용해서 함수를 만들 수 있다. 서버에서 받은 문자열로 함수 만들기도 가능하다.

또한 이 방식으로 만든 함수에는 차이가 있는데 바로 함수 내부에서 자신이 생성된 렉시컬 환경을 기억하는 `[[Environment]]`가 무조건 전역 렉시컬 환경을 참조한다는 것이다. 따라서 new Function으로 생성된 함수는 전역 변수가 아닌 외부 변수에 접근할 수 없다. 이 함수에 무언가 넘겨주고 싶다면 매개 변수를 사용하자.

# 2. setTimeout과 setInterval

일정 시간이 지난 후에 원하는 함수를 호출하는, 호출 스케줄링을 하는 함수들이다.

## 2.1. setTimeout

```js
let timerId = setTimeout(함수 혹은 문자열, [시간], [인자1], [인자2], ...);
setTimeout(func, time, arg1, arg2, ...);
```

time이 지난 후 arg1, arg2...를 매개변수로 하여 func을 호출한다. 이때 time은 밀리세컨드 단위이며 기본값은 0이다.

다음과 같이 하면 func을 1초 이후에 호출하게 된다.

```js
setTimeout(func, 1000);
```

그리고 만약 setTimeout에 첫 번째 인수가 문자열이라면 js에선 이 문자열을 함수로 만들어 실행한다.

### 2.1.2. 리턴값

setTimeout은 타이머 식별자를 반환한다.

```js
function foo() {
  console.log("foo");
}

let tid = setTimeout(foo, 1000);
let tid2= setTimeout(foo, 2000);
console.log(tid); // 1
console.log(tid2); // 2
```

이 타이머 식별자를 이용하면 clearTimeout을 사용하여 타이머를 취소할 수 있다.

```js
function foo() {
  console.log("foo");
}

let tid = setTimeout(foo, 1000);
clearTimeout(tid); // tid에 해당하는 스케줄링을 취소
console.log("done");
```

단 NodeJS에서 setTimeout을 사용할 때는 타이머 식별자가 타이머 객체가 되는 등, 타이머 식별자는 꼭 숫자는 아닐 수도 있다.

## 2.2. setInterval

setInterval의 형식은 setTimeout과 거의 같다.

```js
let timerId = setInterval(함수 혹은 문자열, [시간], [인자1], [인자2], ...);
```

그러면 지정한 시간마다 함수를 호출하게 된다. 이때 인자는 setInterval에 넘겨준 인자들이 그대로 함수에 전달된다.

그리고 setInterval도 타이머 식별자를 반환하는데 이를 이용하여 clearInterval로 타이머를 취소할 수 있다.

```js
// 1초 간격으로 메시지를 보여줌
let timerId = setInterval(() => console.log("째깍"), 1000);

// 4초 후에 정지
setTimeout(() => {
  clearInterval(timerId);
  alert("정지");
}, 4000);
// 째깍 이 4번 출력되고 정지 창이 뜬다.
```

## 2.3. 중첩 setTimeout으로 주기적 실행

setInterval을 쓰지 않더라도 setTimeout을 재귀적으로 사용하면 주기적으로 실행할 수 있다.

```js
let tid = setTimeout(function tick() {
  console.log("2초 지났다");
  tid = setTimeout(tick, 2000);
}, 2000);
```

이렇게 하면 2초마다 tick이 호출되는데, tick 안에서 다시 setTimeout으로 tick을 호출하여 2초 뒤에 다시 tick을 호출하게 된다.

그리고 이런 식으로 하면 호출 결과에 따라 다음 호출의 딜레이를 조정하거나 다른 함수를 호출하는 등 더 유연한 작업을 할 수 있다.

### 2.3.1. setInterval과의 차이

setTimeout은 지연 간격을 보장하지만, setInterval은 그렇지 않다.

```js
let i = 1;
setInterval(() => {
  for (let i = 0; i < 1000000000; i++);
  console.log(i++);
}, 1000);
```

위 코드는 1초마다 한번씩 i를 로그에 찍을 것이다. 그런데 10억번의 반복이 함수 호출마다 있다. 실제로 호출해 보면 함수 호출마다 약 0.3~0.5초가 소모된다. 

그런데 setInterval은 이렇게 함수 호출에 소모되는 시간도 지연 간격에 포함한다. setInterval이 지정한 함수 호출이 끝나고 나면 엔진은 함수 첫 호출 이후에 지연된 시간을 확인하고 지연 시간이 지났으면 다음 호출을 시작한다.

즉 만약 함수 호출에 걸린 시간이 0.5초라면 스케줄러는 0.5초가 지난 것을 확인하고 delay초가 아니라 delay-0.5초가 지난 후 바로 다음 함수를 호출한다. 만약 함수가 소모한 시간이 delay보다 길면 즉시 다음 함수를 호출한다.

반면 중첩 setTimeout은 함수 실행이 종료된 후 delay가 지난 후 다음 함수를 호출한다. 따라서 함수가 소모한 시간이 delay보다 긴지 어떤지에 상관없이 다음 함수 호출까지 delay가 지연된다.

```js
let i = 1;
setTimeout(function run() {
  for (let j = 0; j < 1000000000; j++);
  console.log(i++);
  setTimeout(run, 1000);
});
```

위 코드를 실행해 보면 1초가 약간 넘는 시간마다 run 함수가 호출되는 것을 확인할 수 있다. 이는 run 함수 실행에도 약 0.4초가 걸리고 그 시간이 지난 후 또 1초가 지나서 run이 다시 호출되기 때문이다.

setTimeout은 이전 함수의 실행이 종료된 후 다음 함수 호출을 스케줄링하기 때문이다.

## 2.4. gc와 setTimeout

setTimeout, setInterval에 함수를 넘기면 함수에 대한 내부 참조가 만들어진다. 따라서 여기 넘긴 함수는 clearTimeout, clearInterval을 호출하기 전까지 가비지 컬렉션 대상이 되지 않는다.

이런 방식은 메모리 누수를 일으킨다. 다음 코드 같은 경우 setInterval에 넘긴 함수는 외부 렉시컬 환경의 a를 참조한다. 따라서 함수가 끝나도 a는 setInterval에서 참조하고 있으므로 가비지 컬렉션 대상이 되지 않는다. 이런 메모리 누수를 일으키고 싶지 않다면 스케줄링이 필요없어지면 clearTimeout, clearInterval을 호출해야 한다.

```js
let a = 1;

setInterval(() => {
  console.log(a++);
}, 1000);
```

## 2.5. setTimeout(func,0)

`setTimeout(func,0)`은 함수 실행까지의 대기 시간을 0으로 설정한다. 그러나 이는 함수를 즉시 실행하는 것이 아니라 함수를 즉시 실행할 수 있을 때 실행하라는 의미이다. 현재 처리중인 스크립트의 처리가 종료된 직후 스케줄링한 함수를 실행하는 것이다.

```js
setTimeout(() => {
  console.log("a");
});
console.log("b");
// b a
```

위 코드에서 b가 먼저 출력된다. 현재 스크립트인 b 출력을 먼저 처리한 직후 setTimeout에 넘긴 함수가 실행되는 것이다.

