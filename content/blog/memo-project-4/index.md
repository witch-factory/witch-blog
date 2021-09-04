---
title: 메모장 만들기 프로젝트 - 4. 로그인 페이지 기본 만들기
date: "2021-09-04T00:00:00Z"
description: "웹 메모장 프로젝트, 그 삽질의 기록4"
tags: ["memo-jang", "web"]
---

# 1. 페이지 라우터 설정

로그인 페이지를 제작하기 전에 먼저 로그인 페이지가 들어갈 주소를 만들어 줘야 한다. 개별 페이지에서 조건부 렌더링을 해 주는 게 아니고 회원가입 페이지 - 로그인 페이지 - 메모장 페이지 이 3개를 각각 다른 주소에서 라우팅되도록 하려고 하므로 이는 필수적이다. 

먼저 로그인 페이지를 라우팅해줄 주소에 들어갈 페이지를 간단하게 만들자. client/src 폴더에 `login.js` 를 생성하자.

```jsx
//src/login.js
import React from 'react';

const Login = () => (
  <h1>로그인 페이지입니다</h1>
);

export default Login;

```

그리고 client/src/App.js의 라우팅 경로에 `/login` 을 추가해 준다. 하는 김에 아까 `Note` 컴포넌트를 홈 페이지에서 뜨도록 한 것도 `/memo` 경로에서 뜨도록 바꿔 주자.

```jsx
//App 컴포넌트
function App() {
  return (
    <>
      <NoteGlobalStyle />
      <Route path="/memo" component={Note} exact />
      <Route path="/login" component={Login} exact />
    </>
  );
}
```

참고로 Route 컴포넌트의 exact 옵션은 '정확히' 그 경로일 때만 우리가 지정한 컴포넌트를 보여주게 하는 옵션이다. 그렇지 않으면 그걸 포함하는 모든 경로에서 저 컴포넌트를 띄워 준다. 가령 `"/"` 경로에 지정한 컴포넌트가 있다면 `/login` 경로에서도 뜬다. `/login`은 `/` 를 포함하기 때문이다.

이 상태로 `yarn start` 를 실행하면 `http://localhost:3000/memo` 에서 `Note` 컴포넌트에 만들어 둔 메모장이, 또 `http://localhost:3000/login` 에서는 `Login` 컴포넌트에 넣어 둔 간단한 텍스트가 뜨게 된다. 이제 우리가 할 것은 `Login` 컴포넌트에 실제 로그인 페이지 레이아웃이 들어가도록 하는 것이다.



