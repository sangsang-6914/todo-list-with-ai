export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type Filter = "all" | "completed" | "incomplete";

export const FILTER_LABELS: Record<Filter, string> = {
  all: "전체",
  completed: "완료",
  incomplete: "미완료",
};
