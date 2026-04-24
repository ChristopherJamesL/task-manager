const request = require("supertest");
const createApp = require("./app");
const { createList } = require("./listsHelper");
const { createListName, createTaskData } = require("./factory");

const app = createApp();

async function createTask({ taskData, token }) {
  return request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send(taskData);
}

async function getAllTasks({ query = {}, token } = {}) {
  return request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .query(query);
}

async function updateTasks({ taskData = {}, taskId, token } = {}) {
  return request(app)
    .patch(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(taskData);
}

async function getTaskById({ taskId, token } = {}) {
  return request(app)
    .get(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`);
}

async function createListAndTaskAfterSignIn({
  listName,
  taskOverrides = {},
  token,
} = {}) {
  const list = await createList({ name: createListName(listName), token });
  const listId = list.body.data.list.id;

  const taskData = createTaskData({ listId, overrides: taskOverrides });
  const task = await createTask({ taskData, token });

  return {
    list,
    task,
    token,
  };
}

async function updateTask({ taskId, token, taskUpdateData = {} } = {}) {
  return request(app)
    .patch(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(taskUpdateData);
}

async function deleteTask({ taskId, token }) {
  return request(app)
    .delete(`/api/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTasks,
  getTaskById,
  createListAndTaskAfterSignIn,
  updateTask,
  deleteTask,
};
