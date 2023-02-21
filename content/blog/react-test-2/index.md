---
title: React Testing - Jest 2
date: "2023-02-19T03:00:00Z"
description: "프론트에 테스트 도입을 위한 공부, 카운터 TDD"
tags: ["javascript"]
---

TDD에 맞게, 먼저 테스트를 만들고 테스트를 통과하는 코드를 작성하는 방식으로 카운터를 만들어 본다. 그럼 카운터에는 어떤 테스트가 필요할까?

# 1. 필요한 테스트 작성

# 2. 쿼리 우선순위

screen.getByTestId를 사용해서 엘리먼트에 접근하는 건 권장되는 방식이 아니다. 그럼 어떤 쿼리를 사용해야 할까?

기본적인 원칙은 유저가 내 페이지와 상호작용하는 방식을 닮아야 한다. 따라서 getByRole, getByLabelText, getByText, getByDisplayValue 등을 사용하는 것이 좋다. 이 쿼리 함수들은 마우스나 시각을 사용하는 사람뿐 아니라 스크린 리더를 사용하는 등 다양한 상황에서도 잘 동작한다.

그 다음이 getByAltText, getByTitle 등의 시맨틱 쿼리다. 그 다음이 우리가 썼던 getByTestId인데, 이게 우선순위가 가장 낮다. 이는 TestId가 개발자에게만 의미가 있고, 사용자에게는 의미가 없기 때문이다.

그럼 먼저 Testing Library에 들어가서 제공되는 쿼리 함수들을 알아보았다.

# 3. 쿼리 함수들

쿼리 함수들은 앞서 보았듯이 페이지 엘리먼트를 찾는 데 사용된다. get, find, query 함수들이 있는데 이 함수들은 엘리먼트를 찾지 못했을 때의 동작이 다르다.

이렇게 엘리먼트를 찾고 나면 Event API나 user-event로 이벤트를 발생시킬 수 있다.

```js
test(테스트 제목, ()=>{
  render(컴포넌트)
  const input=screen.쿼리함수(/이름/);
})
```

# 4. 이벤트 발생시키기

fireEvent 대신 userEvent를 사용하는 게 권장된다. userEvent도 fireEvent를 사용하지만 엘리먼트 타입에 따라서 더 적절한 반응을 보여준다. 클릭한 버튼이 focus되는 등이다.