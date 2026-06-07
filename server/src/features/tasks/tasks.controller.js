const { sendSuccess } = require("../../utils/response");
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

  const result = await getAllTasks({ userId, ...res.locals.validatedQuery });

  return sendSuccess(res, {
    data: {
      tasks: result.tasks,
    },
    meta: result.meta,
  });
}

async function httpGetTaskById(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  const result = await getTaskById({ userId, id });

  return sendSuccess(res, {
    data: result,
  });
}

async function httpCreateTask(req, res) {
  const userId = req.user.userId;
  const taskData = req.body;

  const result = await createTask({ userId, taskData });

  return sendSuccess(res, {
    data: result,
    status: 201,
  });
}

async function httpUpdateTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const updates = req.body;

  const result = await updateTask({ userId, id, updates });

  return sendSuccess(res, {
    data: result,
  });
}

async function httpDeleteTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  const result = await deleteTask({ userId, id });

  return sendSuccess(res, {
    data: result,
  });
}

module.exports = {
  httpGetAllTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
};
