import type { GetTasksResponse } from "./tasks.response.types";
import type { TaskSectionProps } from "./taskFilters.types";

export type UseTasksControllerProps = {
  listId?: number;
};

export type UseTasksControllerReturn = {
  rawTasks?: GetTasksResponse;
  isLoading: boolean;
  isError: boolean;
} & TaskSectionProps;
