function mapTask(row) {
  return {
    id: row.id,
    userId: row.user_id,
    listId: row.list_id,
    title: row.title,
    description: row.description,
    isCompleted: row.is_completed,
    priority: row.priority,
    dueDate: row.due_date,
    createdAt: row.createdAt,
  };
}

module.exports = { mapTask };
