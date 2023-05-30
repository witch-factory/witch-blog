---
title: 블로그 한땀한땀 만들기 - 8. 글 목록/상세보기 페이지
date: "2023-05-30T00:00:00Z"
description: "다른 페이지를 손봐주자"
tags: ["blog", "web"]
---

메인 페이지의 `Card` 컴포넌트를 만들고 있었는데 `Card`가 글 카테고리 페이지에서도 쓰이기 때문에 이를 위해서 썸네일을 만들어 주는 작업을 하려고 했다.

그러나 이를 설계하다 보니 사전에 해야 할 일이 점점 많아져서 먼저 다른 페이지들을 간단히나마 손보고 나서 할 예정이다. 이 글은 그렇게 다른 페이지를 약간 손보는 내용이다. 썸네일을 만드는 공사는 다음 글에 할 예정이다.

# 1. 글 목록 페이지 바꾸기

사실 메인 페이지에서 보이는 `Card` 컴포넌트의 용도 같은 경우 이미 이전 글에서 다 만들었다. 디자인에 아직 개선할 부분이 있지만 들어갈 내용은 다 들어가 있으니. 그런데 `Card`는 글 카테고리별로 글 목록을 보여주는 페이지에서도 쓰인다. 따라서 여기에 맞는 디자인도 해주자.

그런데 지금 글 목록 페이지에서 Card 컴포넌트가 어떻게 쓰이는지를 보면서 해야 하는데 글 목록 페이지가 아직 디자인되지 않았다. 따라서 글 목록 페이지에서 Card 컴포넌트를 잘 볼 수 있게 하기 위해서만 조금 바꿔주자. 

본격적으로는 좀 이후에 다시 다룰 것이다.(사실 글 목록 페이지는 별거 없어서 카드를 잘 디자인한다면 그 이후에 크게 엄청난 디자인이 있지 않을 거라 생각하지만)

먼저 전체 글 목록을 메인 페이지에서 했듯이 width 92%를 갖는 컨테이너로 한번 감싸고, 글 목록 태그(ul)의 기본 스타일을 없앤다. 또한 글 블럭 간의 약간의 간격 주기. 이 정도만 해도 썸네일을 넣고 괜찮은지 볼 정도의 레이아웃은 될 것 같다.

글 목록 페이지를 담당하는 `pages/posts/[category]/index.tsx` 파일을 열고 `PostListPage` 컴포넌트를 다음과 같이 수정한다.

```tsx
function PostListPage({
  category, postList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={styles.pagewrapper}>
    {/* container, list 클래스가 추가되었다 */}
      <div className={styles.container}>
        <h1>{category}</h1>
        <ul className={styles.list}>
          {postList.map((post: PostMetaData) => 
            <li key={post.url}>
              <Card {...post} />
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
```

그리고 위에서 추가된 클래스의 CSS는 다음과 같이 작성한다. 어차피 너비에 상관없이 같은 레이아웃이 될 부분이므로 미디어 쿼리는 없어도 된다.

```css
// pages/posts/[category]/style.module.css 에 해당 부분 추가
.container{
  width:92%;
  margin:0 auto;
}

.list{
  list-style:none;
  padding:0;
  margin:0;
  display:flex;
  flex-direction:column;
  gap:1rem;
}
```

# 2. 글로벌 CSS 적용

## 2.1. 글로벌 스타일

글 상세보기 페이지를 만들기 전에, 문제가 발생했다. 현재 배포된 블로그를 모바일에서 들어가 보았는데 글씨체도 다르고 간격도 약간씩 달라 보였다. 따라서 글로벌 reset CSS를 적용해 주자.

`src/styles/globals.css`를 편집해 주자.

