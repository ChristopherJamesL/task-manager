import { apiClient } from "../client/client";
import type { SigninInput, RegisterInput, TokenType } from "./auth.types";

export const httpSignIn = async (data: SigninInput) => {
  const response = await apiClient.post("/auth/signin", data);
  return response.data;
};

export const httpRegister = async (data: RegisterInput) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const httpGetMe = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const httpLogout = async (token: TokenType) => {
  const response = await apiClient.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
