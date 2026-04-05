const { sendSuccess, sendError } = require("../../utils/response");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("./tasks.service");

/**
 * GET /tasks
 *
 * Retrieves tasks with filtering, sorting, and cursor-based pagination.
 *
 * Query Params:
 * - listId (number)
 * - limit (number, default: 10)
 * - cursorValue (ISO datetime)
 * - cursorId (number)
 * - priority ('low' | 'medium' | 'high')
 * - isCompleted (boolean, default: false)
 * - dueBefore (ISO datetime)
 * - dueAfter (ISO datetime)
 * - sortBy ('createdAt' | 'dueDate')
 * - order ('asc' | 'desc')
 */
async function httpGetAllTasks(req, res) {
  const userId = req.user.userId;

  try {
    const result = await getAllTasks({ userId, ...res.locals.validatedQuery });

    return sendSuccess(res, {
      data: result.tasks,
      meta: result.meta,
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
    const result = await getTaskById({ userId, id });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
    const result = await createTask({ userId, taskData });

    return sendSuccess(res, {
      data: result,
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
    const result = await updateTask({ userId, id, updates });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
    const result = await deleteTask({ userId, id });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
