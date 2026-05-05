export type TaskPriority = "low" | "medium" | "high";

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
