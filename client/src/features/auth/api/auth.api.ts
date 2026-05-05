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
  console.log("signin: ", response.data);

  return response.data.data;
};

export const httpRegister = async (
  data: RegisterInput,
): Promise<RegisterResponse> => {
  const response = await apiClient.post("/auth/register", data);
  console.log("register: ", response.data);
  return response.data.data;
};

export const httpGetMe = async (): Promise<MeResponse> => {
  const response = await apiClient.get("/auth/me");
  console.log("me: ", response.data);
  return response.data.data;
};

export const httpLogout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post("/auth/logout");

  console.log("http logout response: ", response.data);
  return response.data.data;
};
