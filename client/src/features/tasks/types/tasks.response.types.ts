import type { Task } from "./task.types";

export type GetTasksResponse = {
  data: {
    tasks: Task[];
  };

  meta: {
    nextCursor: {
      value: string;
      id: number;
    } | null;

    hasNextPage: boolean;
  };
};
