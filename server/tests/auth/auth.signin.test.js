const { createUser } = require("../setup/factory");
const { registerUser, signInUser } = require("../setup/authHelper");

describe("Auth - Sign In", () => {
  test("It should sign in an existing user with email", async () => {
    const userData = createUser();

    await registerUser(userData);

    const response = await signInUser({
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

    await registerUser(userData);

    const response = await signInUser({
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

    await registerUser(userData);

    const response = await signInUser({
      identifier: userData.email,
      password: "wrongPassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe("Invalid credentials");
  });

  test("It should not sign in with non-existant user", async () => {
    const response = await signInUser({
      identifier: "noUser@example.com",
      password: "123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe("Invalid credentials");
  });

  test("It should rate limit repeated failed sigin attempts", async () => {
    const userData = createUser();

    await registerUser(userData);

    const payload = {
      identifier: userData.email,
      password: "wrongPassword",
    };

    for (let i = 0; i < 5; i++) {
      await signInUser(payload);
    }

    const response = await signInUser(payload);

    expect(response.statusCode).toBe(429);
  });
});
