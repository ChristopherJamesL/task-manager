import { apiClient } from "../../../api/client/client";
import type {
  SigninInput,
  RegisterInput,
  SignInResponse,
  RegisterResponse,
  MeResponse,
  LogoutResponse,
} from "../types/auth.types";

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

export const httpGetMe = async (): Promise<MeResponse> => {
  const response = await apiClient.get("/auth/me");
  return response.data.data;
};

export const httpLogout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post("/auth/logout");
  return response.data.data;
};
