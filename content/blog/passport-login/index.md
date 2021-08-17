---
title: Express - passport로 로그인 구현하기
date: "2021-08-17T00:00:00Z"
description: "Passport 사용하기, 그 삽질의 기록"
tags: ["passport", "web"]
---

# 1. Passport 는

Express를 이용해서 백엔드 클론코딩을 하고 있는데, 회원가입과 로그인을 구현하는 데 있어 passport라는 미들웨어를 사용하기로 하였다. 굉장히 골치아팠던 끝에 이뤄낸 코드와 이해였기에 부족하지만 이곳에 흔적을 남긴다. 주로 passport 공식 문서를 기반으로 내가 이해한 내용이다.

유저로부터 입력을 받아서 이 유저가 DB에 존재하는 유저인지 확인하고 아이디와 패스워드를 대조해서 로그인 성공 혹은 실패를 알려주고 싶다고 하자. 

이는 우리가 흔히 사용하는 사이트에 당연히 있는 기능이다. 어딘가에 내 정보가 저장되어 있고 내가 아이디와 비밀번호를 입력하면 맞는 입력일 때 또는 틀린 입력임에 따라 특정 동작을 해 주는 것이다.(보통 로그인 성공시에는 보고 있던 원래 페이지에서 로그인만 성공한 상태로 리다이렉트된다)

그러면 이것을 실제로 구현하려면 어떻게 할까.

가장 단순한 방식은, post 메서드를 이용하여 사용자가 클라이언트에서 보낸 요청(req)에 들어 있는 아이디와 비밀번호를 유저 DB에서 조회하는 방식을 생각할 수 있다.(`SELECT * FROM USER WHERE ID=req.body.id and PASSWORD=req.body.password `) 

DB에 유저 정보가 암호화된 상태로 저장되어 있다면 `req.body` 의 정보를 salting+hashing 해준 후에 조회해주어야 하겠지만 기본 로직은 같을 것이다.

그러나 이런 방식은 그다지 좋지 않다.

가령 다음과 같은 코드를 작성한다고 하자.

```javascript
app.post("/login", (req, res)=>{
    /* 유저가 입력한 정보를 DB에 쿼리를 날려 검증하고
     로그인 성공/실패시에 해줄 동작을 작성해 준다 */
})
```

그러면 유저 입력에 대응되는 쿼리를 DB에 날리고 성공/실패에 따라 특정 동작을 해주는 것이 하나의 콜백 함수 안에서 모두 이루어진다. 이는 난잡하고 좋지 않다. 따라서 나온 것이 Passport이다. 페이지에서 온 요청에 대한 인증과 그 결과에 따라 실행되는 콜백을 분리해 주는 것이다.

