import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/tasks.service";

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
