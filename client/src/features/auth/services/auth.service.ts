import {
  httpSignIn,
  httpLogout,
  httpGetMe,
  httpRegister,
} from "../api/auth.api";
import type { RegisterInput, SigninInput, User } from "../types/auth.types";

export const authService = {
  async signIn(data: SigninInput): Promise<User> {
    const res = await httpSignIn(data);
    return res.data.user;
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
  },
};
