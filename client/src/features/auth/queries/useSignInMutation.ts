import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpSignIn } from "../api/auth.api";
import { setToken } from "../api/auth.token";

export function useSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: httpSignIn,

    onSuccess: (data) => {
      setToken(data.token);

      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
