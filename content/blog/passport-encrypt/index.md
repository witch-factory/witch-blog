---
title: Express - passport로 로그인과 회원가입 구현하기 - 암호화해서 정보 저장하기
date: "2021-08-19T00:00:00Z"
description: "Passport 사용하기, 그 삽질의 기록3"
tags: ["passport", "web"]
---

# 1. 사용자 정보 암호화

전 글에서는 DB에 사용자 정보를 평문으로 저장하였다. 그러나 이는 매우 위험한 행위이다. 어떤 이유로든 사용자 정보를 담은 DB가 유출되었을 경우에 해커가 사용자들의 정보를 그대로 알 수 있기 때문이다. 따라서 해커들이 DB를 털더라도 사용자 정보를 알아낼 수 없게 하기 위해 수많은 알고리즘이 개발되었다.

물론 해킹 기술도 발전하므로 SHA1 과 같은, 폐기된 알고리즘들도 있다. 하지만 여전히 뚫기 힘든 암호화 알고리즘들이 존재한다. 그러나 그런 알고리즘들을 하나하나 공부하려는 목적의 글은 아니므로 우리는 crypto 모듈을 사용하기로 한다. 그중에서도 scrypt를 사용한다.

먼저 crypto 모듈을 설치해주자.

```
yarn add crypto
```

crypto는 다양한 방식의 암호화를 지원한다. 먼저 salt를 뿌려주고 반복해서 hashing을 하는 간단한 방식의 pbkdf2 함수를 사용해 본다. 

일반적으로 이런 반복 해싱은 몇만 번 정도는 해 주는 게 보통이다. Django같은 경우 암호화를 위해 기본적으로 해싱을 36000번 해준다고 한다. 물론 이렇게 해도 GPU를 이용한 병렬 연산을 통해 공격하면 위험성이 있다. 그러나 이 정도로도 평문 저장과는 비교도 할 수 없이 안전하게 유저 정보를 저장할 수 있을 것이다.

pdkdf2의 사용법은 다음과 같다.

```
crypto.pbkdf2(암호화할 문자열, salt, 해싱의 반복 횟수, 생성될 암호 키의 길이, 해싱 방식, 콜백 함수)
```

이때 생성될 암호 키는 64를 많이 쓰는 듯 하다. 그리고 해싱 방식을 null로 할 경우 기본적으로 SHA1 방식으로 해싱된다. 이 방식은 이미 보안상의 위험성이 밝혀진 방식이므로 명시적으로 해싱 방식을 인수로 넣어 주도록 하자. crypto 공식 문서에서는 `SHA512` 를 사용했다.

그리고 콜백 같은 경우 `(err, derivedKey)`를 인수로 사용한다. 매우 직관적인 이름이다. 사용 예시는 다음과 같다.

```javascript
import {pbkdf2} from "crypto";

pbkdf2("witch-work", "salt", 65536, 64, "sha512", (err, derivedKey) => {
    if (err) {
        throw err;
    }
    //에러 발생시 핸들링
    console.log(derivedKey.toString("hex"));
});
```

이때 `derivedKey` 는 <Buffer> 로 넘어오기 때문에 보기 편하라고 toString으로 출력해 준 것이다.

그리고 salt는 원래 저런 단순한 문자열로 하면 안 된다. salt를 사용할지라도 `salt` 같은 누구라도 생각할 만한 단순한 문자열을 사용한다면 레인보우 테이블을 이용한 공격에 취약할 수 있다. 이 부분은 나중에 고쳐 주도록 하겠다. 보안은 단단할수록 좋겠지만, 우리는 이미 평문 저장에서 큰 걸음을 하나 내디뎠기 때문이다. 

그리고 패스워드를 저장하는 함수를 먼저 만들고 나서 암호화하는 방식을 강화한다고 해도 큰 문제는 없다. 그저 순서가 조금 달라질 뿐이다.

# 2. 사용자 정보 암호화해 저장하기

먼저 우리가 이전 글에서 만들었던, 새로운 유저 정보를 저장하는 함수를 다시 보도록 하자.

```javascript
const userInfoInsert = async (username, password) => {
    const userInsertQuery = "insert into users(username, password) values(?,?)";
    await connection.query(userInsertQuery, [username, password]);
};
```

DB 커넥션에 row 삽입 쿼리를 날리는 간단한 방식이다. 여기서, 인수로 받은 username과 password를 암호화하여 저장하도록 바꾸면 된다.





참고

zerocho 블로그 암호화 관련 포스트 https://www.zerocho.com/category/NodeJS/post/593a487c2ed1da0018cff95d

crypto 모듈 관련 블로그 포스트 https://lwndnjs93.tistory.com/101

GeeksforGeeks의 scrypt 메서드 관련 글 https://www.geeksforgeeks.org/node-js-crypto-scrypt-method/

scrypt로 패스워드 암호화하기 https://elvanov.com/2420

crypto 공식 문서 https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
