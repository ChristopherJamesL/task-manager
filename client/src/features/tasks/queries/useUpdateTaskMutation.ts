import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";
import type { UpdateTask } from "../types/tasks.request.types";

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTask }) =>
      taskService.updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
