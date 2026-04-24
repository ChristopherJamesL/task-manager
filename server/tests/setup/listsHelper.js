const request = require("supertest");
const createApp = require("./app");

const app = createApp();

async function createList({ name, token }) {
  const nameString = name.toString();

  return request(app)
    .post("/api/lists")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: nameString,
    });
}

async function getAllLists({ token } = {}) {
  return request(app).get("/api/lists").set("Authorization", `Bearer ${token}`);
}

async function getListById({ listId, token }) {
  return request(app)
    .get(`/api/lists/${listId}`)
    .set("Authorization", `Bearer ${token}`);
}

async function updateList({ listId, name, token }) {
  return request(app)
    .patch(`/api/lists/${listId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: name,
    });
}

async function deleteList({ listId, token }) {
  return request(app)
    .delete(`/api/lists/${listId}`)
    .set("Authorization", `Bearer ${token}`);
}

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
