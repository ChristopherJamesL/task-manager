import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useUpdateListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listService.updateList,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}
