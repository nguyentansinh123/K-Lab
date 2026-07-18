import { apiFetch } from "./fetch";

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type GoogleCodeExchangeType = {
  code: string;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: string;
  imgUrl: string | null;
};

export type AuthReturnType = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: UserType;
};

export type RefreshReturnType = {
  accessToken: string;
  tokenType: string;
};

export const normalSignup = async (
  signupData: RegisterType,
): Promise<AuthReturnType> => {
  return apiFetch<AuthReturnType>("/auth/register", {
    method: "POST",
    body: JSON.stringify(signupData),
  });
};

export const normalLogin = async (
  loginData: LoginType,
): Promise<AuthReturnType> => {
  return apiFetch<AuthReturnType>("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

export const exchangeGoogleCode = async (
  code: string,
): Promise<AuthReturnType> => {
  const exchangeData: GoogleCodeExchangeType = { code };

  return apiFetch<AuthReturnType>("/auth/google/exchange", {
    method: "POST",
    body: JSON.stringify(exchangeData),
  });
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<RefreshReturnType> => {
  return apiFetch<RefreshReturnType>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
};

export const getCurrentUser = async (accessToken: string): Promise<UserType> => {
  return apiFetch<UserType>("/users/me", {
    method: "GET",
    token: accessToken,
  });
};

export const uploadCurrentUserAvatar = async (
  accessToken: string,
  image: File,
): Promise<UserType> => {
  const formData = new FormData();
  formData.append("image", image);

  return apiFetch<UserType>("/users/me/avatar", {
    method: "POST",
    token: accessToken,
    body: formData,
  });
};
