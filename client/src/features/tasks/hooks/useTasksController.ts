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
  const { filters, searchParams, toggleFilter, setSort, resetFilters } =
    useTaskFilters();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useTasksQuery({
    ...(listId !== undefined && { listId }),
    ...filters,
  });

  const createTask = useCreateTaskMutation();
  const deleteTask = useDeleteTaskMutation();
  const updateTask = useUpdateTaskMutation();

  const handleCreateTask = (title: string) => {
    if (!title.trim()) return;

    createTask.mutate({
      title,
      listId,
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

  return {
    tasks: tasks?.data?.tasks ?? [],
    rawTasks: tasks,
    isLoading,
    isError,

    filters,
    searchParams,
    toggleFilter,
    setSort,
    resetFilters,

    handleCreateTask,
    handleToggleTaskComplete,
    handleDeleteTask,
  };
}
