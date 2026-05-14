const request = require("supertest");
const createApp = require("../setup/app");
const { createUser } = require("../setup/factory");
const { createAuthenticatedUser } = require("../setup/authHelper");

const app = createApp();

describe("Auth - Me", () => {
  test("It should return me", async () => {
    const userData = createUser();

    const { agent } = await createAuthenticatedUser(userData);

    const response = await agent.get("/api/auth/me");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email.toLowerCase());
  });

  test("It should fail without authentication", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.statusCode).toBe(401);
  });
});
