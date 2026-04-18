const request = require("supertest");
const createApp = require("../setup/app");
const { createUser } = require("../setup/factory");
const { registerUser, signInUser } = require("../setup/authHelper");

const app = createApp();

describe("Auth - Logout", () => {
  test("It should logout successfully when authenticated", async () => {
    const userData = createUser();

    await registerUser(userData);

    const signInResponse = await signInUser({
      identifier: userData.email,
      password: userData.password,
    });

    const token = signInResponse.body.data.token;

    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("It should fail to logout when not authenticated", async () => {
    const response = await request(app).post("/api/auth/logout");

    expect(response.statusCode).toBe(401);
  });
});
