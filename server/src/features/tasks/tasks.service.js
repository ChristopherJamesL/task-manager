const {
  getAllTasks: getAllTasksModel,
  getTaskById: getTaskByIdModel,
  createTask: createTaskModel,
  updateTask: updateTaskModel,
  deleteTask: deleteTaskModel,
} = require("./tasks.model");
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

  const { tasks } = await getAllTasksModel(
    userId,
    listId,
    { priority, isCompleted, dueBefore, dueAfter, sortBy, order },
    cursor,
    limitValue,
  );

  const lastTask = tasks[tasks.length - 1];

  const sortField = sortBy === "dueDate" ? "due_date" : "created_at";

  const nextCursor = lastTask
    ? {
        value: lastTask[sortField],
        id: lastTask.id,
      }
    : null;

  return {
    tasks,
    meta: {
      nextCursor,
      hasNextPage: tasks.length === limitValue,
    },
  };
}

async function getTaskById({ userId, id }) {
  const task = await getTaskByIdModel(userId, id);

  if (!task) throw new NotFoundError("Task not found");

  return { task };
}

async function createTask({ userId, taskData }) {
  const task = await createTaskModel(userId, taskData);

  return { task };
}

async function updateTask({ userId, id, updates }) {
  const task = await updateTaskModel(userId, id, updates);

  if (!task) throw new NotFoundError("Task not found");

  return { task };
}

async function deleteTask({ userId, id }) {
  const task = await deleteTaskModel(userId, id);

  if (!task) throw new NotFoundError("Task not found");

  return { task };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
