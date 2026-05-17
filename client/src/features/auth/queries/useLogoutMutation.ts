import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,

    onSettled: () => {
      queryClient.setQueryData(["me"], null);
      navigate("/signin", { replace: true });
    },
  });
}
