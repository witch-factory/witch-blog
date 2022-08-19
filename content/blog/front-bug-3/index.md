---
title: 프로젝트 트러블 슈팅 - React-Router child route 만들기
date: "2022-08-19T00:00:00Z"
description: "React Router에서 nested route를 다루는 문제"
tags: ["web", "study", "front", "html", "react"]
---

# 1. 문제의 발생

진행하고 있는 프로젝트에서는 SPA인 리액트로 여러 페이지를 구성하기 위해 `react-router-dom`을 사용한다. 이때 비슷한 url을 가지는 여러 개의 라우트를 사용해야 하는 경우가 있다. 예를 들어서 계정에 관련된 라우트는 account로 시작하고 어떤 목적으로 쓰이는 페이지인지에 따라서 다른 URL을 가지게 할 것이다.

즉 다음과 같은 라우트들이 있는 건 자연스럽다. 로그인 라우트, 가입한 이메일을 찾는 기능을 하는 라우트, 비밀번호를 찾는 라우트가 있다.

```jsx
<Routes>
  <Route path="account/login" element={<LoginPage />} />
  <Route path="account/find/email" element={<FindEmailPage />} />
  <Route path="account/find/password" element={<FindPasswordPage />} />
</Routes>
```

그러나 분명 공통된 부분이 있는데 이 부분을 전혀 살리지 못하고 있다. 따라서 이렇게 다양한 라우트들을 묶는 방법을 정리한다.

# 2. 문제 해결의 시작 - Nested Route

먼저 예시를 위해 다음과 같은 `App.tsx` 코드를 작성하였다.

```jsx
// BrowserRouter는 index.tsx에서 처리해 주었다
import { Routes, Route } from "react-router-dom";

function MainPage() {
  return <div>메인 페이지</div>;
}

function LoginPage() {
  return <h1>로그인 페이지</h1>;
}

function FindEmailPage() {
  return <h1>이메일 찾기 페이지</h1>;
}

function FindPasswordPage() {
  return <h1>비밀번호 찾기 페이지</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="account/login" element={<LoginPage />} />
      <Route path="account/find/email" element={<FindEmailPage />} />
      <Route path="account/find/password" element={<FindPasswordPage />} />
    </Routes>
  );
}

export default App;
```

이렇게 하면 `/account`를 공통으로 갖는 라우트가 메인 페이지로부터 3개 생긴다.

# 참고

리액트 라우터 공식문서 https://reactrouter.com/docs/en/v6/components/route
