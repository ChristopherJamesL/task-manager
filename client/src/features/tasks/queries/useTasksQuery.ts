import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import { normalizeTaskParams } from "../utils/normalizeTaskParams";
import type { GetTaskParams } from "../types/tasks.request.types";

export function useTasksQuery(params?: GetTaskParams) {
  const normalizedParams = normalizeTaskParams(params);

  return useQuery({
    queryKey: ["tasks", normalizedParams],
    queryFn: () => taskService.getTasks(normalizedParams),
    placeholderData: (prev) => prev,
  });
}
