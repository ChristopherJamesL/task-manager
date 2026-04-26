export type AuthContextType = {
  isAuthenticated: boolean;
  signIn: SignInType;
  logout: LogoutType;
};

export type SignInType = (token: string) => void;

export type LogoutType = () => void;
