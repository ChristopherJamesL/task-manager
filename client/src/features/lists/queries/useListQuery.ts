import { useQuery } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useListQuery(listId: string) {
  return useQuery({
    queryKey: ["lists", listId],
    queryFn: () => listService.getListById(listId),
    enabled: !!listId,
  });
}
