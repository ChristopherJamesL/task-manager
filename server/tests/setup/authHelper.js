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

async function createAuthenticatedUser(overrides = {}) {
  const userData = createUser(overrides);

  await request(app).post("/api/auth/register").send(userData);

  const response = await request(app).post("/api/auth/signin").send({
    identifier: userData.email,
    password: userData.password,
  });

  return {
    user: response.body.data.user,
    token: response.body.data.token,
  };
}

module.exports = {
  registerUser,
  signInUser,
  createAuthenticatedUser,
};
