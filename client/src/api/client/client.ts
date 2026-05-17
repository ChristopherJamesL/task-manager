import axios from "axios";
import { queryClient } from "../queryClient";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) queryClient.setQueryData(["me"], null);

    return Promise.reject(error);
  },
);
