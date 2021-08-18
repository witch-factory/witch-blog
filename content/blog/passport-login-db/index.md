---
title: Express - passport로 로그인과 회원가입 구현하기 - DB 연결하기
date: "2021-08-18T00:00:00Z"
description: "Passport 사용하기, 그 삽질의 기록2"
tags: ["passport", "web"]
---

# 1. 사용자 정보 DB 모델링하기

아까 passport를 이용해서 사용자 정보를 검증할 때에는 유저들의 정보를 단순한 객체 배열에 저장하였다. 그러나 이런 정보를 저장하기에 최적화된 DB를 따로 사용하는 게 합리적인 선택일 것이다. 나는 MySQL을 사용하기로 했다.

그럼 DB에 사용자를 저장할 때 어떤 정보로 저장해야 할까? 나는 간단하게 유저의 고유 ID와 아이디, 패스워드만을 저장하기로 했다. 다음 쿼리문을 MySQL에 날려서 유저 테이블을 생성해 주었다.

```mysql
create table users(
    id int not null primary key auto_increment,
    username nvarchar(20) not null,
    password nvarchar(20) not null
);
```

