import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useListQuery } from "../queries/useListQuery";
import { useTasksQuery } from "../../tasks/queries/useTasksQuery";
import { useUpdateListMutation } from "../queries/useUpdateListMutation";
import { useDeleteListMutation } from "../queries/useDeleteListMutation";
import { useCreateTaskMutation } from "../../tasks/queries/useCreateTaskMutation";
import { useUpdateTaskMutation } from "../../tasks/queries/useUpdateTaskMutation";
import { useDeleteTaskMutation } from "../../tasks/queries/useDeleteTaskMutation";
import { useTaskFilters } from "../../tasks/hooks/useTaskFilters";
import { formatName } from "../../../utils/format";
import TaskListItem from "../../tasks/components/TaskListItem";
import TaskFilters from "../../tasks/components/TaskFilters";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import type { Task } from "../../tasks/types/task.types";

export default function ListDetailPage() {
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState("");

  const { filters, searchParams, toggleFilter, setSort, resetFilters } =
    useTaskFilters();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();
  const listId = Number(id);

  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const deleteList = useDeleteListMutation();
  const deleteTask = useDeleteTaskMutation();
  const updateList = useUpdateListMutation();

  const {
    data: list,
    isLoading: listLoading,
    isError: listError,
  } = useListQuery(listId);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useTasksQuery({ listId, ...filters });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTask.mutate(
      {
        title,
        listId,
      },
      {
        onSuccess: () => setTitle(""),
      },
    );
  };

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

  const handleDeleteTask = (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) => {
    e.stopPropagation();

    if (!window.confirm("Delete this task?")) return;

    deleteTask.mutate(taskId);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>, task: Task) => {
    e.stopPropagation();

    updateTask.mutate({
      id: task.id,
      data: {
        isCompleted: !task.isCompleted,
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

      <TaskFilters
        filters={filters}
        searchParams={searchParams}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
      />

      <div className="mt-6">
        <h2 className="font-medium mb-2">Tasks</h2>

        <form onSubmit={handleCreateTask} className="mb-3 flex gap-2">
          <Input
            className="border p-2 flex-1"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button
            type="submit"
            className="px-3 text-sm"
            disabled={createTask.isPending}
          >
            Create task
          </Button>
        </form>

        <div className="min-h-50">
          {tasks?.data?.tasks?.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            <ul>
              {tasks?.data?.tasks?.map((task) => {
                const isDimmed =
                  task.isCompleted && filters.isCompleted !== true;

                return (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    listId={listId}
                    isDimmed={isDimmed}
                    handleToggle={handleToggle}
                    handleDelete={handleDeleteTask}
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
