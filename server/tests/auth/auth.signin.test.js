const request = require("supertest");
const createApp = require("../setup/app");
const { createUser } = require("../setup/factory");

const app = createApp();

describe("Auth - Sign In", () => {
  test("It should sign in an existing user with email", async () => {
    const userData = createUser();

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

  test("It should not signin with incorrect password", async () => {
    const userData = createUser();

    await request(app).post("/api/auth/register").send(userData);

    const response = await request(app).post("/api/auth/signin").send({
      identifier: userData.email,
      password: "wrongPassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe("Invalid credentials");
  });

  test("It should not sign in with non-existant user", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      identifier: "noUser@example.com",
      password: "123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe("Invalid credentials");
  });

  test("It should rate limit repeated failed sigin attempts", async () => {
    const userData = createUser();

    await request(app).post("/api/auth/register").send(userData);

    const payload = {
      identifier: userData.email,
      password: "wrongPassword",
    };

    for (let i = 0; i < 5; i++) {
      await request(app).post("/api/auth/signin").send(payload);
    }

    const response = await request(app).post("/api/auth/signin").send(payload);

    expect(response.statusCode).toBe(429);
  });
});
