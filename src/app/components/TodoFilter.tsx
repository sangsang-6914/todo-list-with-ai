import { type Filter, FILTER_LABELS } from "./types";

type TodoFilterProps = {
  current: Filter;
  onChange: (filter: Filter) => void;
};

/** 전체/완료/미완료 필터 탭 */
export default function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
      {(Object.keys(FILTER_LABELS) as Filter[]).map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            current === key
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {FILTER_LABELS[key]}
        </button>
      ))}
    </div>
  );
}
