---
title: 모던 자바스크립트 튜토리얼 part 1.2 자바스크립트 기본 - 3
date: "2022-12-26T00:00:00Z"
description: "ko.javascript.info part 1-2 세번째"
tags: ["javascript"]
---

# 1. 반복문

while과 for문이 있다. 

## 1.1. while

다른 언어에서와 똑같다. 다음과 같은 형식을 하고 condition이 참일 동안 본문을 실행한다.

```js
while(condition){
    // 본문
}
```

condition의 평가값은 불린으로 변경되고 그 값이 true일 시 while 본문을 실행한다.

## 1.2. do~while

do~while문도 다른 언어에서 있는 것과 똑같이 존재한다. 

```js
do{
    // 본문
} while(condition);
```

역시 condition이 참일 동안 본문이 실행된다. 단 while과의 차이점은 본문이 먼저 실행된 후 condition이 평가된다는 것이다. 따라서 본문이 최소한 한 번은 실행된다.

## 1.3. for

for문도 다음과 같다.

```js
for(begin; condition; step){
    // 본문
}
```

반복문을 진입할 때 begin이 실행되고, 반복마다 condition이 확인되며 본문이 한번 실행될 때마다 step이 실행된다. 

begin -> (condition이 참이면 본문 실행 후 step 실행)을 반복하는 것이다. 만약 condition이 처음부터 false라면 본문은 한 번도 실행되지 않는다.

또한 for문의 구성 요소 중 필요없는 게 있다면 생략도 가능하다. 미리 초기화된 변수를 사용하여 begin을 쓸 필요 없는 등의 경우이다.

## 1.4. break/continue with label

JS에서의 break, continue도 다른 언어에서와 같다. 다른 점은 라벨과 함께 쓰일 수 있다는 점이다. 여러 개의 중첩 반복문을 빠져나올 때 사용 가능하다. 예를 들어서 다음과 같은 이중 반복문이 있다.

```js
for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    console.log(i,j);
  }
}
```

만약 이를 i,j가 각각 1,1일 때 끝내고 싶다면 다음과 같이 flag를 쓰고 2번 break를 써야 한다.

```js
let flag=0;
for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    console.log(i,j);
    if(i===1 && j===1){flag=1;break;}
  }
  if(flag){break;}
}
```

하지만 빠져나오고 싶은 반복문에 라벨을 쓰고 break 뒤에 그 라벨을 붙이면 해당 라벨의 반복문을 한번에 빠져나올 수 있다.

```js
outer:for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    console.log(i,j);
    if(i===1 && j===1){break outer;}
  }
}
```

continue도 라벨과 함께 사용할 수 있는데 그럴 경우 해당 라벨이 붙은 반복문의 다음 단계가 실행된다. 예를 들어서 다음과 같이 사용할 경우, i가 1이면 outer의 다음 단계가 실행되기 때문에 i가 1인 경우는 `1 0`이 출력된 이후 바로 i가 2인 단계로 넘어간다.

```js
outer:for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
    console.log(i,j);
    if(i===1){continue outer;}
  }
}
```

# 2. switch

여러 개로 분기하는 if 조건문은 switch로 대체할 수 있다. target이 case의 값과 일치하면 해당 case의 본문이 실행된다. 만약 일치하는 case가 없다면 default의 본문이 실행된다.

```js
switch(target){
  case value1:
    // 본문
    break;
  case value2:
    // 본문
    break;
  default:
    // 본문
}
```

이때 switch는 target의 값과 같은 case로 점프하는 것이므로 break를 쓰지 않으면 해당 case의 본문이 실행된 이후 다음 case의 본문까지 실행된다. 예를 들어서 다음과 같은 switch문이 있다.

```js
switch(target){
  case 1:
    console.log(1);
  case 2:
    console.log(2);
    break;
  case 3:
    console.log(3);
    break;
  default:
    console.log('default');
}
```
이때 target이 1이라면 1과 2가 모두 콘솔 로그에 찍힌다. 또한 target과 case에는 어떤 표현식이든 올 수 있다.

