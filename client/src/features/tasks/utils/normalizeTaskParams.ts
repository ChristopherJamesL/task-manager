import type { GetTaskParams } from "../types/tasks.request.types";

export function normalizeTaskParams(params?: GetTaskParams): GetTaskParams {
  if (!params) return {};

  const normalized = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== null && value !== undefined,
    ),
  ) as GetTaskParams;

  return normalized;
}
