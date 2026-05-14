const db = require("../../db/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getRedisClient } = require("../../db/redis");
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
  try {
    return await db.withTransaction(async (client) => {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await createUser(username, email, client);

      await createAuth(user.id, hashedPassword, client);

      return user;
    });
  } catch (err) {
    if (err.code === "23505") {
      throw new ConflictError("Username or email already exists");
    }
    throw err;
  }
}

async function signInUser({ identifier, password, ipAddr }) {
  const redis = getRedisClient();
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

  const sessionId = crypto.randomUUID();

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify({ userId: user.id }),
    "EX",
    60 * 60 * 24 * 7,
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    sessionId,
  };
}

async function me(userId) {
  const user = await findUserWithId(userId);

  if (!user) throw new NotFoundError("User not found");

  return user;
}

module.exports = {
  registerUser,
  signInUser,
  me,
};
