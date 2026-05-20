import { useNavigate } from "react-router";
import { formatName } from "../../../utils/format";
import { priorityStyles } from "../../../utils/priorityStyles";
import { getDueDateLabel } from "../utils/getDueDateLabel";
import type { Task } from "../types/task.types";

type TaskListItemProps = {
  task: Task;
  listId: number;
  isDimmed: boolean;

  handleToggle: (e: React.MouseEvent<HTMLButtonElement>, task: Task) => void;
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) => void;
};

export default function TaskListItem({
  task,
  listId,
  isDimmed,
  handleToggle,
  handleDelete,
}: TaskListItemProps) {
  const navigate = useNavigate();

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
          role="checkbox"
          aria-checked={task.isCompleted}
          onClick={(e) => handleToggle(e, task)}
          className={`
                w-4 h-4 border rounded flex items-center justify-center
                shrink-0 cursor-pointer
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

        <span className={`truncate`}>{formatName(task.title)}</span>
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
          onClick={(e) => handleDelete(e, task.id)}
        >
          X
        </button>
      </div>
    </li>
  );
}
