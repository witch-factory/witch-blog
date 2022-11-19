---
title: 서강대학교 핀토스 - project 3
date: "2022-11-16T00:00:00Z"
description: "핀토스 프로젝트 3 - Threads"
tags: ["cs", "study", "os", "project"]
---

# 1. 프로젝트 시작

또 새로운 프로젝트가 나왔다. 그저 시작할 뿐이다..무엇을 해야 하는지부터 알아보자.

핀토스는 현재 라운드 로빈 스케줄러를 사용하고 있다. 그리고 각 프로세스, 스레드의 우선순위를 전혀 고려하지 않는다. 따라서 이번 프로젝트에서는 alarm, 우선순위 스케줄링, BSD스케줄러를 구현해야 한다.

주어진 것부터 검토하자.

## 1.1. 현재의 스케줄러

현재 라운드 로빈 방식으로 짜인 스케줄러는 어떻게 작동하는가?

```c
// src/threads/thread.c
void
thread_yield (void)
{
  struct thread *cur = thread_current ();
  enum intr_level old_level;

  ASSERT (!intr_context ());

  old_level = intr_disable ();
  if (cur != idle_thread)
    list_push_back (&ready_list, &cur->elem);
  cur->status = THREAD_READY;
  schedule ();
  intr_set_level (old_level);
}
```

현재 작동하고 있는 스레드를 ready_list의 맨 뒤에 넣고 schedule()을 호출한다. schedule()은 ready_list의 맨 앞에 있는 스레드를 실행시킨다. 이때 쓰이는 함수가 next_thread_to_run, switch_threads이다. 이런 방식으로 ready_list에 있는 스레드를 순서대로 실행시키는 것을 반복한다.

## 1.2. 현재의 알람

timer_sleep은 현재 시간을 기준으로 ticks만큼 대기하도록 하는 함수이다.

```c
void
timer_sleep (int64_t ticks)
{
  int64_t start = timer_ticks ();

  ASSERT (intr_get_level () == INTR_ON);
  while (timer_elapsed (start) < ticks)
    thread_yield ();
}
```

timer_ticks는 운영체제가 켜진 이후의 틱 수를 반환하는 함수이다. 그리고 timer_elapsed 함수는 start 부터의 지난 틱 수를 반환한다. 즉 위 함수는 start로부터 ticks만큼의 시간이 지날 때까지 thread_yield를 실행한다.

위에서 본 thread_yield의 작동 방식을 볼 때, 이 함수는 ticks의 시간 동안 현재 스레드를 ready_list의 맨 뒤에 넣고 다른 스레드를 실행시키는 것을 반복한다. 따라서 스레드들은 RUNNING 상태와 READY 상태를 계속 왕복하게 된다. 이는 비효율적이다. 따라서 이번 프로젝트의 목표 중 하나는 이 비효율을 개선하는 것이다.

# 2. alarm clock 개선
