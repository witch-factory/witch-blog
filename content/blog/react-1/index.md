---
title: 프론트 지식 익히기 React - useReducer의 사용
date: "2022-08-03T00:00:00Z"
description: "React 지식 1번째, useReducer"
tags: ["web", "study", "front", "react"]
---

# 1. 프로젝트에서 생긴 문제

현재 진행하고 있는 프로젝트에서 사용자 프로필을 관리해 줘야 한다. 이 사용자 프로필의 하위 항목들이 상당히 많고 얽힌 함수도 많았다. 별로 생각을 하지 않다 보니 그 항목들을 렌더링하는 컴포넌트에 props로 넘겨주는 항목들이 많아지는 건 순식간이었다.

컴포넌트 하나에 props가 6개, 7개 붙고 그 props중 몇 개는 또 함수라서 6~7줄짜리 익명 함수가 붙었다. 컴포넌트 하나에 20줄은 넘어가는 그런 상황을 보자니 너무 보기 좋지 않았다.

함수를 따로 변수로 분리하고 별 짓을 다 해도 다음과 같은 props가 5개쯤 붙은 컴포넌트가 10개쯤 늘어져 있었고 변수로 분리된 함수도 컴포넌트 내에 있다 보니 이걸 고치고 싶은 마음이 굴뚝같아졌다.

```jsx
<AreaField
  label="활동지역"
  areas={storedUserProfile.areas}
  setAreas={setUserProfileAreas}
  options={areaOptions}
  editing={profileEditing}
/>
```

하지만 문제는 이 유저 프로필 정보는 다른 페이지에서도 사용될 예정이다. 그래서 전역으로 저장되어 있다. 하지만 이 유저 프로필 정보의 하위 항목 중 몇 가지는 같은 컴포넌트에서 렌더링해주고 그 안에서 교체해 줘야 했다. 이때 유저 프로필의 하위 항목들에는 바뀔 수 있는 후보들도 따로 있고 그 항목들의 변경도 추적해 줘야 했다.

예를 들어서 설명해 보겠다. 실제 프로젝트에 있었던 상황과 거의 유사하다. 유저 프로필은 다음과 같이 구성되어 있다.

```jsx
const userProfile{
  name:"마녀",
  email:"soakdma37@gmail.com",
  infoA:[a, b, c],
  infoB:[A, B, C],
  infoC:[1, 2, 3],
}
```

이때 infoA, infoB, infoC 가 모두 같은 컴포넌트에서 렌더링된다. 따라서 그 컴포넌트에는 어떤 하위 항목을 렌더링할지를 props로 전달해 줘야 한다. 그래서 infoA를 컴포넌트에 props로 전달해 줬다고 하자. 이때 infoA를 props로 받은 컴포넌트의 하위 컴포넌트에서도 정보가 수정되기 때문에 infoA를 함수에 대해서도 props로 받아 준다. infoA의 수정 여부도 추적해야 하기 때문에 그 추적 상태와 추적 상태 설정 함수도 props로 넘겨준다.

```jsx
<InfoComponent
  info={infoA}
  setInfo={setInfoA}
  infoChanged={infoAChanged}
  setInfoChanged={setInfoAChanged}
/>
```

이런 식으로 하면 props도 많아질 뿐더러 유저 프로필을 전역으로 관리하는 의미가 없다. 정보를 필요로 하는 컴포넌트에서 딱 필요한 정보를 불러서 사용할 수 있어야 하는데 한번 정보를 불러와 놓고 계속 props 를 하위 컴포넌트로 내려 가면서 사용하면 무슨 소용인가?

물론 이 모든 상태들은 프로젝트에서는 어떻게든 알아야 하는 상태들이다. 하지만 당연히 이보다는 훨씬 더 세련된 방법들이 있다. 먼저 상태 추적에는 useEffect라는 좋은 훅이 존재한다. 그리고 userProfile이 객체이기 때문에 그 필드 명만 받아서 `setUserProfile({...userProfile, [fieldName]:value})`과 같은 방식으로 수정하는 것을 생각해 볼 수 있다. 실제로 이 방식으로 했으면 어떨까 고민 중이다.

하지만 useReducer 라는 훅을 찾았고 내가 잘 모르는 것 같아서 여기 대강 사용법과 프로젝트 설계에 사용한 방식을 설명해 둔다. 원래도 useReducer의 존재를 아예 모르지는 않았다. 하지만 사실 useState로 해결할 수 있었던 게 대부분이라 거의 잊고 있었다... 하지만 공식 문서를 찾아보니 `다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우`에 선호된다고 한다. 딱 내 상황인 것 같다...

# 2. useReducer의 이해

`useReducer`는 당연히 그 이름답게 `reducer`를 쓰는 훅이다. 그럼 리듀서란 무엇인가? 현재 상태를 뜻하는 state와 거기에 어떤 행동을 취할지를 결정하는 action을 받아서 새로운 state를 반환하는 함수이다. 보통 action 객체는 업데이트를 위한 정보를 가지고 있으며 type값을 갖도록 하는 게 일종의 국룰이다. 물론 다양한 업데이트를 위해 다른 정보를 가지도록 해도 상관없다.

그럼 useReducer는 이런 reducer와 초기 상태인 initialState를 받아서 현재 state와 dispatch 메서드를 반환한다. useReducer가 3번째 인자 init을 받기도 하는데 일단 인자 2개로 다음과 같이 사용할 수 있다.

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

이때 state는 당연히 우리가 컴포넌트에서 사용할 상태이고 dispatch는 액션을 받아서 실행시키는 함수라고 생각하면 된다. 우리가 취하고 싶은 액션을 dispatch에 전달하면 dispatch함수는 그 액션의 정보에 따라 reducer에서 state를 업데이트하도록 한다.

공식 문서에 있는 간단한 카운터 예제를 타입스크립트로 작성하였다. 먼저 리듀서 함수를 작성하자.

```tsx
function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

state와 거기에 취할 action을 받아서 action.type에 따라 새로운 state를 만들어서 돌려준다. 그리고 카운터 컴포넌트는 다음과 같이 제작한다.

```tsx
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialCount);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

# 참고

벨로퍼트의 모던 리액트 useReducer 항목 [20. useReducer 를 사용하여 상태 업데이트 로직 분리하기 · GitBook](https://react.vlpt.us/basic/20-useReducer.html)

React 공식 문서의 useReducer https://ko.reactjs.org/docs/hooks-reference.html#usereducer
