import { createContext, useContext, useEffect, useState } from "react";
import { setToken, getToken, removeToken } from "../api/auth.token";
import {
  httpGetMe,
  httpLogout,
  httpRegister,
  httpSignIn,
} from "../api/auth.api";
import type { AuthContextType, AuthStatus } from "./AuthContext.types";
import type { RegisterInput, SigninInput, User } from "../api/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("booting");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const boot = async () => {
      console.log("booting...");

      const token = getToken();
      console.log("token: ", token);

      if (!token) {
        setAuthStatus("unauthenticated");
        return;
      }

      try {
        const response = await httpGetMe(token);
        console.log("boot response: ", response);

        setUser(response.user);
        setAuthStatus("authenticated");
      } catch (err) {
        removeToken();
        setUser(null);
        setAuthStatus("unauthenticated");
        console.log("Auth boot failed: ", err);
      }
    };

    boot();
  }, []);

  const setAuthUser = (user: User) => {
    setUser(user);
    setAuthStatus("authenticated");
  };

  const signIn = async (data: SigninInput) => {
    try {
      const response = await httpSignIn(data);

      const { token, user } = response;

      setToken(token);
      setAuthUser(user);

      return user;
    } catch (err) {
      removeToken();
      throw err;
    }
  };

  const register = async (data: RegisterInput) => {
    const {
      user: { email },
    } = await httpRegister(data);

    const response = await signIn({
      identifier: email,
      password: data.password,
    });

    return response;
  };

  const logout = async () => {
    try {
      const token = getToken();

      await httpLogout(token);
    } catch (err) {
      console.log("Server fail response: ", err);
    } finally {
      removeToken();
      setUser(null);
      setAuthStatus("unauthenticated");
    }
  };

  return (
    <AuthContext.Provider
      value={{ authStatus, user, signIn, register, logout, setAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
