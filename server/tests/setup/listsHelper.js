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

async function getAllLists({ token }) {
  return request(app).get("/api/lists").set("Authorization", `Bearer ${token}`);
}

module.exports = {
  createList,
  getAllLists,
};
