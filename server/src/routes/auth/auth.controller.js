const pool = require("../../utils/database");
const bcrypt = require("bcrypt");

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

    res.status(201).json({ user });
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
    const { id, username, email } = user;

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: id,
        username: username,
        email: email,
      },
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = {
  register,
  signIn,
};
