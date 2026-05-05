import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import type { GetTaskParams } from "../types/tasks.request.types";

export function useTasksQuery(params?: GetTaskParams) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskService.getTasks(params),
    placeholderData: (prev) => prev,
  });
}
