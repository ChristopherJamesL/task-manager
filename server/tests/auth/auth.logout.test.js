const request = require("supertest");
const createApp = require("../setup/app");
const { logoutUser, createAuthenticatedUser } = require("../setup/authHelper");

const app = createApp();

describe("Auth - Logout", () => {
  test("It should logout successfully when authenticated", async () => {
    const { agent } = await createAuthenticatedUser();

    const meBeforeLogout = await agent.get("/api/auth/me");

    expect(meBeforeLogout.statusCode).toBe(200);

    const response = await logoutUser({ agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const meAfterLogout = await agent.get("/api/auth/me");

    expect(meAfterLogout.statusCode).toBe(401);
    expect(meAfterLogout.body.success).toBe(false);
  });

  test("It should fail to logout when not authenticated", async () => {
    const response = await request(app).post("/api/auth/logout");

    expect(response.statusCode).toBe(401);
  });
});
