import { useParams } from "react-router";
import { useListQuery } from "../queries/useListQuery";
import { useTasksQuery } from "../../tasks/queries/useTasksQuery";
import { formatListName } from "../../../utils/format";

export default function ListDetailPage() {
  const { id } = useParams();

  const {
    data: list,
    isLoading: listLoading,
    isError: listError,
  } = useListQuery(id as string);
  console.log("List Data: ", list);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useTasksQuery({ listId: Number(id) });

  console.log("tasks: ", tasks);

  if (listLoading || tasksLoading) return <div>Loading...</div>;
  if (listError || tasksError) return <div>Failed to load</div>;
  if (!list) return <div>No list found</div>;

  const formattedDate = new Date(list.created_at).toLocaleString();

  return (
    <div className="min-w-2xl">
      <h1 className="text-xl font-semibold mb-1">
        {formatListName(list?.name)}
      </h1>

      <p className="text-sm text-gray-500">Created at: {formattedDate}</p>

      <div className="mt-6">
        <h2 className="font-medium mb-2">Tasks</h2>

        {tasks?.data.tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks?.data.tasks.map((task) => (
              <li
                key={task.id}
                className="border p-2 rounded flex justify-between mb-1"
              >
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">{task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
