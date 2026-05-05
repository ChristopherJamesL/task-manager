import { useQuery } from "@tanstack/react-query";
import { getToken } from "../api/auth.token";
import { authService } from "../services/auth.service";

export function useMeQuery() {
  const token = getToken();
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
