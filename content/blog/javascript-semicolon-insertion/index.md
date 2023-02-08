---
title: JS의 세미콜론 자동 삽입
date: "2022-12-16T01:00:00Z"
description: "JS에서 세미콜론을 자동 삽입하는 규칙"
tags: ["javascript"]
---

JS에서는 줄바꿈이 일어나는 부분에 대해 대부분의 경우 세미콜론을 자동으로 삽입해 준다. 하지만 그렇지 않은 경우도 있다. [이 글](https://ko.javascript.info/structure)에서는 먼저 다음과 같은 예시를 든다.

```js
alert(3 + 
1
+ 2);
```

직관적으로 3+1+2 가 하나의 표현식으로 해석되는 게 맞기 때문에 이렇게 동작한다는 것을 느낄 수 있다. 그러나 다음과 같은 경우는 어떨까? 이 역시 위 글에서 든 예시이다.

```js
alert("에러가 발생합니다.")

[1, 2].forEach(alert)
```

새롭게 추가한 alert만 잘 실행되고 그 뒤에 에러가 발생한다. 이는 js가 대괄호 앞에는 세미콜론을 자동 삽입하지 않기 때문이다. 그래서 위 코드는 다음과 같이 해석된다.

```js
alert("에러가 발생합니다.")[1, 2].forEach(alert)
```
이렇게 변환해 보니 에러가 발생하는 게 당연한 코드가 되었다. 그럼 이렇게 세미콜론을 자동으로 삽입할 때 어떤 규칙을 기반으로 하는가?

# 1. 기본 규칙

몇몇 종류의 JS statement들은 세미콜론으로 끝나야 한다. 이들은 다음과 같다.

- 빈 statement
- let, const, var statement
- import, export statement, 모듈 선언
- expression statement
- debugger
- continue, break, throw, return

따라서 위의 종류들은 자동 세미콜론 삽입에 영향을 받게 된다. 이때 좀 낯선 것들이 있어서 간단히 설명하였다.

## 1.1. 몇몇 statement들에 대한 설명

### 1.1.1. 빈 statement

말 그대로 아무것도 하지 않는 statement이다. 이는 세미콜론으로 끝나야 한다.

```js
;
```

예를 들어서 for문의 body에 쓸 수 있다. for문이 시행하는 반복 그 자체가 중요한 경우이다.

```js
let arr=[1,2,3,4,5];
for(let i=0;i<arr.length;arr[i]=0,i++);
```

위와 같이 한 경우 for문의 body는 빈 statement가 된다. 단 이를 일부러 사용할 경우 실수를 유발할 수 있으므로 주석을 꼭 달아주자.

```js
if(something);
  func(); //if문이 빈 statement로 해석되었으므로 func는 무조건 실행된다
```

## 1.2. expression statement

단순히 어떤 표현으로 이루어지는 statement이다. 이 표현은 평가되고 그 결과는 버려진다. 간단하게는 다음과 같은 것을 들 수 있다. 

```js
1+2;
```

변수에 값을 할당하는 할당 연산자도 연산자기 때문에 할당문도 하나의 expression이다. 이런 식으로 side effect가 있는 expression이 사용된다.

```js
a=3; //이는 3으로 평가되지만 결과는 버려진다
```

## 1.3. 자동 세미콜론 삽입의 3가지 규칙

ECMAscript에서 설명하는 3가지 규칙은 다음과 같다.

### 1.3.1. 첫번째 규칙

문법에 의해 허용되지 않는 줄바꿈 문자(라인 피드, 캐리지 리턴 등)나 `}`가 나오면 그곳 이전에 자동으로 세미콜론을 삽입한다.

예를 들어서 `{1 2} 3`은 문법적으로 맞지 않으므로, }가 나오는 곳에 세미콜론을 삽입한다. 따라서 `{1 2;} 3`으로 해석된다.

또한 

# 참고
https://en.wikibooks.org/wiki/JavaScript/Automatic_semicolon_insertion

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Lexical_grammar

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Empty