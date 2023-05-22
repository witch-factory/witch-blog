---
title: 블로그 한땀한땀 만들기 - 3. 글 상세 페이지 구조
date: "2023-05-22T00:00:00Z"
description: "블로그의 글 상세 페이지를 만들어 보자."
tags: ["blog", "web"]
---

이번에는 블로그의 글 상세 페이지를 만들어 보자. 일단 마크다운을 따와 보자. 아래 참고에 적어 놓은 페이지들을 많이 참고하였다.

# 1. 마크다운 가져오기

## 1.1. contentlayer 설치+설정

contentlayer라는 라이브러리를 가져오면 쉽게 할 수 있다. 필요한 라이브러리를 설치해 주자.

```
npm install contentlayer next-contentlayer rehype-highlight rehype-pretty-code shiki
```

그리고 `next.config.js`에 다음과 같이 설정하여 contentlayer 플러그인 등록

```js
// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:false,
};

module.exports = withContentlayer(nextConfig);
```

`tsconfig.json`에서 import 경로 alias 설정

```json
//tsconfig.json
// 출처 https://yiyb-blog.vercel.app/posts/nextjs-contentlayer-blog
{
  // ...
  "compilerOptions": {
    // ...
    "paths": {
      "@/contentlayer/generated": ["./.contentlayer/generated"],

      "@/contentlayer/generated/*": ["./.contentlayer/generated/*"]
    }
    // ...
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "./.contentlayer/generated"
  ]
}
```

## 1.2. contentlayer.config.js 설정

이제 `contentlayer.config.js`을 만들고 정의해야 한다. 여기서는 markdown파일을 어떻게 변환할 것인지를 설정한다.

