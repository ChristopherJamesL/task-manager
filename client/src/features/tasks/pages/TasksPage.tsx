import { useState, type ChangeEvent } from "react";
import { useTasksController } from "../hooks/useTasksController";
import { useListsQuery } from "../../lists/queries/useListsQuery";
import { formatName } from "../../../utils/format";
import TaskSection from "../components/TaskSection";
import Select from "../../../components/Select";

export default function TasksPage() {
  const [selectedListId, setSelectedListId] = useState<number | undefined>();
  console.log("selected list id: ", selectedListId);

  const {
    data: lists,
    isLoading: listsLoading,
    isError: listsError,
  } = useListsQuery();
  console.log(
    "lists: ",
    lists?.map((list) => ({ name: list.name, id: list.id })),
  );

  const {
    tasks,
    isLoading: tasksLoading,
    isError: tasksError,
    createTaskError,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    filters,
    searchParams,
    setSort,
    toggleFilter,
    resetFilters,
    handleCreateTask,
    handleToggleTaskComplete,
    handleDeleteTask,
  } = useTasksController({});

  const handleListSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedListId(e.target.value ? Number(e.target.value) : undefined);
  };

  if (tasksLoading || listsLoading) return <div>Tasks loading...</div>;
  if (tasksError || listsError) return <div>Failed to load tasks.</div>;

  return (
    <div className="flex flex-col space-y-3">
      <div className="text-2xl font-semibold">TasksPage</div>

      <Select
        value={selectedListId ?? ""}
        onChange={(e) => handleListSelect(e)}
      >
        <option value="">Select list (required to create a task)</option>

        {lists?.map((list) => (
          <option key={list.id} value={list.id}>
            {formatName(list.name)}
          </option>
        ))}
      </Select>

      <TaskSection
        tasks={tasks}
        filters={filters}
        searchParams={searchParams}
        createTaskError={createTaskError}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        handleLoadMore={handleLoadMore}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
        handleCreateTask={(title) => handleCreateTask(title, selectedListId)}
        handleToggleTaskComplete={handleToggleTaskComplete}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
