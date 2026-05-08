import { useSearchParams } from "react-router";
import type { TaskPriority } from "../types/task.types";

export function useTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isCompletedParam = searchParams.get("isCompleted");
  const priorityParam = searchParams.get("priority");

  const isCompleted =
    isCompletedParam === "true"
      ? true
      : isCompletedParam === "false"
        ? false
        : undefined;

  const priority =
    priorityParam === "low" ||
    priorityParam === "medium" ||
    priorityParam === "high"
      ? (priorityParam as TaskPriority)
      : undefined;

  //   function setFilters(key: string, value?: string) {
  //     const params = new URLSearchParams(searchParams);

  //     if (value) {
  //       params.set(key, value);
  //     } else {
  //       params.delete(key);
  //     }

  //     setSearchParams(params);
  //   }

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    const current = params.get(key);

    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams({});
  }

  return {
    filters: {
      isCompleted,
      priority,
    },

    toggleFilter,
    resetFilters,
  };
}
