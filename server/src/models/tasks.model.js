const pool = require("../db/database");

async function getAllTasks(userId, listId) {
  if (listId) {
    const result = await pool.query(
      `SELECT *
               FROM tasks
               WHERE user_id = $1 AND list_id = $2
               ORDER BY created_at DESC`,
      [userId, listId],
    );

    return result.rows;
  }

  const result = await pool.query(
    `SELECT * 
         FROM tasks
         WHERE user_id = $1
         ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
}

async function getTaskById(userId, taskId) {
  const result = await pool.query(
    `SELECT *
         FROM tasks
         WHERE user_id = $1 AND id = $2`,
    [userId, taskId],
  );
  return result.rows[0];
}

async function createTask(userId, taskData) {
  const { listId, title, description, priority, dueDate } = taskData;

  const result = await pool.query(
    `INSERT INTO tasks (user_id, list_id, title, description, priority, due_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
    [userId, listId, title, description, priority, dueDate],
  );

  return result.rows[0];
}

async function updateTask(userId, taskId, updates) {
  const { title, description, isCompleted, priority, dueDate } = updates;
  const fields = [];
  const values = [];
  let index = 1;

  if (title !== undefined) {
    fields.push(`title = $${index++}`);
    values.push(title);
  }

  if (description !== undefined) {
    fields.push(`description = $${index++}`);
    values.push(description);
  }

  if (priority !== undefined) {
    fields.push(`priority = $${index++}`);
    values.push(priority);
  }

  if (isCompleted !== undefined) {
    fields.push(`is_completed = $${index++}`);
    values.push(isCompleted);
  }

  if (dueDate !== undefined) {
    fields.push(`due_date = $${index++}`);
    values.push(dueDate);
  }

  if (fields.length === 0) return null;

  values.push(userId);
  values.push(taskId);

  const query = `
    UPDATE tasks
    SET ${fields.join(", ")}
    WHERE user_id = $${index++} AND id = $${index}
    RETURNING *;
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function deleteTask(userId, taskId) {
  const result = await pool.query(
    `DELETE FROM tasks
         WHERE user_id = $1 AND id = $2
         RETURNING *`,
    [userId, taskId],
  );

  return result.rows[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
