---
title: 책 커뮤니티 만들기 - 3. 메인 페이지 제작 - 1
date: "2022-02-11T00:00:00Z"
description: "책 커뮤니티 메인 페이지 만들기, 그 첫걸음"
tags: ["web", "project"]
---

# 1. styled-components 설치

css를 그대로 쓰는 대신 styled-components 라이브러리를 사용할 것이므로 이를 client 폴더 내부에 설치해 준다.

```
npm install styled-components
```

그리고 잘 되는지 확인해 보기 위해 styled-components  공식 문서에 있는 Button 코드를 가져와서 한번 메인 페이지에 넣어 보았다.

```react
import React from 'react';
import styled from 'styled-components';

const MyButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

function MainPage() {
  return (
    <MyButton>예시버튼</MyButton>
  );
}

export default MainPage;
```

예시 버튼이 잘 표시되는 것을 알 수 있다. 이제 본격적으로 메인 페이지의 요소들을 만들어 보자.

# 2. 사이트 로고

사이트 로고에 들어갈 문구는 프로젝트 팀원인 하늘(https://github.com/hamuneulbo)님의 아이디어대로 만들었다. `Reviewary - 너와 나의 리뷰 도서관` 이라는 문구를 로고에 적기로 하였다. 지금은 아직 페이지의 형태만 간단하게 잡는 단계이므로 적당히 만들었다.

```react
const HeaderMainLogo = styled.h1`
  font-size:3rem;
  margin: 3px;
`;

const HeaderSubLogo = styled.h2`
  font-size:1.5rem;
  margin:0;
`;

function HeaderLogo() {
  return (
    <>
      <HeaderMainLogo>Reviewary</HeaderMainLogo>
      <HeaderSubLogo>너와 나의 리뷰 도서관</HeaderSubLogo>
    </>
  );
}
```

# 3. 메뉴

흔한 드롭다운 메뉴를 만들기로 했다. 



# 5. 참고

styled-components 공식문서 https://styled-components.com/

드롭다운 메뉴 만들기 https://programming-oddments.tistory.com/177

드롭다운 메뉴 2 https://andela.com/insights/react-js-tutorial-on-creating-a-custom-select-dropdown/

css flex https://studiomeal.com/archives/197

