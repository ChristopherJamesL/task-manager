const pool = require("../../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendSuccess, sendError } = require("../../utils/response");
const {
  createUser,
  createAuth,
  findUserWithPassword,
  findUserWithId,
} = require("../../models/auth.model");
const { consumeLoginFail } = require("../../middleware/rateLimiter");

const SALT_ROUNDS = 10;

async function httpRegister(req, res) {
  const { username, email, password } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser(client, username, email);

    await createAuth(client, user.id, hashedPassword);

    await client.query("COMMIT");

    return sendSuccess(res, {
      data: { user },
      status: 201,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Registration error: ", err);

    if (err.code === "23505") {
      return sendError(res, {
        message: "Username or email already exists",
        status: 400,
      });
    }

    return sendError(res, { message: "Registration failed" });
  } finally {
    client.release();
  }
}

async function httpSignIn(req, res) {
  const { identifier, password } = req.body;
  const ipAddr = req.ip;

  try {
    const user = await findUserWithPassword(identifier);

    if (!user) {
      await consumeLoginFail(identifier, ipAddr);
      return sendError(res, { message: "Invalid credentials", status: 401 });
    }

    const { id, username, email } = user;

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      await consumeLoginFail(identifier, ipAddr);
      return sendError(res, { message: "Invalid credentials", status: 401 });
    }

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return sendSuccess(res, {
      data: {
        token,
        user: {
          id,
          username,
          email,
        },
      },
    });
  } catch (err) {
    console.error("Login error: ", err);
    return sendError(res, { message: "Login failed" });
  }
}

async function httpMe(req, res) {
  const userId = req.user.userId;

  try {
    const user = await findUserWithId(userId);

    if (!user)
      return sendError(res, { message: "User not found", status: 404 });

    return sendSuccess(res, {
      data: { user },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to fetch user" });
  }
}

async function httpLogout(req, res) {
  return sendSuccess(res, {
    data: { message: "Logged out successfully" },
  });
}

module.exports = {
  httpRegister,
  httpSignIn,
  httpMe,
  httpLogout,
};
