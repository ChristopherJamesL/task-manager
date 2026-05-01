import { useQuery } from "@tanstack/react-query";
import { httpGetMe } from "../api/auth.api";
import { getToken } from "../api/auth.token";

export function useMeQuery() {
  const token = getToken();
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      console.log("GET /me");
      return httpGetMe();
    },
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
