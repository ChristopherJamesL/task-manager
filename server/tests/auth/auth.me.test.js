const request = require("supertest");
const createApp = require("../setup/app");
const { createUser } = require("../setup/factory");
const { registerUser, signInUser } = require("../setup/authHelper");

const app = createApp();

describe("Auth - Me", () => {
  test("It should return me", async () => {
    const userData = createUser();

    await registerUser(userData);

    const signInResponse = await signInUser({
      identifier: userData.email,
      password: userData.password,
    });

    const token = signInResponse.body.data.token;

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email.toLowerCase());
  });

  test("It should fail without auth token", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.statusCode).toBe(401);
  });
});
