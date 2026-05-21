import type { TaskPriority } from "../types/task.types";
import type { TaskFilterProps } from "../types/taskFilters.types";

const completionFilters = [
  { label: "All", action: "reset" as const },
  { label: "Completed", key: "isCompleted", value: "true" },
  { label: "Active", key: "isCompleted", value: "false" },
];

const priorityFilters = [
  { label: "Low", value: "low" as TaskPriority },
  { label: "Medium", value: "medium" as TaskPriority },
  { label: "High", value: "high" as TaskPriority },
];

export default function TaskFilters({
  filters,
  searchParams,
  toggleFilter,
  setSort,
  resetFilters,
}: TaskFilterProps) {
  const hasFilters = searchParams.size !== 0;

  const isCreatedAt = filters.sortBy === "createdAt";
  const isDueDate = filters.sortBy === "dueDate";
  const isAsc = filters.order === "asc";

  return (
    <div className="flex gap-2 mt-2">
      {completionFilters.map((filter) => {
        if (filter.action === "reset") {
          return (
            <button
              key={filter.label}
              className={`border px-1 rounded cursor-pointer
                ${hasFilters ? "hover:bg-green-200" : "bg-green-400"}
              `}
              onClick={resetFilters}
            >
              {filter.label}
            </button>
          );
        }

        const isActive =
          filter.value === "true"
            ? filters.isCompleted === true
            : filters.isCompleted === false;

        return (
          <button
            key={filter.label}
            className={`border px-1 rounded cursor-pointer               
              ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
            `}
            onClick={() => toggleFilter(filter.key!, filter.value)}
          >
            {filter.label}
          </button>
        );
      })}

      {priorityFilters.map((filter) => (
        <button
          key={filter.label}
          className={`border px-1 rounded cursor-pointer
                    ${filters.priority === filter.value ? "bg-blue-500 text-white" : "hover:bg-blue-100"}    
                `}
          onClick={() => toggleFilter("priority", filter.value)}
        >
          {filter.label}
        </button>
      ))}

      <button
        className={`border px-1 rounded cursor-pointer flex items-center gap-1
            ${isCreatedAt ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
        onClick={() => setSort("createdAt")}
      >
        Created At{" "}
        {isCreatedAt && <span className="text-xs">{isAsc ? "▲" : "▼"}</span>}
      </button>

      <button
        className={`border px-1 rounded cursor-pointer flex items-center gap-1
            ${isDueDate ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
        onClick={() => setSort("dueDate")}
      >
        Due Date{" "}
        {isDueDate && <span className="text-xs">{isAsc ? "▲" : "▼"}</span>}
      </button>
    </div>
  );
}
