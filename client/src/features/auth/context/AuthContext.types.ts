import type { RegisterInput, SigninInput, User } from "../api/auth.types";

export type AuthStatus = "booting" | "authenticated" | "unauthenticated";

export type AuthContextType = {
  authStatus: AuthStatus;
  user: User | null;
  signIn: SignInType;
  register: RegisterType;
  logout: LogoutType;
  setAuthUser: SetAuthUserType;
};

export type SignInType = (data: SigninInput) => Promise<User>;

export type RegisterType = (data: RegisterInput) => Promise<User>;

export type LogoutType = () => Promise<void>;

export type SetAuthUserType = (user: User) => void;
