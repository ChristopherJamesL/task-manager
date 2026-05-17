import type { GetTaskParams } from "../types/tasks.request.types";

export function normalizeTaskParams(params?: GetTaskParams): GetTaskParams {
  if (!params) return {};

  const normalized = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, value]) => value !== null),
  ) as GetTaskParams;

  return normalized;
}