일단 우리가 글에 넣을 메타데이터는 제목, 설명, 작성일, 태그들 정도가 생각난다. 이를 정의해 주자. 나의 영원한 프론트 리드 [이창희](https://xo.dev/)의 [블로그 코드](https://github.com/blurfx/ambienxo)에서 슬쩍해 왔다.

```js
const postFields={
  fields:{
    title:{
      type:'string',
      description:'The title of the post',
      required:true,
    },
    description: {
      type: 'string',
      description: 'The description of the post for preview and SEO',
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
    },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
};
```

이렇게 객체로 만든 이유는, `.md`파일과 `.mdx`파일을 따로 취급해 줘야 하기 때문이다. 다음과 같이 documentType을 2개 만들어 주자. 이렇게 documentType을 만들어 주면 contentlayer에서는 `filePathPattern`에 쓰인 파일 형식의 파일들을 자동으로 가져와서 `.contentlayer/generated`내의 `name`으로 정의된 폴더에 넣어 준다.

예를 들어 다음과 같이 정의하면 `.md`파일은 `.contentlayer/generated/Post`폴더에, `.mdx`파일은 `.contentlayer/generated/MDXPost`폴더에 넣어 준다.

```js
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.md',
  contentType:'markdown',
  ...postFields,
}));

export const MDXPost = defineDocumentType(() => ({
  name: 'MDXPost',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  ...postFields,
}));
```

그리고 github에서 제공하는 마크다운 확장(자동 링크, 각주, 표 등등)을 사용하도록 해주는 remark-gfm 설치

```
npm install remark-gfm
```

그리고 내 어플리케이션의 구성을 makeSource를 통해서 contentlayer에게 전달한다. 이때 플러그인 `remarkGfm`과 `rehypePrettyCode`를 import하는 걸 잊지 말자.

```js
const rehypePrettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
};

export default makeSource({
  // 마크다운 파일이 저장되어 있는 루트 폴더 내 경로
  contentDirPath: 'posts',
  // 사용할 document type
  documentTypes: [MDXPost, Post],
  // 각 contentType별로 사용할 플러그인 정의
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});
```

# 2. 글 상세 페이지

## 2.1. posts 페이지 내의 md, mdx 파일 동적 라우트

이제 글들을 이용해서 동적 라우터를 만들어야 한다. 이를 위해서는 getStaticPaths로 필요한 페이지 라우트를 생성하고, getStaticProps로 params를 이용해서 페이지별로 필요한 작업을 해야 한다. 

일단 루트의 `posts`폴더에 md파일이 바로 들어 있는 상황에서 동적 라우트를 생성해 보자. `pages/posts/[slug].tsx` 생성.

이때 contentlayer가 변환해 준 모든 파일은 `.contentlayer/generated`의 `allDocument`에 저장되어 있다. `allPosts`를 통해서 변환된 md파일을, `allMDXPosts`를 통해서 변환된 mdx파일을 가져올 수도 있지만 그냥 한번에 다 가져오자.

그리고 `.contentlayer/generated`에서 변환된 데이터가 어떻게 저장되는지 보면서 getStaticPaths를 작성하자. posts 뒤에 올 동적 경로는 `_raw.flattenedPath`에 저장되어 있다. 따라서 다음과 같이 작성하면 된다.

```tsx
export const getStaticPaths: GetStaticPaths = () => {
  const paths = allDocuments.map(({_raw})=>{
    return {
      params: {
        slug: _raw.flattenedPath,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
```

getStaticProps에서는 `params.slug`와 같은 `_raw.flattenedPath`를 가진 문서를 찾아서 page에 Props로 넘겨주면 된다.

```tsx
export const getStaticProps: GetStaticProps= ({params})=>{
  const post = allDocuments.find(
    (p) => p._raw.flattenedPath === params?.slug
  )!;
  return {
    props: {
      post,
    },
  };
};
```

이제 마크다운의 몇 가지 정보들을 가져와서 동적 라우트가 잘 만들어졌는지 보자. 다음 페이지에서 간단하게 글 상세 페이지를 설계할 것이다.

## 2.2. 글 상세 페이지 설계

md, mdx를 구분해서 넣어 줘야 한다. 이를 무엇으로 구분할 수 있을까? `.contentlayer/generated`의 변환 파일을 보면, `post.body` 객체에 `code` 속성이 있는지로 구분할 수 있다. mdx 파일 변환 결과에는 `post.body.code`속성이 있다.

md 파일의 경우 dangerouslySetInnerHTML을 이용하여 내용을 넣어주고, mdx 파일의 경우 contentlayer에서 제공하는 useMDXComponent를 사용하자.

dangerouslySetInnerHTML은 XSS 공격을 당할 가능성이 있어서 보안 위험이 있지만 여기서 출처가 될 문자열은 내가 올린 마크다운 파일뿐이므로 큰 문제는 없을 것이다.

일단 mdx 파일의 경우 `post.body.code`를 사용해야 하는데 md 파일의 경우 이게 없다. 따라서 이를 그냥 `PostPage` 내에서 사용할 시 undefined의 속성을 읽는다는 에러가 발생한다. 이게 있을 경우만 사용하는 MDXComponent 컴포넌트를 만들어 주자.

```tsx
import { useMDXComponent } from 'next-contentlayer/hooks';

interface MDXProps{
  code: string;
}

function MDXComponent(props: MDXProps) {
  const MDX = useMDXComponent(props.code);
  return <MDX />;
}
```

그 다음 이를 사용하는 PostPage 컴포넌트를 간단한 HTML 구조만 써서 만들어 주자. 스타일링은 일단 생각하지 말고.

```tsx
function PostPage({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <ul>
        {post.tags.map((tag: string)=><li key={tag}>{tag}</li>)}
      </ul>
      {'code' in post.body?
        <MDXComponent code={post.body.code}/>:
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      }
    </article>
  );
}
```

이렇게 하면 현재 post에 있는 모든 속성을 표시하는 글 상세 페이지가 만들어진다.

## 2.3. 동적 라우트 개선

그런데 현재 생각하기로는 `/posts`폴더의 하위 폴더를 통해서 글들을 분류하고 싶다. 예를 들어서 `/posts` 내에 A,B,C,D..폴더가 있고 각각의 내부에 글들이 있다면 `/posts/A`, `/posts/B`... 이런 동적 라우트가 자동으로 생기고 각 하위 폴더 내부의 글들에 대해서도 `posts/A/Apost1`, `posts/A/Apost2`... 이런 식으로 동적 라우트가 자동으로 생기도록 하고자 한다.

현재 만들고 싶은 글 분류는 cs, 프론트, 그 외 잡스러운 것들이 생각나는데, 그러니까 이런 식으로 분류하고 싶은 것이다.

![post-url](./post-url-structure.png)

먼저 프로젝트 루트 디렉토리에 `/posts/cs`, `/posts/front`, `/posts/misc` 폴더를 만들었다.





# 참고

https://github.com/MiryangJung/Build-Own-blog-With-Next.js

https://yiyb-blog.vercel.app/posts/nextjs-contentlayer-blog

https://github.com/blurfx/ambienxo

https://www.contentlayer.dev/docs/getting-started

https://github.com/kagrin97/NextJS-myblog