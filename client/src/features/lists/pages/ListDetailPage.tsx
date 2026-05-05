import { useState } from "react";
import { useParams } from "react-router";
import { useListQuery } from "../queries/useListQuery";
import { useTasksQuery } from "../../tasks/queries/useTasksQuery";
import { useCreateTaskMutation } from "../../tasks/queries/useCreateTaskMutation";
import { useUpdateTaskMutation } from "../../tasks/queries/useUpdateTaskMutation";
import { formatName } from "../../../utils/format";

export default function ListDetailPage() {
  const [title, setTitle] = useState("");

  const { id } = useParams();

  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();

  const {
    data: list,
    isLoading: listLoading,
    isError: listError,
  } = useListQuery(id as string);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useTasksQuery({ listId: Number(id) });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTask.mutate(
      {
        title,
        listId: Number(id),
      },
      {
        onSuccess: () => setTitle(""),
      },
    );
  };

  const handleToggle = (taskId: number, current: boolean) => {
    updateTask.mutate({
      id: taskId,
      data: {
        isCompleted: !current,
      },
    });
    console.log("taskId: ", taskId, "isCompleted: ", current);
  };

  if (listLoading || tasksLoading) return <div>Loading...</div>;
  if (listError || tasksError) return <div>Failed to load</div>;
  if (!list) return <div>No list found</div>;

  const formattedDate = new Date(list.createdAt).toLocaleString();

  return (
    <div className="min-w-2xl">
      <h1 className="text-xl font-semibold mb-1">{formatName(list?.name)}</h1>

      <p className="text-sm text-gray-500">Created at: {formattedDate}</p>

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

        {tasks?.data?.tasks?.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks?.data?.tasks?.map((task) => (
              <li
                key={task.id}
                className="border p-2 rounded flex justify-between mb-1"
              >
                <span
                  onClick={() => handleToggle(task.id, task.isCompleted)}
                  className={`cursor-pointer 
                    ${task.isCompleted ? "line-through text-gray-800" : ""}`}
                >
                  {formatName(task.title)}
                </span>
                <span className="text-sm text-gray-500">{task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
