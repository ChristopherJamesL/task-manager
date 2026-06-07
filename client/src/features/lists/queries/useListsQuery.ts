import { useQuery } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useListsQuery() {
  return useQuery({
    queryKey: ["lists"],
    queryFn: listService.getLists,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  });
}
