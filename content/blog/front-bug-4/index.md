---
title: 프로젝트 트러블 슈팅 - 체크박스 이벤트 다루기
date: "2022-08-23T00:00:00Z"
description: "체크박스의 이벤트 핸들링 그리고 기본 상태"
tags: ["web", "study", "front", "react"]
---

# 0. 선요약

프로젝트에서 체크박스를 다루면서 2가지 문제를 맞닥뜨렸다. 하나는 onClick과 onChange 둘 중 어떤 이벤트 핸들러 함수를 사용할지에 관한 것이었다. IE까지 고려한다면 onClick이 더 나았다. 하지만 IE의 서비스가 종료되고 점유율도 변변치 못한 지금 크게 신경쓸 문제는 아니었다. 하지만 체크박스의 값을 바꾸는 것은 결국 클릭 이벤트라는 것을 고려해서 onClick 이벤트 핸들러를 사용하기로 했다.

이때 onClick을 사용할 시, 체크박스의 초기 상태를 지정하는 checked props를 사용하지 못한다는 문제가 생겼다. 따라서 defaultChecked를 사용하여 해결했다. 이 과정을 정리해 둔다.

# 1. onClick vs onChecked

체크박스의 체크 여부 변경에 따라 어떤 동작을 해줘야 하는 경우가 생길 수 있다. 진행한 프로젝트에서 그런 경우는 첫째로 약관 동의 체크박스를 사용하는 경우가 있었다. 그리고 하나의 페이지에서 다른 페이지로 넘어갈 때 다른 페이지로 전달되는 상태가 있었는데, 그 상태에 어떤 내용을 포함시킬지 정하는 체크박스를 다뤄야 했다.

이때 체크박스가 체크되거나 체크 해제되는 이벤트를 다루기 위해 사용할 수 있는 핸들러 함수는 2개가 떠오른다. `onChange`와 `onClick`이다. 그럼 이 둘의 차이는 뭘까?

App 컴포넌트에 다음과 같은 코드를 작성하였다.

```jsx
function App() {
  const checkRef = useRef < HTMLInputElement > null;

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("체크박스 클릭됨" + e.currentTarget.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("체크박스 변경됨" + e.target.checked);
  };

  return (
    <div>
      <h1>체크박스 테스트</h1>
      <label htmlFor="onclick-checkbox">onClick을 쓰는 체크박스</label>
      <input id="onclick-checkbox" type="checkbox" onClick={handleClick} />
      <label htmlFor="onchange-checkbox">onChange 쓰는 체크박스</label>
      <input
        ref={checkRef}
        id="onchange-checkbox"
        type="checkbox"
        onChange={handleChange}
      />
    </div>
  );
}
```

두 체크박스는 크롬 환경에서는 완전히 똑같이 동작한다. 그러나 IE에서는 onChange가, 체크박스에서 focus가 벗어나는 시점에 이벤트가 발생한다고 한다(엣지 브라우저에서는 이런 문제가 없다). 이를 해결하기 위해 onClick을 사용하는 것이 좋다.

# 참고

https://devlog.jwgo.kr/2018/11/28/checkbox-error-with-react/

관련 스택오버플로우 질문답변 https://stackoverflow.com/questions/5575338/what-the-difference-between-click-and-change-on-a-checkbox

https://stackoverflow.com/questions/70022781/react-checkbox-event-preventdefault-breaks-onchange-function-why
