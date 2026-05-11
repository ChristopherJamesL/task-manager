import type { ApiResponse, PaginatedResponse } from "../../../types/api.types";
import type { Task } from "./task.types";

export type TasksPayload = { tasks: Task[] };

export type TaskPayload = { task: Task };

export type GetTasksResponse = PaginatedResponse<TasksPayload>;

export type TaskResponse = ApiResponse<TaskPayload>;
