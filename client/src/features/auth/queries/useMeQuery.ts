import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
}
