---
title: 프론트 지식 익히기 react - useReducer의 사용
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
