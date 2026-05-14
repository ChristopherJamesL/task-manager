const { createList } = require("./listsHelper");
const { createListName, createTaskData } = require("./factory");

async function createTask({ taskData, agent }) {
  return agent.post("/api/tasks").send(taskData);
}

async function getAllTasks({ query = {}, agent } = {}) {
  return agent.get("/api/tasks").query(query);
}

async function getTaskById({ taskId, agent } = {}) {
  return agent.get(`/api/tasks/${taskId}`);
}

async function createListAndTaskAfterSignIn({
  listName,
  taskOverrides = {},
  agent,
} = {}) {
  const list = await createList({ name: createListName(listName), agent });
  const listId = list.body.data.list.id;

  const taskData = createTaskData({ listId, overrides: taskOverrides });
  const task = await createTask({ taskData, agent });

  return {
    list,
    task,
    agent,
  };
}

async function updateTask({ taskId, agent, taskUpdateData = {} } = {}) {
  return agent.patch(`/api/tasks/${taskId}`).send(taskUpdateData);
}

async function deleteTask({ taskId, agent }) {
  return agent.delete(`/api/tasks/${taskId}`);
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  createListAndTaskAfterSignIn,
  updateTask,
  deleteTask,
};
