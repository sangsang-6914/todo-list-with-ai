import { type Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

/** 개별 투두 카드 아이템 */
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-app-border-card bg-app-surface px-4 py-3.5 transition-colors hover:border-app-border-card-hover">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          todo.completed
            ? "border-app-checkbox-on bg-app-checkbox-on"
            : "border-app-checkbox-off hover:border-app-checkbox-off-hover"
        }`}
        aria-label={todo.completed ? "미완료로 변경" : "완료로 변경"}
      >
        {todo.completed && (
          <svg
            className="h-3 w-3 text-app-btn-text"
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
          todo.completed ? "text-app-muted line-through" : "text-app-text"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-app-muted transition-colors hover:bg-app-delete-hover-bg hover:text-app-delete-hover-text"
        aria-label="삭제"
      >
        삭제
      </button>
    </li>
  );
}
