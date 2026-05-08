import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useListQuery } from "../queries/useListQuery";
import { useTasksQuery } from "../../tasks/queries/useTasksQuery";
import { useCreateTaskMutation } from "../../tasks/queries/useCreateTaskMutation";
import { useUpdateTaskMutation } from "../../tasks/queries/useUpdateTaskMutation";
import { useDeleteListMutation } from "../queries/useDeleteListMutation";
import { useDeleteTaskMutation } from "../../tasks/queries/useDeleteTaskMutation";
import { useTaskFilters } from "../../tasks/hooks/useTaskFilters";
import { formatName } from "../../../utils/format";
import TaskFilters from "../../tasks/components/TaskFilters";
import type { Task } from "../../tasks/types/task.types";

export default function ListDetailPage() {
  const [title, setTitle] = useState("");

  const { filters, toggleFilter, setSort, resetFilters } = useTaskFilters();

  const navigate = useNavigate();

  const { id } = useParams();
  const listId = Number(id);

  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const deleteList = useDeleteListMutation();
  const deleteTask = useDeleteTaskMutation();

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

  const handleDeleteList = () => {
    if (!listId) return;

    if (!window.confirm("Delete this list?")) return;

    deleteList.mutate(listId, {
      onSuccess: () => {
        navigate("/lists");
      },
    });
  };

  const handleDeleteTask = (taskId: number) => {
    if (!window.confirm("Delete this task?")) return;

    deleteTask.mutate(taskId);
  };

  const handleToggle = (task: Task) => {
    updateTask.mutate({
      id: task.id,
      data: {
        isCompleted: !task.isCompleted,
      },
    });
  };

  if (listLoading || tasksLoading) return <div>Loading...</div>;
  if (listError || tasksError) return <div>Failed to load</div>;
  if (!list) return <div>No list found</div>;

  const formattedDate = new Date(list.createdAt).toLocaleString();

  return (
    <div className="min-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-1">{formatName(list?.name)}</h1>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
          onClick={handleDeleteList}
        >
          Delete List
        </button>
      </div>

      <p className="text-sm text-gray-500">Created at: {formattedDate}</p>

      <TaskFilters
        filters={filters}
        toggleFilter={toggleFilter}
        setSort={setSort}
        resetFilters={resetFilters}
      />

      <div className="mt-6">
        <h2 className="font-medium mb-2">Tasks</h2>

        <form onSubmit={handleCreateTask} className="mb-3 flex gap-2">
          <input
            className="border p-2 flex-1"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 rounded cursor-pointer"
            disabled={createTask.isPending || !title.trim()}
          >
            Create task
          </button>
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
                  <li
                    key={task.id}
                    className={`border p-2 rounded flex justify-between mb-1
                      ${isDimmed ? "border-gray-400 bg-gray-200" : ""}  
                    `}
                  >
                    <span
                      onClick={() => handleToggle(task)}
                      className={`cursor-pointer`}
                    >
                      {formatName(task.title)}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {task.priority}
                      </span>

                      <button
                        className="text-red-500 text-sm cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
