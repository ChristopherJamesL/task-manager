import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTaskQuery } from "../queries/useTaskQuery";
import { useUpdateTaskMutation } from "../queries/useUpdateTaskMutation";
import { formatName } from "../../../utils/format";
import { formatDate } from "../../../utils/formatDate";
import { priorityStyles } from "../../../utils/priorityStyles";
import type { TaskPriority } from "../types/task.types";
import { formatDateTimeLocal } from "../../../utils/formatDateTimeLocal";

export default function TaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  const { taskId } = useParams();
  const parsedTaskId = Number(taskId);

  const { data: task, isLoading, isError } = useTaskQuery(parsedTaskId);
  const updateTask = useUpdateTaskMutation();

  useEffect(() => {
    if (!task) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(task.title);
    setDescription(task.description ?? "");
    setIsCompleted(task.isCompleted);
    setPriority(task.priority);
    setDueDate(task.dueDate ? formatDateTimeLocal(task.dueDate) : "");
  }, [task?.id]);

  if (isLoading) return <div>Loading task...</div>;
  if (isError) return <div>Failed to load task</div>;
  if (!task) return <div>Task not found</div>;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    updateTask.mutate({
      id: parsedTaskId,
      data: {
        title,
        description,
        isCompleted,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      },
    });
  };

  return (
    <div className="max-w-2xl border rounded p-4">
      <form onSubmit={handleUpdate} className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          {/* <h1 className="text-2xl font-semibold">{formatName(task.title)}</h1> */}
          <input
            className="text-2xl font-semibold border rounded p-1 w-full mr-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* <span
            className={`text-xs px-2 py-1 rounded font-medium
                ${priorityStyles[task.priority]}
            `}
          >
            {task.priority}
          </span> */}

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="border rounded p-1 cursor-pointer"
          >
            {Object.keys(priorityStyles).map((priority, index) => {
              return (
                <option key={index} value={priority}>
                  {formatName(priority)}
                </option>
              );
            })}
          </select>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <p>
              <span className="font-medium">Completed: </span>
              {/* {task.isCompleted ? "Yes" : "No"} */}
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            </p>

            <div>
              <span className="font-medium">Due: </span>
              <input
                value={dueDate}
                type="datetime-local"
                className="border px-1 rounded"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <p>
            <span className="font-medium">Created: </span>
            {formatDate(task.createdAt)}
          </p>

          {/* {task.dueDate && (
            <p>
              <span className="font-medium">Due: </span>
              {formatDate(task.dueDate)}
            </p>
          )} */}
        </div>

        {/* {task.description && ( */}
        <div className="pt-4">
          <h2 className="font-medium mb-1">Description</h2>
          {/* <p className="border rounded p-3 bg-gray-50 whitespace-pre-wrap">
                {task.description}
              </p> */}
          <textarea
            className="border rounded p-3 bg-gray-50 w-full min-h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* )} */}

        <button
          type="submit"
          disabled={updateTask.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          {updateTask.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
