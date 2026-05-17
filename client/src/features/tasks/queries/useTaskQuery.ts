import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";

export function useTaskQuery(taskId: number) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => taskService.getTaskById(taskId),
    enabled: !!taskId,
  });
}
