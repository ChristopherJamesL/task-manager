const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../../models/tasks.model");

async function httpGetAllTasks(req, res) {
  const userId = req.user.userId;
  const { listId } = req.query;

  try {
    const tasks = await getAllTasks(userId, listId);

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

async function httpGetTaskById(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const task = await getTaskById(userId, id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
}

async function httpCreateTask(req, res) {
  const userId = req.user.userId;
  const taskData = req.body;

  try {
    const newTask = await createTask(userId, taskData);

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
}
async function httpUpdateTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await updateTask(userId, id, updates);

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
}
async function httpDeleteTask(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const deletedTask = await deleteTask(userId, id);

    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted", task: deletedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

module.exports = {
  httpGetAllTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
};
