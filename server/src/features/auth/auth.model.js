const db = require("../../db/database");

async function createUser(username, email, client) {
  const result = await db.query(
    `INSERT INTO users (username, email) 
     VALUES ($1, $2)
     RETURNING id, username, email`,
    [username, email],
    client,
  );

  return result.rows[0];
}

async function createAuth(userId, passwordHash, client) {
  await db.query(
    `INSERT INTO authentication (user_id, password_hash)
     VALUES ($1, $2)`,
    [userId, passwordHash],
    client,
  );
}

async function findUserWithPassword(identifier) {
  const result = await db.query(
    `SELECT users.id, users.username, users.email, a.password_hash
     FROM users
     JOIN authentication a ON users.id = a.user_id
     WHERE users.username = $1 OR users.email = $1`,
    [identifier],
  );

  return result.rows[0];
}

async function findUserWithId(userId) {
  const result = await db.query(
    `SELECT * FROM users
     WHERE users.id = $1`,
    [userId],
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  createAuth,
  findUserWithPassword,
  findUserWithId,
};
