const pool = require("../../database");
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

module.exports = {
  register,
};
