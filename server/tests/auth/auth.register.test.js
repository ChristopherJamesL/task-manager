const db = require("../../src/db/database");
const { createUser } = require("../setup/factory");
const { registerUser } = require("../setup/authHelper");

describe("Auth - Register", () => {
  test("It should register a new user successfully", async () => {
    const userData = createUser();

    const response = await registerUser(userData);

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty("id");
    expect(response.body.data.user.username).toBe(userData.username);
    expect(response.body.data.user.email).toBe(userData.email.toLowerCase());

    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      userData.email.toLowerCase(),
    ]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].username).toBe(userData.username);
  });

  test("It should not allow duplicate email registration", async () => {
    const user1 = createUser();
    const user2 = createUser({
      username: "differentUsername",
      email: user1.email,
    });

    await registerUser(user1);

    const response = await registerUser(user2);

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe(
      "Username or email already exists",
    );
  });

  test("It should not allow duplicate username registration", async () => {
    const user1 = createUser();
    const user2 = createUser({
      username: user1.username,
      email: "different@example.com",
    });

    await registerUser(user1);

    const response = await registerUser(user2);

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe(
      "Username or email already exists",
    );
  });
});
