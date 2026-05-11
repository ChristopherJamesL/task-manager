import {
  httpSignIn,
  httpLogout,
  httpGetMe,
  httpRegister,
} from "../api/auth.api";
import { setToken, removeToken } from "../api/auth.token";
import type { RegisterInput, SigninInput, User } from "../types/auth.types";

export const authService = {
  async signIn(data: SigninInput): Promise<User> {
    const res = await httpSignIn(data);
    const { token, user } = res.data;
    setToken(token);
    return user;
  },

  async register(data: RegisterInput): Promise<User> {
    const res = await httpRegister(data);
    return res.data.user;
  },

  async me(): Promise<User> {
    const res = await httpGetMe();
    return res.data.user;
  },

  async logout(): Promise<void> {
    await httpLogout();
    removeToken();
  },
};
