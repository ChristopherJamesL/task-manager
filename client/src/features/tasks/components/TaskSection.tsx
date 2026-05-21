import { useState } from "react";
import TaskListItem from "../../tasks/components/TaskListItem";
import TaskFilters from "../../tasks/components/TaskFilters";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import type { TaskSectionProps } from "../../tasks/types/taskFilters.types";

export default function TaskSection({
  tasks,
  filters,
  searchParams,
  toggleFilter,
  setSort,
  resetFilters,
  handleToggleTaskComplete,
  handleCreateTask,
  handleDeleteTask,
}: TaskSectionProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    handleCreateTask(input);
    setInput("");
  };

  return (
    <div className="min-w-2xl">
      <TaskFilters
        filters={filters}
        searchParams={searchParams}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
      />

      <div className="mt-6">
        <h2 className="font-medium mb-2">Tasks</h2>

        <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
          <Input
            className="border p-2 flex-1"
            placeholder="New task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button type="submit" className="px-3 text-sm">
            Create task
          </Button>
        </form>

        <div className="min-h-50">
          {tasks?.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            <ul>
              {tasks?.map((task) => {
                const isDimmed =
                  task.isCompleted && filters.isCompleted !== true;

                return (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    isDimmed={isDimmed}
                    handleToggleTaskComplete={handleToggleTaskComplete}
                    handleDeleteTask={handleDeleteTask}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
