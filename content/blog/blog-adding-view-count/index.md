---
title: 블로그에 조회수 추가하기
date: "2023-04-12T00:00:00Z"
description: "조회수를 블로그에 표시해 보기"
tags: ["blog", "web"]
---

블로그 조회수가 적게 나오는 것 같지는 않아서, 한번 블로그에 조회수 카운터를 만들어 보기로 했다.

# 1. 블로그를 구글 애널리틱스에 추가

[블로그를 Google Analytics에 추가](https://ha-young.github.io/2020/gatsby/Add-Google-Analytics/)글을 그대로 했다.

## 1.1. 계정 생성

구글 애널리틱스 계정을 새로 생성하자.

![create-account](./create-account.png)

그리고 웹사이트 속성도 설정한다.

![attr-set](./attr-setting.png)

비즈니스 정보도 적당히 설정한 후 약관 등에 동의하고 계정 생성을 마친다.

## 1.2. 데이터 스트림과 태그 추가

그 다음 데이터 스트림 메뉴에 들어가서 페이지의 데이터 스트림을 추가해 주자.

![data-stream](./create-data-stream.png)

어..그런데 다음과 같은 경고가 뜬다. 데이터 수집이 활성화되지 않았다고 한다.

![site-no-data](./site-no-data.png)

앞에서 획득한 측정 ID를 등록해 줘야 하기 때문이다. `gatsby-plugin-google-gtag`를 설치하자.

```
npm install gatsby-plugin-google-gtag
```

이렇게 하고 내 블로그의 gatsby-config.ts에 들어가 보니 이미 구글 애널리틱스와 관련된 항목이 있었다.

```ts
{
  resolve: 'gatsby-plugin-google-analytics',
  options: {
    trackingId: siteMetadata.googleAnalytics,
    head: true,
    anonymize: true,
    defer: true,
  },
},
```

gatsby-plugin-google-gtag의 옛날 버전이다. 그러나 우리는 이를 gtag로 바꿨으므로 거기에 맞게 내용을 바꿔주자.

```ts
{
  resolve: "gatsby-plugin-google-gtag",
  options: {
    trackingIds: [siteMetadata.googleAnalytics],
    gtagConfig: {
      anonymize_ip: true,
    },
    pluginConfig: {
      head: true,
    },
  },
},
```

그리고 아까 데이터 스트림을 추가하고 얻은 측정 ID를 `siteMetadata`에 추가한다. 나 같은 경우 blog-config에 있었다. 그런데 이런 siteMetadata를 사용하지 않는다면 그냥 문자열로 추가해도 된다.





# 참고

https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/

https://ha-young.github.io/2020/gatsby/Add-Google-Analytics/