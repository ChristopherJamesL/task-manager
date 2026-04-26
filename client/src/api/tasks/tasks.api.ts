import { apiClient } from "../client/client";

export const getTasks = async () => {
  const response = await apiClient.get("/tasks");
  return response.data;
};
