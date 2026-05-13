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
import { getDueDateLabel } from "../../tasks/utils/getDueDateLabel";
import { priorityStyles } from "../../../utils/priorityStyles";
import type { Task } from "../../tasks/types/task.types";

export default function ListDetailPage() {
  const [title, setTitle] = useState("");

  const { filters, searchParams, toggleFilter, setSort, resetFilters } =
    useTaskFilters();

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

  if (listLoading || tasksLoading) return <div>Loading...</div>;
  if (listError || tasksError) return <div>Failed to load</div>;
  if (!list) return <div>No list found</div>;

  const formattedDate = new Date(list.createdAt).toLocaleString();

  // const priorityStyles = {
  //   low: "bg-gray-200 text-gray-700",
  //   medium: "bg-yellow-200 text-yellow-800",
  //   high: "bg-red-200 text-red-800",
  // } as const;

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
        searchParams={searchParams}
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

                const due = getDueDateLabel(task.dueDate);
                return (
                  <li
                    key={task.id}
                    onClick={() => navigate(`/list/${listId}/task/${task.id}`)}
                    className={`border p-2 rounded flex flex-1 justify-between items-center 
                      mb-1 hover:bg-blue-100 cursor-pointer
                      ${isDimmed ? " opacity-60" : ""}  
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => handleToggle(e, task)}
                        className={`
                            w-4 h-4 rounded border flex items-center justify-center
                            cursor-pointer shrink-0
                            ${
                              task.isCompleted
                                ? "bg-green-500 border-green-500"
                                : "border-gray-400 hover:bg-green-200"
                            }
                          `}
                      >
                        {task.isCompleted && (
                          <span className="text-white text-[10px]">✓</span>
                        )}
                      </button>

                      <span className={`truncate`}>
                        {formatName(task.title)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${priorityStyles[task.priority]}`}
                      >
                        {task.priority}
                      </span>

                      {due && (
                        <span
                          className={`text-xs px-2 py-1 rounded
                            ${due.isOverdue ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}  
                          `}
                        >
                          {due.label}
                        </span>
                      )}

                      <button
                        className="
                          text-red-500 border rounded px-1 font-medium text-sm cursor-pointer
                          hover:bg-red-100
                        "
                        onClick={(e) => handleDeleteTask(e, task.id)}
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
