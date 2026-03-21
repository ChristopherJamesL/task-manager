const pool = require("../db/database");

async function getAllLists(userId) {
  const result = await pool.query(
    `SELECT id, name, created_at
     FROM lists
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
}

async function getListById(userId, listId) {
  const result = await pool.query(
    `SELECT id, name, created_at
     FROM lists
     WHERE user_id = $1 AND id = $2`,
    [userId, listId],
  );

  return result.rows[0];
}

async function createList(userId, name) {
  const result = await pool.query(
    `INSERT INTO lists (user_id, name)
         VALUES ($1, $2)
         RETURNING id, name, created_at`,
    [userId, name],
  );

  return result.rows[0];
}

async function updateListName(userId, listId, name) {
  const result = await pool.query(
    `UPDATE lists
         SET name = $3
         WHERE user_id = $1 AND id = $2
         RETURNING id, name, created_at`,
    [userId, listId, name],
  );

  return result.rows[0];
}

async function deleteList(userId, listId) {
  const result = await pool.query(
    `DELETE FROM lists
         WHERE user_id = $1 AND id = $2
         RETURNING id, name`,
    [userId, listId],
  );

  return result.rows[0];
}

module.exports = {
  getAllLists,
  getListById,
  createList,
  updateListName,
  deleteList,
};
