const pool = require("../../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  createAuth,
  findUserWithPassword,
  findUserWithId,
} = require("../../models/auth.model");

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

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Registration error: ", err);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    client.release();
  }
}

async function httpSignIn(req, res) {
  const { identifier, password } = req.body;

  try {
    const user = await findUserWithPassword(identifier);

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const { id, username, email } = user;

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id, username, email },
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ error: "Login failed" });
  }
}

async function httpMe(req, res) {
  const userId = req.user.userId;

  try {
    const user = await findUserWithId(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

async function httpLogout(req, res) {
  return res.status(200).json({ message: "Logout successful" });
}

module.exports = {
  httpRegister,
  httpSignIn,
  httpMe,
  httpLogout,
};
