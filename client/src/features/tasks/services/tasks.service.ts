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
    const res = await httpGetTaskById(id);
    return res.data.task;
  },

  async createTask(data: CreateTask): Promise<Task> {
    const res = await httpCreateTask(data);
    console.log(res);

    return res.data.task;
  },

  async updateTask(id: number, data: UpdateTask): Promise<Task> {
    const res = await httpUpdateTask(id, data);
    return res.data.task;
  },

  async deleteTask(id: number): Promise<Task> {
    const res = await httpDeleteTask(id);
    return res.data.task;
  },
};
