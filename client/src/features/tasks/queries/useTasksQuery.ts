import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import { normalizeTaskParams } from "../utils/normalizeTaskParams";
import { stableStringify } from "../../../utils/queryKeys";
import type { GetTaskParams } from "../types/tasks.request.types";

export function useTasksQuery(params?: GetTaskParams) {
  const normalized = normalizeTaskParams(params);

  return useQuery({
    queryKey: ["tasks", stableStringify(normalized)],
    queryFn: () => taskService.getTasks(normalized),
    placeholderData: (prev) => prev,
  });
}
