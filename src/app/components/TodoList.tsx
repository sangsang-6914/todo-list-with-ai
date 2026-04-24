"use client";

import { useState, useEffect } from "react";
import { type Todo, type Filter } from "./types";
import { useLocalStorage } from "./useLocalStorage";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoItem from "./TodoItem";

const STORAGE_KEY = "todo-list-with-ai";

/** 투두리스트 전체를 구성하는 컨테이너 컴포넌트 */
export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  /** 새 투두 추가 */
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  }

  /** 완료 토글 */
  function handleToggle(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  /** 삭제 */
  function handleDelete(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-12 sm:py-20">
      <TodoHeader totalCount={todos.length} completedCount={completedCount} />
      <TodoInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      <TodoFilter current={filter} onChange={setFilter} />

      {!isMounted ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-app-spinner-track border-t-app-spinner-active" />
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {filteredTodos.length === 0 && (
            <li className="py-12 text-center text-sm text-app-subtle">
              할 일이 없습니다
            </li>
          )}
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
