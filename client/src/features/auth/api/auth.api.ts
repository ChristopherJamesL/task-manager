import { apiClient } from "../../../api/client/client";
import type {
  SigninInput,
  RegisterInput,
  TokenType,
  SignInResponse,
  RegisterResponse,
  MeResponse,
  LogoutResponse,
} from "./auth.types";

export const httpSignIn = async (
  data: SigninInput,
): Promise<SignInResponse> => {
  const response = await apiClient.post("/auth/signin", data);

  return response.data.data;
};

export const httpRegister = async (
  data: RegisterInput,
): Promise<RegisterResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data.data;
};

export const httpGetMe = async (token: string): Promise<MeResponse> => {
  const response = await apiClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const httpLogout = async (token: TokenType): Promise<LogoutResponse> => {
  const response = await apiClient.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
};
