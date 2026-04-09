"use client";

import { useState, type FormEvent } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "completed" | "incomplete";

const FILTER_LABELS: Record<Filter, string> = {
  all: "전체",
  completed: "완료",
  incomplete: "미완료",
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "장보기", completed: false },
    { id: 2, text: "운동하기", completed: false },
    { id: 3, text: "책 읽기", completed: true },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  /** 새 투두 추가 */
  function handleSubmit(e: FormEvent) {
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
      {/* 타이틀 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-tight">
        Todo App
      </h1>
      <p className="mt-2 text-center text-sm text-gray-400">
        {completedCount}/{todos.length} 완료
      </p>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 active:bg-gray-800"
        >
          추가
        </button>
      </form>

      {/* 필터 탭 */}
      <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {(Object.keys(FILTER_LABELS) as Filter[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
              filter === key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {FILTER_LABELS[key]}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <ul className="mt-4 space-y-2">
        {filteredTodos.length === 0 && (
          <li className="py-12 text-center text-sm text-gray-400">
            할 일이 없습니다
          </li>
        )}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 transition-colors hover:border-gray-200"
          >
            {/* 체크박스 */}
            <button
              onClick={() => handleToggle(todo.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                todo.completed
                  ? "border-gray-900 bg-gray-900"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              aria-label={todo.completed ? "미완료로 변경" : "완료로 변경"}
            >
              {todo.completed && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            {/* 텍스트 */}
            <span
              className={`flex-1 text-sm transition-colors ${
                todo.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-900"
              }`}
            >
              {todo.text}
            </span>

            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDelete(todo.id)}
              className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 sm:opacity-100"
              aria-label="삭제"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
