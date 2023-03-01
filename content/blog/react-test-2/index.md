---
title: React Testing - Jest 2
date: "2023-02-19T03:00:00Z"
description: "프론트에 테스트 도입을 위한 공부, Testing Library 기본"
tags: ["javascript"]
---

TDD로 개발할 때는 먼저 테스트를 만들고 테스트를 통과하는 코드를 작성하는 방식으로 제작해야 한다. 물론 반대 순서도 선택할 수 있지만 이름답게 테스트가 중심이 되어야 하는 건 마찬가지다.

먼저 쿼리 함수들을 알아본 후 다음 글에서 TDD로 카운터를 만들어 볼 것이다.

# 1. 기본

기초적인 테스트를 만들어 보자. CRA로 프로젝트를 생성하면 기본적으로 `App.test.tsx`파일이 있다. 여기에 다음과 같은 테스트를 만들자. 이는 App 컴포넌트에 있는 title 엘리먼트가 Document에 있는지 확인하는 테스트다.

```js
test("Title is in Document", () => {
  render(<App />);
  const titleElement = screen.getByTestId("title");
  expect(titleElement).toBeInTheDocument();
});
```

먼저 App 컴포넌트를 렌더링한 후, 그 내부에서 "title"이라는 testId를 가진 엘리먼트를 찾는다. 그리고 해당 엘리먼트가 Document에 있는지 확인한다.

다음과 같이 App 컴포넌트를 짜면 테스트가 통과된다. title testid를 가진 엘리먼트가 Document에 있기 때문이다.

```js
function App() {
  return (
    <div className="App" data-testid="title">
      안녕하세요
    </div>
  );
}
```

# 2. 쿼리 함수들의 동작에 따른 분류

위에서 자연스럽게 `screen.getByTestId`함수를 사용하여 엘리먼트에 접근했다. 다른 쿼리 함수들은 뭐가 있을까?

먼저 쿼리 함수들은 앞서 보았듯이 페이지 엘리먼트를 찾는 데 사용된다. 크게 분류하면 get, find, query 함수들이 있는데 이 함수들은 엘리먼트를 찾지 못했을 때의 동작이 다르다.

이렇게 엘리먼트를 찾고 나면 Event API나 user-event로 이벤트를 발생시킬 수 있다.

```js
test(테스트 제목, ()=>{
  render(컴포넌트)
  // 특정 엘리먼트를 찾는 쿼리 함수
  const element=screen.쿼리함수(/이름/);
})
```

그럼 이제 쿼리 함수들이 엘리먼트 찾기를 실패했을 때의 동작에 따른 분류를 알아보자. 또한 하나의 엘리먼트를 찾는 쿼리 함수와 여러 개의 엘리먼트를 찾는 쿼리 함수로 나눌 수도 있다. 여러 개의 엘리먼트를 찾을 경우 By 대신 AllBy가 붙는다. 이렇게 총 6가지의 분류가 생긴다.

### 2.1.1. getBy

`getBy...` 쿼리 함수는 조건에 맞는 엘리먼트를 찾으면 해당 엘리먼트를 반환한다. 만약 찾지 못하면 에러를 발생시킨다. 조건에 맞는 엘리먼트가 2개 이상 있어도 에러를 발생시킨다.

### 2.1.2. queryBy

`queryBy...` 쿼리 함수는 조건에 맞는 엘리먼트를 찾으면 해당 엘리먼트를 반환한다. 만약 찾지 못하면 null을 반환한다. 조건에 맞는 엘리먼트가 2개 이상 있으면 에러를 발생시킨다.

### 2.1.3. findBy

`findBy...` 쿼리 함수는 Promise를 반환한다. 이때 해당 쿼리에 맞는 엘리먼트를 찾으면 Promise는 resolve된다. 만약 못 찾으면 Promise는 reject된다.

그리고 기본 타임아웃 1000ms(1초)이후에 조건에 맞는 하나 이상의 엘리먼트가 발견되면 Promise는 reject된다.

### 2.1.4. getAllBy

`getAllBy...` 쿼리 함수는 조건에 맞는 엘리먼트들을 담은 배열을 반환한다. 만약 찾지 못하면 에러를 발생시킨다.

### 2.1.5. queryAllBy

`queryAllBy...` 쿼리 함수는 조건에 맞는 엘리먼트들을 담은 배열을 반환한다. 만약 찾지 못하면 빈 배열 `[]`을 반환한다.

### 2.1.6. findAllBy

