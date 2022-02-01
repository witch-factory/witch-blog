---
title: C-through - 2. Unknown parameter
date: "2022-01-10T00:00:00Z"
description: "C언어의 함수 파라미터에 대하여"
tags: ["C", "language"]
---

# 1. 인자가 없는 함수

C의 함수는 인자를 받아서 적절한 처리를 한 뒤 그 결과를 리턴해 준다. 물론 포인터 등을 통해서, 리턴값 외의 다른 부분들도 조작할 수 있다. 그런데 받는 인자 없이 쓰이는 함수도 분명 존재한다. 가장 대표적으로는 메인 함수가 그렇게 쓰이고(물론 터미널 라인을 통해 인자를 줄 수 있고, 그런 것을 의도했을 경우 `int main(int argc, char* argv[])`와 같이 쓰이지만 많이 사용할 일은 없다) 단순한 출력을 해주거나 상수를 리턴하는 함수 같은 것을 들 수 있을 것이다.

```c
int main() {
    printf("Hello World!\n");
    return 0;
}
```

```c
void f() {
    printf("This is an example.\n");
}
```

```c
int c = 1024;

int f() {
    return c;
}
```

이런 함수들은 아무런 인자도 받지 않고 동작한다. 따라서 함수 정의시에 인자를 명시해 주지 않았다. 그러나 몇몇 책에서는 메인 함수나 인자를 받지 않는 함수들의 인자 자리에 `void` 를 넣어 주는 경우가 있다. 

```c
int main(void) {
    printf("Hello World!\n");
    return 0;
}
```

이러한 이유는, C에서는 함수 인자에 void를 넣어 주면 그 함수가 인자를 받지 않는 함수라는 것을 명시적으로 나타내 주기 때문이다. 그럼 함수 인자를 넣어 주지 않은 경우에는 어떤 것을 뜻할까? 함수 인자에 대한 정보를 알 수 없다는 뜻을 나타낸다(참고로 C++에서는 함수 인자를 명시하지 않은 경우 함수 인자가 없다는 것을 뜻한다. 함수 정의 시 함수 선언 시 인자를 명시하지 않는 것의 의미가 C와 C++에서 다르다). 인자의 숫자도 타입도 아무 정보도 컴파일러에게 주지 않는 것이다. 따라서 어떤 인자든 전달할 수 있다. 다음과 같은 코드는 `f`의 정의 부분에서는 인자가 명시되지 않았음에도 `f`에 인자를 전달한다. 그러나 잘 작동한다. `f`의 인자에 대한 정보가 알 수 없다는 말은 모든 것을 허용한다는 것이기 때문이다(C는 프로그래머에게 많은 것을 맡긴다).

```c
#include <stdio.h>

int f(){
	printf("test\n");
}

int main(){
	f(1,2,3);
	return 0;
}
```

반면 `f`의 인자로 `void`를 명시하여 `f`가 인자를 받지 않는다는 것을 나타내어 준 다음 코드는 오류를 발생시킨다. `f`가 인자를 받지 않는다는 것을 명시해 주었는데도 `f`에 인자를 전달했기 때문이다.

```c
#include <stdio.h>
/* 이 코드는 오류를 발생시킨다 */
int f(void){
	printf("test\n");
}

int main(){
	f(1,2,3);
	return 0;
}
```

# 2. 함수 선언부의 인자

C에서 함수 선언과 정의를 분리하는 일은 흔하다. 함수 순서에 구애받지 않게 된다거나 코드를 알아보기 쉬워지는 등의 이점이 있기 때문이다.

```c
#include <stdio.h>

int f(int x, int y);

int main(){
	printf("%d\n", f(1,2));
	/* 출력 결과는 3 */
	return 0;
}

int f(int x, int y){
	return x+y;
}
```

함수 선언시에는 함수의 리턴형과 함수의 인자들이 몇 개 있는지, 그리고 인자 각각의 타입을 전달해 준다. 



# 3. 참고

https://stackoverflow.com/questions/693788/is-it-better-to-use-c-void-arguments-void-foovoid-or-not-void-foo

https://stackoverflow.com/questions/5481579/why-does-an-empty-declaration-work-for-definitions-with-int-arguments-but-not-fo

https://stackoverflow.com/questions/12643202/why-does-gcc-allow-arguments-to-be-passed-to-a-function-defined-to-be-with-no-ar

https://en.wikipedia.org/wiki/B_%28programming_language%29

https://stackoverflow.com/questions/4664100/does-printfx-1-invoke-undefined-behavior

(`C 표준 문서의 내용이 있다`)

https://stackoverflow.com/questions/18820751/identifier-list-vs-parameter-type-list-in-c

https://stackoverflow.com/questions/41803937/func-vs-funcvoid-in-c99 (C 표준 관련한 설명이 아주 잘되어 있음)

