import ThemeToggle from "./ThemeToggle";

type TodoHeaderProps = {
  totalCount: number;
  completedCount: number;
};

/** 앱 타이틀과 완료 현황을 표시하는 헤더 */
export default function TodoHeader({
  totalCount,
  completedCount,
}: TodoHeaderProps) {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 -mr-1 -mt-1">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-app-text tracking-tight">
        Todo List
      </h1>
      <p className="mt-2 text-center text-sm text-app-muted">
        {completedCount}/{totalCount} 완료
      </p>
    </div>
  );
}
