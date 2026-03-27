const { sendSuccess, sendError } = require("../../utils/response");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../../models/tasks.model");

async function httpGetAllTasks(req, res) {
  const userId = req.user.userId;
  const {
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
  } = res.locals.validatedQuery;

  const limitValue = limit || 10;

  const cursor =
    cursorValue && cursorId !== undefined
      ? { value: cursorValue, id: cursorId }
      : null;

  try {
    const { tasks } = await getAllTasks(
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

    return sendSuccess(res, {
      data: { tasks },
      meta: {
        nextCursor,
        hasNextPage: tasks.length === limitValue,
      },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, {
      message: "Failed to fetch tasks",
    });
  }
}

async function httpGetTaskById(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const task = await getTaskById(userId, id);

    if (!task)
      return sendError(res, { message: "Task not found", status: 404 });

    return sendSuccess(res, {
      data: { task },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to fetch task" });
  }
}

async function httpCreateTask(req, res) {
  const userId = req.user.userId;
  const taskData = req.body;

  try {
    const newTask = await createTask(userId, taskData);

    return sendSuccess(res, {
      data: { task: newTask },
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to create task" });
  }
}

async function httpUpdateTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await updateTask(userId, id, updates);

    if (!updatedTask)
      return sendError(res, { message: "Task not found", status: 404 });

    return sendSuccess(res, {
      data: { task: updatedTask },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to update task" });
  }
}

async function httpDeleteTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const deletedTask = await deleteTask(userId, id);

    if (!deletedTask)
      return sendError(res, { message: "Task not found", status: 404 });

    return sendSuccess(res, {
      data: { task: deletedTask },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to delete task" });
  }
}

module.exports = {
  httpGetAllTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
};
