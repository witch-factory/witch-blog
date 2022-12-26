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