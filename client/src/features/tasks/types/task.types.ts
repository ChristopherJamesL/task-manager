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

export type TaskActionHandlers = {
  handleToggleTaskComplete: (task: Task) => void;
  handleDeleteTask: (taskId: number) => void;
};

export type TaskListItemProps = {
  task: Task;
  isDimmed: boolean;
} & TaskActionHandlers;
