export type TaskPriority = "low" | "medium" | "high";
export type SortBy = "createdAt" | "dueDate";
export type Order = "asc" | "desc";

export type Task = {
  id: number;
  userId: number;
  listId: number | null;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  priority: TaskPriority;
  dueDate?: string | null;
  createdAt: string;
};

export type TaskFilterProps = {
  filters: {
    isCompleted?: boolean;
    priority?: TaskPriority;
    sortBy?: SortBy;
    order?: Order;
  };

  searchParams: URLSearchParams;

  toggleFilter: (key: string, value: string) => void;
  setSort: (value: SortBy) => void;
  resetFilters: () => void;
};
