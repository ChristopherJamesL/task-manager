import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useCreateListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listService.createList,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}
