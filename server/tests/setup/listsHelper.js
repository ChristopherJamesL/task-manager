async function createList({ name, agent }) {
  return agent.post("/api/lists").send({ name });
}

async function getAllLists({ agent } = {}) {
  return agent.get("/api/lists");
}

async function getListById({ listId, agent }) {
  return agent.get(`/api/lists/${listId}`);
}

async function updateList({ listId, name, agent }) {
  return agent.patch(`/api/lists/${listId}`).send({ name });
}

async function deleteList({ listId, agent }) {
  return agent.delete(`/api/lists/${listId}`);
}

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
