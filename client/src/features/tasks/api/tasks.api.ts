import { apiClient } from "../../../api/client/client";
import type { Task } from "../types/task.types";
import type { CreateTask, GetTaskParams } from "../types/tasks.request.types";
import type { GetTasksResponse } from "../types/tasks.response.types";

export const httpGetTasks = async (
  params?: GetTaskParams,
): Promise<GetTasksResponse> => {
  const response = await apiClient.get("/tasks", {
    params,
  });
  return response.data;
};

export const httpGetTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data.data;
};

export const httpCreateTask = async (data: CreateTask): Promise<Task> => {
  const response = await apiClient.post("/tasks", data);

  return response.data.data;
};

export const httpUpdateTask = async (
  id: number,
  data: Partial<Task>,
): Promise<Task> => {
  const response = await apiClient.patch(`/tasks/${id}`, data);
  return response.data.data;
};

export const httpDeleteTask = async (id: number): Promise<Task> => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data.data;
};
