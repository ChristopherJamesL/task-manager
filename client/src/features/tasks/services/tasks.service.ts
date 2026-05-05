import {
  httpGetTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
} from "../api/tasks.api";
import type { Task } from "../types/task.types";
import type {
  GetTaskParams,
  CreateTask,
  UpdateTask,
} from "../types/tasks.request.types";
import type { GetTasksResponse } from "../types/tasks.response.types";

export const taskService = {
  async getTasks(params?: GetTaskParams): Promise<GetTasksResponse> {
    return httpGetTasks(params);
  },

  async getTaskById(id: number): Promise<Task> {
    return httpGetTaskById(id);
  },

  async createTask(data: CreateTask): Promise<Task> {
    return httpCreateTask(data);
  },

  async updateTask(id: number, data: UpdateTask): Promise<Task> {
    return httpUpdateTask(id, data);
  },

  async deleteTask(id: number): Promise<Task> {
    return httpDeleteTask(id);
  },
};