[gatsby-starter-lavender](https://github.com/blurfx/gatsby-starter-lavender)의 글로벌 CSS를 거의 똑같이 따왔다.

```css
// src/styles/globals.css
:root {
  --white:#fff;
  --black:#000;

  --gray0:#f8f9fa;
  --gray1:#f1f3f5;
  --gray2:#e9ecef;
  --gray3:#dee2e6;
  --gray4:#ced4da;
  --gray5:#adb5bd;
  --gray6:#868e96;
  --gray7:#495057;
  --gray8:#343a40;
  --gray9:#212529;

  --indigo0:#edf2ff;
  --indigo1:#dbe4ff;
  --indigo2:#bac8ff;
  --indigo3:#91a7ff;
  --indigo4:#748ffc;
  --indigo5:#5c7cfa;
  --indigo6:#4c6ef5;
  --indigo7:#4263eb;
  --indigo8:#3b5bdb;
  --indigo9:#364fc7;

  font-family:"Pretendard", apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing:border-box;
  margin:0;
  padding:0;
}

html, body {
  min-height:100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

h1 {
  font-size:1.75rem;
}

h2 {
  font-size:1.5rem;
}

h3 {
  font-size:1.25rem;
}

h4 {
  font-size:1rem;
}

h5 {
  font-size:0.875rem;
}

h6 {
  font-size:0.75rem;
}

hr{
  margin:0.25rem 0;
  border:0;
  border-top:0.125rem solid var(--gray5);
}

img{
  display:block;
  margin:0 auto;
}

p{
  margin:0.75rem 0;
  line-height:1.625rem;
}

table{
  width:100%;
  margin:0.75rem 0;
  border-collapse:collapse;
  line-height:1.75rem;
}

tr{
  border-bottom:1px solid var(--gray5);
}

th, td{
  padding:0.75rem 0;
}

blockquote{
  padding-left:1rem;
  border-left:0.25rem solid var(--indigo7);
}

article{
  overflow-wrap:break-word;
}

article :is(ul, ol){
  margin-left:2rem;
}

article :is(ul, ol) :is(ul, ol){
  margin-left:1.5rem;
}

article :is(ul, ol) li{
  margin:0.375rem 0;
}

article :is(ul, ol) li p{
  margin:0;
}

article pre[class^="language-"]{
  border-radius:0.25rem;
}

pre[class*="language-"], code[class*="language-"]: {
  white-space: 'pre-wrap',
}
```

이렇게 하고 나면 메인 페이지의 레이아웃이 약간 변형된다. 원래대로 돌려 주는 작업을 좀 해주자.

## 2.2. 헤더, 푸터

내부에 레이아웃 생각할 요소도 많지 않거니와 가능한 거의 모든 것에 클래스를 박아 놓았기 때문에 고칠 게 없다.

## 2.3. 자기소개 컴포넌트

내 소개의 링크들이 article 태그의 후손인 ul 태그에 들어 있기에 글로벌 CSS의 영향을 받는다. 따라서 margin을 기본적으로 없애주고, p 태그의 line-height를 줄여준다. 그리고 linkbox 클래스를 만들어서 링크를 감싸는 li 태그의 margin을 없앤다.

```css
// src/components/profile/intro/styles.module.css
.description{
  margin:10px 0;
  word-break:keep-all;
  line-height:1.2;
}

.linklist{
  display:flex;
  flex-direction:row;
  list-style:none;
  padding-left:0;
  margin:0;
  margin-bottom:0.5rem;
  gap:0 15px;
}

.link{
  text-decoration:none;
  color:var(--indigo6);
}

.linkbox{
  margin:0;
}
```

Intro 컴포넌트 내부의 링크를 감싸는 부분에 `linkbox` 클래스 추가

```tsx
// src/components/profile/intro/index.tsx 일부
<ul className={styles.linklist}>
  {Object.entries(blogConfig.social).map(([key, value]) => (
    {/* 여기에 linkbox 클래스 추가 */}
    <li key={key} className={styles.linkbox}>
      <Link href={value} target='_blank' className={styles.link}>
        {key}
      </Link>
    </li>
  ))}
</ul>
```

## 2.4. 프로젝트 소개 컴포넌트

가장 먼저 보이는 건 ul 태그의 왼쪽 margin과 li의 상하 마진이다. 이를 없애주자. 일단 `projectList`전체를 감싸고 있는 article태그에 `styles.container` 클래스를 적용한 후 이 내부에 있는 ul, li에 대해서 모두 처리해 주면 된다.

```css
// src/components/projectList/styles.module.css에 추가
.container ul{
  margin-left:0;
}

.container li{
  margin:0;
}
```

그리고 현재는 개별 프로젝트 컴포넌트 간의 간격이 margin과 grid display의 gap이 섞여서 쓰이고 있는데 이를 gap으로 통일해주자.

projectList의 list 클래스의 gap을 1rem으로 설정.

```css
// src/components/projectList/styles.module.css에 추가
.list{
  list-style:none;
  padding:0;
  display:grid;
  grid-template-columns:1fr;
  grid-template-rows:1fr;
  gap:1rem;
}
```

project 컴포넌트의 container margin은 삭제. `projectList`의 제목과 프로젝트 사진을 같은 줄로 정렬하기 위해 container의 padding-left도 0으로. 또 프로젝트 이미지는 현재 `margin:0 auto;`로 설정되어서 이상하게 정렬되므로 이를 없애주자.

```css
// src/components/projectList/project/styles.module.css
.container{
  display: flex;
  flex-direction: row;
  gap:1rem;
  box-sizing: border-box;
  /* padding 수정됨 */
  padding:15px 15px 15px 0;
  min-height:150px;
}

.image{
  border-radius:1rem;
  /* margin 0으로 */
  margin:0;
}

@media (min-width: 768px) {
  .container{
    /* padding 수정됨 */
    padding:10px 10px 10px 0;
  }

  .image{
    display: block;
  }
}
```

projectList가 접힌 상태일 때도 row-gap이 적용되어 아래쪽에 여백이 생기는 문제가 있었다. 따라서 접힌 상태일 때는 row-gap을 없애주자.

그런데 이렇게만 하면 `list--close` 클래스는 화면 너비가 넓을 때도 적용되므로 화면 너비가 넓은 상태에서도 row-gap이 없어지는 문제가 있다. 따라서 화면 너비가 넓을 땐 적당한 gap을 또 적용해 주자.

```css
.list--close{
  grid-auto-rows:0;
  overflow:hidden;
  // 닫혀있을땐 row-gap 없게
  row-gap:0;
}

@media (min-width: 768px) {
  .list{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    grid-auto-rows:1fr;
    // 화면 너비 넓을 땐 gap이 늘 있다
    row-gap:1rem;
    column-gap:2rem;
  }
}
```

그리고 아래 컴포넌트와의 간격이 없어진 projectList 컨테이너에 약간의 하단 여백을 주자.

```css
// src/components/projectList/styles.module.css
.container{
  margin-bottom:2rem;
}
```

## 2.5. 글 카테고리 컴포넌트

`Category`와 `Card`컴포넌트를 손보자.

Category는 그냥 ul의 margin을 없애주고 container에 구분을 위한 약간의 하단 간격을 준다.

```tsx
// src/components/category/index.tsx
function Category(props: Props) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      
      <ul className={styles.list}>
        {props.items.map((item) => {
          return (
            <li key={item.url}>
              <Card
                {...propsProperty(item)}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

즉 CSS를 다음과 같이.

```css
// src/components/category/styles.module.css
.container{
  margin-bottom:2rem;
}

.list{
  list-style:none;
  padding:0;
  display: grid;
  gap:1rem;
  margin:0;
}

@media (min-width:768px){
  .list{
    grid-template-columns:repeat(3,1fr);
  }
}
```

그리고 `Card`의 경우에는 카테고리 제목과 정렬하기 위해 `padding-left`를 없애주고 hover 시에만 약간의 이펙트를 위해서 `padding-left`가 생기도록 했다. link 클래스만 편집해주면 된다.

```css
// src/components/card/styles.module.css
.link{
  display:block;
  height:100%;
  padding:1rem;
  padding-left:0;
  text-decoration:none;
  color:var(--black);
}

.link:hover{
  padding-left:1rem;
  border-radius: 1rem;
  color:var(--indigo6);
  background-color:var(--gray1);
}
```

# 3. 글 상세보기 페이지

## 3.1. 컨테이너 레이아웃

`/pages/posts/[category]/[slug].tsx`와 같은 디렉토리의 `styles.module.css`를 편집하자.

이는 글의 컨텐츠가 들어가는 위치에 wrapper class를 준 후 스타일링을 하면 된다. 클래스 이름은 간단하게 content로 지었다.

```tsx
// src/pages/posts/[category]/[slug].tsx
function PostPage({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={styles.pagewrapper}>
      <article className={styles.container}>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <ul>
          {post.tags.map((tag: string)=><li key={tag}>{tag}</li>)}
        </ul>
        {'code' in post.body?
        {/* 래퍼 클래스 post */}
          <div className={styles.content}>
            <MDXComponent code={post.body.code}/>
          </div>
          :
          <div 
            className={styles.content} 
            dangerouslySetInnerHTML={{ __html: post.body.html }} 
          />
        }
      </article>
    </main>
  );
}
```

예를 들어서 포스트 내의 h1 태그를 스타일링하고 싶다고 하면 `.content h1` 선택자에 스타일을 주면 된다. styled-component 같은 걸 쓸 때는 이렇게 불편하지 않았는데, 왜 CSS in JS가 유행했는지 좀 알 것 같다..

좀 폴더 구조 정리를 하자. 일단 `[slug].tsx`를 폴더로 분리하자. `pages/posts/[category]/[slug]` 폴더를 만들고 해당 폴더에 `index.tsx`와 `styles.module.css`를 생성한 후 원래 `[slug].tsx`에 있던 내용을 방금 만든 `index.tsx`에 옮기자.

그리고 포스트 내용 관련된 css는 다른 CSS 모듈 파일로 분리하자. `pages/posts/[category]/[slug]`에 `content.module.css`를 생성하고 .content 클래스를 만들어준다. 현재 `[slug]`폴더 내엔 index.tsx, styles.module.css, content.module.css가 있고 그 각각의 내용은 다음과 같다. `getStaticPaths, getStaticProps`는 이전 글에서 설명했으므로 생략하였다.

```tsx
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { getSortedPosts } from '@/utils/post';

import contentStyles from './content.module.css';
import styles from './styles.module.css';


interface MDXProps{
  code: string;
}

function MDXComponent(props: MDXProps) {
  const MDX = useMDXComponent(props.code);
  return <MDX />;
}

function PostPage({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <ul>
          {post.tags.map((tag: string)=><li key={tag}>{tag}</li>)}
        </ul>
        {'code' in post.body?
          <div className={contentStyles.content}>
            <MDXComponent code={post.body.code}/>
          </div>
          :
          <div
            className={contentStyles.content} 
            dangerouslySetInnerHTML={{ __html: post.body.html }} 
          />
        }
      </article>
    </main>
  );
}

export default PostPage;
```

`content.module.css`

```css
// src/pages/posts/[category]/[slug]/content.module.css
.content{
  margin:0 auto;
  width:100%;
  min-height:100vh;
}
```

`styles.module.css`

```css
// src/pages/posts/[category]/[slug]/styles.module.css
.page{
  margin:0 auto;
  width:100%;
  min-height:100vh;
}

.container{
  width:92%;
  /*max-width:calc(100% - 48px);*/
  margin:0 auto;
}

@media (min-width: 768px) {
  .page{
    max-width:50rem;
  }
}
```

## 3.2. 글 컨텐츠 레이아웃

이제 `content`클래스의 자식 셀렉터를 한번 만들어보자. `src/pages/posts/[category]/[slug]/content.module.css`를 편집하면 된다.

그리고 아주 좋은 레퍼런스가 있다. 그게 무엇인가? 원래 쓰던 [gatsby-starter-lavender](https://gatsby-starter-lavender.vercel.app/). 일단 여기 있는 걸 다 따오자.

```css
// src/pages/posts/[category]/[slug]/content.module.css
.content{
  margin:0 auto;
  width:100%;
  min-height:100vh;
  word-break:keep-all;
}

.content h1{
  margin: 2rem 0 1.25rem 0;
  padding-bottom:0.25rem;
  border-bottom:1px solid var(--gray5);
  font-weight:600;
}

.content h1 a{
  border-bottom:none;
}

.content h2{
  margin: 1.5rem 0 1rem 0;
  padding-bottom:0.25rem;
  border-bottom:1px solid var(--gray5);
}

.content h2 a{
  border-bottom:none;
}

.content a{
  border-bottom:1px solid var(--indigo7);
  color:var(--indigo7);
}

.content pre code{
  white-space:pre-wrap;
  word-break:break-all;
  overflow-wrap:break-word;
}

/* 점 병합에 관한 옵션 */
.content :is(pre,code){
  font-variant-ligatures: none;
}
```

그리고 코드를 예쁘게 만들기 위해 `contentlayer.config.js`에서 다음과 같이 rehype plugin 적용.

```js
// contentlayer.config.js
const rehypePrettyCodeOptions = {
  theme: 'github-light',
};

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [MDXPost, Post],
  markdown: {
    remarkPlugins: [remarkGfm, changeImageSrc],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
  mdx: {
    remarkPlugins: [remarkGfm, changeImageSrc],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], highlight],
  },
});
```

그런데 이렇게 해도 어쩐지 코드의 글씨체가 자꾸 monospace로 나왔다. 따라서 `content.styles.css`에 가서 `.content :is(pre,code)`에 `font-family`를 새로 주었다.

그리고 코드 블럭의 배경 등을 주기 위해서 다음과 같이 예의 `content.module.css` 내용을 추가했다.

```css
// src/pages/posts/[category]/[slug]/content.module.css

