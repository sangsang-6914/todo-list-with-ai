import { type Filter, FILTER_LABELS } from "./types";

const FILTERS = Object.keys(FILTER_LABELS) as Filter[];

type TodoFilterProps = {
  current: Filter;
  onChange: (filter: Filter) => void;
};

/** 전체/완료/미완료 필터 탭 (슬라이드 인디케이터) */
export default function TodoFilter({ current, onChange }: TodoFilterProps) {
  const currentIndex = FILTERS.indexOf(current);

  return (
    <div className="relative mt-6 flex gap-1 rounded-xl bg-app-filter-track p-1">
      <div
        className="absolute top-1 bottom-1 rounded-lg bg-app-filter-thumb shadow-sm transition-all duration-300 ease-in-out"
        style={{
          width: `calc((100% - 8px) / ${FILTERS.length})`,
          left: `calc(${currentIndex} * (100% - 8px) / ${FILTERS.length} + 4px)`,
        }}
      />
      {FILTERS.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`relative z-10 flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors duration-200 ${
            current === key
              ? "text-app-filter-active"
              : "text-app-filter-inactive hover:text-app-filter-inactive-hover"
          }`}
        >
          {FILTER_LABELS[key]}
        </button>
      ))}
    </div>
  );
}
