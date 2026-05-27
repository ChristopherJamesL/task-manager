import type { TaskSectionProps } from "./taskFilters.types";
import type { PaginatedMeta } from "../../../types/api.types";

export type UseTasksControllerProps = {
  listId?: number;
};

export type UseTasksControllerReturn = {
  isLoading: boolean;
  isError: boolean;
  createTaskError: string | null;

  hasNextPage: PaginatedMeta["hasNextPage"];
  isFetchingNextPage: boolean;

  handleLoadMore: () => Promise<unknown>;
} & TaskSectionProps;
