import type { GetTaskParams } from "../types/tasks.request.types";

export function normalizeTaskParams(params?: GetTaskParams): GetTaskParams {
  if (!params) return {};

  return {
    listId: params.listId,
    limit: params.limit,
    cursorValue: params.cursorValue,
    cursorId: params.cursorId,
    priority: params.priority,
    isCompleted: params.isCompleted,
    dueBefore: params.dueBefore,
    dueAfter: params.dueAfter,
    sortBy: params.sortBy,
    order: params.order,
  };
}
