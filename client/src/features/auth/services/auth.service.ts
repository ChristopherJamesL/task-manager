import {
  httpSignIn,
  httpLogout,
  httpGetMe,
  httpRegister,
} from "../api/auth.api";
import { setToken, removeToken } from "../api/auth.token";
import type { RegisterInput, SigninInput } from "../types/auth.types";

export const authService = {
  async signIn(data: SigninInput) {
    const res = await httpSignIn(data);
    setToken(res.token);
    return res.user;
  },

  async register(data: RegisterInput) {
    const res = await httpRegister(data);
    return res.user;
  },

  async me() {
    return httpGetMe();
  },

  async logout() {
    await httpLogout();
    removeToken();
  },
};
