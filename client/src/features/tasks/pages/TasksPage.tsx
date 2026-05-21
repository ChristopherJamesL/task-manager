import { useTasksController } from "../hooks/useTasksController";
import TaskSection from "../components/TaskSection";

export default function TasksPage() {
  const {
    tasks,
    rawTasks,
    isLoading,
    isError,
    filters,
    searchParams,
    setSort,
    toggleFilter,
    resetFilters,
    handleCreateTask,
    handleToggleTaskComplete,
    handleDeleteTask,
  } = useTasksController({});

  console.log("raw tasks: ", rawTasks);

  if (isLoading) return <div>Tasks loading...</div>;
  if (isError) return <div>Failed to load tasks.</div>;

  return (
    <div className="flex flex-col space-y-3">
      <div className="text-2xl font-semibold">TasksPage</div>
      <TaskSection
        tasks={tasks}
        filters={filters}
        searchParams={searchParams}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
        handleCreateTask={handleCreateTask}
        handleToggleTaskComplete={handleToggleTaskComplete}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
