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
  id: string;
  username: string;
  email: string;
};

export type SignInResponse = {
  token: string;
  user: User;
};

export type RegisterResponse = {
  user: User;
};

export type MeResponse = {
  user: User;
};

export type LogoutResponse = {
  message: string;
};

export type TokenType = string;

export type ApiError = {
  error: {
    message: string;
  };
};