`findAllBy...` 쿼리 함수는 Promise를 반환한다. 해당 쿼리에 맞는 엘리먼트를 찾으면 Promise는 해당 엘리먼트들이 담긴 배열로 resolve된다. 만약 기본 타임아웃인 1000ms후에 그런 엘리먼트를 못 찾으면 Promise는 reject된다.

findBy 쿼리 함수들은 getBy와 waitFor의 조합과 같다. 이 함수들은 마지막 optional argument로 wailFor의 옵션을 받는다.

# 3. 쿼리 함수의 우선순위

위에서 분류한 분류 각각이 수많은 쿼리 함수들을 가지고 있다. 이중에 위에서는 getByTestId를 사용했다. 그런데 screen.getByTestId를 사용해서 엘리먼트에 접근하는 건 권장되는 방식이 아니다. 그럼 어떤 쿼리를 사용해야 할까?

기본적인 원칙은 유저가 내 페이지와 상호작용하는 방식을 닮아야 한다. 

따라서 모두가 접근할 수 있는 쿼리 함수들을 우선적으로 사용해야 한다.

# 3.1. Accessible to Everyone

마우스를 사용하는 사람뿐 아니라 스크린 리더를 사용하는 사람의 경험도 포함하는 쿼리들이다. 편의상 getBy로 설명하지만 같은 의미로 queryBy, findBy, getAllBy, queryAllBy, findAllBy도 있다.

### 3.1.3. getByRole

접근성 트리(DOM 트리를 기반으로 하며 접근성 관련 정보들을 포함한다)에 나와 있는 모든 요소에 사용 가능하다. 그리고 name으로 필터링도 할 수 있다. 이걸 사용하는 게 가장 권장된다. 그리고 문서에 의하면 대부분의 테스트를 이걸로 할 수 있을 거라고 한다. name 옵션과 함께 쓰일 때가 많다.

```js
screen.getByRole('button', {name: /submit/i})
```

### 3.1.2. getByLabelText

LabelText를 통해서 엘리먼트를 찾는다. form에 사용하기 좋다. 사용자는 form을 채우는 과정에서 label을 보게 되는데, 이 label을 통해서 엘리먼트를 찾는 것이다. 이 또한 가장 권장된다.

### 3.1.3. getByPlaceholderText

placeholder를 통해서 요소를 찾는다. 그러나 [placeholder 자체가 권장되지 않는다.](https://www.nngroup.com/articles/form-design-placeholders/) 다른 옵션이 있다면 다른 걸 쓰는 게 낫다.

### 3.1.4. getByText

사용자는 텍스트를 통해 요소를 찾기도 한다. 사용자와 상호작용하지 않는 요소들, div, span, p tag 등에 사용한다.

### 3.1.5. getByDisplayValue

input, textarea, select 등에서 현재 보여지고 있는 value를 통해서 요소를 찾는다. 


따라서 getByRole, getByLabelText, getByText, getByDisplayValue 등을 사용하는 것이 좋다. 이 쿼리 함수들은 마우스나 시각을 사용하는 사람뿐 아니라 스크린 리더를 사용하는 등 다양한 상황에서도 잘 동작한다.

그 다음이 getByAltText, getByTitle 등의 시맨틱 쿼리다. 그 다음이 우리가 썼던 getByTestId인데, 이게 우선순위가 가장 낮다. 이는 TestId가 개발자에게만 의미가 있고, 사용자에게는 의미가 없기 때문이다.

그럼 먼저 Testing Library에 들어가서 제공되는 쿼리 함수들을 알아보았다.

## 3.2. 시맨틱 쿼리 함수


# 4. 쿼리함수 사용하기

Testing Library의 쿼리 함수는 첫 번째 인수로 container를 전달해야 한다. 그런데 React Testing Library를 포함한 대부분의 Testing Library는 container를 알아서 찾아준다. 

특히 RTL의 경우 screen 객체를 사용할 시 container를 알아서 찾아준다. 따라서 screen.getByRole('button')과 같이 사용할 수 있다.

쿼리가 요소를 찾을 때 쓰이는 인수는 문자열, 정규 표현식 혹은 함수가 될 수 있다.


# 4. 이벤트 발생시키기

fireEvent 대신 userEvent를 사용하는 게 권장된다. userEvent도 fireEvent를 사용하지만 엘리먼트 타입에 따라서 더 적절한 반응을 보여준다. 클릭한 버튼이 focus되는 등이다.

# 참고

https://testing-library.com/docs/queries/about