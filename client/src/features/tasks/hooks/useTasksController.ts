import { useState } from "react";
import { useCreateTaskMutation } from "../queries/useCreateTaskMutation";
import { useDeleteTaskMutation } from "../queries/useDeleteTaskMutation";
import { useTasksQuery } from "../queries/useTasksQuery";
import { useUpdateTaskMutation } from "../queries/useUpdateTaskMutation";
import { useTaskFilters } from "./useTaskFilters";
import type { Task } from "../types/task.types";
import type {
  UseTasksControllerProps,
  UseTasksControllerReturn,
} from "../types/tasks.controller.types";

export function useTasksController({
  listId,
}: UseTasksControllerProps): UseTasksControllerReturn {
  const [createTaskError, setCreateTaskError] = useState<string | null>(null);
  // const [cursor, setCursor] = useState<{ id: number; value: string } | null>(
  //   null,
  // );

  const { filters, searchParams, toggleFilter, setSort, resetFilters } =
    useTaskFilters();

  const {
    data: tasks,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTasksQuery({
    ...(listId !== undefined && { listId }),
    ...filters,
    // cursorId: cursor?.id,
    // cursorValue: cursor?.value,
  });

  const createTask = useCreateTaskMutation();
  const deleteTask = useDeleteTaskMutation();
  const updateTask = useUpdateTaskMutation();

  const handleCreateTask = (title: string, selectedListId?: number) => {
    const finalListId = selectedListId ?? listId;

    if (!title.trim()) return;

    if (!finalListId) {
      setCreateTaskError(
        "Please select a list from the dropdown menu above before creating a task",
      );
      return;
    }

    setCreateTaskError(null);

    createTask.mutate({
      title,
      listId: finalListId,
    });
  };

  const handleToggleTaskComplete = (task: Task) => {
    updateTask.mutate({
      id: task.id,
      data: {
        isCompleted: !task.isCompleted,
      },
    });
  };

  const handleDeleteTask = (taskId: number) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    deleteTask.mutate(taskId);
  };

  // const handleLoadMore = () => {
  //   if (!hasNextPage) return;

  //   fetchNextPage();
  // };

  return {
    tasks: tasks?.pages.flatMap((page) => page.data.tasks) ?? [],

    isLoading,
    isError,
    createTaskError,

    // nextCursor: tasks?.pages[tasks.pages.length - 1]?.meta.nextCursor ?? null,
    // hasNextPage:
    //   tasks?.pages[tasks.pages.length - 1]?.meta.hasNextPage ?? false,

    filters,
    searchParams,
    toggleFilter,
    setSort,
    resetFilters,

    handleCreateTask,
    handleToggleTaskComplete,
    handleDeleteTask,

    // handleLoadMore,
    handleLoadMore: fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
  };
}
