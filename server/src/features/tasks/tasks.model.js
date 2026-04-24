const { pool } = require("../../db/database");
const paginate = require("../../utils/paginate");

async function getAllTasks(userId, listId, filters = {}, cursor, limit) {
  const { priority, isCompleted, dueBefore, dueAfter, sortBy, order } = filters;

  const sortColumn = sortBy === "dueDate" ? "due_date" : "created_at";
  const direction = order === "asc" ? "ASC" : "DESC";
  const orderBy = `${sortColumn} ${direction}, id ${direction}`;
  const operator = order === "asc" ? ">" : "<";

  let paramIndex = listId ? 3 : 2;

  let dataWhere = listId
    ? `WHERE user_id = $1 AND list_id = $2`
    : `WHERE user_id = $1`;

  const dataParams = [userId];

  if (listId !== undefined) dataParams.push(listId);

  if (priority) {
    dataWhere += ` AND priority = $${paramIndex++}`;
    dataParams.push(priority);
  }

  if (isCompleted !== undefined) {
    dataWhere += ` AND is_completed = $${paramIndex++}`;
    dataParams.push(isCompleted);
  }

  if (dueBefore) {
    dataWhere += ` AND due_date <= $${paramIndex++}`;
    dataParams.push(dueBefore);
  }

  if (dueAfter) {
    dataWhere += ` AND due_date >= $${paramIndex++}`;
    dataParams.push(dueAfter);
  }

  // Cursor-based pagination using (sortColumn, id) to ensure stable ordering
  if (cursor?.value && cursor?.id) {
    dataWhere += ` AND (${sortColumn}, id) ${operator} ($${paramIndex}, $${paramIndex + 1})`;
    dataParams.push(cursor.value);
    dataParams.push(cursor.id);
    paramIndex += 2;
  }

  dataParams.push(limit);

  const dataQuery = `
    SELECT *
    FROM tasks
    ${dataWhere}
    ORDER BY ${orderBy}
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

  const columns = ["user_id", "list_id", "title"];
  const values = [userId, listId, title];
  const placeholders = ["$1", "$2", "$3"];

  let index = 4;

  if (description !== undefined) {
    columns.push("description");
    values.push(description);
    placeholders.push(`$${index++}`);
  }

  if (priority !== undefined) {
    columns.push("priority");
    values.push(priority);
    placeholders.push(`$${index++}`);
  }

  if (dueDate !== undefined) {
    columns.push("due_date");
    values.push(dueDate);
    placeholders.push(`$${index++}`);
  }

  const query = `
    INSERT INTO tasks (${columns.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *
    `;

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function updateTask(userId, taskId, updates) {
  const { title, description, isCompleted, priority, dueDate } = updates;

  // Dynamically build partial update query based on provided fields
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
