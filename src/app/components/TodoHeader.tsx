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
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-tight">
        Encar
      </h1>
      <p className="mt-2 text-center text-sm text-gray-400">
        {completedCount}/{totalCount} 완료
      </p>
    </div>
  );
}
