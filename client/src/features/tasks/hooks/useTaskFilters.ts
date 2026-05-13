import { useSearchParams } from "react-router";
import type { TaskPriority, SortBy, Order } from "../types/task.types";

export function useTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isCompletedParam = searchParams.get("isCompleted");
  const priorityParam = searchParams.get("priority");
  const sortByParam = searchParams.get("sortBy");
  const orderParam = searchParams.get("order");

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

  const sortBy =
    sortByParam === "createdAt" || sortByParam === "dueDate"
      ? (sortByParam as SortBy)
      : undefined;

  const order =
    orderParam === "asc" || orderParam === "desc"
      ? (orderParam as Order)
      : undefined;

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

  function setSort(sort: SortBy) {
    const params = new URLSearchParams(searchParams);

    const currentSort = params.get("sortBy");
    const currentOrder = params.get("order");

    if (currentSort === sort) {
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sortBy", sort);
      params.set("order", "desc");
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
      sortBy,
      order,
    },

    searchParams,

    toggleFilter,
    setSort,
    resetFilters,
  };
}
