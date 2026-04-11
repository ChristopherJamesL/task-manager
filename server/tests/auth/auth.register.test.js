const request = require("supertest");
const app = require("../setup/app");
const pool = require("../../src/db/database");

describe("Auth - Register", () => {
  test("It should register a new user successfully", async () => {
    const userData = {
      username: "testUser",
      email: "testUser@example.com",
      password: "123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty("id");
    expect(response.body.data.user.username).toBe(userData.username);
    expect(response.body.data.user.email).toBe(userData.email.toLowerCase());

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      userData.email.toLowerCase(),
    ]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].username).toBe(userData.username);
  });
});
