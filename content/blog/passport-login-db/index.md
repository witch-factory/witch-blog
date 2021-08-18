---
title: Express - passport로 로그인과 회원가입 구현하기 - DB 연결하기
date: "2021-08-18T00:00:00Z"
description: "Passport 사용하기, 그 삽질의 기록2"
tags: ["passport", "web"]
---

# 1. 사용자 정보 DB 만들기

## 1.1 DB 모델링

아까 passport를 이용해서 사용자 정보를 검증할 때에는 유저들의 정보를 단순한 객체 배열에 저장하였다. 그러나 이런 정보를 저장하기에 최적화된 DB를 따로 사용하는 게 합리적인 선택일 것이다. 나는 MySQL을 사용하기로 했다.

나는 Express를 사용하고 있으므로 먼저 DB를 Express에 연결해 줘야 한다. 따라서 먼저 MySQL과의 연결을 구성해 줄 것이다.

```javascript
// mysql/mysql_connection.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
//.env 파일을 사용해서 DB 접속 정보를 숨겼다
const connection=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

export default connection;
```

그럼 DB에 사용자를 저장할 때는 어떤 정보를 어떻게 저장해야 할까? 나는 간단하게 유저의 고유 ID와 아이디, 패스워드만을 저장하기로 했다. 다음 쿼리문을 MySQL에 날려서 유저 테이블을 생성해 주었다.

```mysql
create table users(
    id int not null primary key auto_increment,
    username nvarchar(20) not null unique,
    password nvarchar(20) not null
);
```

DB 연결이 성공적으로 수행되고 나면 `connection.query(쿼리문)` 으로 쿼리를 날려 줄 수 있는데 나는 그것을 통해 테이블을 만들어 주었다. 터미널에서 MySQL 커맨드라인으로 하는 게 편한 사람이라면 그렇게 해주어도 된다. 하지만 어차피 로그인과 회원가입 관련 api를 만들면서 `query` 함수를 통해서 SQL 쿼리를 날릴 일이 많이 생길 것이므로 그것을 사용하는 걸 추천한다.

아무튼 저렇게 유저 정보 테이블을 구성하고 나면, 어플리케이션에서 온 요청을 검증해야 할 때 테이블에 쿼리를 날려서 검증할 수 있을 것이다. 그런데 테이블에 정보가 있어야 검증에 사용할 수 있을 것이다. 

## 1.2 테이블에 정보 추가

따라서 insert 문을 이용해서 테이블에 정보를 추가해 주자.

이때 나중에 회원가입을 만들면서 새로운 유저를 삽입하는 동작을 만들어야 한다고 생각해서, 지금 미리 뼈대라도 잡아 놓기로 했다. `username` 과 `password` 를 전달받아서 `users` 테이블에 삽입해 주는 함수는 다음과 같다.

```javascript
const userInfoInsert = async (username, password) => {
    const userInsertQuery = "insert into users(username, password) values(?,?)";
    await connection.query(userInsertQuery, [username, password]);
    console.log("새로운 유저 정보 삽입 완료");
};
```

그리고 임시로 `/user-insert` 경로를 만들어서 그곳에서 유저 정보 삽입을 할 수 있도록 하자. 이러면 postman을 통해서 쉽게 새로운 정보를 삽입하게 해줄 수 있다.

```javascript
app.post("/user-insert", async(req, res)=>{
    const {username, password}=req.body;

    try{
        //간단한 에러 핸들링. username이 중복된 요청이 들어온다든가 하는 경우 에러가 발생함
        const result=await userInfoInsert(username, password);
        res.send("유저 정보 삽입 성공");
    }
    catch(err){
        res.send("에러 발생");
    }
});
```

몇 개의 데이터를 삽입하였다. `SELECT * FROM USERS` 쿼리를 날려주면 다음과 같이 내가 삽입한 유저 정보를 확인할 수 있었다. 이제 이걸 이용해서 유저 정보를 검증하도록 만들어 주자.

```
+----+----------+----------+
| id | username | password |
+----+----------+----------+
|  1 | test     | testpw   |
|  2 | test1    | testpw1  |
|  5 | test2    | testpw2  |
|  7 | test3    | testpw3  |
+----+----------+----------+
```

# 2. DB를 이용해 로그인 요청 검증하기