즉, Passport는 Node.js에서 인증을 위해 쓰이는 미들웨어이다(http://www.passportjs.org/docs/ 공식 문서에서 발췌) . 다음 코드와 같이 사용된다.

```javascript
app.post('/login',
  passport.authenticate('local'),
  //'local' 인수가 무슨 뜻인지는 글 뒤쪽에 다룬다
  function(req, res) {
    // 인증이 성공했을 시에 이 콜백이 호출된다
  });
```

위 코드의 주석에 써 있다시피 authenticate 가 성공하면 다음 라우트 핸들러(콜백함수)가 호출된다. 그럼 만약 실패하면? 401에러(자격 증명 없음)가 응답되고 라우트 핸들러는 실행되지 않는다. 포스트 메서드는 401에러로 끝나버린다.

이렇게 바로 post 요청을 처리하기 전에, 인증을 거쳐주는 미들웨어가 passport인 것이다. 정확히는 인증을 해주는 strategy(아이디/비밀번호로 인증하는 방식, 구글/페이스북 따위로 인증하는 방식 등이 있다. 페이지에 온 요청에 대해 어떻게 인증할 것인지를 결정해 준다고 생각하면 된다)에 연결시켜 준 후 그 결과를 받아오는 것이다.



# 2. 인증 결과 다루기

passport는 post메서드로 온 요청을 authenticate strategy로 연결해 주고 그 결과를 받아오는데, 그 결과를 다루는 몇 가지 방법들도 제공하고 있다.

## 2.1 리다이렉션

가령 로그인 인증이 성공하면 홈 페이지로, 실패하면 다시 로그인 페이지로 돌아가게 하는 리다이렉션을 생각해 볼 수 있다.

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));
```

그건 위와 같이 처리할 수 있다. 직관적이지 않은가? 인증이 성공하면 successRedirect의 페이지로, 실패하면 failureRedirect의 페이지로 이동하는 것이다.

## 2.2 플래시 메시지

성공 혹은 실패했을 시에 한번 뜨고 사라지는 플래시 메시지를 띄워 주는 것도 가능하다.

로그인할 때 오타 따위로 정보를 잘못 입력해서 `아이디 혹은 비밀번호가 틀렸습니다` 따위의 경고창이 뜨는 걸 누구나 한번쯤 겪어 봤을 것이다. 혹은 로그인이 성공했을 때 `환영해요!` 같은 메시지를 띄워 주는 것 등 말이다. 바로 그런 창을 띄워 주는 기능이다.

이는 `authenciate` 함수의 두번째 인자로 주는 객체에 `successFlash`, `failureFlash` 옵션을 주는 것으로 가능하다. 

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   successFlash: '환영합니다!',
                                   failureFlash: true })
);
```

`successFlash` 에는 `환영합니다!` 라는 커스텀 메시지를, `failureFlash`에는 단순한 true 옵션을 주었다. 이렇게 `failureFlash`에 true옵션만 주면 passport에서 인증을 위해 연결한 strategy의 인증 콜백에서 나온 에러 메시지를 출력해 주는 코드가 된다.

각 strategy에서 사용하는 인증 콜백에서 나온 에러 메시지가 가장 정확하므로 이런 식으로 Flash 옵션에 true만 주는 것이 제일 무난한 방식이다.

단 최신 익스프레스에서는 플래시 메시지를 띄워 주는 기능이 분리되었으므로 `connect-flash` 미들웨어를 설치해야 사용할 수 있다.

passport에서 제공해 주는 이런 빌트인 리다이렉션 기능들을 사용하면, 성공시에 라우트 핸들러로 넘어가는 동작은 실행되지 않는다.

## 2.3 세션 사용하지 않기

보통 한번 로그인하면 로그인한 정보는 세션에 저장된다. 그러나 어떤 정보는 매우 민감하여 거기에 접근할 때마다 인증을 거쳐야 한다든지 하는 경우 이렇게 세션에 로그인 정보를 저장해 놓는 것은 불필요하다. 그럴 땐 `authentiacate` 함수에 세션을 사용하지 않는 옵션을 줄 수 있다.

```javascript
passport.authenticate('basic', { session: false })
//세션을 사용하지 않는다
```

## 2.4 인증 결과를 커스텀 콜백으로 다루기

passport에서 기본적으로 제공하는 이런 옵션들이 마음에 들지 않을 경우, 인증 결과(성공/실패)에 따라 특정 동작을 하게 하는 커스텀 콜백함수를 직접 짤 수도 있다.

```javascript
app.get('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
      //만약 어떤 예외가 발생할 시 err에 특정 값이 들어갈 것이다. 예외가 없을 시 null
    if (!user) { return res.redirect('/login'); }
      //인증 실패시에 user는 false로 설정될 것이다.
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
```

이때 `authenticate` 함수는 라우트 미들웨어로 들어간 게 아니라 라우트 핸들러에 들어 있다. 이는 `authenticate` 함수 내에서 호출하는 콜백에서 `req`와 `res`에 접근할 수 있게 해 준다.

그리고 커스텀 콜백을 사용하게 되면 위의 코드에서 `req.logIn` 을 사용하는 것과 같이, 세션을 다루는 것을 따로 코드로 작성해줘야 한다.

# 3. Passport를 쓰기 위한 설정하기

