import { useParams } from "react-router";
import { useTaskQuery } from "../queries/useTaskQuery";
import { formatName } from "../../../utils/format";
import { formatDate } from "../../../utils/formatDate";
import { priorityStyles } from "../../../utils/priorityStyles";

export default function TaskPage() {
  const { taskId } = useParams();

  const parsedTaskId = Number(taskId);

  const { data: task, isLoading, isError } = useTaskQuery(parsedTaskId);

  if (isLoading) return <div>Loading task...</div>;
  if (isError) return <div>Failed to load task</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="max-w-2xl border rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">{formatName(task.title)}</h1>

        <span
          className={`text-xs px-2 py-1 rounded font-medium
                ${priorityStyles[task.priority]}
            `}
        >
          {task.priority}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Completed: </span>
          {task.isCompleted ? "Yes" : "No"}
        </p>

        <p>
          <span className="font-medium">Created: </span>
          {formatDate(task.createdAt)}
        </p>

        {task.dueDate && (
          <p>
            <span className="font-medium">Due: </span>
            {formatDate(task.dueDate)}
          </p>
        )}

        {task.description && (
          <div className="pt-4">
            <h2 className="font-medium mb-1">Description</h2>
            <p className="border rounded p-3 bg-gray-50 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
