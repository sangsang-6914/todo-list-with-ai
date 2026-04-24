type TodoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

const MAX_LENGTH = 20;

/** 할 일 입력 폼 */
export default function TodoInput({ value, onChange, onSubmit }: TodoInputProps) {
  const isEmpty = value.trim().length === 0;
  const isTooLong = value.length > MAX_LENGTH;

  return (
    <div className="mt-8">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="할 일을 입력하세요"
          autoFocus
          className={`flex-1 min-w-0 rounded-xl border bg-app-surface px-4 py-3 text-sm text-app-text placeholder:text-app-muted outline-none transition-colors ${
            isTooLong
              ? "border-app-input-error focus:border-app-input-error-focus"
              : "border-app-border focus:border-app-input-focus"
          }`}
        />
        <button
          type="submit"
          disabled={isEmpty || isTooLong}
          className="shrink-0 rounded-xl bg-app-btn px-5 py-3 text-sm font-medium text-app-btn-text transition-colors hover:bg-app-btn-hover active:bg-app-btn-active disabled:bg-app-btn-disabled disabled:text-app-btn-disabled-text disabled:cursor-not-allowed"
        >
          추가
        </button>
      </form>
      {isTooLong && (
        <p className="mt-1.5 text-xs text-app-error">20자 이내로 입력해주세요</p>
      )}
    </div>
  );
}
