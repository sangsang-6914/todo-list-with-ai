import { type Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

/** 개별 투두 카드 아이템 */
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 transition-colors hover:border-gray-200">
      <button
        onClick={() => onToggle(todo.id)}
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

      <span
        onClick={() => onToggle(todo.id)}
        className={`flex-1 text-sm cursor-pointer transition-colors ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        aria-label="삭제"
      >
        삭제
      </button>
    </li>
  );
}
