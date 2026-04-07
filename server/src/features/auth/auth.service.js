const pool = require("../../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  createAuth,
  findUserWithPassword,
  findUserWithId,
} = require("./auth.model");
const { consumeLoginFail } = require("../../middleware/rateLimiter");
const {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../../utils/errors");

const SALT_ROUNDS = 10;

async function registerUser({ username, email, password }) {
  const normalizedEmail = email.toLowerCase().trim();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser(client, username, normalizedEmail);

    await createAuth(client, user.id, hashedPassword);

    await client.query("COMMIT");

    return user;
  } catch (err) {
    await client.query("ROLLBACK");

    if (err.code === "23505") {
      throw new ConflictError("Username or email already exists");
    }
    throw err;
  } finally {
    client.release();
  }
}

async function signInUser({ identifier, password, ipAddr }) {
  const user = await findUserWithPassword(identifier);

  if (!user) {
    await consumeLoginFail(identifier, ipAddr);
    throw new UnauthorizedError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    await consumeLoginFail(identifier, ipAddr);
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

async function me(userId) {
  const user = await findUserWithId(userId);

  if (!user) throw new NotFoundError("User not found");

  return {
    user,
  };
}

module.exports = {
  registerUser,
  signInUser,
  me,
};
