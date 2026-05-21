import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useListQuery } from "../queries/useListQuery";
import { useUpdateListMutation } from "../queries/useUpdateListMutation";
import { useDeleteListMutation } from "../queries/useDeleteListMutation";
import { useTasksController } from "../../tasks/hooks/useTasksController";
import { formatName } from "../../../utils/format";
import TaskSection from "../../tasks/components/TaskSection";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function ListDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState("");

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();
  const listId = Number(id);

  const deleteList = useDeleteListMutation();
  const updateList = useUpdateListMutation();

  const {
    data: list,
    isLoading: listLoading,
    isError: listError,
  } = useListQuery(listId);

  const {
    tasks,
    isLoading: tasksLoading,
    isError: tasksError,

    filters,
    searchParams,
    toggleFilter,
    setSort,
    resetFilters,

    handleCreateTask,
    handleToggleTaskComplete,
    handleDeleteTask,
  } = useTasksController({ listId });

  const handleUpdateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!listName.trim()) return;

    updateList.mutate(
      {
        listId,
        name: listName,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleDeleteList = () => {
    if (!listId) return;

    if (!window.confirm("Delete this list?")) return;

    deleteList.mutate(listId, {
      onSuccess: () => {
        navigate("/lists");
      },
    });
  };

  const handleEdit = () => {
    if (!list) return;

    setListName(list.name);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDownEscape = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape" || !list) return;

    setListName(list.name);
    setIsEditing(false);
  };

  if (listLoading || tasksLoading) return <div>Loading...</div>;
  if (listError || tasksError) return <div>Failed to load</div>;
  if (!list) return <div>No list found</div>;

  const formattedDate = new Date(list.createdAt).toLocaleString();

  return (
    <div className="min-w-2xl">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          {isEditing ? (
            <form
              onSubmit={(e) => handleUpdateList(e)}
              onKeyDown={handleKeyDownEscape}
              className="flex items-center gap-2 flex-1"
            >
              <Input
                ref={inputRef}
                className="max-w-sm"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />

              <Button
                type="submit"
                disabled={updateList.isPending}
                className="text-sm"
              >
                Save
              </Button>

              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-sm"
                onClick={() => {
                  setListName(list.name);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">
                {formatName(list.name)}
              </h1>

              <Button
                type="button"
                className="text-sm px-1 py-0"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </>
          )}
        </div>
        <Button
          type="button"
          className="bg-red-500 px-3 py-1 text-sm"
          onClick={handleDeleteList}
        >
          Delete List
        </Button>
      </div>

      <p className="text-sm text-gray-500">Created at: {formattedDate}</p>

      <TaskSection
        tasks={tasks}
        filters={filters}
        searchParams={searchParams}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
        handleToggleTaskComplete={handleToggleTaskComplete}
        handleCreateTask={handleCreateTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
