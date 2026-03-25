const pool = require("../db/database");
const paginate = require("../db/paginate");

async function getAllTasks(userId, listId, filters = {}, cursor, limit) {
  // Base query
  let dataWhere = listId
    ? `WHERE user_id = $1 AND list_id = $2`
    : `WHERE user_id = $1`;

  let paramIndex = listId ? 3 : 2;

  // Initial query values array
  const dataParams = [userId];
  if (listId !== undefined) dataParams.push(listId);

  if (filters.priority) {
    dataWhere += ` AND priority = $${paramIndex++}`;
    dataParams.push(filters.priority);
  }

  if (filters.isCompleted !== undefined) {
    dataWhere += ` AND is_completed = $${paramIndex++}`;
    dataParams.push(filters.isCompleted);
  }

  if (cursor?.createdAt && cursor?.id) {
    dataWhere += ` AND (created_at, id) < ($${paramIndex}, $${paramIndex + 1})`;
    dataParams.push(cursor.createdAt);
    dataParams.push(cursor.id);
    paramIndex += 2;
  }

  dataParams.push(limit);

  const dataQuery = `
    SELECT *
    FROM tasks
    ${dataWhere}
    ORDER BY created_at DESC, id DESC
    LIMIT $${dataParams.length}
  `;

  const { rows } = await paginate({
    dataQuery,
    dataParams,
  });

  return {
    tasks: rows,
  };
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
