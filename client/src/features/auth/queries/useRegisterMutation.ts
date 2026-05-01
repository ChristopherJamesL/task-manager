import { useMutation } from "@tanstack/react-query";
import { httpRegister } from "../api/auth.api";
import type { RegisterInput, RegisterResponse } from "../api/auth.types";

export function useRegisterMutation() {
  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: httpRegister,
  });
}
