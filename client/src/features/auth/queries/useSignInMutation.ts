import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export function useSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signIn,

    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
    },
  });
}
