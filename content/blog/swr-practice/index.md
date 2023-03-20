---
title: 데이터 fetch library SWR 익히기 - 간단한 예제
date: "2023-03-20T00:00:00Z"
description: "SWR 라이브러리 학습기록 - 실제로 해보기"
tags: ["web", "study", "front", "project"]
---

앞선 글에서 SWR를 간단하게 배워보았다. 이어서 SWR을 간단하게나마 실제로 써보았다. 그리고 SWR로 전역 상태 관리를 할 수 있는 편법도 알아본다.

# 1. 사전 작업

아주 간단한 todoList를 만들 것이다. CRA typescript로 어플리케이션을 만들었다. 이전 글에서 모두 해놓은 작업이다.

SWR 설치

```bash
npm i swr
```

다른 폴더에 json-server 설치

```bash
mkdir json-server-test && cd json-server-test
npm init -y
npm install json-server
```

프로젝트 루트에 db.json 파일을 생성하자. 내용은 다음과 같이 간단한 todo리스트 파일을 작성하였다.

```json
{
  "todos": [
    {
      "id": 1,
      "content": "Learn React",
      "done": false
    },
    {
      "id": 2,
      "content": "Learn Redux",
      "done": false
    },
    {
      "id": 3,
      "content": "Learn React Native",
      "done": false
    }
  ]
}
```

json-server를 설치한 폴더의 package.json의 스크립트에 다음과 같은 내용을 추가하자. json-server를 포트 5000으로 실행하도록 하는 것이다.

```json
"scripts": {
  "start": "json-server --watch db.json --port 5000",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

그리고 axios를 설치한다. 서버에 요청을 보내기 위한 것이다.

```bash
npm i axios
```

# 2. TodoList 구성하기

이제 TodoList를 작성할 것이다. 먼저 CRA의 기본 파일들을 지우고 다음과 같은 내용에서 시작하자. App.tsx를 다음처럼 바꾸면 될 것이다.

```tsx
function TodoListPage() {
  return <div>TodoList</div>;
}

export default TodoListPage;
```

그럼 todoList엔 뭐가 필요할까? 아무래도 기본적인 CRUD면 충분할 것 같다.

## 2.1. 기초 컴포넌트 구현하기

TodoListPage 컴포넌트를 최상단으로 하고, todo 항목들은 이 컴포넌트에서 관리하도록 하자. 그리고 이를 편집하는 기능들은 따로 각각의 item들로 내려보내는 형식으로 컴포넌트를 구성한다.

먼저 TodoListPage 컴포넌트를 다음과 같이 구성하자.

```tsx
function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      content: "Learn React",
      done: false,
    },
    {
      id: 2,
      content: "Learn Redux",
      done: false,
    },
    {
      id: 3,
      content: "Learn React Native",
      done: false,
    },
  ]);

  return (
    <main>
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <TodoListForm addTodo={(todo) => setTodos([...todos, todo])} />
    </main>
  );
}
```

그리고 todo 항목들을 보여주는 TodoList 컴포넌트를 다음과 같이 구현한다. 간단한 unordered list로 구성하였다.

```tsx
function TodoList({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          setTodo={(newTodo) => {
            setTodos(todos.map((td) => (td.id === newTodo.id ? newTodo : td)));
          }}
        />
      ))}
    </ul>
  );
}
```

이제 각각의 TodoListItem 컴포넌트를 구성한다. 이 컴포넌트는 todo 항목을 보여주고, done을 편집할 수 있도록 한다. list item 태그로 구성하였다.

```tsx
function TodoListItem({
  todo,
  setTodo,
}: {
  todo: Todo;
  setTodo: (todo: Todo) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          setTodo({
            ...todo,
            done: !todo.done,
          });
        }}
      />
      {todo.content}
    </li>
  );
}
```

그리고 TodoListForm 컴포넌트를 구성한다. 이 컴포넌트는 todo 항목을 추가할 수 있도록 한다. form 태그로 구성하였다.

```tsx
function TodoListForm({ addTodo }: { addTodo: (todo: Todo) => void }) {
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 4,
    content: "",
    done: false,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo({
          id: newTodo.id + 1,
          content: "",
          done: false,
        });
      }}
    >
      <input
        type="text"
        value={newTodo.content}
        onChange={(e) => {
          setNewTodo({ ...newTodo, content: e.target.value });
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

편집 중인 내역은 이 컴포넌트에서만 가지고 있으면 된다고 생각하여, 새로 추가할 요소의 내용을 담은 newTodo는 이 컴포넌트에서만 가지고 있도록 하였다. 그리고 이를 추가하는 addTodo 함수를 props로 내려받아서 사용하였다.

이제 create, read 기능을 구현하였다. 이렇게 하고 나면 다음과 같이 별로 예쁘진 않지만 todoList스러운 무언가가 완성되었다. 

![cr](./todolist-CR.png)

이제 update, delete 기능을 구현해보자.

## 2.2. update, delete 기능 구현하기

delete 기능은 TodoListItem 컴포넌트 단위에서 구현할 수 있다. 이때 TodoListItem이 받는 props를 먼저 바꾸자. 현재는 setTodo라는 이름으로 되어 있는데 이를 updateTodo로 바꾸고 deleteTodo props를 추가하자.

```tsx
function TodoListItem({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          updateTodo({
            ...todo,
            done: !todo.done,
          });
        }}
      />
      {todo.content}
      <button onClick={() => deleteTodo(todo)}>Delete</button>
    </li>
  );
}
```

그리고 TodoList 컴포넌트에서는 deleteTodo를 적절히 만들어서 넘겨주도록 하자.

```tsx
function TodoList({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          updateTodo={(newTodo) => {
            setTodos(todos.map((td) => (td.id === newTodo.id ? newTodo : td)));
          }}
          deleteTodo={(todo) => {
            setTodos(todos.filter((td) => td.id !== todo.id));
          }}
        />
      ))}
    </ul>
  );
}
```

이제 delete 기능을 구현하였다. 이렇게 하고 나면 다음과 같이 delete 버튼이 생겼다. 또한 잘 작동하는 것을 확인할 수 있다.

![todoList-delete](./todolist-delete.png)

이제 update 기능은 쉽다. TodoListItem 컴포넌트가 이미 todo를 업데이트하는 함수를 가지고 있기 때문에 이 컴포넌트만 편집해 주면 된다. 수정 상태인지를 알려주는 state를 추가한 후 이를 이용하여 input 태그를 보여주거나, span 태그를 보여주도록 하자.

```tsx
function TodoListItem({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          updateTodo({
            ...todo,
            done: !todo.done,
          });
        }}
      />
      {isEditing ? (
        <input
          type="text"
          value={todo.content}
          onChange={(e) => {
            updateTodo({
              ...todo,
              content: e.target.value,
            });
          }}
        />
      ) : (
        <span>{todo.content}</span>
      )}
      <button onClick={() => setIsEditing((prev) => !prev)}>
        {isEditing ? "Done" : "Edit"}
      </button>
      <button onClick={() => deleteTodo(todo)}>Delete</button>
    </li>
  );
}
```

이 코드에는 현재 문제가 있기는 하다. 보통 TodoList에서 항목 수정이 완료되는 시점은 수정 완료(여기서는 Done)버튼을 누르는 시점이어야 한다. 하지만 여기서는 수정 버튼을 누른 후 수정하는 그대로 todo항목의 내용이 바뀌어 버린다. 하지만 여기서는 수정하다가 이를 물릴 수 있는 방법이 없으므로 그냥 넘어가고, 이따 서버와 통신할 때 이를 따지기로 한다.

# 참고

https://maliethy.github.io/posts/swr/