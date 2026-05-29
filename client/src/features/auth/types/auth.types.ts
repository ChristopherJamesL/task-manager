import type { ApiResponse } from "../../../types/api.types";

export type SigninPayload = {
  user: User;
};

export type UserPayload = { user: User };

export type LogoutPayload = { message: string };

export type SigninInput = {
  identifier: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export type SignInResponse = ApiResponse<SigninPayload>;

export type RegisterResponse = ApiResponse<UserPayload>;

export type MeResponse = ApiResponse<UserPayload>;

export type LogoutResponse = ApiResponse<LogoutPayload>;
