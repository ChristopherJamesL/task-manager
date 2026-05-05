import { useQuery } from "@tanstack/react-query";
import { listService } from "../services/lists.service";

export function useListsQuery() {
  return useQuery({
    queryKey: ["lists", "all"],
    queryFn: listService.getLists,
  });
}
