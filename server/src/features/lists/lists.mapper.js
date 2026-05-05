function mapList(row) {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
  };
}

module.exports = { mapList };
