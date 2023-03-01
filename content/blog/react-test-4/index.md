---
title: React Testing - Jest 4
date: "2023-03-02T00:00:00Z"
description: "프론트에 테스트 도입을 위한 공부, 간단한 페이지 만들기 2"
tags: ["javascript"]
---

# 1. Mock Service Worker

Mock Service Worker는 서버와의 통신을 모킹해주는 라이브러리다. 이를 사용하면 서버가 없어도 테스트를 할 수 있다.

이는 브라우저에 서비스 워커를 등록하여 서버에 요청을 보낼 때 외부로 나가는 요청을 가로채고, 가로챈 요청에 대한 응답을 Mock Service Worker의 클라이언트 사이드에서 만들어주는 방식으로 동작한다. 

이 응답은 핸들러에서 처리하며 이렇게 만든 응답은 브라우저로 다시 보내진다.

이때 브라우저 대신 서버를 생성한 후 Node로 서버를 직접 만들어 줄 수도 있다.

# 참고

https://www.daleseo.com/mock-service-worker/