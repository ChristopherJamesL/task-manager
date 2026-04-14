const request = require("supertest");
const createApp = require("../setup/app");
const { createUser } = require("../setup/factory");

const app = createApp();

describe("Auth - Sign In", () => {
  test("It should sign in an existing user with email", async () => {
    const userData = createUser();
    // Register user
    await request(app).post("/api/auth/register").send(userData);

    const response = await request(app).post("/api/auth/signin").send({
      identifier: userData.email,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveProperty("token");
    expect(response.body.data.user.email).toBe(userData.email.toLowerCase());
  });

  test("It should sign in an existing user with username", async () => {
    const userData = createUser();
    await request(app).post("/api/auth/register").send(userData);

    const response = await request(app).post("/api/auth/signin").send({
      identifier: userData.username,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveProperty("token");
    expect(response.body.data.user.username).toBe(userData.username);
  });
});
