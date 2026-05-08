import type { TaskPriority } from "./task.types";

export type SortBy = "createdAt" | "dueDate";
export type Order = "asc" | "desc";

export type GetTaskParams = {
  listId?: number;
  limit?: number;
  cursorValue?: string;
  cursorId?: number;
  priority?: TaskPriority;
  isCompleted?: boolean;
  dueBefore?: string;
  dueAfter?: string;
  sortBy?: SortBy;
  order?: Order;
};

export type CreateTask = {
  title: string;
  description?: string;
  listId?: number;
  priority?: TaskPriority;
  dueDate?: string;
};

export type UpdateTask = {
  title?: string;
  description?: string;
  listId?: number;
  priority?: TaskPriority;
  dueDate?: string;
  isCompleted?: boolean;
};
