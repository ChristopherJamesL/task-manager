const {
  getAllTasks: getAllTasksModel,
  getTaskById: getTaskByIdModel,
  createTask: createTaskModel,
  updateTask: updateTaskModel,
  deleteTask: deleteTaskModel,
} = require("./tasks.model");
const { mapTask } = require("./tasks.mapper");
const { NotFoundError } = require("../../utils/errors");

async function getAllTasks({
  userId,
  listId,
  limit,
  cursorValue,
  cursorId,
  priority,
  isCompleted,
  dueBefore,
  dueAfter,
  sortBy,
  order,
}) {
  const limitValue = limit || 10;

  // Build cursor for pagination if provided
  const cursor =
    cursorValue && cursorId !== undefined
      ? { value: cursorValue, id: cursorId }
      : null;

  const { tasks, hasNextPage } = await getAllTasksModel(
    userId,
    listId,
    { priority, isCompleted, dueBefore, dueAfter, sortBy, order },
    cursor,
    limitValue,
  );

  const mappedTasks = tasks.map(mapTask);

  const lastTask = tasks[tasks.length - 1];

  console.log("DB created_at (raw):", lastTask.created_at);
  console.log(
    "DB created_at (ISO):",
    new Date(lastTask.created_at).toISOString(),
  );

  const sortField = sortBy === "dueDate" ? "due_date" : "created_at";

  const nextCursor = lastTask
    ? {
        value: lastTask[sortField].toISOString(),
        id: lastTask.id,
      }
    : null;

  console.log(
    "PAGE IDS:",
    tasks.map((t) => t.id),
  );

  console.log("CURSOR IN:", cursor);
  console.log("NEXT CURSOR:", nextCursor);

  return {
    tasks: mappedTasks,
    meta: {
      nextCursor,
      hasNextPage,
    },
  };
}

async function getTaskById({ userId, id }) {
  const task = await getTaskByIdModel(userId, id);

  if (!task) throw new NotFoundError("Task not found");

  return { task: mapTask(task) };
}

async function createTask({ userId, taskData }) {
  const task = await createTaskModel(userId, taskData);

  return { task: mapTask(task) };
}

async function updateTask({ userId, id, updates }) {
  const task = await updateTaskModel(userId, id, updates);

  if (!task) throw new NotFoundError("Task not found");

  return { task: mapTask(task) };
}

async function deleteTask({ userId, id }) {
  const task = await deleteTaskModel(userId, id);

  if (!task) throw new NotFoundError("Task not found");

  return { task: mapTask(task) };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
