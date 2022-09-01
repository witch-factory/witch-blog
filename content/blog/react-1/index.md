---
title: 프론트 지식 익히기 React - useReducer의 사용
date: "2022-08-31T00:00:00Z"
description: "React 지식 1번째, useReducer에 대한 탐구"
tags: ["web", "study", "front", "react"]
---

# 1. useReducer

리액트를 가르치는 많은 문서에서 useReducer라는 상태 관리 기법을 소개하고 있다. 나도 리액트를 처음 배우면서 이런 문법이 있다는 것은 알고 있었다. 하지만 어렴풋이 이런 게 있다는 것만 알 뿐 딱히 사용해본 적은 없었다. 그래서 이번에 useReducer를 사용해보면서 어떤 기능을 하는지 알아보려고 한다. 그리고 useReducer의 장점과 사용처를 알아보고 프로젝트에 적용한 부분을 조금 떼와서 설명하고자 한다.

## 1.1. useReducer의 기본형태

React에서는 useState라는 상태 관리 기법을 제공한다. 그리고 리액트를 쓰는 사람이라면 useState정도는 분명 써보았을 것이다. 그러면 useReducer는 이와 무엇이 다른가? useState는 어떤 상태와 그 상태를 특정한 다른 상태로 바꾸는 함수를 제공한다.

예시를 들어 보자. 다음과 같은 useState를 사용한 코드가 있다고 하자.

```jsx
const [number, setNumber] = useState(0);
```

여기서 useState는 상태를 저장하는 변수 number와 그 number를 특정한 다른 숫자로 바꿔주는 함수 setNumber를 제공한다. useReducer는 상태를 저장하는 변수와 그 상태를 특정 함수(reducer)를 통과한 상태로 만들어주는 함수(dispatch)를 제공한다.

기본형은 이렇다. useReducer 훅은 상태의 업데이트를 담당하는 Reducer 함수와 초기 상태를 인자로 받는다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

useReducer의 3번째 인자로 lazy initialization에 해당하는 함수를 넣어줄 수도 있지만 이는 잘 쓰이지 않으므로 사실상 위의 형태가 기본형이다. 즉 위의 number와 setNumber를 대체하는, useReducer의 형태는 다음과 같다.

```jsx
const [number, dispatch] = useReducer(reducer, 0);
```

number는 똑같이 상태를 저장하고 있고, dispatch는 reducer 함수를 통해 상태를 바꿔주는 방법을 제공하는 함수이다. 그러면 reducer는 어떤 함수일까?

## 1.2. reducer

reducer는 상태를 받아서 새로운 상태를 리턴하는 함수이다. 즉 상태의 업데이트를 담당한다. 그런데 단순히 하나의 상태만 돌려준다면 useState에 비해 할 수 있는 게 현저히 적을 것이다. 유명한 Counter 예제만 봐도 증가와 감소 두 가지의 상태 업데이트가 필요하지 않은가? 이런 다양한 종류의 상태 업데이트를 위해 reducer는 상태 외에 액션(action)이라는 것을 받아서 새로운 상태를 리턴해 준다.

이 action은 일반적으로 어떤 상태 업데이트 로직인지를 뜻하는 type과 그 업데이트에 필요한 기타 데이터인 payload로 이루어진 객체이다.(물론 다른 형태의 action을 원하는 대로 사용해도 된다) 즉 일반적인 reducer의 형태는 다음과 같다. (payload는 생략 가능하다. 이 payload는 redux에서 온 이름인데 그냥 그대로 쓰면 된다..)

```jsx
function reducer(state, action) {
  switch (action.type) {
    // action type에 따라 새로운 상태를 반환한다
    case "A":
      return { ...newStateA };
    case "B":
      return { ...newStateB };
  }
}
```

## 1.3 dispatch 함수의 사용

앞서 본 useReducer의 기본형은 다음과 같다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

여기서 state는 useState를 사용할 때와 같은, 상태를 저장하는 변수이다. 그리고 reducer에 관해서는 1.2 에서 다뤘다. initialState는 누가 봐도 초기 상태를 의미한다. 그럼 dispatch는 어떤 함수일까?

dispatch는 받은 인자를 reducer의 2번째 인자로 전달한다. 그리고 현재 상태와 dispatch에서 전달한 action을 통해 리턴된 값을 새로운 상태로 만든다. 만약 다음과 같은 dispatch 함수가 있다고 하자.

