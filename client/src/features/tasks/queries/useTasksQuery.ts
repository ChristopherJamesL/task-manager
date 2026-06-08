import { useInfiniteQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import { normalizeTaskParams } from "../utils/normalizeTaskParams";
import type { GetTaskParams, TaskCursor } from "../types/tasks.request.types";

export function useTasksQuery(params?: GetTaskParams) {
  const normalizedParams = normalizeTaskParams(params);

  return useInfiniteQuery({
    queryKey: ["tasks", normalizedParams],

    queryFn: ({ pageParam }: { pageParam: TaskCursor }) =>
      taskService.getTasks({
        ...normalizedParams,
        cursorId: pageParam?.id,
        cursorValue: pageParam?.value,
      }),

    initialPageParam: null,

    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? null,
  });
}
