```yaml
title: 모던 자바스크립트 튜토리얼 part 1.2 자바스크립트 기본 - 2
date: "2022-12-17T00:00:00Z"
description: "ko.javascript.info part 1-2 두번째"
tags: ["javascript"]
```

JS의 비교 연산자에 관한 정리를 하고 있었다. 그런데 비교하려는 값의 자료형이 다르면 이 값들을 숫자형으로 바꾼다는 설명이 있었다. 따라서 `'2'>1`의 결과는 true 가 된다. 이건 납득이 간다.

하지만 `'가나다'>1`의 경우 false가 뜬다. 뭔가 이상한데? 따라서 비교 연산이 어떻게 이루어지는지 찾아보았다.

# 참고

[ECMA262의 비교 연산자 스펙](https://262.ecma-international.org/5.1/#sec-11.8.5)