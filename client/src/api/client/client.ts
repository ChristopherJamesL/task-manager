import axios from "axios";
import { getToken, removeToken } from "../../features/auth/api/auth.token";

let isRedirecting = false;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;

      removeToken();

      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);
