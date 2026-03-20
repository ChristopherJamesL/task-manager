const pool = require("../../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

async function register(req, res) {
  const { username, email, password } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userResult = await client.query(
      `INSERT INTO users (username, email) 
             VALUES ($1, $2)
             RETURNING id, username, email`,
      [username, email],
    );

    const user = userResult.rows[0];

    await client.query(
      `INSERT INTO authentication (user_id, password_hash)
             VALUES ($1, $2)`,
      [user.id, hashedPassword],
    );

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

async function signIn(req, res) {
  const { identifier, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT users.id, users.username, users.email, a.password_hash
             FROM users
             JOIN authentication a ON users.id = a.user_id
             WHERE users.username = $1 OR users.email = $1`,
      [identifier],
    );

    const user = result.rows[0];

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

async function me(req, res) {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT * FROM users
             WHERE users.id = $1`,
      [userId],
    );

    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

async function logout(req, res) {
  return res.status(200).json({ message: "Logout successful" });
}

module.exports = {
  register,
  signIn,
  me,
  logout,
};
