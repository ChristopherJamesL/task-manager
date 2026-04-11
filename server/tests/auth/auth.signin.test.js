const request = require("supertest");
const app = require("../setup/app");

describe("Auth - Sign In", () => {
  const userData = {
    username: "testUser",
    email: "testUser@example.com",
    password: "123",
  };

  test("It should sign in an existing user with email", async () => {
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