```jsx
dispatch({ type: "reset" });
```

그러면 reducer는 `reducer(현재 상태, {type:"reset"})`형태로 호출되고 여기서 리턴된 값이 새로운 상태가 된다. 이때 이 dispatch 함수는 컴포넌트가 새로 렌더링된다고 변경되지 않는다. 이는 useState의 setState도 마찬가지다.

## 1.3 useReducer의 사용법 - Counter 예제

그럼 이제 useReducer를 사용하는 형태도 알았고 리듀서도 dispatch도 어떻게 쓰이는지 알았다. 그럼 어떻게 사용할까? 리액트를 처음 시작할 때 한번씩은 다들 만드는 카운터 예제를 만들어보자. 먼저 useState를 이용하는 형태로 만들어보자.

```jsx
function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const onDecrease = () => {
    setNumber(number - 1);
  };

  return (
    <section>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </section>
  );
}
```

useReducer를 이용하면 다음과 같아진다.

```tsx
const initialState = { count: 0 };

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

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIncrease = () => {
    dispatch({ type: "increment" });
  };

  const onDecrease = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <section>
      <h1>{state.count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </section>
  );
}
```

그런데 어쩐지 코드는 더 길어진 것 같고 딱히 해결된 문제는 없는 것 같다.. 대체 useReducer는 왜 쓰는 걸까?

# 1.4 useReducer를 이해해 보기

이 문단은 참고문헌에 있는 [리액트 프로처럼 쓰기](https://devtrium.com/posts/how-to-use-react-usereducer-hook#usereducer-a-backend-mental-model)글의 `useReducer: A Backend Mental Model`문단과 [이창희](https://xo.dev/)님과의 대화를 참고하여 작성되었다.

프로젝트를 하다 보니 많은 정보를 담고 있는 state를 관리하는 컴포넌트가 생기게 되었다. 예를 하나 들자면 회원가입 폼이 있겠다. 이름, 아이디, 비밀번호, 비밀번호 확인, 이메일만 받는다 해도 벌써 5개의 정보를 관리해 줘야 한다.

물론 지금 하고 있는 프로젝트에서는 그보다 훨씬 많은 정보를 받는다. 하지만 예시를 위해 위 5개의 정보만 받는 폼이 있다고 해보자. 각 정보에 대해 state를 만들고 해당하는 input의 onChange 핸들러도 모두 따로 만들어 준다고 하면 다음과 같은 모양이 될 것이다.

```tsx
function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(e.target.value);
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleUserConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserConfirmPassword(e.target.value);
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <form
        style={{ display: "flex", flexDirection: "column", width: "200px" }}
      >
        <label htmlFor="userName">Name</label>
        <input type="text" id="userName" onChange={handleUserNameChange} />
        <label htmlFor="userID">ID</label>
        <input type="text" id="userID" onChange={handleUserIDChange} />
        <label htmlFor="userEmail">Email</label>
        <input type="text" id="userEmail" onChange={handleUserEmailChange} />
        <label htmlFor="userPassword">Password</label>
        <input
          type="password"
          id="userPassword"
          onChange={handleUserPasswordChange}
        />
        <label htmlFor="userConfirmPassword">Confirm Password</label>
        <input
          type="password"
          id="userConfirmPassword"
          onChange={handleUserConfirmPasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}
```

아, 끔찍한 코드다. state들이 같은 회원가입 폼에 속해 있다는 것도 드러나 있지 않고, 각각의 state를 담당하는 input에 대해 onChange 함수도 다 만들어 줘야 한다. 이런 문제는 각 state가 쓰이는 컴포넌트가 많아지면 더 많은 문제가 생긴다. 이런 문제를 해결하는 하나의 방법으로 useReducer를 사용할 수 있다.

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

useReducer의 사용에 관한 구체적인 글 https://devtrium.com/posts/how-to-use-react-usereducer-hook

useReducer가 최적화에 도움이 될 때 https://stackoverflow.com/questions/54646553/usestate-vs-usereducer

useReducer를 언제 써야 하는지와 써야하는 이유에 관한 짧은 글 https://dev.to/spukas/3-reasons-to-usereducer-over-usestate-43ad#:%7E:text=useReducer()%20is%20an%20alternative,understand%20for%20you%20and%20colleagues
