const {
  getAllLists: getAllListsModel,
  getListById: getListByIdModel,
  createList: createListModel,
  updateList: updatedListModel,
  deleteList: deleteListModel,
} = require("./lists.model");

async function getAllLists(userId) {
  const lists = await getAllListsModel(userId);
  return { lists };
}

async function getListById({ userId, listId }) {
  const list = await getListByIdModel(userId, listId);

  if (!list) return { error: "List not found", status: 404 };

  return { list };
}

async function createList({ userId, name }) {
  const normalizeName = name.toLowerCase().trim();

  const list = await createListModel(userId, normalizeName);

  return { list };
}

async function updateList({ userId, name, listId }) {
  const normalizeName = name.toLowerCase().trim();

  const list = await updatedListModel(userId, listId, normalizeName);

  if (!list) return { error: "List not found", status: 404 };

  return { list };
}

async function deleteList({ userId, listId }) {
  const list = await deleteListModel(userId, listId);

  if (!list) return { error: "List not found", status: 404 };

  return { list };
}

module.exports = {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
};