```css
.content pre code{
  white-space:pre-wrap;
  word-break:break-all;
  overflow-wrap:break-word;
}

/* 점 병합에 관한 옵션 */
.content :is(pre,code){
  font-family:monospace, Pretendard, apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-variant-ligatures: none;
  font-size:1rem;
  overflow:auto;
}

.content pre{
  margin:1rem 0;
  padding:1rem;
  border-radius:0.5rem;
  background-color:var(--gray1);
  line-height:1.5;
}

.content :not(pre) > code{
  padding:0.25rem;
  border-radius:0.25rem;
  background-color:var(--indigo0);
  color:var(--indigo9);
}

.content img{
  display:block;
  margin:0 auto;
  max-width:92%;
}

.content blockquote{
  border-left:2px solid var(--gray5);
  padding-left:1rem;
  color:var(--gray7);
}

.content p{
  line-height:1.625;
  margin-bottom:1.25rem;
}

.content p code{
  white-space:pre-wrap;
}

.content hr{
  border:0;
  border-top:1px solid var(--gray5);
  margin:0.5rem 0;
}
```

또 너무 화면 너비가 작아지면 글 양쪽의 여백이 너무 좁아지는 것 같아서 max-width를 전체 너비에서 48px는 작게 되도록 설정했다. ([토스 기술블로그](https://toss.tech/tech)의 레이아웃을 참고했다)

```css
// src/pages/posts/[category]/[slug]/styles.module.css
.container{
  width:92%;
  // 이걸 추가했다.
  max-width:calc(100% - 48px);
  margin:0 auto;
}
```

## 3.3. 글의 제목, 태그

이제 글은 잘 보인다 치자. 그런데 아직 제목과 작성시간, 태그는 기본 스타일로 보이고 있다. 여기에 적절한 스타일을 주자.

`src/pages/posts/[category]/[slug]/index.tsx`의 `PostPage`에 클래스들을 먼저 추가하자. 날짜 포매팅은 덤으로 해준다.

```tsx
function PostPage({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const dateObj=new Date(post.date);
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.time} dateTime={toISODate(dateObj)}>
          {formatDate(dateObj)}
        </time>
        <ul className={styles.tagList}>
          {post.tags.map((tag: string)=>
            <li key={tag} className={styles.tag}>{tag}</li>
          )}
        </ul>
        {'code' in post.body?
          <div className={contentStyles.content}>
            <MDXComponent code={post.body.code}/>
          </div>
          :
          <div
            className={contentStyles.content} 
            dangerouslySetInnerHTML={{ __html: post.body.html }} 
          />
        }
      </article>
    </main>
  );
}
```

그리고 각 요소 스타일링은 다음과 같다. `container`클래스에 margin을 줘서 헤더와 글 부분 간의 간격을 좀 두었다. `page` 클래스는 이전과 같다.

```css
// src/pages/posts/[category]/[slug]/styles.module.css
.container{
  width:92%;
  max-width:calc(100% - 48px);
  margin:0 auto;
  margin-top:2rem;
}

.title{
  font-size:2rem;
  font-weight:700;
  margin-bottom:1rem;
}

.time{
  display:block;
  font-size:1.25rem;
  font-weight:400;
  margin-bottom:0.5rem;
}

.tagList{
  list-style:none;
  margin:0;
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  gap:10px;
}

.tag{
  background-color:var(--indigo1);
  color:var(--indigo8);
  padding:5px;
  border-radius:5px;
}
```

# 3. favicon 바꾸기(+SEO)

# 4. TOC 만들어주기

# 참고

https://gamguma.dev/post/2022/01/nextjs-blog-development-review

TOC를 만들어보자 https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

is 유사 클래스 셀렉터로 여러 태그의 자식 선택 https://stackoverflow.com/questions/11054305/css-select-multiple-descendants-of-another-element

코드 포매팅 https://yiyb-blog.vercel.app/posts/nextjs-contentlayer-blog

https://maintainhoon.vercel.app/blog/post/blog_development_period