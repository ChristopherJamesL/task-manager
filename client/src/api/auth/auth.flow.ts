import { httpSignIn, httpLogout, httpRegister } from "./auth.api";
import type { RegisterInput, SigninInput, TokenType } from "./auth.types";
import type { SignInType, LogoutType } from "../../contexts/AuthContext.types";

export const signInFlow = async (data: SigninInput, signIn: SignInType) => {
  const response = await httpSignIn(data);
  console.log("Response: ", response);
  console.log("Token: ", response.data.token);

  signIn(response.data.token);

  return response.data.user;
};

export const logoutFlow = async (token: TokenType, logout: LogoutType) => {
  const response = await httpLogout(token);

  logout();

  return response;
};

export const registerFlow = async (data: RegisterInput, signIn: SignInType) => {
  await httpRegister(data);

  const user = await signInFlow(
    { identifier: data.email, password: data.password },
    signIn,
  );

  return user;
};
