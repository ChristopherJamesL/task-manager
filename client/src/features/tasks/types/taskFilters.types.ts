import type {
  SortBy,
  Order,
  Task,
  TaskActionHandlers,
  TaskPriority,
} from "./task.types";

export type TaskFiltersState = {
  isCompleted?: boolean;
  priority?: TaskPriority;
  sortBy?: SortBy;
  order?: Order;
};

export type TaskFilterActions = {
  toggleFilter: (key: string, value: string) => void;
  setSort: (value: SortBy) => void;
  resetFilters: () => void;
};

export type TaskFilterProps = {
  filters: TaskFiltersState;
  searchParams: URLSearchParams;
} & TaskFilterActions;

export type TaskSectionProps = {
  tasks: Task[];
  filters: TaskFiltersState;
  searchParams: URLSearchParams;

  handleCreateTask: (title: string) => void;
} & TaskFilterActions &
  TaskActionHandlers;
