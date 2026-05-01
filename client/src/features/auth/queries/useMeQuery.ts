import { useQuery } from "@tanstack/react-query";
import { httpGetMe } from "../api/auth.api";

export function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      console.log("GET /me");
      return httpGetMe();
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
