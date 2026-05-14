const request = require("supertest");
const createApp = require("./app");
const { createUser } = require("./factory");

const app = createApp();

async function registerUser(userData) {
  return request(app).post("/api/auth/register").send(userData);
}

async function signInUser({ identifier, password }) {
  return request(app).post("/api/auth/signin").send({
    identifier,
    password,
  });
}

async function logoutUser({ agent }) {
  return agent.post("/api/auth/logout");
}

async function createAuthenticatedUser(overrides = {}) {
  const userData = createUser(overrides);

  const agent = request.agent(app);

  await agent.post("/api/auth/register").send(userData);

  const res = await agent
    .post("/api/auth/signin")
    .send({ identifier: userData.email, password: userData.password });

  return {
    user: res.body.data.user,
    agent,
  };
}

module.exports = {
  registerUser,
  signInUser,
  logoutUser,
  createAuthenticatedUser,
};
