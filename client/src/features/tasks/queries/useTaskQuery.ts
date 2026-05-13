import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";

export function useTaskQuery(taskId: number) {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => taskService.getTaskById(taskId),
    enabled: !!taskId,
  });
}
