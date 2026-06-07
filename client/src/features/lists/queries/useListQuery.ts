import { useQuery } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useListQuery(listId: number) {
  return useQuery({
    queryKey: ["lists", listId],
    queryFn: () => listService.getListById(listId),
    enabled: !!listId,
    staleTime: 1000 * 30,
  });
}
