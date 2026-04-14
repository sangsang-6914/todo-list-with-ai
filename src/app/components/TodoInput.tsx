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
          className={`flex-1 min-w-0 rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors ${
            isTooLong
              ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          }`}
        />
        <button
          type="submit"
          disabled={isEmpty || isTooLong}
          className="shrink-0 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          추가
        </button>
      </form>
      {isTooLong && (
        <p className="mt-1.5 text-xs text-red-500">20자 이내로 입력해주세요</p>
      )}
    </div>
  );
}
