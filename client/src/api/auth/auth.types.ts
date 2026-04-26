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

export type AuthResponse = {
  token: string;
  user: User;
};

export type TokenType = string | null;