switch문은 일치 비교 `===`를 사용한다는 것도 기억하자. 따라서 0과 '0'은 다르게 취급된다. 입력값을 switch에 줄 때 그 값의 타입이 어떤지 꼭 확인하자. 예를 들어 prompt함수는 리턴값이 문자열이다.

```js
let a='0';
// '문자 0' 이 출력된다.
switch(a){
  case 0:
  console.log("숫자 0");
  break;
  case '0':
  console.log("문자 0");
  break;
  default:
  console.log("다른 것");
}
```

# 3. 함수

다른 언어에서처럼 JS에서도 함수를 만들 수 있다. function 키워드를 이용해 선언한다.

```js
function 함수이름(매개변수1, 매개변수2, ...){
  // 본문
}
```
또한 함수도 중괄호로 새로운 코드 블록을 생성해 주기 때문에 함수 내에서만 접근 가능한 지역 변수를 만들 수 있고 함수 스코프 외부의 변수에 접근할 수도 있다. 단 만약 외부 변수와 같은 이름을 가진 함수 내 지역 변수가 있다면 지역 변수가 더 우선된다.

다음 코드의 경우 함수 내에서 a를 선언했기 때문에 함수 내에서는 a가 3이고 함수 외부에서는 a가 1이다.

```js
let a=1;
function test(){
  let a=3;
  console.log(a);
}
test();
console.log(a);
```

## 3.1. 매개변수

JS에서도 함수에 매개변수를 전달해 사용할 수 있다. 이때 매개변수는 함수 내부로 복사되어 사용된다. 다음 코드를 보자.

```js
function test(nickname){
  nickname=nickname+"me";
  console.log(nickname)
}
let t="witch";
// witchme가 출력됨
test(t);
// witch가 출력됨
console.log(t);
```

함수 내에서 nickname을 변경했지만 매개변수로 전달된 변수는 변하지 않은 것을 볼 수 있다. 이는 매개변수가 함수 내부로 복사되어 사용된다는 것을 보여준다. 그런데 단순히 모든 것이 복사되는 것은 아닌데..이는 다른 글에서 다루겠다.

## 3.2. 매개변수 기본값

함수 호출 시 매개변수가 들어갈 위치에 아무것도 넣지 않으면 undefined가 들어간다. 

```js
function test(arg1, arg2){
  console.log(arg1, arg2);
}
// 1 undefined
test(1);
```

이때 매개변수에 기본값을 설정해 놓으면 매개변수가 들어가지 않을 때 기본값이 들어간다. 매개변수에 전달된 값이 undefined일 때도 기본값이 들어가게 된다.

```js
function test(arg1, arg2=2){
  console.log(arg1, arg2);
}
// 1 2
test(1);
```

매개변수 기본값은 함수를 호출할 때마다 평가되기 때문에 매개변수 기본값에는 함수를 호출할 때마다 달라져야 하는 값이나 표현식을 넣을 수도 있다.

```js
function test(arg1, arg2=func()){
  console.log(arg1, arg2);
}
```

## 3.3. 매개변수 기본값의 다른 방식

함수 선언 후에 매개변수 기본값을 설정하는 것이 적절할 경우 undefined와의 비교, ||, ?? 를 사용하는 방법을 쓸 수 있다.

```js
function test(arg1, arg2){
  if(arg2===undefined){
    arg2="default"
  }
  console.log(arg1, arg2);
}

// 이 경우 arg2가 falsy value일 때 기본값이 들어감
function test(arg1, arg2){
  arg2=arg2 || "default";
  console.log(arg1, arg2);
}

function test(arg1, arg2){
  arg2=arg2 ?? "default";
  console.log(arg1, arg2);
}
```

## 3.4. 반환값 이용하기

return을 이용해 함수를 호출한 곳으로 값을 반환할 수 있다. 그런데 return을 이용하지 않거나 return 값을 명시하지 않으면 undefined가 반환된다.

```js
function test(arg1, arg2){
  console.log(arg1, arg2);
}
//undefined
console.log(test(1,0));
```

# 4. 함수 표현식

앞에서는 함수 선언문 방식으로 함수를 만들었다. 다음과 같은 방식이다.

```js
function 함수명(매개변수들){
  본문
}
```
