import type { TaskPriority, SortBy, Order } from "./task.types";

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
  listId: number;
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

export type TaskCursor = {
  id: number;
  value: string; // postgres timestamptz serialized as text
} | null;
