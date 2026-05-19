import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useDeleteListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => listService.deleteList(id),

    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["lists", deletedId] });

      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
