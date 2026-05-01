import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpLogout } from "../api/auth.api";
import { removeToken } from "../api/auth.token";
import { useNavigate } from "react-router";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: httpLogout,

    onSuccess: () => {
      removeToken();

      queryClient.removeQueries({ queryKey: ["me"] });

      navigate("/signin", { replace: true });
    },
  });
}
