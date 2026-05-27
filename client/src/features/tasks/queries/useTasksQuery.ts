import { useInfiniteQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import { normalizeTaskParams } from "../utils/normalizeTaskParams";
import type { GetTaskParams } from "../types/tasks.request.types";

type Cursor = {
  id: number;
  value: string;
} | null;

export function useTasksQuery(params?: GetTaskParams) {
  const normalizedParams = normalizeTaskParams(params);

  return useInfiniteQuery({
    queryKey: ["tasks", normalizedParams],

    queryFn: ({ pageParam }: { pageParam: Cursor }) =>
      taskService.getTasks({
        ...normalizedParams,
        cursorId: pageParam?.id,
        cursorValue: pageParam?.value,
      }),

    initialPageParam: null,

    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? null,
  });
}
